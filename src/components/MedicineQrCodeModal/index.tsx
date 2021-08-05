import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import CenterFocusWeakOutlinedIcon from "@material-ui/icons/CenterFocusWeakOutlined";
import QRCode from "react-qr-code";
import MFormDialogComponent from "../../generic/MFormDialog";
import MButtonComponent from "../../generic/MButton";
import MTooltipComponent from "../../generic/MTooltip";

type MedicineQrCodeProps = {
  data: any;
  clickEvent?: any;
  mouseOverEvent?: any;
  dialogTitle?: string | any;
  dialogId?: string | any;
  isOpen?: true | false;
  closeDialog: any;
  uui?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qrCodeIcon: {
      paddingLeft: 5,
      margin: 0,
      cursor: "zoom-in",
      "&:hover": {
        transform: "scale(1.2)",
        transition: "all 0.3s",
      },
    },
    qrCodeDisplay: {
      textAlign: "center",
      padding: 8,
    },
  })
);

const MedicineQrCodeModalComponent = ({
  data,
  clickEvent,
  mouseOverEvent,
  dialogTitle,
  dialogId,
  isOpen = false,
  closeDialog,
  uui,
}: MedicineQrCodeProps) => {
  const classes = useStyles();
  return (
    <>
      <>
        <MTooltipComponent title="Get QR Code" placement="top">
          <p className={classes.qrCodeIcon}>
            <CenterFocusWeakOutlinedIcon onClick={mouseOverEvent} />
          </p>
        </MTooltipComponent>
      </>
      {dialogId == uui && (
        <MFormDialogComponent
          title={dialogTitle}
          open={isOpen}
          dialogId={dialogId}
          fullWidth={true}
          maxWidth="sm"
          footerButtons={
            <MButtonComponent
              variant="outlined"
              label="Close"
              color="secondary"
              clickHandler={closeDialog}
            />
          }
        >
          <div className={classes.qrCodeDisplay}>
            <QRCode value={data} />
          </div>
        </MFormDialogComponent>
      )}
    </>
  );
};

export default MedicineQrCodeModalComponent;
