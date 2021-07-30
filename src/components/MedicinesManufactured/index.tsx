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
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import { IMedicine } from "../../models/medicine.interface";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green, yellow } from "@material-ui/core/colors";
import {
  MEDICINE_INITIATE_SHIPMENT_TEXT,
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
} from "../../utils/constants";
import RegisterMedicineBatchComponent from "../RegisterMedicineBatch";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";

type MedicinesManufacturedProps = {
  regMedicineBatches: IMedicine[];
  userList: IUserInfo[];
  transportMedicineBatch: any;
  updateMedicineBatch: any;
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
    addMedicineBtn: {
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
    atManufacturer: {
      backgroundColor: "#444444",
      width: "100%",
      height: "30px",
      fontWeight: 600,
      fontSize: "12px",
    },
    transfer: {
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

const MedicinesManufacturedComponent = ({
  regMedicineBatches,
  userList,
  transportMedicineBatch,
  updateMedicineBatch,
}: MedicinesManufacturedProps) => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("medicinesManufactured");

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

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

  const toggleTransportMedicineBatchDialog: any = (
    medicineBatchObj: IMedicine
  ) => {
    setMedicineBatchFormState(medicineBatchObj);
    updateDialogStatus(
      false,
      true,
      "Medicine Batch Shipment",
      false,
      "medicineManufactured"
    );
  };

  const toggleEditMedicineDialog: any = (medicineBatchObj: IMedicine) => {
    setMedicineBatchFormState(medicineBatchObj);
    updateDialogStatus(
      true,
      false,
      "Edit Medicine Batch",
      false,
      "medicineManufactured"
    );
  };

  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const populateTableBody = () => {
    const populateUserName = (_role: string, _address: string) => {
      const userDetails = userList.find((usr: IUserInfo) => {
        if (
          !usr.isDeleted &&
          usr.userStatus === "Active" &&
          usr.userRole === _role &&
          usr.userAddress === _address
        ) {
          return usr;
        }
      });
      return userDetails?.userName;
    };

    return (
      <TableBody>
        {regMedicineBatches.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {regMedicineBatches.map((row: IMedicine) => (
          <TableRow key={row.medicineId}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.medicineName} placement="top">
                <span>{row.medicineName}</span>
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
              <MTooltipComponent title={row.distributor} placement="top">
                <span style={{ color: "#17B978", fontWeight: 600 }}>
                  {populateUserName("5", row.distributor)}
                </span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.shipper} placement="top">
                <span style={{ color: "#444444", fontWeight: 600 }}>
                  {populateUserName("2", row.shipper)}
                </span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.packageStatus == 0 && (
                <Avatar variant="rounded" className={classes.atManufacturer}>
                  <AttachFileOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 1 && (
                <Avatar variant="rounded" className={classes.transfer}>
                  <LocalShippingIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 2 && (
                <Avatar variant="rounded" className={classes.transfer}>
                  <TransferWithinAStationIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 3 && (
                <Avatar variant="rounded" className={classes.transfer}>
                  <TransferWithinAStationIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 4 && (
                <Avatar variant="rounded" className={classes.delivered}>
                  <ReceiptOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
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
                    onClick={() => toggleEditMedicineDialog(row)}
                    className={classes.actionLink}
                  >
                    <MTypographyComponent variant="button" text="Edit" />
                  </span>
                  |
                </>
              )}
              {row?.packageStatus == 0 && (
                <span
                  onClick={() => toggleTransportMedicineBatchDialog(row)}
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
          label="Cancel"
          color="secondary"
          clickHandler={closeDialog}
        />
        <MButtonComponent
          variant="contained"
          label="Update"
          color="primary"
          clickHandler={() => updateMedicineBatch(medicineBatchFormState)}
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
          clickHandler={() => transportMedicineBatch(medicineBatchFormState)}
        />
      </>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<EventAvailableOutlinedIcon style={{ color: "#29BB89" }} />}
        label="Medicines Manufactured"
        textVariant="button"
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${regMedicineBatches.length} records`}
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
        tableName="Medicines Manufactured"
        tableId="medicinesManufacturedTbl"
        height="350px"
        stickyHeader={true}
      />
      {dialogStatus.dialogId == "medicineManufactured" && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="editMedicineFormDialog"
          footerButtons={populateFormDialogFooter()}
          fullWidth={true}
          maxWidth="sm"
        >
          <>
            <div>
              <MTypographyComponent
                text="Edit your medicine batch details"
                variant="caption"
              />
            </div>
            <RegisterMedicineBatchComponent
              userList={userList}
              medicineBatchFormState={medicineBatchFormState}
              handleInputChange={handleInputChange}
              isEditMode={false}
            />
          </>
        </MFormDialogComponent>
      )}
      {dialogStatus.dialogId == "medicineManufactured" && (
        <MConfirmationDialogComponent
          title={dialogStatus.dialogTitle}
          isOpen={dialogStatus.openConfirmDialog}
          dialogId="medicineConfrimationDialog"
          footerButtons={populateConfirmDialogFooter()}
        >
          <MTypographyComponent
            text={MEDICINE_INITIATE_SHIPMENT_TEXT}
            variant="caption"
          />
        </MConfirmationDialogComponent>
      )}
    </Paper>
  );
};

export default MedicinesManufacturedComponent;
