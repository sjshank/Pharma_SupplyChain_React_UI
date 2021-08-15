import React, { ReactNode, useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme, Grid } from "@material-ui/core";
import {
  CONTRACT_ADDRESS,
  LOGISTICS_TAGGED,
  MEDICINES_APPROVED,
  MEDICINES_EXPIRED_DAMAGED,
  MEDICINES_SOLD_OUT,
  MEDICINES_SUB_CONTRACT_BATCHES_RCVD,
  MEDICINE_BATCH_APPROVED_BY_PHARMA,
  MEDICINE_BATCH_REJECTED_BY_PHARMA,
  ROLE_BRAND,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../models/web3.interface";
import { ISpinnerState } from "../../../models/spinner.interface";
import { SpinnerContext } from "../../../context/SpinnerContext";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import ReportOffOutlinedIcon from "@material-ui/icons/ReportOffOutlined";
import TransporterListComponent from "../../../components/TransporterList";
import CustomerListComponent from "../../../components/CustomerList";
import { IMedicineDP } from "../../../models/medicineDP.interface";
import MedicineCatalogComponent from "../../MedicineCatalog";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetails,
  populateUserDetailsinMedicineRecord,
} from "../../../utils/helpers";
import useRegisteredUsers from "../../../hooks/useRegisteredUsers";
import { IAddressBar } from "../../../models/addressbar.interface";
import AddressBarComponent from "../../../components/AddressBar";
import { PharmaContext } from "../../../context/PharmaContext";
import { IPharmaContext } from "../../../models/pharma.interface";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import { ToastContext } from "../../../context/ToastContext";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import { ISummaryBar } from "../../../models/summarybar.interface";
import SummaryBarComponent from "../../../components/SummaryBar";
import { allTransactionRef } from "../../../config/firebaseConfig";
import PanelLayout from "../../../layout/Panel";
import MedicineBatchDPReceivedComponent from "../../../components/MedicineBatchDPReceived";
import useMedicineDPBatchDetails from "../../../hooks/useMedicineDPBatchDetails";
import withUsers from "../../../hoc/withUsers";

type PharmaDashboardProps = {};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
  })
);

