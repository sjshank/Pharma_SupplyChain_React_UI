import React, { ReactNode, useContext, useState } from "react";
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
import { IRawMaterial } from "../../models/material.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import {
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  ROLE_BRAND,
  VERIFY_PROCEED_HELP_TEXT,
} from "../../utils/constants";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import RawMaterialVerificationComponent from "../RawMaterialVerification";
import { IMedicine } from "../../models/medicine.interface";
import RegisterMedicineBatchComponent from "../RegisterMedicineBatch";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { populateUserName } from "../../utils/helpers";

type RawMaterialShippedProps = {
  rawMaterialsReceived: Array<IRawMaterial>;
  userList: Array<IUserInfo>;
  userInfo: IUserInfo;
  createNewMedicineBatch?: any;
  isReadonly?: boolean;
  title?: string;
  materialTableHeaders?: any;
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
      color: "rgb(41, 187, 137)",
      border: "1px solid rgb(41, 187, 137)",
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
    atManufacturer: {
      backgroundColor: "#444444",
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    accepted: {
      backgroundColor: green[500],
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    verifyModal: {
      paddingBottom: theme.spacing(2),
    },
    verifyFooterModalBtn: {
      textAlign: "center",
    },
    verifyModalRejectBtn: {
      margin: theme.spacing(2),
    },
  })
);

const RawMaterialsReceivedComponent = ({
  rawMaterialsReceived,
  userList,
  userInfo,
  createNewMedicineBatch,
  isReadonly,
  title = "Raw Materials Received",
  materialTableHeaders = undefined,
}: RawMaterialShippedProps) => {
  const classes = useStyles();
  let tableHeaders = useTableHeaders("receivedRawMaterials");
  if (materialTableHeaders) {
    tableHeaders = materialTableHeaders;
  }

  const [rawMaterialFormState, setRawMaterialFormState] =
    useState<IRawMaterial>({
      producerName: "",
      description: "",
      location: "",
      quantity: 0,
      shipper: "",
      manufacturer: "",
    });
  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus, updateDialogTitle } = dialogContext;

  const [createMedicineView, setCreateMedicineView] = useState<boolean>(false);
  const [medicineBatchFormState, setMedicineBatchFormState] =
    useState<IMedicine>({
      medicineId: "",
      materialId: "",
      medicineName: "",
      description: "",
      location: "",
      quantity: 0,
      shipper: "",
      manufacturer: "",
      distributor: "",
      packageStatus: "",
    });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IMedicine
  ) => {
    setMedicineBatchFormState({
      ...medicineBatchFormState,
      [event.target.name]: event.target.value,
    });
  };

  const toggleVerifyAndProceedDialog = (rawMaterialObj: IRawMaterial) => {
    const _selectedRawMaterial = { ...rawMaterialObj };
    _selectedRawMaterial["manufacturer"] = userInfo.userAddress;
    setRawMaterialFormState(_selectedRawMaterial);
    setMedicineBatchFormState({
      ...medicineBatchFormState,
      materialId: _selectedRawMaterial.materialId,
    });
    setCreateMedicineView(false);
    updateDialogStatus(true, false, "Verify & Proceed", false, "materialRecvd");
  };

  const proceedWithMedicineBatchCreation = () => {
    setCreateMedicineView(true);
    updateDialogTitle("Register Medicine Batch");
  };

  const goBackToVerificationModel = () => {
    setCreateMedicineView(false);
    updateDialogTitle("Verify & Proceed");
  };

  const closeDialog = () => {
    setCreateMedicineView(false);
    updateDialogStatus(false, false);
  };

  const populateTableBody = () => {
    return (
      <TableBody>
        {rawMaterialsReceived.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {rawMaterialsReceived.map((row: IRawMaterial) => (
          <TableRow key={row.materialId}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.producerName} placement="top">
                <span>{row.producerName}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.location}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.quantity}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.supplier} placement="top">
                <span
                  style={{
                    color: ROLE_BRAND["supplier"]["bgColor"],
                    fontWeight: 600,
                  }}
                >
                  {populateUserName("1", row.supplier, userList)}
                </span>
              </MTooltipComponent>
            </TableCell>
            {isReadonly && (
              <TableCell align="left" className={classes.tableBodyCell}>
                <MTooltipComponent title={row.manufacturer} placement="top">
                  <span
                    style={{
                      color: ROLE_BRAND["manufacturer"]["bgColor"],
                      fontWeight: 600,
                    }}
                  >
                    {populateUserName("3", row.manufacturer, userList)}
                  </span>
                </MTooltipComponent>
              </TableCell>
            )}
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.shipper} placement="top">
                <span
                  style={{
                    color: ROLE_BRAND["transporter"]["bgColor"],
                    fontWeight: 600,
                  }}
                >
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
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 1 && (
                <Avatar variant="rounded" className={classes.atManufacturer}>
                  <LocalShippingIcon fontSize="small" />
                  &nbsp;
                  {
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 2 && (
                <Avatar variant="rounded" className={classes.accepted}>
                  <ReceiptOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {!isReadonly && (
                <>
                  {row.packageStatus != 2 && (
                    <MTooltipComponent
                      title={VERIFY_PROCEED_HELP_TEXT}
                      placement="top"
                    >
                      <span
                        onClick={() => toggleVerifyAndProceedDialog(row)}
                        className={classes.actionLink}
                      >
                        <MTypographyComponent
                          variant="button"
                          text="Verify & Proceed"
                        />
                      </span>
                    </MTooltipComponent>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const populateVerifyAndProceedDialogFooter = (): ReactNode => {
    if (!createMedicineView) {
      return (
        <>
          <MButtonComponent
            variant="outlined"
            label="Close"
            color="secondary"
            clickHandler={closeDialog}
          />
          <MButtonComponent
            variant="contained"
            label="Proceed"
            color="primary"
            clickHandler={proceedWithMedicineBatchCreation}
          />
        </>
      );
    } else {
      return (
        <>
          <MButtonComponent
            variant="outlined"
            label="Back"
            color="secondary"
            clickHandler={goBackToVerificationModel}
          />
          <MButtonComponent
            variant="contained"
            label="Submit"
            color="primary"
            clickHandler={() => createNewMedicineBatch(medicineBatchFormState)}
          />
        </>
      );
    }
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<EventAvailableOutlinedIcon style={{ color: "#29BB89" }} />}
        label={title}
        textVariant="button"
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${rawMaterialsReceived.length} records`}
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
        tableName="Raw Materials Received"
        tableId="receivedRawMaterialTbl"
        height="350px"
        stickyHeader={true}
      />
      {dialogStatus.dialogId == "materialRecvd" && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="verifyRcvdRawMatarialDialog"
          fullWidth={true}
          maxWidth="sm"
          footerButtons={populateVerifyAndProceedDialogFooter()}
        >
          {!createMedicineView && (
            <RawMaterialVerificationComponent
              rawMaterialFormState={rawMaterialFormState}
              userList={userList}
            />
          )}
          {createMedicineView && (
            <>
              <div className={classes.verifyModal}>
                <MTypographyComponent
                  text="Register your manufactured medicine batch."
                  variant="caption"
                />
              </div>
              <RegisterMedicineBatchComponent
                userList={userList}
                medicineBatchFormState={medicineBatchFormState}
                handleInputChange={handleInputChange}
              />
            </>
          )}
        </MFormDialogComponent>
      )}
    </Paper>
  );
};

export default RawMaterialsReceivedComponent;
