import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
      <small>
        {footerText}
        <a href="https://sjshank.com" target="_blank">Saurabh Shankariya</a>
      </small>
    </footer>
  );
};

export default AppFooterComponent;
