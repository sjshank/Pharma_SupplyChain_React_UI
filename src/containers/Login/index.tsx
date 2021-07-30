import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { APP_TITLE, APP_DESC } from "../../utils/constants";
import LoginFormComponent from "./LoginForm";
import MTypographyComponent from "../../generic/MTypography";
import LandingPageLayout from "../../layout/LandingPage";
import { LoginContextProvider } from "../../context/LoginContext";

type LoginProps = {};

const LoginComponent = () => {
  return (
    <LandingPageLayout>
      <LoginContextProvider>
        <LoginFormComponent />
      </LoginContextProvider>
    </LandingPageLayout>
  );
};

export default LoginComponent;
