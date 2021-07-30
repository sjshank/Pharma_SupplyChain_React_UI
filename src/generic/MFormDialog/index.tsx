import React, { MouseEventHandler, ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MSpinnerComponent from "../MSpinner";

type MFormDialogProps = {
  dialogId: string;
  open: boolean;
  title: string;
  content?: ReactNode;
  closeDialog?: MouseEventHandler;
  footerButtons?: ReactNode;
  children: ReactNode;
  scroll?: "paper" | "body" | undefined;
  fullWidth?: boolean;
  maxWidth?: "xs" | "xl" | "sm" | "md" | "lg";
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.grey[800],
      borderBottom:"2px solid rgba(0, 0, 0, 0.54)"
    },
    content:{
      // textAlign: "center",
    },
    footer:{
      borderTop:"2px solid rgba(0, 0, 0, 0.54)"
    }
  })
);

const MFormDialogComponent = ({
  dialogId,
  open = false,
  title,
  content,
  closeDialog,
  footerButtons,
  children,
  scroll,
  maxWidth,
  fullWidth,
}: MFormDialogProps) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        id={dialogId}
        open={open}
        scroll={scroll}
        onClose={closeDialog}
        TransitionComponent={Slide}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <MSpinnerComponent />
        <DialogTitle title={title} className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.content}>{children}</DialogContent>
        <DialogActions className={classes.footer}>{footerButtons}</DialogActions>
      </Dialog>
    </div>
  );
};

export default MFormDialogComponent;
