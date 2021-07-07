import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { APP_TITLE, APP_DESC } from "../../utils/constants";
import LoginFormComponent from "./LoginForm";
import MTypographyComponent from "../../generic/MTypography";
import LandingPageLayout from "../../layout/LandingPage";

type LoginProps = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#C68B59",
  },
  heroSectionImage: {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    minHeight: "500px",
    filter: "brightness(0.3)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "10px 10px 5px #cccccc6b",
  },
  heroSectionTxt: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    color: "white",
    border: "3px solid #f1f1f1",
    borderRadius: "5px",
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    width: "80%",
    padding: "10px",
    textAlign: "center",
    opacity: 1.5,
    filter: "brightness(1.5)",
    zoom: 1.1,
  },
}));

const LoginComponent = () => {
  const classes = useStyles();
  return (
    <LandingPageLayout>
      <div className="heroSection">
        <img
          className={classes.heroSectionImage}
          src="https://miro.medium.com/max/1400/1*vJZ8NGeVzSvfopBIPW2tTQ.png"
          alt="Hero Section"
        />
        <div className={classes.heroSectionTxt}>
          <MTypographyComponent
            variant="h4"
            component="h4"
            text={APP_TITLE}
            gutterBottom={true}
          />
          <MTypographyComponent
            variant="caption"
            text={APP_DESC}
            gutterBottom={true}
          />
        </div>
      </div>
      <LoginFormComponent />
    </LandingPageLayout>
  );
};

export default LoginComponent;
