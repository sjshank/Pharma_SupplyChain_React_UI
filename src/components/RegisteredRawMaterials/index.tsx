import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import TableCell from "@material-ui/core/TableCell";
import MButtonComponent from "../../generic/MButton";
import MFormDialogComponent from "../../generic/MFormDialog";
import RawMaterialFormComponent from "./RawMaterialForm";
import { IRawMaterial } from "../../models/material.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import {
  EDIT_MATERIAL,
  MATERIAL_INITIATE_QC,
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER,
  REG_NEW_MATERIAL,
  ROLE_BRAND,
} from "../../utils/constants";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import MChipComponent from "../../generic/MChip";
import { RAW_MATERIAL_STATE, reducer } from "./reducer";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MaterialTable from "../../generic/MaterialTable";

type RegRawMaterialProps = {
  RawMaterials: Array<IRawMaterial>;
  registerNewMaterial: any;
  editRawMaterial: any;
  sendRawMaterialForQualityCheck: any;
  userList: Array<any>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "200px",
    },
    tableBodyCell: {
      fontSize: 11,
      padding: "4px",
      // maxWidth: "180px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    actionLinkCell: {
      fontSize: 11,
      padding: "4px",
      // maxWidth: "250px",
      // width: "250px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    addMaterialBtn: {
      float: "right",
      marginTop: "-35px",
      fontWeight: 600,
    },
    registerSubtitleModal: {
      paddingBottom: theme.spacing(1),
    },
  })
);

const RegisteredRawMaterialsComponent = ({
  RawMaterials,
  registerNewMaterial,
  editRawMaterial,
  sendRawMaterialForQualityCheck,
  userList,
}: RegRawMaterialProps) => {
  const classes = useStyles();

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const [rawMaterialFormState, dispatchRawMaterialFormStateAction] = useReducer(
    reducer,
    { ...RAW_MATERIAL_STATE }
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IRawMaterial
  ) => {
    dispatchRawMaterialFormStateAction({
      type: "SET_VALUE",
      key: event.target.name,
      value: event.target.value,
    });
  };

  const toggleRegisterRawMaterialDialog: any = () => {
    dispatchRawMaterialFormStateAction({
      type: "RESET",
    });
    updateDialogStatus(true, false, REG_NEW_MATERIAL, false);
  };

  const toggleEditRawMaterialDialog: any = (data: IRawMaterial) => {
    dispatchRawMaterialFormStateAction({
      type: "SET_RAW_MATERIAL",
      data: data,
    });
    updateDialogStatus(true, false, EDIT_MATERIAL, true);
  };

  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const populateColumns = (row: IRawMaterial, classes: any): any => {
    return (
      <React.Fragment>
        <TableCell align="left" className={classes.tableBodyCell}>
          <MChipComponent
            label={
              MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 2
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["supplier"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus == 0 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => toggleEditRawMaterialDialog(row)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent title={EDIT_MATERIAL} placement="top">
                  <span>Edit</span>
                </MTooltipComponent>
              </Fab>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => sendRawMaterialForQualityCheck(row)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent title={MATERIAL_INITIATE_QC} placement="top">
                  <span>Quality Check</span>
                </MTooltipComponent>
              </Fab>
            </>
          )}
        </TableCell>
      </React.Fragment>
    );
  };

  const populateFormDialogFooter = (): ReactNode => {
    return (
      <>
        <MButtonComponent
          variant="outlined"
          label="Close"
          clickHandler={closeDialog}
        />
        {!dialogStatus.isEditMode && (
          <MButtonComponent
            variant="contained"
            label="Submit"
            type="submit"
            color="primary"
            clickHandler={() => registerNewMaterial(rawMaterialFormState)}
          />
        )}
        {dialogStatus.isEditMode && (
          <MButtonComponent
            variant="contained"
            label="Update"
            type="submit"
            color="primary"
            clickHandler={() => editRawMaterial(rawMaterialFormState)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <MButtonComponent
        variant="outlined"
        label="Register New Raw Material"
        classname={classes.addMaterialBtn}
        clickHandler={toggleRegisterRawMaterialDialog}
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${RawMaterials.length} records`}
        style={{ color: "#29BB89", clear: "both" }}
      />
      <MaterialTable
        tableName="Registered Raw Materials"
        tableId="regRawMaterialTbl"
        dataList={RawMaterials}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="registeredRawMaterials"
        showManufacturerCol={true}
        showShipperCol={true}
        getColumns={populateColumns}
      />
      <MFormDialogComponent
        title={dialogStatus.dialogTitle}
        open={dialogStatus.openFormDialog}
        dialogId="rawMaterialFormDialog"
        footerButtons={populateFormDialogFooter()}
        fullWidth={true}
        maxWidth="sm"
      >
        <div className={classes.registerSubtitleModal}>
          <MTypographyComponent
            text={dialogStatus.dialogTitle}
            variant="caption"
          />
        </div>
        <RawMaterialFormComponent
          handleInputChange={handleInputChange}
          rawMaterialState={rawMaterialFormState}
          isEditMode={dialogStatus.isEditMode}
          userList={userList}
        />
      </MFormDialogComponent>
    </>
  );
};

export default RegisteredRawMaterialsComponent;
