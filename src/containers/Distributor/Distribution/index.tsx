import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import {
  CONTRACT_ADDRESS,
  LOGISTICS_TAGGED,
  MEDICINE_SUB_BATCH_TRANSFER,
  PHARMA_TAGGED,
  ROLE_BRAND,
  TOTAL_BATCHES,
  TOTAL_MEDICINES_RECVD,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../models/web3.interface";
import { ISpinnerState } from "../../../models/spinner.interface";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { IMedicine } from "../../../models/medicine.interface";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MedicineReceivedFromManufacturerComponent from "../../../components/MedicineReceivedMD";
import { IMedicineDP } from "../../../models/medicineDP.interface";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetails,
  populateUserDetailsinMedicineRecord,
} from "../../../utils/helpers";
import { IDistributorContext } from "../../../models/distributor.interface";
import { DistributorContext } from "../../../context/DistributorContext";
import { ISummaryBar } from "../../../models/summarybar.interface";
import SummaryBarComponent from "../../../components/SummaryBar";
import { IAddressBar } from "../../../models/addressbar.interface";
import AddressBarComponent from "../../../components/AddressBar";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import useMedicineBatchDetails from "../../../hooks/useMedicineBatchDetails";
import { ToastContext } from "../../../context/ToastContext";
import { DialogContext } from "../../../context/DialogContext";
import { IDialogContext } from "../../../models/dialog.interface";
import RegisteredUsersBarComponent from "../../../components/RegisteredUsersBar";
import { allTransactionRef } from "../../../config/firebaseConfig";
import PanelLayout from "../../../layout/Panel";
import TransferMedicineBatchDPComponent from "../../../components/TransferMedicineBatchDP";
import useMedicineDPBatchDetails from "../../../hooks/useMedicineDPBatchDetails";
import withUsers from "../../../hoc/withUsers";

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

const DistributionBoardComponent = (props: any) => {
  const classes = useStyles();
  const loadMedicineDetails = useMedicineBatchDetails();
  const loadMedicineDPDetails = useMedicineDPBatchDetails();
  const userListState = props["userList"];

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
    updateReceivedMedicines,
    updateTransferredMedicines,
  } = distributorContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  useEffect(() => {
    try {
      if (contractInstance) {
        toggleSpinner();
        //Get all the shipped medicine batches for selected distributor
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getDistributorTaggedMedicineList",
          selectedAccount,
          selectedAccount
        );

        result
          .then((medicineIds: any) => {
            let _listOfRecvdMedicineBatches: Array<IMedicine> = [];
            //retrieve each medicine details
            medicineIds
              .forEach((medId: any) => {
                loadMedicineDetails(medId).then((_record: any) => {
                  _listOfRecvdMedicineBatches.push({
                    ..._record,
                    ..._record["medicineInfo"],
                    ..._record["medicineEntity"],
                  });
                  if (
                    medicineIds.length === _listOfRecvdMedicineBatches.length
                  ) {
                    updateReceivedMedicines([..._listOfRecvdMedicineBatches]);
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
            }, 500);
          });

        //Get all the manufactured medicine ids
        const medicineDPresponse = getTransactionData(
          contractInstance,
          "getAllTransferredMedicineBatches",
          selectedAccount,
          selectedAccount
        );
        medicineDPresponse
          .then((medicineSubContractIds: any) => {
            medicineSubContractIds.forEach((medicineSubContractId: string) => {
              loadMedicineDPDetails(medicineSubContractId)
                .then((record: any) => {
                  const medicineDataDP: IMedicineDP = {
                    ...record,
                    ...record["medicineInfo"],
                    ...record["medicineEntity"],
                  };
                  medicineBatchesTransferredToPharma.push(medicineDataDP);
                  if (
                    medicineSubContractIds.length ===
                    medicineBatchesTransferredToPharma.length
                  ) {
                    updateTransferredMedicines([
                      ...medicineBatchesTransferredToPharma,
                    ]);
                  }
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
    return () => {};
  }, []);

  const updateMedicineBatchStatus = (
    medicineObj: IMedicine,
    isApprove: boolean
  ) => {
    try {
      toggleSpinner();
      const methodName = isApprove
        ? "approveMedicineBatch"
        : "rejectMedicineBatch";
      const _result = sendTransaction(
        contractInstance,
        methodName,
        selectedAccount,
        medicineObj.medicineId
      );
      _result
        .then((res: any) => {
          const UpdatedMedicineStatusOnReceivedEvt =
            res?.events["UpdatedMedicineStatusOnReceived"]["returnValues"];
          const updatedList = [...medicineBatchesReceivedFromManuf].map(
            (medicine: IMedicine) => {
              if (
                UpdatedMedicineStatusOnReceivedEvt &&
                UpdatedMedicineStatusOnReceivedEvt.medicineId?.toLowerCase() ===
                  medicine.medicineId.toLowerCase()
              ) {
                medicine.packageStatus = parseInt(
                  UpdatedMedicineStatusOnReceivedEvt.packageStatus
                );
                medicine.transactionBlocks =
                  UpdatedMedicineStatusOnReceivedEvt.transactionBlocks;
                return medicine;
              } else {
                return medicine;
              }
            }
          );
          updateReceivedMedicines([...updatedList]);
          toggleToast(
            "success",
            isApprove
              ? "Medicine batch approved."
              : "Medicine batch rejected & send back to manufacturer."
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const transferMedicineBatchToPharma = (
    medicineSubContractBatchObj: IMedicineDP
  ): void => {
    try {
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
        .then((res: any) => {
          const MedicineTransferredDPInitiatedEvt =
            res?.events["MedicineTransferredDPInitiated"]["returnValues"];
          const medicineDPData: IMedicineDP = {
            ...medicineSubContractBatchObj,
            medicineSubContract:
              MedicineTransferredDPInitiatedEvt["SubContractID"],
            packageStatus:
              MedicineTransferredDPInitiatedEvt["MedicineSubBatchStatus"],
            transactionBlocksDP:
              MedicineTransferredDPInitiatedEvt["transactionBlocksDP"],
          };
          medicineBatchesTransferredToPharma.push(medicineDPData);
          updateTransferredMedicines([...medicineBatchesTransferredToPharma]);
          toggleToast("success", MEDICINE_SUB_BATCH_TRANSFER);
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
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
        value: userListState.pharmaCount,
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
        value: userListState.transporterCount,
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
    <div className={classes.root}>
      <SummaryBarComponent summaryBarList={populateDashboardSummaryBarData()} />
      <AddressBarComponent addressBarList={populateUserAddressBarData()} />
      <PanelLayout panelTitle="Medicine Batches Received">
        <MedicineReceivedFromManufacturerComponent
          userList={userListState.users}
          medicinesReceivedFromManuf={medicineBatchesReceivedFromManuf}
          transferMedicineBatchToPharma={transferMedicineBatchToPharma}
          updateMedicineBatchStatus={updateMedicineBatchStatus}
        />
      </PanelLayout>
      <PanelLayout panelTitle="Medicine Batch Distribution">
        <TransferMedicineBatchDPComponent
          userList={userListState.users}
          transferMedicineBatchToPharma={transferMedicineBatchToPharma}
        />
      </PanelLayout>
      {userListState.users.length > 0 && (
        <RegisteredUsersBarComponent
          roles={["pharma", "transporter"]}
          users={populateRoleBasedList(userListState.users) as any}
        />
      )}
    </div>
  );
};

export default withUsers(DistributionBoardComponent);
