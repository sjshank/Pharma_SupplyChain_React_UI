import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MButtonComponent from "../../generic/MButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { IMedicineDP } from "../../models/medicineDP.interface";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { getMedicineURL, populateUserName } from "../../utils/helpers";
import { IUserInfo } from "../../models/userInfo.interface";
import ReportOffOutlinedIcon from "@material-ui/icons/ReportOffOutlined";
import AssignmentTurnedInOutlined from "@material-ui/icons/AssignmentTurnedInOutlined";
import MTypographyComponent from "../../generic/MTypography";
import MedicineTrackerComponent from "../MedicineTracker";
import MedicineQrCodeModalComponent from "../MedicineQrCodeModal";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import CardMedia from "@material-ui/core/CardMedia";

type MedicineCardProps = {
  userList: IUserInfo[];
  medicineDetails: IMedicineDP;
  updateMedicineSaleStatus: any;
  toggleCustomerFormDialog: any;
  handleQRCodeEvent: any;
  closeDialog: any;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      paddingTop: 0,
      paddingBottom: 0,
      "& li": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    media: {
      height: 180,
    },
    cardActions: {
      justifyContent: "center",
      textAlign: "center",
    },
  })
);

const MedicineCardComponent = ({
  userList,
  medicineDetails,
  toggleCustomerFormDialog,
  updateMedicineSaleStatus,
  handleQRCodeEvent,
  closeDialog,
}: MedicineCardProps) => {
  const classes = useStyles();
  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus } = dialogContext;

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://greenhatgk-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/GK-large-1360x500.png"
          title={medicineDetails.medicineName}
        />
        <CardContent>
          <div
            style={{
              clear: "both",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h4"
              style={{
                float: "left",
                maxWidth: "70%",
              }}
            >
              {medicineDetails.medicineName}
            </Typography>
            <Typography
              variant="h6"
              style={{
                float: "right",
                fontSize: "16px",
              }}
            >
              <>
                <AssignmentTurnedInIcon
                  fontSize="small"
                  style={{ fill: "#4caf50" }}
                />
                <span
                  style={{
                    color: "#4caf50",
                    verticalAlign: "text-bottom",
                  }}
                >
                  Verified
                </span>
              </>
            </Typography>
          </div>
          <div style={{ clear: "both" }}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                float: "left",
                maxWidth: "60%",
              }}
            >
              {medicineDetails.description}
            </Typography>
            <div style={{ float: "right", display: "flex" }}>
              <MedicineTrackerComponent data={medicineDetails} />
              <MedicineQrCodeModalComponent
                data={getMedicineURL(medicineDetails.medicineId)}
                mouseOverEvent={() => handleQRCodeEvent(medicineDetails)}
                dialogTitle={dialogStatus.dialogTitle}
                dialogId={dialogStatus.dialogId}
                uui={medicineDetails.medicineId}
                isOpen={dialogStatus.openFormDialog}
                closeDialog={closeDialog}
              />
            </div>
          </div>
        </CardContent>
        <Divider style={{ clear: "both" }} />
      </CardActionArea>
      <List className={classes.listRoot}>
        <ListItem>
          <ListItemText
            primary={medicineDetails.quantity}
            secondary="Quantity"
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            primary={populateUserName(
              "3",
              medicineDetails.manufacturer,
              userList
            )}
            secondary="Manufacturer"
          />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText
            primary={medicineDetails.location}
            secondary="Location"
          />
        </ListItem>
      </List>
      {medicineDetails.saleStatus == 0 && (
        <CardActions className={classes.cardActions}>
          <MButtonComponent
            label="Expired"
            size="small"
            variant="contained"
            clickHandler={updateMedicineSaleStatus}
          />
          <MButtonComponent
            label="Sold Out"
            size="small"
            variant="contained"
            color="primary"
            clickHandler={() => toggleCustomerFormDialog(medicineDetails)}
          />
        </CardActions>
      )}
      {medicineDetails.saleStatus == 2 && (
        <>
          <AssignmentTurnedInOutlined
            fontSize="small"
            style={{
              color: "#4AA96C",
              verticalAlign: "middle",
              marginTop: -7,
            }}
          />
          <MTypographyComponent
            variant="button"
            text="SOLD OUT"
            style={{ fontSize: 16, fontWeight: 600 }}
          />
        </>
      )}
      {medicineDetails.saleStatus == 1 && (
        <>
          <ReportOffOutlinedIcon
            fontSize="small"
            style={{
              color: "#DA0037",
              verticalAlign: "middle",
              marginTop: -7,
            }}
          />
          <MTypographyComponent
            variant="button"
            text="EXPIRED"
            style={{ fontSize: 16, fontWeight: 600 }}
          />
        </>
      )}
    </Card>
  );
};

export default MedicineCardComponent;
