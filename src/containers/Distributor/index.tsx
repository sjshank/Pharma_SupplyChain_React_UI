import React, { useContext, useEffect, useState } from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import DashboardLayout from "../../layout/DashboardPage";
import {
  CONTRACT_ADDRESS,
  DISTRIBUTOR_DASHBOARD_TITLE,
  LOGISTICS_TAGGED,
  MEDICINE_BATCH_SHIPMENT,
  PHARMA_TAGGED,
  ROLE_BRAND,
  TOTAL_BATCHES,
  TOTAL_MEDICINES_RECVD,
  YOUR_ADDRESS,
} from "../../utils/constants";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import { IMedicine } from "../../models/medicine.interface";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MedicineReceivedFromManufacturerComponent from "../../components/MedicineReceivedMD";
import { IMedicineDP } from "../../models/medicineDP.interface";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetails,
  populateUserDetailsinMedicineRecord,
  populateUserName,
} from "../../utils/helpers";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import { IDistributorContext } from "../../models/distributor.interface";
import { DistributorContext } from "../../context/DistributorContext";
import { ISummaryBar } from "../../models/summarybar.interface";
import SummaryBarComponent from "../../components/SummaryBar";
import { IAddressBar } from "../../models/addressbar.interface";
import AddressBarComponent from "../../components/AddressBar";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import { ToastContext } from "../../context/ToastContext";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import RegisteredUsersBarComponent from "../../components/RegisteredUsersBar";
import { allTransactionRef } from "../../config/firebaseConfig";

type DistributorDashboardProps = {};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderRadius: "0px",
    },
    registeredUserRoot: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    createUserBtn: {
      float: "right",
      marginTop: "-35px",
      color: "rgb(41, 187, 137)",
      border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
  })
);

const DistributorDashboardComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();
  const loadMedicineDetails = useMedicineBatchDetails();

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const distributorContext =
    useContext<IDistributorContext>(DistributorContext);
  const {
    batchesShippedCount,
    medicineBatchesReceivedFromManuf,
    medicineBatchesTransferredToPharma,
    storeDistributorDashboardData,
  } = distributorContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  const [userList, setUserList] = useState<any>({
    users: [],
    pharmaCount: 0,
    transporterCount: 0,
  });

  useEffect(() => {
    try {
      if (contractInstance && medicineBatchesReceivedFromManuf.length === 0) {
        toggleSpinner();
        //Get all the shipped medicine batches for selected distributor
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getAllShippedMedicineList",
          selectedAccount,
          selectedAccount
        );

        result
          .then((medicineIds: any) => {
            let _listOfRecvdMedicineBatches: Array<IMedicine> = [];
            let _filtereMedicines: Array<IMedicine> = [];
            let _batchesShipped = 0;
            //retrieve each medicine details
            medicineIds
              .forEach(async (medId: any) => {
                await loadMedicineDetails(
                  contractInstance,
                  selectedAccount,
                  medId
                ).then((_record: any) => {
                  _listOfRecvdMedicineBatches.push({ ..._record });
                  if (
                    _listOfRecvdMedicineBatches.length === medicineIds.length
                  ) {
                    _filtereMedicines = _listOfRecvdMedicineBatches.filter(
                      (mat: IMedicine) => {
                        if (parseInt(mat.packageStatus) >= 2) {
                          _batchesShipped = _batchesShipped + 1;
                        }
                        return (
                          mat?.distributor?.toLowerCase() ===
                          selectedAccount?.toLowerCase()
                        );
                      }
                    );
                    storeDistributorDashboardData(
                      _batchesShipped,
                      [..._filtereMedicines],
                      medicineBatchesTransferredToPharma
                    );
                  }
                });
              })
              .catch((e: any) => {
                toggleToast("error", e?.errorMessage);
              });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            setTimeout(() => {
              toggleSpinner();
            }, 200);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
    return () => {};
  }, [contractInstance]);

  useEffect(() => {
    if (contractInstance && userList?.users?.length === 0) {
      //get all registered users
      loadUsers(contractInstance, selectedAccount)
        .then((users: any) => {
          const list = populateRoleBasedList(users);
          setUserList({
            ...userList,
            users: users,
            pharmaCount: list.pharmaList.length,
            transporterCount: list.transporterList.length,
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        });
    }
  }, [contractInstance]);

  const transferMedicineBatchToPharma = (
    medicineSubContractBatchObj: IMedicineDP
  ): void => {
    toggleSpinner();
    //transfer requested medicine batch to pharma shop
    const result: Promise<any> = sendTransaction(
      contractInstance,
      "transferMedicineFromDistributorToPharma",
      selectedAccount,
      medicineSubContractBatchObj.medicineId,
      medicineSubContractBatchObj.pharma,
      medicineSubContractBatchObj.shipper
    );
    result
      .then(async (res: any) => {
        const _listOfMedicinesTransferred: IMedicineDP[] = [
          ...medicineBatchesTransferredToPharma,
        ];
        const _medicineBatchesReceivedFromManu: IMedicine[] = [
          ...medicineBatchesReceivedFromManuf,
        ];
        const _medicineTransferredDPInitiatedEvt =
          res?.events?.MedicineTransferredDPInitiated;
        const _returnValues = {
          ..._medicineTransferredDPInitiatedEvt?.returnValues,
        };
        _returnValues.packageStatus = _returnValues.MedicineStatus;
        _returnValues.medicineSubContract = _returnValues.SubContractID;
        _listOfMedicinesTransferred.push(_returnValues);
        const _updatedList = _medicineBatchesReceivedFromManu.map(
          (med: IMedicine) => {
            if (med.medicineId == medicineSubContractBatchObj.medicineId) {
              med.packageStatus = _returnValues.MedicineStatus;
              return med;
            } else {
              return med;
            }
          }
        );
        //get medicine details
        await loadMedicineDetails(
          contractInstance,
          selectedAccount,
          medicineSubContractBatchObj.medicineId
        )
          .then((medData: any) => {
            //get all transaction details for medicine
            populateTxBlockDetails(
              populateUserDetailsinMedicineRecord(medData, userList.users)
            )?.then((medicineTxData: any) => {
              const _updatedData = { ...medicineTxData };
              _updatedData.pharmaDetails = populateUserDetails(
                "6",
                medicineSubContractBatchObj.pharma,
                userList.users
              );
              //store data in firebase
              const medicineRef = allTransactionRef.child(medData.medicineId);
              medicineRef.update({
                medicineInfo: { ..._updatedData },
              });
              storeDistributorDashboardData(
                batchesShippedCount + 1,
                [..._updatedList],
                [..._listOfMedicinesTransferred]
              );
              toggleToast("success", MEDICINE_BATCH_SHIPMENT);
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
      })
      .catch((e: any) => {
        toggleToast("error", e?.errorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          toggleSpinner();
        }, 150);
        updateDialogStatus(false, false);
      });
  };

  const populateDashboardSummaryBarData = (): ISummaryBar[] => {
    const summaryBarList: ISummaryBar[] = [
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_MEDICINES_RECVD,
        value: medicineBatchesReceivedFromManuf.length,
        iconComp: (
          <DnsOutlinedIcon fontSize="large" style={{ color: "#65D6CE" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: PHARMA_TAGGED,
        value: userList.pharmaCount,
        iconComp: (
          <ContactsOutlinedIcon
            fontSize="large"
            style={{ color: ROLE_BRAND["pharma"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: LOGISTICS_TAGGED,
        value: userList.transporterCount,
        iconComp: (
          <ContactsOutlinedIcon
            fontSize="large"
            style={{ color: ROLE_BRAND["transporter"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_BATCHES,
        value: batchesShippedCount,
        iconComp: (
          <LocalShippingIcon fontSize="large" style={{ color: "#FDCA40" }} />
        ),
      },
    ];

    return summaryBarList;
  };

  const populateUserAddressBarData = (): IAddressBar[] => {
    const addressBarList: IAddressBar[] = [
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: YOUR_ADDRESS,
        value: selectedAccount,
        iconComp: (
          <ContactsOutlinedIcon
            style={{ color: ROLE_BRAND["distributor"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: CONTRACT_ADDRESS,
        value: contractInstance?._address,
        iconComp: <ContactsOutlinedIcon style={{ color: "#DC2ADE" }} />,
      },
    ];
    return addressBarList;
  };

  return (
    <DashboardLayout headerTitle={DISTRIBUTOR_DASHBOARD_TITLE}>
      <div className={classes.root}>
        <SummaryBarComponent
          summaryBarList={populateDashboardSummaryBarData()}
        />
        <AddressBarComponent addressBarList={populateUserAddressBarData()} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <MedicineReceivedFromManufacturerComponent
              userList={userList.users}
              medicinesReceivedFromManuf={medicineBatchesReceivedFromManuf}
              transferMedicineBatchToPharma={transferMedicineBatchToPharma}
            />
          </Grid>
        </Grid>
        {userList.users.length > 0 && (
          <RegisteredUsersBarComponent
            roles={["pharma", "transporter"]}
            users={populateRoleBasedList(userList.users) as any}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DistributorDashboardComponent;
