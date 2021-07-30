import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import { useContext } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const MSpinnerComponent = (props: any) => {
  const classes = useStyles();
  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { show } = spinnerContext;
  return (
    <Backdrop
      className={classes.backdrop}
      open={props?.open ? props.open : show}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default MSpinnerComponent;
