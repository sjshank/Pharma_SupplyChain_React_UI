import React from "react";
import AppRoute from "./routes";
import { Web3Context, Web3ContextProvider } from "./context/Web3Context";
import "./app.css";
import { UserInfoContextProvider } from "./context/UserContext";
import { SpinnerContextProvider } from "./context/SpinnerContext";
import { ToastProvider } from "react-toast-notifications";
import { TOAST_OPTIONS } from "./utils/constants";
import { ToastContextProvider } from "./context/ToastContext";
import { isPublicFacing } from "./utils/helpers";
import PublicRoute from "./routes/public";
import LoaderComponent from "./generic/Loader";
import ScrollUp from "./generic/ScrollUp";

const App = () => {
  const appRoute = AppRoute();
  const publicRoute = PublicRoute();

  return (
    <>
      {!isPublicFacing() && (
        <Web3ContextProvider>
          <Web3Context.Consumer>
            {(web3Context) => {
              if (
                web3Context?.contractInstance &&
                web3Context?.contractInstance?.methods &&
                web3Context?.selectedAccount
              ) {
                return (
                  <SpinnerContextProvider>
                    <ToastProvider {...TOAST_OPTIONS}>
                      <ToastContextProvider>
                        <UserInfoContextProvider>
                          {appRoute}
                        </UserInfoContextProvider>
                      </ToastContextProvider>
                    </ToastProvider>
                  </SpinnerContextProvider>
                );
              } else {
                return <LoaderComponent />;
              }
            }}
          </Web3Context.Consumer>
        </Web3ContextProvider>
      )}
      {isPublicFacing() && publicRoute}
      <ScrollUp />
    </>
  );
};

export default App;
