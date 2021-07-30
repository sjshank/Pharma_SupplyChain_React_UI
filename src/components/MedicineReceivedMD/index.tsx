import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from "react";
import { IUserInfo } from "../../models/userInfo.interface";
import { IMedicine } from "../../models/medicine.interface";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green, yellow } from "@material-ui/core/colors";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../../generic/MTooltip";
import MBasicTableComponent from "../../generic/MBasicTable";
import PaperHeaderComponent from "../PaperHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR,
  ROLE_BRAND,
  VERIFY_PROCEED_HELP_TEXT_AT_DIST,
} from "../../utils/constants";
import MTypographyComponent from "../../generic/MTypography";
import MFormDialogComponent from "../../generic/MFormDialog";
import MButtonComponent from "../../generic/MButton";
import MedicineBatchVerificationComponent from "../MedicineBatchVerification";
import MedicineBatchSubContractDPComponent from "../MedicineBatchSubContractDP";
import { IMedicineDP } from "../../models/medicineDP.interface";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import { populateUserName } from "../../utils/helpers";

type MedicineReceivedFromManuProps = {
  medicinesReceivedFromManuf: IMedicine[];
  userList: IUserInfo[];
  transferMedicineBatchToPharma?: any;
  title?: string;
  isReadonly?: boolean;
  medicineTableHeaders?: any;
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
    atDistributor: {
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

const MedicineReceivedMDComponent = ({
  medicinesReceivedFromManuf,
  userList,
  transferMedicineBatchToPharma,
  title = "Medicine Batches",
  isReadonly = false,
  medicineTableHeaders = undefined,
}: MedicineReceivedFromManuProps) => {
  const classes = useStyles();
  let tableHeaders = useTableHeaders("medicineBatchesReceived");
  if (medicineTableHeaders) {
    tableHeaders = medicineTableHeaders;
  }

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const [createMedicineSubContractView, setCreateMedicineSubContractView] =
    useState<boolean>(false);

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

  const [medicineBatchDPState, setMedicineBatchDPState] = useState<IMedicineDP>(
    {
      medicineId: "",
      materialId: "",
      medicineSubContract: "",
      medicineName: "",
      quantity: 0,
      distributor: "",
      shipper: "",
      pharma: "",
      packageStatus: "",
    }
  );

  const handleMedicineDPFormInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IMedicine
  ) => {
    setMedicineBatchDPState({
      ...medicineBatchDPState,
      [event.target.name]: event.target.value,
    });
  };

  const toggleVerifyAndProceedDialog: any = (medicineBatchObj: IMedicine) => {
    setCreateMedicineSubContractView(false);
    const _selectedMedicineBatchObj: IMedicine = { ...medicineBatchObj };
    setMedicineBatchFormState(_selectedMedicineBatchObj);
    setMedicineBatchDPState({
      ...medicineBatchDPState,
      medicineId: _selectedMedicineBatchObj.medicineId,
      medicineName: _selectedMedicineBatchObj.medicineName,
      quantity: _selectedMedicineBatchObj.quantity,
      distributor: _selectedMedicineBatchObj.distributor,
    });
    updateDialogStatus(true, false, "Verify & Proceed", false, "medicineRecvd");
  };

  const goBackToVerificationModel: any = () => {
    setCreateMedicineSubContractView(false);
    updateDialogStatus(true, false, "Verify & Proceed", false, "medicineRecvd");
  };

  const closeDialog: MouseEventHandler = () => {
    setCreateMedicineSubContractView(false);
    updateDialogStatus(false, false);
  };

  const proceedWithMedicineSubContractCreation: any = () => {
    setCreateMedicineSubContractView(true);
    updateDialogStatus(
      true,
      false,
      "Initiate & Transfer Medicine Batch",
      false,
      "medicineRecvd"
    );
  };

  const populateTableBody = (): ReactNode => {
    return (
      <TableBody>
        {medicinesReceivedFromManuf.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {medicinesReceivedFromManuf.map((row: IMedicine) => (
          <TableRow key={row.medicineId}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.medicineName} placement="top">
                <span>{row.medicineName}</span>
              </MTooltipComponent>
            </TableCell>
            {!isReadonly && (
              <TableCell align="left" className={classes.tableBodyCell}>
                <MTooltipComponent title={row.description} placement="top">
                  <span>{row.description}</span>
                </MTooltipComponent>
              </TableCell>
            )}
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.location}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.quantity}
            </TableCell>
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
            {isReadonly && (
              <TableCell align="left" className={classes.tableBodyCell}>
                <MTooltipComponent title={row.distributor} placement="top">
                  <span
                    style={{
                      color: ROLE_BRAND["distributor"]["bgColor"],
                      fontWeight: 600,
                    }}
                  >
                    {populateUserName("5", row.distributor, userList)}
                  </span>
                </MTooltipComponent>
              </TableCell>
            )}
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.shipper} placement="top">
                <span style={{ color: "#444444", fontWeight: 600 }}>
                  {populateUserName("2", row.shipper, userList)}
                </span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.packageStatus == 0 && (
                <Avatar variant="rounded" className={classes.atDistributor}>
                  <AttachFileOutlinedIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 1 && (
                <Avatar variant="rounded" className={classes.atDistributor}>
                  <LocalShippingIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
              {row.packageStatus == 3 && (
                <Avatar variant="rounded" className={classes.inTransit}>
                  <TransferWithinAStationIcon fontSize="small" />
                  &nbsp;
                  {
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
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
                    MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
                      row?.packageStatus
                    ]
                  }
                </Avatar>
              )}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {!isReadonly && (
                <>
                  {row.packageStatus < 3 && (
                    <MTooltipComponent
                      title={VERIFY_PROCEED_HELP_TEXT_AT_DIST}
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
    if (!createMedicineSubContractView) {
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
            clickHandler={proceedWithMedicineSubContractCreation}
          />
        </>
      );
    } else {
    }
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
          label="Transfer"
          color="primary"
          clickHandler={() =>
            transferMedicineBatchToPharma(medicineBatchDPState)
          }
        />
      </>
    );
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
        text={`Showing ${medicinesReceivedFromManuf.length} records`}
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
        tableName="Medicines Received From Manu"
        tableId="MedicinesReceivedFromManuTbl"
        height="350px"
        stickyHeader={true}
      />
      {dialogStatus.dialogId == "medicineRecvd" && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="verifyRcvdMedicineBatchDialog"
          fullWidth={true}
          maxWidth="sm"
          footerButtons={populateVerifyAndProceedDialogFooter()}
        >
          {!createMedicineSubContractView && (
            <MedicineBatchVerificationComponent
              medicineBatchFormState={medicineBatchFormState}
              userList={userList}
              proceedWithMedicineSubContractCreation={
                proceedWithMedicineSubContractCreation
              }
            />
          )}
          {createMedicineSubContractView && (
            <>
              <div className={classes.verifyModal}>
                <MTypographyComponent
                  text="Create medicine batch sub contract & transfer requested amount of medicines to pharmaceutical shop."
                  variant="caption"
                />
              </div>
              <MedicineBatchSubContractDPComponent
                handleInputChange={handleMedicineDPFormInputChange}
                medicineBatchDPState={medicineBatchDPState}
                userList={userList}
              />
            </>
          )}
        </MFormDialogComponent>
      )}
    </Paper>
  );
};

export default MedicineReceivedMDComponent;
