import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
  useRef,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green, yellow } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { IMedicineDP } from "../../models/medicineDP.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import PaperHeaderComponent from "../PaperHeader";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import MTypographyComponent from "../../generic/MTypography";
import { Avatar, Fade } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import {
  MEDICINE_STATUS_OPTIONS_AT_PHARMA,
  MEDICINE_STATUS_UPDATE_BY_PHARMA,
  MEDICINE_SUB_CONTRACT_RCVD,
  MEDICINE_SUB_CONTRACT_SHIPPMENT_STATUS_LIST_AT_PHARMA,
  NO_RECORDS_FOUND,
  TRACK_UPDATES,
  VERIFY_UPDATE_HELP_TEXT_AT_PHARMA,
} from "../../utils/constants";
import MButtonComponent from "../../generic/MButton";
import MFormDialogComponent from "../../generic/MFormDialog";
import MedicineDetailsExplorerComponent from "../MedicineDetailsExplorer";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import { getMedicineURL, populateUserName } from "../../utils/helpers";
import MedicineTrackerComponent from "../MedicineTracker";
import MedicineQrCodeModalComponent from "../MedicineQrCodeModal";

type SubContractProps = {
  medicineBatchesReceivedDP: IMedicineDP[];
  userList: IUserInfo[];
  updateRecievedMedicineBatch: any;
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
      color: "#1976d2",
      fontWeight: 600,
      textDecoration: "underline",
      display: "inline-block",
      paddingLeft: "0px",
      paddingRight: "5px",
      fontSize: "16px",
    },
    atPharma: {
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

    NotFound: {
      textAlign: "center",
    },
    tileBlock: {
      // padding: "1rem",
      border: "solid 3px #1976d2",
      position: "relative",
      marginBottom: 25,
      marginTop: 8,
    },
    tileBox: {
      display: "flex",
      listStyle: "none",
      marginBlockStart: 0,
      paddingInlineStart: 0,
      marginBlockEnd: 0,
      paddingBottom: 10,
    },
    tileItem: {
      padding: "1rem",
      backgroundClip: "padding-box",
      width: "100%",
      maxWidth: "100%",
    },
    viewUpdatesItem: {
      paddingTop: "1.5rem",
      paddingLeft: "0.25rem",
      width: "11%",
      paddingRight: "0.25rem",
      color: "#444",
      maxWidth: "20%",
      backgroundClip: "padding-box",
    },
    tileArticle: {
      position: "relative",
      display: "block",
      textAlign: "left",
    },
    tileItemTitle: {
      fontSize: "1em",
      fontWeight: 400,
    },
    tileItemDetail: {
      fontSize: "1.25rem",
      lineHeight: "1.25",
      position: "relative",
    },
    tileItemDetailValue: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: 14,
      fontWeight: 600,
    },
    expandcollapseIconBar: {
      position: "absolute",
      marginTop: -38,
      textAlign: "center",
      justifyContent: "center",
      width: "100%",
    },
    medicineDetailsTxt: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      color: "#1976d2",
    },
    expandcollapseIcon: {
      fontSize: 40,
      backgroundColor: "#fff",
      border: "3px solid #1976d2",
      borderRadius: "50%",
      cursor: "pointer",
    },
    textFieldBar: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    select: {
      width: "100%",
    },
  })
);

