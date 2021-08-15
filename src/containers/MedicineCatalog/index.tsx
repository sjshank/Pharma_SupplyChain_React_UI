import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { createStyles, makeStyles, Theme, Grid, Grow } from "@material-ui/core";
import { allTransactionRef } from "../../config/firebaseConfig";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MTypographyComponent from "../../generic/MTypography";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import {
  CUSTOMER_FORM_TEXT,
  MEDICINE_SALE_STATUS_AT_PHARMA,
  TRACK_UPDATES,
} from "../../utils/constants";
import MBasicTableComponent from "../../generic/MBasicTable";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MButtonComponent from "../../generic/MButton";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import ReportOffOutlinedIcon from "@material-ui/icons/ReportOffOutlined";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import { ToastContext } from "../../context/ToastContext";
import MedicineTitleComponent from "../../components/MedicineTitle";
import { IUserInfo, IUserInfoContext } from "../../models/userInfo.interface";
import { UserInfoContext } from "../../context/UserContext";
import { ICustomer } from "../../models/customer.interface";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import CustomerFormComponent from "./CustomerForm";
import MFormDialogComponent from "../../generic/MFormDialog";
import MTableCellComponent from "../../generic/MTableCell";
import { PharmaContext } from "../../context/PharmaContext";
import { IPharmaContext } from "../../models/pharma.interface";
import { IMedicineDP } from "../../models/medicineDP.interface";
import MedicineTable from "../../generic/MedicineTable";
import {
  medicineDPReducer,
  MEDICINEDP_STATE,
  customerReducer,
  CUSTOMER_STATE,
} from "./reducer";
import MedicineCardComponent from "../../components/MedicineCard";

type MedicineCatalogProps = {
  userList: IUserInfo[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "200px",
    },
    autocomplete: {
      padding: 10,
    },
    switch: {
      color: "#1EAE98",
    },
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
      maxWidth: "300px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    select: {
      width: 250,
    },
    textFieldBar: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    textField: {
      width: "100%",
    },
  })
);

