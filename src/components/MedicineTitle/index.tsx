import React from "react";
import MTooltipComponent from "../../generic/MTooltip";
import { getMedicineURL } from "../../utils/helpers";
import MedicineQrCodeModalComponent from "../MedicineQrCodeModal";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import MedicineTrackerComponent from "../MedicineTracker";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medNameSection: {
      display: "flex",
      width: "100%",
    },
    nameDiv: {
      width: "66%",
      "& span": {
        verticalAlign: "sub",
      },
    },
    moreDetails: {
      width: "17%",
    },
    showMoreIcon: {
      paddingLeft: 5,
      margin: 0,
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.2)",
        transition: "all 0.3s",
      },
    },
    qrCodeDiv: {
      width: "17%",
    },
  })
);

const MedicineTitleComponent = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.medNameSection}>
      <div className={classes.nameDiv}>
        <MTooltipComponent title={props.row.medicineName} placement="top">
          <span>{props.row.medicineName}</span>
        </MTooltipComponent>
      </div>
      <div className={classes.moreDetails}>
        <MedicineTrackerComponent data={props.row} />
      </div>
      <div className={classes.qrCodeDiv}>
        <MedicineQrCodeModalComponent
          data={getMedicineURL(props.row.medicineId)}
          mouseOverEvent={() => props.handleQRCodeEvent(props.row)}
          dialogTitle={props.dialogStatus.dialogTitle}
          dialogId={props.dialogStatus.dialogId}
          uui={props.row.medicineId}
          isOpen={props.dialogStatus.openFormDialog}
          closeDialog={props.closeDialog}
        />
      </div>
    </div>
  );
};

export default React.memo(MedicineTitleComponent);
