import React from "react";
import LoginFormComponent from "./LoginForm";
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
