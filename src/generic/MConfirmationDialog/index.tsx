import React, { MouseEventHandler, ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { DialogContentText } from "@material-ui/core";
import MSpinnerComponent from "../MSpinner";

type MConfirmationDialogProps = {
  dialogId: string;
  isOpen: boolean;
  title: string;
  contentText?: ReactNode;
  closeDialog?: MouseEventHandler;
  footerButtons?: ReactNode;
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.grey[800],
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    },
    footer: {
      // borderTop:"1px solid rgba(0, 0, 0, 0.54)"
    },
  })
);

const MConfirmationDialogComponent = ({
  dialogId,
  isOpen = false,
  title,
  contentText,
  closeDialog,
  footerButtons,
  children,
}: MConfirmationDialogProps) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        id={dialogId}
        open={isOpen}
        onClose={closeDialog}
        TransitionComponent={Slide}
      >
        <MSpinnerComponent />
        <DialogTitle title={title} className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions className={classes.footer}>
          {footerButtons}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MConfirmationDialogComponent;
