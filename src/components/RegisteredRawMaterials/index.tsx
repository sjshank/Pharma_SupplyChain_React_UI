import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from "react";
import MBasicTableComponent from "../../generic/MBasicTable";
import PaperHeaderComponent from "../PaperHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import MButtonComponent from "../../generic/MButton";
import MFormDialogComponent from "../../generic/MFormDialog";
import RawMaterialFormComponent from "./RawMaterialForm";
import { IRawMaterial } from "../../models/material.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import {
  INITIATE_SHIPMENT_TEXT,
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER,
} from "../../utils/constants";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green, yellow } from "@material-ui/core/colors";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import { populateUserName } from "../../utils/helpers";

type RegRawMaterialProps = {
  IconComp?: React.ReactNode;
  label?: string;
  RawMaterials: Array<IRawMaterial>;
  registerNewMaterial: any;
  editRawMaterial: any;
  transportRawMaterial: any;
  userList: Array<any>;
  toggleSpinner: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "200px",
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
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
      maxWidth: "180px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    actionLinkCell: {
      fontSize: 12,
      padding: "8px",
      width: "220px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    roleChip: {
      fontSize: 12,
      width: "150px",
      span: {
        padding: "6px",
      },
    },
    addMaterialBtn: {
      float: "right",
      marginTop: "-35px",
      // color: "rgb(41, 187, 137)",
      // border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
    actionBtn: {
      cursor: "pointer",
      fontSize: "16px",
    },
    actionLink: {
      cursor: "pointer",
      color: "#04009A",
      fontWeight: 600,
      textDecoration: "underline",
      display: "inline-block",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontSize: "16px",
    },
    atProducer: {
      backgroundColor: "#444444",
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    inTransit: {
      backgroundColor: yellow[700],
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    delivered: {
      backgroundColor: green[500],
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    registerSubtitleModal: {
      paddingBottom: theme.spacing(1),
    },
  })
);

const RegisteredRawMaterialsComponent = ({
  IconComp,
  label,
  RawMaterials,
  registerNewMaterial,
  editRawMaterial,
  transportRawMaterial,
  userList,
  toggleSpinner,
}: RegRawMaterialProps) => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("registeredRawMaterials");

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const [rawMaterialFormState, setRawMaterialFormState] =
    useState<IRawMaterial>({
      producerName: "",
      description: "",
      location: "",
      quantity: 0,
      shipper: "",
      manufacturer: "",
    });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IRawMaterial
  ) => {
    setRawMaterialFormState({
      ...rawMaterialFormState,
      [event.target.name]: event.target.value,
    });
  };

  const toggleRegisterRawMaterialDialog: any = () => {
    setRawMaterialFormState({
      ...rawMaterialFormState,
      producerName: "",
      description: "",
      location: "",
      quantity: "",
      manufacturer: "",
      shipper: "",
    });
    updateDialogStatus(true, false, "Register Raw Material", false);
  };

  const toggleEditRawMaterialDialog: any = (data: IRawMaterial) => {
    setRawMaterialFormState({
      ...rawMaterialFormState,
      materialId: data.materialId,
      producerName: data.producerName,
      description: data.description,
      location: data.location,
      quantity: data.quantity,
      manufacturer: data.manufacturer,
      shipper: data.shipper,
    });
    updateDialogStatus(true, false, "Edit Raw Material", false);
  };

  const toggleTransportRawMaterialDialog: any = (data: IRawMaterial) => {
    setRawMaterialFormState({
      ...rawMaterialFormState,
      materialId: data.materialId,
      producerName: data.producerName,
      description: data.description,
      location: data.location,
      quantity: data.quantity,
      manufacturer: data.manufacturer,
      shipper: data.shipper,
    });
    updateDialogStatus(false, true, "Raw Material Shipment", false);
  };

  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const populateTableBody = () => {
    return (
      <TableBody>
        {RawMaterials.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {RawMaterials.map((row: IRawMaterial) => (
          <TableRow key={row.materialId}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.producerName} placement="top">
                <span>{row.producerName}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.description} placement="top">
                <span>{row.description}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.location}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.quantity}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.manufacturer} placement="top">
                <span style={{ color: "#FA163F", fontWeight: 600 }}>
                  {populateUserName("3", row.manufacturer, userList)}
                </span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.shipper} placement="top">
                <span style={{ color: "#444444", fontWeight: 600 }}>
                  {populateUserName("2", row.shipper, userList)}
                </span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.packageStatus == 0 && (
                <Avatar variant="rounded" className={classes.atProducer}>
                  <AttachFileOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 1 && (
                <Avatar variant="rounded" className={classes.inTransit}>
                  <LocalShippingIcon fontSize="small" />
                  &nbsp;
                  {
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 2 && (
                <Avatar variant="rounded" className={classes.delivered}>
                  <ReceiptOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row?.packageStatus == 0 && (
                <>
                  <span
                    onClick={() => toggleEditRawMaterialDialog(row)}
                    className={classes.actionLink}
                  >
                    <MTypographyComponent variant="button" text="Edit" />
                  </span>
                  |
                </>
              )}
              {row?.packageStatus == 0 && (
                <span
                  onClick={() => toggleTransportRawMaterialDialog(row)}
                  className={classes.actionLink}
                >
                  <MTypographyComponent variant="button" text="Transport" />
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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
            label="Submit"
            type="submit"
            color="primary"
            clickHandler={() => editRawMaterial(rawMaterialFormState)}
          />
        )}
      </>
    );
  };

  const populateConfirmDialogFooter = (): ReactNode => {
    return (
      <>
        <MButtonComponent
          variant="outlined"
          label="Cancel"
          clickHandler={closeDialog}
        />
        <MButtonComponent
          variant="contained"
          label="Confirm"
          color="primary"
          clickHandler={() => transportRawMaterial(rawMaterialFormState)}
        />
      </>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<EventAvailableOutlinedIcon style={{ color: "#29BB89" }} />}
        label="Registered Raw Materials"
        textVariant="button"
      />
      <MButtonComponent
        variant="outlined"
        label="Register New Raw Material"
        classname={classes.addMaterialBtn}
        clickHandler={toggleRegisterRawMaterialDialog}
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${RawMaterials.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MBasicTableComponent
        tableBody={populateTableBody()}
        tableHeader={
          <MTableHeadersComponent
            tableHeaders={tableHeaders}
            classes={classes}
          />
        }
        tableName="Registered Raw Materials"
        tableId="regRawMaterialTbl"
        height="350px"
        stickyHeader={true}
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
            text="Register your raw material."
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
      <MConfirmationDialogComponent
        title={dialogStatus.dialogTitle}
        isOpen={dialogStatus.openConfirmDialog}
        dialogId="materialFormDialog"
        footerButtons={populateConfirmDialogFooter()}
      >
        <MTypographyComponent text={INITIATE_SHIPMENT_TEXT} variant="caption" />
      </MConfirmationDialogComponent>
    </Paper>
  );
};

export default RegisteredRawMaterialsComponent;
