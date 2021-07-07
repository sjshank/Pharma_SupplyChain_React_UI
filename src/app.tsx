import React from "react";
import AppRoute from "./routes";
import { Web3ContextProvider } from "./context/Web3Context";
import "./app.css";
import { UserInfoContextProvider } from "./context/UserContext";
import { SpinnerContextProvider } from "./context/SpinnerContext";
import { ToastProvider } from "react-toast-notifications";
import { TOAST_OPTIONS } from "./utils/constants";

const App = () => {
  const appRoute = AppRoute();
  return (
    <Web3ContextProvider>
      <SpinnerContextProvider>
        <ToastProvider {...TOAST_OPTIONS}>
          <UserInfoContextProvider>{appRoute}</UserInfoContextProvider>
        </ToastProvider>
      </SpinnerContextProvider>
    </Web3ContextProvider>
  );
};

export default App;
