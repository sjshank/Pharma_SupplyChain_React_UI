import React, { MouseEventHandler, ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

type MFormDialogProps = {
  dialogId: string;
  open: boolean;
  title: string;
  content?: ReactNode;
  closeDialog?: MouseEventHandler;
  footerButtons?: ReactNode;
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.grey[800],
    },
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
}: MFormDialogProps) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        id={dialogId}
        open={open}
        onClose={closeDialog}
        TransitionComponent={Slide}
      >
        <DialogTitle title={title} className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{footerButtons}</DialogActions>
      </Dialog>
    </div>
  );
};

export default MFormDialogComponent;