const PharmaShopComponent = (props: any) => {
  const classes = useStyles();
  const loadMedicineDPDetails = useMedicineDPBatchDetails();
  const userListState = props["userList"];

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const pharmaContext = useContext<IPharmaContext>(PharmaContext);
  const {
    medicineBatchesReceivedFromDist,
    customers,
    approvedMedicinesDP,
    expiredMedicinesDP,
    storeCustomerData,
    updateReceivedMedicineDPBatches,
    populateApprovedMedicinesDP,
    populateExpiredMedicinesDP,
  } = pharmaContext;

  useEffect(() => {
    try {
      if (contractInstance) {
        toggleSpinner();
        //load all transferred medicine batches
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getPharmaTaggedMedicineSubBatchList",
          selectedAccount,
          selectedAccount
        );
        result
          .then((subContractIds: any) => {
            let count = 0;
            subContractIds.forEach((subContractId: any) => {
              loadMedicineDPDetails(subContractId)
                .then((record: any) => {
                  const medicineDPData: IMedicineDP = {
                    ...record,
                    ...record["medicineInfo"],
                    ...record["medicineEntity"],
                  };
                  count++;
                  if (parseInt(medicineDPData.packageStatus) === 4) {
                    approvedMedicinesDP.push(medicineDPData);
                  } else if (parseInt(medicineDPData.packageStatus) === 3) {
                    expiredMedicinesDP.push(medicineDPData);
                  } else {
                    medicineBatchesReceivedFromDist.push(medicineDPData);
                  }

                  if (count === subContractIds.length) {
                    populateExpiredMedicinesDP([...expiredMedicinesDP]);
                    updateReceivedMedicineDPBatches([
                      ...medicineBatchesReceivedFromDist,
                    ]);
                    populateApprovedMedicinesDP([...approvedMedicinesDP]);
                  }
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            setTimeout(() => {
              toggleSpinner();
            }, 400);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
    return () => {};
  }, []);

  const updateMedicineDPBatchStatus = (
    medicineDPObject: IMedicineDP,
    isApprove: boolean
  ) => {
    try {
      toggleSpinner();
      const methodName = !isApprove
        ? "rejectMedicineSubBatch"
        : "approveMedicineSubBatch";
      const result = sendTransaction(
        contractInstance,
        methodName,
        selectedAccount,
        medicineDPObject.medicineSubContract
      );
      result
        .then((res: any) => {
          const UpdatedMedicineSubBatchStatusOnReceivedEvt =
            res?.events["UpdatedMedicineSubBatchStatusOnReceived"][
              "returnValues"
            ];
          const updatedMedicinesDP: IMedicineDP[] = [
            ...medicineBatchesReceivedFromDist,
          ].filter((medicineDP: IMedicineDP) => {
            if (
              parseInt(medicineDP.packageStatus) >= 2 &&
              parseInt(medicineDP.packageStatus) < 4
            ) {
              if (
                UpdatedMedicineSubBatchStatusOnReceivedEvt &&
                UpdatedMedicineSubBatchStatusOnReceivedEvt.subContractId?.toLowerCase() ===
                  medicineDP.medicineSubContract.toLowerCase() &&
                UpdatedMedicineSubBatchStatusOnReceivedEvt.medicineId?.toLowerCase() ===
                  medicineDP.medicineId.toLowerCase()
              ) {
                medicineDP.packageStatus = parseInt(
                  UpdatedMedicineSubBatchStatusOnReceivedEvt.packageStatus
                );
                medicineDP.transactionBlocksDP =
                  UpdatedMedicineSubBatchStatusOnReceivedEvt.transactionBlocksDP;
                parseInt(medicineDP.packageStatus) === 3
                  ? expiredMedicinesDP.push(medicineDP)
                  : (() => {
                      medicineDP.saleStatus = 0;
                      approvedMedicinesDP.push(medicineDP);
                    })();
              }
            }
            if ([1, 2].indexOf(parseInt(medicineDP.packageStatus)) > -1) {
              return medicineDP;
            }
          });
          populateApprovedMedicinesDP(approvedMedicinesDP);
          populateExpiredMedicinesDP(expiredMedicinesDP);
          updateReceivedMedicineDPBatches([...updatedMedicinesDP]);
          toggleToast(
            "success",
            isApprove
              ? MEDICINE_BATCH_APPROVED_BY_PHARMA
              : MEDICINE_BATCH_REJECTED_BY_PHARMA
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
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
        sizeSM: 2,
        label: MEDICINES_APPROVED,
        value: approvedMedicinesDP.length,
        iconComp: (
          <ThumbUpOutlinedIcon fontSize="large" style={{ color: "#4AA96C" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: MEDICINES_EXPIRED_DAMAGED,
        value: expiredMedicinesDP.length,
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
    const list = populateRoleBasedList(userListState.users);
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
    <div className={classes.root}>
      <SummaryBarComponent summaryBarList={populateDashboardSummaryBarData()} />
      <AddressBarComponent addressBarList={populateUserAddressBarData()} />
      <PanelLayout
        panelTitle="Search & Update Available Medicine Sale Status"
        styleItem={{ paddingTop: 20 }}
      >
        <MedicineCatalogComponent userList={userListState.users} />
      </PanelLayout>
      <PanelLayout
        panelTitle="Medicine Batches Received"
        styleItem={{ paddingTop: 20 }}
      >
        <MedicineBatchDPReceivedComponent
          userList={userListState.users}
          updateMedicineDPBatchStatus={updateMedicineDPBatchStatus}
        />
      </PanelLayout>
      {populateRegisteredUsersGrid()}
    </div>
  );
};

export default withUsers(PharmaShopComponent);
