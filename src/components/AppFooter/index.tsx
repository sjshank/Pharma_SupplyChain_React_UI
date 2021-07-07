import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./style.module.less";

type AppFooterProps = {
  footerText: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(1.5),
    boxShadow: theme.shadows[4],
    borderTop: "2px solid #053742",
    display: "flex",
    justifyContent: "center",
  },
}));

const AppFooterComponent = ({ footerText }: AppFooterProps) => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <small>{footerText}</small>
    </footer>
  );
};

export default AppFooterComponent;