const MedicineSubContractDPReceivedComponent = ({
  medicineBatchesReceivedDP,
  userList,
  updateRecievedMedicineBatch,
}: SubContractProps) => {
  const classes = useStyles();

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const [medicineStatus, setMedicineStatus] = useState<any>("");
  const medicineDPRef = useRef<IMedicineDP>();

  const handleInputChange = (evt: any) => {
    setMedicineStatus(evt.target.value);
  };

  const toggleVerifyUpdateDialog: any = (medicineBatchObj: IMedicineDP) => {
    medicineDPRef.current = { ...medicineBatchObj };
    setMedicineStatus("");
    updateDialogStatus(
      true,
      false,
      "Verify & Update Medicine Status",
      false,
      "medicineSubContractRcvd"
    );
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

  const populateSubContractContent = (): ReactNode => {
    return (
      <>
        {medicineBatchesReceivedDP.length === 0 && (
          <MTypographyComponent
            text={NO_RECORDS_FOUND}
            variant="body1"
            component="div"
            classname={classes.NotFound}
          />
        )}
        {medicineBatchesReceivedDP.map((row: IMedicineDP) => (
          <Fade key={row.medicineSubContract} in={true} timeout={1200}>
            <div className={classes.tileBlock}>
              <ul className={classes.tileBox}>
                <li className={classes.tileItem}>
                  <article className={classes.tileArticle}>
                    <MTypographyComponent
                      variant="h4"
                      classname={classes.tileItemTitle}
                      text="Sub Contract ID"
                    />
                    <div className={classes.tileItemDetail}>
                      <MTypographyComponent
                        variant="h6"
                        classname={classes.tileItemDetailValue}
                        component="p"
                        text={row.medicineSubContract}
                      />
                    </div>
                  </article>
                </li>
                <li className={classes.tileItem}>
                  <article className={classes.tileArticle}>
                    <MTypographyComponent
                      variant="h4"
                      classname={classes.tileItemTitle}
                      text="Sender"
                    />
                    <div className={classes.tileItemDetail}>
                      <MTypographyComponent
                        variant="h6"
                        classname={classes.tileItemDetailValue}
                        component="p"
                        text={populateUserName("5", row.distributor, userList)}
                      />
                    </div>
                  </article>
                </li>
                <li className={classes.tileItem}>
                  <article className={classes.tileArticle}>
                    <MTypographyComponent
                      variant="h4"
                      classname={classes.tileItemTitle}
                      text="Logistic Partner"
                    />
                    <div className={classes.tileItemDetail}>
                      <MTypographyComponent
                        variant="h6"
                        classname={classes.tileItemDetailValue}
                        component="p"
                        text={populateUserName("2", row.shipper, userList)}
                      />
                    </div>
                  </article>
                </li>
                <li className={classes.tileItem}>
                  <article className={classes.tileArticle}>
                    <MTypographyComponent
                      variant="h4"
                      classname={classes.tileItemTitle}
                      text="Batch Status"
                    />
                    <div className={classes.tileItemDetail}>
                      {row.packageStatus == 1 && (
                        <Avatar variant="rounded" className={classes.atPharma}>
                          <LocalShippingIcon fontSize="small" />
                          &nbsp;
                          {
                            MEDICINE_SUB_CONTRACT_SHIPPMENT_STATUS_LIST_AT_PHARMA[
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
                            MEDICINE_SUB_CONTRACT_SHIPPMENT_STATUS_LIST_AT_PHARMA[
                              row?.packageStatus
                            ]
                          }
                        </Avatar>
                      )}
                    </div>
                  </article>
                </li>
                {row.packageStatus < 2 && (
                  <li className={classes.tileItem}>
                    <article className={classes.tileArticle}>
                      <MTypographyComponent
                        variant="h4"
                        classname={classes.tileItemTitle}
                        text="Action"
                      />
                      <div className={classes.tileItemDetail}>
                        {row?.packageStatus == 1 && (
                          <>
                            <MTooltipComponent
                              title={VERIFY_UPDATE_HELP_TEXT_AT_PHARMA}
                              placement="top"
                            >
                              <span
                                onClick={() => toggleVerifyUpdateDialog(row)}
                                className={classes.actionLink}
                              >
                                <MTypographyComponent
                                  variant="button"
                                  text="Verify & Update"
                                  style={{ fontSize: "13px" }}
                                />
                              </span>
                            </MTooltipComponent>
                          </>
                        )}
                      </div>
                    </article>
                  </li>
                )}

                <li className={classes.viewUpdatesItem}>
                  <article className={classes.tileArticle}>
                    <ul style={{ display: "flex", listStyle: "none" }}>
                      <li style={{ margin: 5 }}>
                        <MedicineTrackerComponent data={row} />
                      </li>
                      <li style={{ margin: 5 }}>
                        <MedicineQrCodeModalComponent
                          data={getMedicineURL(row.medicineId)}
                          mouseOverEvent={() => handleQRCodeEvent(row)}
                          dialogTitle={dialogStatus.dialogTitle}
                          dialogId={dialogStatus.dialogId}
                          uui={row.medicineId}
                          isOpen={dialogStatus.openFormDialog}
                          closeDialog={closeDialog}
                        />
                      </li>
                    </ul>
                  </article>
                </li>
              </ul>
              <MedicineDetailsExplorerComponent
                medicineId={row.medicineId}
                userList={userList}
              />
            </div>
          </Fade>
        ))}
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
          label="Update"
          color="primary"
          disabled={medicineStatus == ""}
          clickHandler={() =>
            updateRecievedMedicineBatch(
              medicineDPRef.current,
              parseInt(medicineStatus)
            )
          }
        />
      </>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<EventAvailableOutlinedIcon style={{ color: "#29BB89" }} />}
        label={MEDICINE_SUB_CONTRACT_RCVD}
        textVariant="button"
      />
      {populateSubContractContent()}
      {dialogStatus.dialogId == "medicineSubContractRcvd" && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="updateMedicineStatusFormDialog"
          footerButtons={populateConfirmDialogFooter()}
          fullWidth={true}
          maxWidth="sm"
        >
          <div>
            <MTypographyComponent
              text={MEDICINE_STATUS_UPDATE_BY_PHARMA}
              variant="caption"
            />
            <div className={classes.textFieldBar}>
              <MSimpleSelectComponent
                required={true}
                id="medicineStatus"
                name="medicineStatus"
                label="Select Medicine Status"
                variant="outlined"
                selectedValue={medicineStatus}
                options={MEDICINE_STATUS_OPTIONS_AT_PHARMA}
                classname={classes.select}
                changeHandler={(e: any) => handleInputChange(e)}
                placeholder="Select Medicine Status"
              />
            </div>
          </div>
        </MFormDialogComponent>
      )}
    </Paper>
  );
};

export default MedicineSubContractDPReceivedComponent;
