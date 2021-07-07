import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
}));

const DefaultComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity="warning">OOPS !!! Page not found.</Alert>
    </div>
  );
};

export default DefaultComponent;
