import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStyles, makeStyles, Theme, Grid, Grow } from "@material-ui/core";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IMedicine } from "../../models/medicine.interface";
import Paper from "@material-ui/core/Paper";
import PaperHeaderComponent from "../../components/PaperHeader";
import LocalHospitalRoundedIcon from "@material-ui/icons/LocalHospitalRounded";
import MTypographyComponent from "../../generic/MTypography";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import {
  CUSTOMER_FORM_TEXT,
  MEDICINE_SALE_STATUS_AT_PHARMA,
} from "../../utils/constants";
import MBasicTableComponent from "../../generic/MBasicTable";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../../generic/MTooltip";
import MFormDialogComponent from "../../generic/MFormDialog";
import MButtonComponent from "../../generic/MButton";
import MTextFieldComponent from "../../generic/MTextField";
import { ICustomer } from "../../models/customer.interface";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import ReportOffOutlinedIcon from "@material-ui/icons/ReportOffOutlined";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import { ToastContext } from "../../context/ToastContext";

type MedicineCatalogProps = {
  deliveredMedicineIds: string[];
  deliveredSubContractIDs?: any[] | undefined;
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
    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minWidth: "25rem",
      wordWrap: "break-word",
      backgroundColor: "#fff",
      backgroundClip: "border-box",
      borderRadius: ".25rem",
      marginBottom: 15,
      border: "2px solid #1976d2",
    },
    cardHeader: {
      padding: ".75rem 1.25rem",
      // borderBottom: "2px solid #1976d2",
    },
    cardTitle: {
      fontWeight: 600,
      color: "#444444",
      fontSize: 16,
      // padding: ".75rem 1.25rem",
      // borderBottom: "2px solid #1976d2",
    },
    cardDesc: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    cardBody: {
      padding: ".75rem 1.25rem",
    },
    cardFooter: {
      padding: ".25rem 1.25rem",
      // borderTop: "2px solid #1976d2",
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

const MedicineCatalogComponent = ({
  deliveredMedicineIds,
}: MedicineCatalogProps) => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("medicineDetails");
  const loadMedicineDetails = useMedicineBatchDetails();

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount, contractStorageAddress } =
    web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const [catalogState, setCatalogState] = useState<any>({
    medicineList: [] as IMedicine[],
    medicineDetails: {} as IMedicine,
    saleStatus: "",
  });

  const [customerFormState, setCustomerFormState] = useState<ICustomer>({
    materialId: "",
    medicineId: "",
    customerName: "",
    customerAge: 0,
    doctorName: "",
    quantity: 0,
    amountPaid: 0,
    pharma: "",
  });

  useEffect(() => {
    const _medicineList = [...catalogState?.medicineList];
    let _deliveredCount = 0;
    deliveredMedicineIds.forEach((medicineId: string) => {
      loadMedicineDetails(contractInstance, selectedAccount, medicineId).then(
        (res: any) => {
          if (parseInt(res["packageStatus"]) >= 4) {
            _medicineList.push(res);
            _deliveredCount = _deliveredCount + 1;
          }
        }
      );
      if (_medicineList.length === _deliveredCount) {
        setCatalogState({
          ...catalogState,
          medicineList: _medicineList,
        });
      }
    });
  }, [contractInstance, deliveredMedicineIds]);

  const closeDialog: MouseEventHandler = () => {
    setCatalogState({
      ...catalogState,
      saleStatus: "",
    });
    updateDialogStatus(false, false);
  };

  const handleAutoCompleteChange = async (evt: any, selectedValue: any) => {
    try {
      if (selectedValue == null) {
        setCatalogState({
          ...catalogState,
          medicineDetails: {} as IMedicine,
        });
      } else {
        toggleSpinner();
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getMedicineSaleStatusByID",
          selectedAccount,
          selectedValue?.medicineId
        );
        result
          .then((res: any) => {
            setCatalogState({
              ...catalogState,
              medicineDetails: selectedValue,
              saleStatus: parseInt(res) == 1 ? "" : parseInt(res), // if 1 then it is sold out & disable dropdown by assigning value "0"
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
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const updateSaleStatus = (e: any) => {
    setCustomerFormState({
      ...customerFormState,
      quantity: catalogState?.medicineDetails?.quantity,
    });
    setCatalogState({
      ...catalogState,
      saleStatus: e.target.value,
    });
    if (e?.target?.value == "4") {
      updateDialogStatus(
        true,
        false,
        "Medicine Buyer Information",
        false,
        "saleStatus"
      );
    } else {
      updateDialogStatus(
        false,
        true,
        "Medicine Sales Status",
        false,
        "saleStatus"
      );
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: ICustomer
  ) => {
    setCustomerFormState({
      ...customerFormState,
      [event.target.name]: event.target.value,
      medicineId: catalogState?.medicineDetails?.medicineId,
      pharma: selectedAccount,
      materialId: catalogState?.medicineDetails?.materialId, /// TODO- This needs to revised.
    });
  };

  const submitCustomerInfomationAndUpdateStatus = () => {
    try {
      toggleSpinner();
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "submitCustomerAndMedicineSaleDetails",
        selectedAccount,
        customerFormState.customerName,
        customerFormState.customerAge,
        customerFormState.doctorName,
        customerFormState.quantity,
        customerFormState.amountPaid,
        customerFormState.medicineId,
        customerFormState.materialId,
        catalogState?.saleStatus
      );
      result
        .then(() => {
          setCatalogState({
            ...catalogState,
            saleStatus: "4",
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

  const updateMedicineSaleStatus = () => {
    try {
      toggleSpinner();
      const result = sendTransaction(
        contractInstance,
        "updateSaleStatus",
        selectedAccount,
        catalogState?.medicineDetails?.medicineId,
        parseInt(catalogState?.saleStatus)
      );
      result
        .then(() => {
          setCatalogState({
            ...catalogState,
            saleStatus: catalogState?.saleStatus,
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

  const populateTableBody = () => {
    return (
      <TableBody>
        <TableRow key={catalogState?.medicineDetails?.medicineId}>
          <TableCell align="left" className={classes.tableBodyCell}>
            <MTooltipComponent
              title={catalogState?.medicineDetails?.medicineName}
              placement="top"
            >
              <span>{catalogState?.medicineDetails?.medicineName}</span>
            </MTooltipComponent>
          </TableCell>
          <TableCell align="left" className={classes.tableBodyCell}>
            <MTooltipComponent
              title={catalogState?.medicineDetails?.description}
              placement="top"
            >
              <span>{catalogState?.medicineDetails?.description}</span>
            </MTooltipComponent>
          </TableCell>
          <TableCell align="left" className={classes.tableBodyCell}>
            {catalogState?.medicineDetails?.location}
          </TableCell>
          <TableCell align="left" className={classes.tableBodyCell}>
            {catalogState?.medicineDetails?.quantity}
          </TableCell>
          <TableCell align="left" className={classes.tableBodyCell}>
            {catalogState.saleStatus == "" && (
              <MSimpleSelectComponent
                required={true}
                id="medicineSellStatus"
                name="medicineSellStatus"
                label="Update Sale Status"
                selectedValue={catalogState.saleStatus}
                disabled={catalogState.saleStatus == "0" ? true : false}
                classname={classes.select}
                options={MEDICINE_SALE_STATUS_AT_PHARMA}
                changeHandler={(e) => updateSaleStatus(e)}
              />
            )}
            {catalogState.saleStatus == "4" && (
              <>
                <AssignmentTurnedInOutlined
                  fontSize="small"
                  style={{
                    color: "#4AA96C",
                    verticalAlign: "middle",
                    marginTop: -7,
                  }}
                />
                <MTypographyComponent variant="button" text="SOLD OUT" />
              </>
            )}
            {catalogState.saleStatus == "2" && (
              <>
                <ReportOffOutlinedIcon
                  fontSize="small"
                  style={{
                    color: "#DA0037",
                    verticalAlign: "middle",
                    marginTop: -7,
                  }}
                />
                <MTypographyComponent variant="button" text="EXPIRED" />
              </>
            )}
            {catalogState.saleStatus == "3" && (
              <>
                <ReportOffOutlinedIcon
                  fontSize="small"
                  style={{
                    color: "#DA0037",
                    verticalAlign: "middle",
                    marginTop: -7,
                  }}
                />
                <MTypographyComponent variant="button" text="DAMAGED" />
              </>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
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

  const populateConfirmDialogFooter = (): ReactNode => {
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
          label="Confirm"
          color="primary"
          clickHandler={updateMedicineSaleStatus}
        />
      </>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<LocalHospitalRoundedIcon style={{ color: "#4AA96C" }} />}
        label="Search & Update Medicine Sale Status"
        textVariant="button"
      />
      <Autocomplete
        id="medicineList"
        options={catalogState?.medicineList}
        getOptionLabel={(option: IMedicine) =>
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
      {catalogState?.medicineDetails?.medicineId && (
        <Grid container justify="center" alignItems="center" component="div">
          <Grid item sm={10}>
            <Grow in={true} timeout={500}>
              <div>
                <MBasicTableComponent
                  tableBody={populateTableBody()}
                  tableHeader={
                    <MTableHeadersComponent
                      tableHeaders={tableHeaders}
                      classes={classes}
                    />
                  }
                  tableName="Medicine Details"
                  tableId="medicineDetailsTbl"
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
            <div>
              <div className={classes.textFieldBar}>
                <MTextFieldComponent
                  required={true}
                  id="customerName"
                  name="customerName"
                  label="Buyer Name"
                  variant="outlined"
                  value={customerFormState.customerName}
                  classname={classes.textField}
                  changeHandler={handleInputChange}
                />
              </div>
              <div className={classes.textFieldBar}>
                <MTextFieldComponent
                  required={true}
                  id="customerAge"
                  name="customerAge"
                  label="Buyer Age (In Numbers)"
                  type="number"
                  variant="outlined"
                  value={customerFormState.customerAge}
                  classname={classes.textField}
                  changeHandler={handleInputChange}
                />
              </div>
              <div className={classes.textFieldBar}>
                <MTextFieldComponent
                  required={true}
                  id="doctorName"
                  name="doctorName"
                  label="Doctor Name"
                  variant="outlined"
                  value={customerFormState.doctorName}
                  classname={classes.textField}
                  changeHandler={handleInputChange}
                />
              </div>
              <div className={classes.textFieldBar}>
                <MTextFieldComponent
                  required={true}
                  id="quantity"
                  name="quantity"
                  type="number"
                  label="Quantity (In Numbers)"
                  variant="outlined"
                  disabled={true}
                  value={customerFormState.quantity}
                  classname={classes.textField}
                  changeHandler={handleInputChange}
                />
              </div>
              <div className={classes.textFieldBar}>
                <MTextFieldComponent
                  required={true}
                  id="amountPaid"
                  name="amountPaid"
                  type="number"
                  label="Amount Paid (In Rupees)"
                  variant="outlined"
                  value={customerFormState.amountPaid}
                  classname={classes.textField}
                  changeHandler={handleInputChange}
                />
              </div>
            </div>
          </>
        </MFormDialogComponent>
      )}
      {dialogStatus.dialogId == "saleStatus" && dialogStatus.openConfirmDialog && (
        <MConfirmationDialogComponent
          title={dialogStatus.dialogTitle}
          isOpen={dialogStatus.openConfirmDialog}
          dialogId="medicineSaleStatusConfrimationDialog"
          footerButtons={populateConfirmDialogFooter()}
        >
          <MTypographyComponent
            text={`Are you sure, you want to update medicine status as ${
              catalogState.saleStatus == "2" ? "Expired" : "Damaged"
            } ? You will no longer allow to make any updates.`}
            variant="caption"
          />
        </MConfirmationDialogComponent>
      )}
    </Paper>
  );
};

export default MedicineCatalogComponent;
