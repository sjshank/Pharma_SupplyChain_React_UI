import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useReducer,
  useRef,
} from "react";
import MButtonComponent from "../../generic/MButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import {
  viewReducer,
  VIEW_STATE,
  medicineDPReducer,
  MEDICINEDP_STATE,
} from "./reducer";
import MFormDialogComponent from "../../generic/MFormDialog";
import SelectMedicineComponent from "../SelectMedicine";
import { IMedicine } from "../../models/medicine.interface";
import { DistributorContext } from "../../context/DistributorContext";
import { IDistributorContext } from "../../models/distributor.interface";
import MedicineBatchSubContractDPComponent from "../MedicineBatchSubContractDP";
import MTypographyComponent from "../../generic/MTypography";
import MedicineTable from "../../generic/MedicineTable";
import { IUserInfo } from "../../models/userInfo.interface";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR,
  ROLE_BRAND,
  TRACK_UPDATES,
} from "../../utils/constants";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MTooltipComponent from "../../generic/MTooltip";
import MChipComponent from "../../generic/MChip";
import TableCell from "@material-ui/core/TableCell";

type TransferMedicineBatchDPProps = {
  userList: IUserInfo[];
  transferMedicineBatchToPharma: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    transferMedicineBtn: {
      float: "right",
      marginTop: "-40px",
      fontWeight: 600,
    },
  })
);

const TransferMedicineBatchDPComponent = ({
  userList,
  transferMedicineBatchToPharma,
}: TransferMedicineBatchDPProps) => {
  const classes = useStyles();

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const [viewState, dispatchViewStateAction] = useReducer(viewReducer, {
    ...VIEW_STATE,
  });

  const [medicineDPFormState, dispatchMedicineDPFormStateAction] = useReducer(
    medicineDPReducer,
    {
      ...MEDICINEDP_STATE,
    }
  );

  const distributorContext =
    useContext<IDistributorContext>(DistributorContext);
  const {
    medicineBatchesReceivedFromManuf,
    medicineBatchesTransferredToPharma,
  } = distributorContext;

  // const selectedMedicine = useRef<IMedicine>({} as IMedicine);

  const handleMedicineChange: MouseEventHandler = (e: any) => {
    const data: any = medicineBatchesReceivedFromManuf.find(
      (med: IMedicine) => {
        if (med.medicineId.toLowerCase() === e?.target?.value?.toLowerCase()) {
          return med;
        }
      }
    );
    // selectedMedicine.current = data;
    dispatchMedicineDPFormStateAction({
      type: "SET_MEDICINEDP_PARTIAL",
      data: data,
    });
    dispatchViewStateAction({
      type: "SUBMIT_TRANSFER_REQUEST",
      isSubmitTransferRequest: true,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IMedicine
  ) => {
    dispatchMedicineDPFormStateAction({
      type: "SET_VALUE",
      key: event.target.name,
      value: event.target.value,
    });
  };

  const toggleMedicineBatchDistributionDialog = () => {
    dispatchViewStateAction({
      type: "SELECT_MEDICINE",
      isSelectMedicine: true,
    });
    updateDialogStatus(
      true,
      false,
      "Distribute Medicine Batch To Pharmaceutical Shop",
      false,
      "medicineBatchTransfer"
    );
  };

  const closeDialog = () => {
    updateDialogStatus(false, false);
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

  const populateColumns = (row: IMedicine, classes: any): ReactNode => {
    return (
      <>
        <TableCell align="left" className={classes.tableBodyCell}>
          <MChipComponent
            label={
              MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 3
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["distributor"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.tableBodyCell}></TableCell>
      </>
    );
  };

  const populateFormDialogFooter = (): ReactNode => {
    return (
      <>
        {/* select medicine screen */}
        {viewState.isSelectMedicine && (
          <>
            <MButtonComponent
              variant="outlined"
              label="Cancel"
              color="secondary"
              clickHandler={closeDialog}
            />
          </>
        )}

        {/* show medicine details & submit transfer request */}
        {viewState.isSubmitTransferRequest && (
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
              disabled={
                !medicineDPFormState.pharma || !medicineDPFormState.shipper
                  ? true
                  : false
              }
              clickHandler={() =>
                transferMedicineBatchToPharma(medicineDPFormState)
              }
            />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <MButtonComponent
        variant="outlined"
        label="Distribute New Medicine Batch"
        classname={classes.transferMedicineBtn}
        clickHandler={toggleMedicineBatchDistributionDialog}
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${medicineBatchesTransferredToPharma.length} records`}
        style={{ color: "#29BB89", clear: "both" }}
      />
      <MedicineTable
        tableName="Medicine Batch Distribution"
        tableId="MedicineBatchDistributionTbl"
        dataList={medicineBatchesTransferredToPharma}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicinesManufactured"
        showShipperCol={true}
        showDistributorCol={true}
        getColumns={populateColumns}
        dialogStatus={dialogStatus}
        closeDialog={closeDialog}
        handleQRCodeEvent={handleQRCodeEvent}
      />
      {dialogStatus.dialogId == "medicineBatchTransfer" && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="transferMedicineFormDialog"
          footerButtons={populateFormDialogFooter()}
          fullWidth={true}
          maxWidth="sm"
        >
          <>
            {viewState.isSelectMedicine && (
              <SelectMedicineComponent
                handleMedicineChange={handleMedicineChange}
              />
            )}
            {viewState.isSubmitTransferRequest && (
              <MedicineBatchSubContractDPComponent
                medicineBatchDPState={medicineDPFormState}
                handleInputChange={handleInputChange}
                userList={userList}
              />
            )}
          </>
        </MFormDialogComponent>
      )}
    </>
  );
};

export default TransferMedicineBatchDPComponent;
