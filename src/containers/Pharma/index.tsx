import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, Grid } from "@material-ui/core";
import DashboardLayout from "../../layout/DashboardPage";
import {
  CONTRACT_ADDRESS,
  LOGISTICS_TAGGED,
  MEDICINES_APPROVED,
  MEDICINES_EXPIRED_DAMAGED,
  MEDICINES_SOLD_OUT,
  MEDICINES_SUB_CONTRACT_BATCHES_RCVD,
  MEDICINE_SUB_CONTRACT_STATUS_UPDATED,
  PHARMA_DASHBOARD_TITLE,
  ROLE_BRAND,
  YOUR_ADDRESS,
} from "../../utils/constants";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import ReportOffOutlinedIcon from "@material-ui/icons/ReportOffOutlined";
import TransporterListComponent from "../../components/TransporterList";
import CustomerListComponent from "../../components/CustomerList";
import { IMedicineDP } from "../../models/medicineDP.interface";
import MedicineSubContractDPReceivedComponent from "../../components/MedicineSubContractDPReceived";
import MedicineCatalogComponent from "../MedicineCatalog";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetails,
  populateUserDetailsinMedicineRecord,
} from "../../utils/helpers";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import { IAddressBar } from "../../models/addressbar.interface";
import AddressBarComponent from "../../components/AddressBar";
import { PharmaContext } from "../../context/PharmaContext";
import { IPharmaContext } from "../../models/pharma.interface";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import { ToastContext } from "../../context/ToastContext";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import { ISummaryBar } from "../../models/summarybar.interface";
import SummaryBarComponent from "../../components/SummaryBar";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import useRegisteredRawMaterial from "../../hooks/useRegisteredRawMaterial";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import { allTransactionRef } from "../../config/firebaseConfig";

type PharmaDashboardProps = {};

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

const PharmaDashboardComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();
  const loadMedicineDetails = useMedicineBatchDetails();

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  const pharmaContext = useContext<IPharmaContext>(PharmaContext);
  const {
    medicineBatchesReceivedFromDist,
    expiredCount,
    approvedCount,
    medicineIDs,
    subContractIDs,
    customers,
    storePharmaDashboardData,
    storeCustomerData,
  } = pharmaContext;

  const [userList, setUserList] = useState<any>({
    users: [],
    transporterCount: 0,
  });

  useEffect(() => {
    try {
      if (contractInstance && medicineBatchesReceivedFromDist.length === 0) {
        toggleSpinner();
        //load all transferred medicine batches
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getAllTransferredMedicineBatches",
          selectedAccount,
          selectedAccount
        );
        result
          .then((subContractIds: any) => {
            let _listOfRecvdMedicineBatches: Array<IMedicineDP> = [];
            const _medicineIds: string[] = [];
            let _approvedCount = approvedCount;
            let _expiredCount = expiredCount;
            subContractIds.forEach((subContract: string) => {
              //get medicine sub contract batch details
              getTransactionData(
                contractInstance,
                "getMedicineBatchSubContractDetails",
                selectedAccount,
                subContract
              ).then((_record: any) => {
                const _medicineSubContractData: IMedicineDP = { ..._record };
                _medicineSubContractData.medicineSubContract = subContract;

                if (_medicineSubContractData["medicineStatus"] == 1) {
                  _approvedCount = _approvedCount + 1;
                }
                if (
                  _medicineSubContractData["medicineStatus"] == 2 ||
                  _medicineSubContractData["medicineStatus"] == 3
                ) {
                  _expiredCount = _expiredCount + 1;
                }
                _listOfRecvdMedicineBatches.push(_medicineSubContractData);
                _medicineIds.push(_medicineSubContractData.medicineId);
                if (
                  _listOfRecvdMedicineBatches.length === subContractIds.length
                ) {
                  storePharmaDashboardData(
                    [..._listOfRecvdMedicineBatches],
                    _expiredCount,
                    _approvedCount,
                    [..._medicineIds]
                  );
                }
              });
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
    try {
      if (contractInstance && userList?.users?.length === 0) {
        //load user list
        loadUsers(contractInstance, selectedAccount)
          .then((users: any) => {
            const list = populateRoleBasedList(users);
            setUserList({
              ...userList,
              users: users,
              transporterCount: list.transporterList.length,
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
      }
      //load customer list
      getTransactionData(
        contractInstance,
        "getCustomerInfoByPharmaShop",
        selectedAccount,
        selectedAccount
      )
        .then((res: any) => {
          setTimeout(() => {
            storeCustomerData(res);
          }, 100);
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        });
    } catch (e) {
      toggleToast("error", e?.errorMessage);
    }
  }, [contractInstance]);

  const updateRecievedMedicineBatch = async (
    medicineBatchObj: IMedicineDP,
    medicineStatus: any
  ) => {
    try {
      toggleSpinner();
      //update medicine batch status
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "updateRecievedMedicineBatchStatus",
        selectedAccount,
        medicineBatchObj.medicineId,
        medicineBatchObj.medicineSubContract,
        medicineStatus
      );
      result
        .then((res: any) => {
          //get medicine sub contract details
          getTransactionData(
            contractInstance,
            "getMedicineBatchSubContractDetails",
            selectedAccount,
            medicineBatchObj.medicineSubContract
          )
            .then((_record: any) => {
              const _updatedList = medicineBatchesReceivedFromDist.map(
                (med: IMedicineDP) => {
                  if (
                    med.medicineSubContract ==
                    medicineBatchObj.medicineSubContract
                  ) {
                    _record.medicineSubContract =
                      medicineBatchObj.medicineSubContract;
                    return _record;
                  } else {
                    return med;
                  }
                }
              );
              
              //load medicine details
              loadMedicineDetails(
                contractInstance,
                selectedAccount,
                medicineBatchObj.medicineId
              )
                .then((medicineRecord: any) => {
                  //load medicine sale status by id
                  getTransactionData(
                    contractInstance,
                    "getMedicineSaleStatusByID",
                    selectedAccount,
                    medicineRecord.medicineId
                  )
                    .then((_status: any) => {
                      //get all transaction details for medicine
                      populateTxBlockDetails(
                        populateUserDetailsinMedicineRecord(
                          medicineRecord,
                          userList.users
                        )
                      )?.then((medicineTxData: any) => {
                        const _updatedData = { ...medicineTxData };
                        _updatedData.pharmaDetails = populateUserDetails(
                          "6",
                          selectedAccount,
                          userList?.users
                        );

                        _updatedData.saleStatus = _status;
                        const medicineRef = allTransactionRef.child(
                          medicineRecord.medicineId
                        );
                        medicineRef.update({
                          medicineInfo: { ..._updatedData },
                        });
                        storePharmaDashboardData(
                          [..._updatedList],
                          expiredCount,
                          approvedCount,
                          [...medicineIDs],
                          [...customers],
                          []
                        );
                        toggleToast(
                          "success",
                          MEDICINE_SUB_CONTRACT_STATUS_UPDATED
                        );
                      });
                    })
                    .catch((e: any) => {
                      toggleToast("error", e?.errorMessage);
                    });
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
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
          }, 100);
          updateDialogStatus(false, false);
        });
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const populateDashboardSummaryBarData = (): ISummaryBar[] => {
    const summaryBarList: ISummaryBar[] = [
      {
        sizeXS: 12,
        sizeSM: 3,
        label: MEDICINES_SUB_CONTRACT_BATCHES_RCVD,
        value: medicineBatchesReceivedFromDist.length,
        iconComp: (
          <DnsOutlinedIcon fontSize="large" style={{ color: "#65D6CE" }} />
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
        sizeSM: 2,
        label: MEDICINES_APPROVED,
        value: approvedCount,
        iconComp: (
          <ThumbUpOutlinedIcon fontSize="large" style={{ color: "#4AA96C" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: MEDICINES_EXPIRED_DAMAGED,
        value: expiredCount,
        iconComp: (
          <ReportOffOutlinedIcon
            fontSize="large"
            style={{ color: "#DA0037" }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: MEDICINES_SOLD_OUT,
        value: customers.length,
        iconComp: (
          <AssignmentTurnedInOutlined
            fontSize="large"
            style={{ color: "#4AA96C" }}
          />
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
            style={{ color: ROLE_BRAND["pharma"]["bgColor"] }}
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

  const populateRegisteredUsersGrid = (): ReactNode => {
    const list = populateRoleBasedList(userList.users);
    return (
      <Grid container spacing={2} style={{ paddingTop: 40 }}>
        <Grid item xs={12} sm={12} lg={6}>
          <TransporterListComponent list={list.transporterList} />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <CustomerListComponent />
        </Grid>
      </Grid>
    );
  };

  return (
    <DashboardLayout headerTitle={PHARMA_DASHBOARD_TITLE}>
      <div className={classes.root}>
        <SummaryBarComponent
          summaryBarList={populateDashboardSummaryBarData()}
        />
        <AddressBarComponent addressBarList={populateUserAddressBarData()} />
        <Grid container spacing={2}>
          <Grid item style={{ paddingTop: 40 }} xs={12} sm={12} lg={12}>
            <MedicineCatalogComponent
              deliveredMedicineIds={medicineIDs}
              deliveredSubContractIDs={subContractIDs}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item style={{ paddingTop: 40 }} xs={12} sm={12} lg={12}>
            <MedicineSubContractDPReceivedComponent
              userList={userList.users}
              medicineBatchesReceivedDP={medicineBatchesReceivedFromDist}
              updateRecievedMedicineBatch={updateRecievedMedicineBatch}
            />
          </Grid>
        </Grid>
        {populateRegisteredUsersGrid()}
      </div>
    </DashboardLayout>
  );
};

export default PharmaDashboardComponent;
