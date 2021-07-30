import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { NOT_AUTHORIZED_ERR } from "../../utils/constants";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5),
  },
  anchorLink: {
    color: "#185ADB",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const NotAuthorizedComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Alert severity="error">
        {NOT_AUTHORIZED_ERR}
        <a onClick={() => history.push("/")} className={classes.anchorLink}>
          Click Here
        </a>{" "}
        to login.
      </Alert>
    </div>
  );
};

export default NotAuthorizedComponent;
