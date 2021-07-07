import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MButtonComponent from "../../generic/MButton";
import { useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import { UserInfoContext } from "../../context/UserContext";
import { IUserInfoContext } from "../../context/UserContext/userInfo.interface";

type AppHeaderProps = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#053742",
  },
  toolBar: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  title: {
    flexGrow: 1,
    color: "#FDFAF6",
    fontWeight: 400,
  },
  userName: {
    paddingRight: "5px",
  },
  logOutBtn: {
    color: "#3EDBF0",
    fontSize: "12px",
    textDecoration: "underline",
    textTransform: "capitalize",
    fontFamily: "none",
  },
}));

const AppHeaderComponent = ({ title }: AppHeaderProps) => {
  const classes = useStyles();
  const history = useHistory();

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo, userInfoAction } = userInfoContext;

  const handleLogoutAction: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    userInfoAction.logout();
    setTimeout(() => {
      history.push("/");
    }, 10);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Container>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          <span className={classes.userName}>{userInfo.userName}</span>
          {userInfo.userName && userInfo.userAddress && (
            <MButtonComponent
              variant="text"
              label="LogOut"
              color="inherit"
              classname={classes.logOutBtn}
              clickHandler={handleLogoutAction}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeaderComponent;
