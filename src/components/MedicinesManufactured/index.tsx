import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import TableCell from "@material-ui/core/TableCell";
import MButtonComponent from "../../generic/MButton";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import MChipComponent from "../../generic/MChip";
import { IMedicine } from "../../models/medicine.interface";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  ROLE_BRAND,
  TRACK_UPDATES,
} from "../../utils/constants";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import {
  materialReducer,
  medicineReducer,
  MEDICINE_STATE,
  RAW_MATERIAL_STATE,
  viewReducer,
  VIEW_STATE,
} from "./reducer";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import SelectMaterialComponent from "../SelectMaterial";
import RawMaterialVerificationComponent from "../RawMaterialVerification";
import RegisterMedicineBatchComponent from "../RegisterMedicineBatch";
import MFormDialogComponent from "../../generic/MFormDialog";
import { ManufacturerContext } from "../../context/ManufacturerContext";
import { IManufacturerContext } from "../../models/manufacturer.interface";
import { IRawMaterial } from "../../models/material.interface";
import { useRef } from "react";
import MedicineTable from "../../generic/MedicineTable";

type MedicinesManufacturedProps = {
  regMedicineBatches: IMedicine[];
  userList: IUserInfo[];
  updateMedicineBatch: any;
  sendMedicineForQualityCheck: any;
  registerNewMedicineBatch?: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addMedicineBtn: {
      float: "right",
      marginTop: "-40px",
      fontWeight: 600,
    },
  })
);

const MedicinesManufacturedComponent = ({
  regMedicineBatches,
  userList,
  updateMedicineBatch,
  sendMedicineForQualityCheck,
  registerNewMedicineBatch,
}: MedicinesManufacturedProps) => {
  const classes = useStyles();

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const manufacturerContext =
    useContext<IManufacturerContext>(ManufacturerContext);
  const { rawMaterialsReceived } = manufacturerContext;

  const [medicineBatchFormState, dispatchMedicineBatchFormStateAction] =
    useReducer(medicineReducer, {
      ...MEDICINE_STATE,
    });

  const [viewState, dispatchViewStateAction] = useReducer(viewReducer, {
    ...VIEW_STATE,
  });

  const [rawMaterialFormState, dispatchRawMaterialFormStateAction] = useReducer(
    materialReducer,
    {
      ...RAW_MATERIAL_STATE,
    }
  );

  const selectedMaterial = useRef<IRawMaterial>({} as IRawMaterial);

  const handleMaterialChange: MouseEventHandler = (e: any) => {
    const data: any = rawMaterialsReceived.find((mat: IRawMaterial) => {
      if (mat.materialId.toLowerCase() === e?.target?.value?.toLowerCase()) {
        return mat;
      }
    });
    selectedMaterial.current = data;
    dispatchRawMaterialFormStateAction({
      type: "SET_RAW_MATERIAL",
      data: data,
    });
    dispatchViewStateAction({
      type: "SHOW_MATERIAL_DETAILS",
      showMaterialDetails: true,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IMedicine
  ) => {
    dispatchMedicineBatchFormStateAction({
      type: "SET_VALUE",
      key: event.target.name,
      value: event.target.value,
    });
  };

  const toggleRegisterMedicineBatchDialog = () => {
    dispatchViewStateAction({
      type: "SELECT_MATERIAL",
      isSelectMaterial: true,
    });
    updateDialogStatus(
      true,
      false,
      "Register Medicine Batch",
      false,
      "medicineBatchRegistration"
    );
  };

  const toggleEditMedicineDialog: any = (medicineBatchObj: IMedicine) => {
    dispatchMedicineBatchFormStateAction({
      type: "SET_MEDICINE",
      data: medicineBatchObj,
    });
    dispatchViewStateAction({
      type: "EDIT_MEDICINE_DETAILS",
      isEditMedicine: true,
    });
    updateDialogStatus(
      true,
      false,
      "Edit Medicine Batch",
      false,
      "medicineManufactured"
    );
  };

  const proceedWithMedicineRegistration: any = () => {
    dispatchViewStateAction({
      type: "SUBMIT_MEDICINE_DETAILS",
      isSubmitMedicineDetails: true,
    });
  };

  const closeDialog: MouseEventHandler = () => {
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
              MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 2 || row?.packageStatus == 6
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["manufacturer"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.tableBodyCell}>
          {row?.packageStatus == 0 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => toggleEditMedicineDialog(row)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Edit medicine details"
                  placement="top"
                >
                  <span>Edit</span>
                </MTooltipComponent>
              </Fab>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => sendMedicineForQualityCheck(row)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Send medicine batch for quality control inspection"
                  placement="top"
                >
                  <span>Quality Check</span>
                </MTooltipComponent>
              </Fab>
            </>
          )}
        </TableCell>
      </>
    );
  };

  const populateFormDialogFooter = (): ReactNode => {
    return (
      <>
        {/* select material screen */}
        {viewState.isSelectMaterial && (
          <>
            <MButtonComponent
              variant="outlined"
              label="Cancel"
              color="secondary"
              clickHandler={closeDialog}
            />
          </>
        )}

        {/* show material details screen */}
        {viewState.showMaterialDetails && (
          <>
            <MButtonComponent
              variant="outlined"
              label="Cancel"
              color="secondary"
              clickHandler={closeDialog}
            />
            <MButtonComponent
              variant="contained"
              label="Next"
              color="primary"
              clickHandler={() => proceedWithMedicineRegistration()}
            />
          </>
        )}

        {/* register new medicine screen */}
        {viewState.isSubmitMedicineDetails && (
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
              clickHandler={() =>
                registerNewMedicineBatch(
                  medicineBatchFormState,
                  selectedMaterial.current
                )
              }
            />
          </>
        )}

        {/* register new medicine screen */}
        {viewState.isEditMedicine && (
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
              clickHandler={() => updateMedicineBatch(medicineBatchFormState)}
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
        label="Register New Medicine Batch"
        classname={classes.addMedicineBtn}
        clickHandler={toggleRegisterMedicineBatchDialog}
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${regMedicineBatches.length} records`}
        style={{ color: "#29BB89", clear: "both" }}
      />
      <MedicineTable
        tableName="Medicines Manufactured"
        tableId="medicinesManufacturedTbl"
        dataList={regMedicineBatches}
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
      {(dialogStatus.dialogId == "medicineManufactured" ||
        dialogStatus.dialogId == "medicineBatchRegistration") && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="editMedicineFormDialog"
          footerButtons={populateFormDialogFooter()}
          fullWidth={true}
          maxWidth="sm"
        >
          <>
            {viewState.isSelectMaterial && (
              <SelectMaterialComponent
                handleMaterialChange={handleMaterialChange}
              />
            )}
            {viewState.showMaterialDetails && (
              <RawMaterialVerificationComponent
                rawMaterialFormState={rawMaterialFormState}
                userList={userList}
                isFormDisabled={true}
              />
            )}
            {(viewState.isSubmitMedicineDetails ||
              viewState.isEditMedicine) && (
              <RegisterMedicineBatchComponent
                userList={userList}
                medicineBatchFormState={medicineBatchFormState}
                handleInputChange={handleInputChange}
                isEditMode={false}
              />
            )}
          </>
        </MFormDialogComponent>
      )}
    </>
  );
};

export default MedicinesManufacturedComponent;