const MedicineCatalogComponent = ({ userList }: MedicineCatalogProps) => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("medicineDetails");

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const pharmaContext = useContext<IPharmaContext>(PharmaContext);
  const {
    approvedMedicinesDP,
    expiredMedicinesDP,
    populateApprovedMedicinesDP,
    populateExpiredMedicinesDP,
  } = pharmaContext;

  const [medicineDPFormState, dispatchMedicineDPFormStateAction] = useReducer(
    medicineDPReducer,
    {
      ...MEDICINEDP_STATE,
    }
  );

  const [customerFormState, dispatchCustomerFormStateAction] = useReducer(
    customerReducer,
    {
      ...CUSTOMER_STATE,
    }
  );

  const closeDialog: MouseEventHandler = () => {
    dispatchMedicineDPFormStateAction({
      type: "UPDATE_SALE_STATUS",
      status: 0,
    });
    updateDialogStatus(false, false);
  };

  const handleAutoCompleteChange = (
    evt: any,
    selectedMedicineDP: IMedicineDP
  ) => {
    try {
      if (selectedMedicineDP == null) {
        dispatchMedicineDPFormStateAction({
          type: "RESET",
        });
      } else {
        toggleSpinner();
        getTransactionData(
          contractInstance,
          "getMedicineSaleStatusByID",
          selectedAccount,
          selectedMedicineDP.medicineSubContract
        )
          .then((result: any) => {
            selectedMedicineDP.saleStatus = parseInt(result);
            dispatchMedicineDPFormStateAction({
              type: "SET_MEDICINEDP",
              data: selectedMedicineDP,
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            toggleSpinner();
          });
      }
    } catch (e: any) {
      toggleToast("error", e?.errorMessage);
    }
  };

  const toggleCustomerFormDialog = (selectedMedicineDP: IMedicineDP) => {
    dispatchCustomerFormStateAction({
      type: "SET_VALUE",
      key: "quantity",
      value: selectedMedicineDP.quantity,
    });
    dispatchCustomerFormStateAction({
      type: "SET_VALUE",
      key: "medicineSubContract",
      value: selectedMedicineDP.medicineSubContract,
    });
    dispatchCustomerFormStateAction({
      type: "SET_VALUE",
      key: "materialId",
      value: selectedMedicineDP.medicineSubContract,
    });
    updateDialogStatus(
      true,
      false,
      "Medicine Buyer Information",
      false,
      "saleStatus"
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: ICustomer
  ) => {
    dispatchCustomerFormStateAction({
      type: "SET_VALUE",
      key: event.target.name,
      value: event.target.value,
    });
    if (!customerFormState.medicineId || !customerFormState.pharma) {
      dispatchCustomerFormStateAction({
        type: "SET_VALUE",
        key: "medicineId",
        value: medicineDPFormState.medicineId,
      });
      dispatchCustomerFormStateAction({
        type: "SET_VALUE",
        key: "pharma",
        value: selectedAccount,
      });
    }
  };

  const submitCustomerInfomationAndUpdateStatus = () => {
    try {
      toggleSpinner();
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "submitCustomerAndMedicineSaleDetails",
        selectedAccount,
        customerFormState.medicineSubContract,
        customerFormState.customerName,
        customerFormState.customerAge,
        customerFormState.doctorName,
        customerFormState.quantity,
        customerFormState.amountPaid,
        customerFormState.medicineId,
        2
      );
      result
        .then(() => {
          dispatchMedicineDPFormStateAction({
            type: "UPDATE_SALE_STATUS",
            status: 2,
          });
          //store customer data against medicine in firebase
          const medicineRef = allTransactionRef.child(
            customerFormState.medicineId
          );
          // medicineRef
          //   .update({
          //     customerInfo: {
          //       buyer: customerFormState.customerName,
          //       amountPaid: customerFormState.amountPaid,
          //       shopName: userInfo.userName,
          //       shopAddress: userInfo.userLocation,
          //       dateOfSale: new Date()
          //         .toLocaleDateString()
          //         .concat(", " + new Date().toLocaleTimeString()),
          //     },
          //   })
          //   .catch((e: any) => {
          //     toggleToast("error", e?.errorMessage);
          //   });
          updateDialogStatus(false, false);
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const updateMedicineSaleStatus = () => {
    try {
      if (parseInt(medicineDPFormState.saleStatus) > 0) {
        return false;
      }
      toggleSpinner();
      const result = sendTransaction(
        contractInstance,
        "updateSaleStatus",
        selectedAccount,
        medicineDPFormState.medicineSubContract,
        parseInt(medicineDPFormState.saleStatus)
      );
      result
        .then(() => {
          dispatchMedicineDPFormStateAction({
            type: "UPDATE_SALE_STATUS",
            status: medicineDPFormState.saleStatus,
          });
          updateDialogStatus(false, false);
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const handleQRCodeEvent: any = (medicineDetail: any) => {
    updateDialogStatus(
      true,
      false,
      TRACK_UPDATES,
      false,
      medicineDetail.medicineId
    );
  };

  const populateFormDialogFooter = (): ReactNode => {
    return (
      <>
        <MButtonComponent
          variant="outlined"
          label="Cancel"
          color="secondary"
          clickHandler={closeDialog}
        />
        <MButtonComponent
          variant="contained"
          label="Submit"
          color="primary"
          clickHandler={submitCustomerInfomationAndUpdateStatus}
        />
      </>
    );
  };

  return (
    <>
      <MTypographyComponent
        variant="subtitle1"
        text={`Total ${approvedMedicinesDP.length} records found`}
        style={{ color: "#29BB89" }}
      />
      <Autocomplete
        id="medicineList"
        options={approvedMedicinesDP}
        getOptionLabel={(option: IMedicineDP) =>
          `${option.medicineName}-${option.description}`
        }
        className={classes.autocomplete}
        onChange={(event: any, newValue: any) =>
          handleAutoCompleteChange(event, newValue)
        }
        renderInput={(params) => (
          <TextField {...params} label="Search Medicine" variant="outlined" />
        )}
      />
      {medicineDPFormState.medicineSubContract &&
        medicineDPFormState.medicineId && (
          <Grid container justify="center" alignItems="center" component="div">
            <Grid item sm={5}>
              <Grow in={true} timeout={500}>
                <div>
                  <MedicineCardComponent
                    userList={userList}
                    updateMedicineSaleStatus={updateMedicineSaleStatus}
                    toggleCustomerFormDialog={toggleCustomerFormDialog}
                    medicineDetails={medicineDPFormState}
                    handleQRCodeEvent={handleQRCodeEvent}
                    closeDialog={closeDialog}
                  />
                </div>
              </Grow>
            </Grid>
          </Grid>
        )}

      {dialogStatus.dialogId == "saleStatus" && dialogStatus.openFormDialog && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="customerFormDialog"
          footerButtons={populateFormDialogFooter()}
          fullWidth={true}
          maxWidth="sm"
        >
          <>
            <div>
              <MTypographyComponent
                text={CUSTOMER_FORM_TEXT}
                variant="caption"
              />
            </div>
            <CustomerFormComponent
              classes={classes}
              customerFormState={customerFormState}
              handleInputChange={handleInputChange}
            />
          </>
        </MFormDialogComponent>
      )}
    </>
  );
};

export default MedicineCatalogComponent;
