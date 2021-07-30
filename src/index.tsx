import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import MetamaskComponent from "./generic/Metamask";
import { METAMASK_INSTALLED, METAMASK_NOT_INSTALLED } from "./utils/constants";

// This function detects most providers injected at window.ethereum
import detectEthereumProvider from "@metamask/detect-provider";

//Provider promise
const provider = detectEthereumProvider();

//check metamask plugin installed or not
provider
  .then((res: any) => {
    if (
      res &&
      res.isMetaMask !== undefined &&
      res.networkVersion !== undefined
    ) {
      // From now on, this should always be true:
      // provider === window.ethereum
      console.log(
        "%c%s",
        "color: white; background: green; font-size: 24px;font-weight:bold",
        `${METAMASK_INSTALLED}`
      );
      ReactDOM.render(<App />, document.getElementById("root")); // initialize your app
    } else {
      console.log(
        "%c%s",
        "color: white; background: red; font-size: 24px;font-weight:bold",
        `${METAMASK_NOT_INSTALLED}`
      );
      ReactDOM.render(
        <MetamaskComponent />,
        document.getElementById("metamaskError")
      ); // Notify client to install meta mask plugin
    }
  })
  .catch((e: any) => {
    console.log(
      "%c%s",
      "color: white; background: red; font-size: 24px;font-weight:bold",
      "Metamask plugin detector is not working !"
    );
  });
