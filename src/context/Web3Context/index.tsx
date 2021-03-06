import React, { useEffect, useReducer, useState } from "react";
import Web3Config from "../../config/web3Config";
import { IWeb3State } from "../../models/web3.interface";
import SupplyChainContract from "../../contracts/SupplyChain.json";
import { reducer } from "./reducer";

declare const window: Window &
  typeof globalThis & {
    WEB3: any;
  };

const Web3_Initial_State: IWeb3State = {
  contractInstance: undefined,
  accounts: [],
  selectedAccount: "",
  networkId: "",
  chainId: "",
  isMetaMask: false,
  contractStorageAddress: "",
  web3: null,
  contractAddress: undefined,
};

const Web3Context = React.createContext<IWeb3State>(Web3_Initial_State);

const Web3ContextProvider = (props: any) => {
  const [web3State, setWeb3State] = useState<IWeb3State>(
    () => Web3_Initial_State
  );
  const [web3ContextState, dispatchWeb3ContextAction] = useReducer(
    reducer,
    Web3_Initial_State
  );

  useEffect(() => {
    (async () => {
      // retrieve web3 object with active connection running on port
      const config: any = await Web3Config();
      const web3 = await config.web3Instance;
      if (window) {
        window.WEB3 = web3;
      }
      //populate all the available accounts from local running blockchain
      const _accounts = await web3.eth.getAccounts();
      //get the network id of running blockchain
      const _networkId = await web3.eth.net.getId();

      /****** SUPPLYCHAIN CONTRACT***** */

      //get deployed network based on network id for required contract
      const supplyChainDeployedNetwork =
        SupplyChainContract.networks[_networkId];
      //generate contract instance based on contract address, abi, and web2 from deployed network
      const supplychainInstance = new web3.eth.Contract(
        SupplyChainContract.abi,
        supplyChainDeployedNetwork && supplyChainDeployedNetwork.address,
        {
          handleRevert: true,
        }
      );
      const _contractStorageAddress = await web3.eth.getStorageAt(
        supplychainInstance._address
      );

      // /****** USER CONTRACT***** */

      // //get deployed network based on network id for required contract
      // const userDeployedNetwork = UserContract.networks[_networkId];
      // //generate contract instance based on contract address, abi, and web2 from deployed network
      // const userInstance = new web3.eth.Contract(
      //   UserContract.abi,
      //   userDeployedNetwork && userDeployedNetwork.address
      // );
      // // const _contractStorageAddress = await web3.eth.getStorageAt(
      // //   userInstance._address
      // // );

      // /****** SUPPLIER CONTRACT***** */

      // //get deployed network based on network id for required contract
      // const supplierDeployedNetwork = SupplierContract.networks[_networkId];
      // //generate contract instance based on contract address, abi, and web2 from deployed network
      // const supplierInstance = new web3.eth.Contract(
      //   SupplierContract.abi,
      //   supplierDeployedNetwork && supplierDeployedNetwork.address
      // );

      // /****** MANU CONTRACT***** */

      // //get deployed network based on network id for required contract
      // const manuDeployedNetwork = ManufacturerContract.networks[_networkId];
      // //generate contract instance based on contract address, abi, and web2 from deployed network
      // const manufacturerInstance = new web3.eth.Contract(
      //   ManufacturerContract.abi,
      //   manuDeployedNetwork && manuDeployedNetwork.address
      // );

      // /****** DIST CONTRACT***** */

      // //get deployed network based on network id for required contract
      // const distributorDeployedNetwork =
      //   DistributorContract.networks[_networkId];
      // //generate contract instance based on contract address, abi, and web2 from deployed network
      // const distributorInstance = new web3.eth.Contract(
      //   DistributorContract.abi,
      //   distributorDeployedNetwork && distributorDeployedNetwork.address
      // );

      // /****** PHARMA CONTRACT***** */

      // //get deployed network based on network id for required contract
      // const pharmaDeployedNetwork = PharmaContract.networks[_networkId];
      // //generate contract instance based on contract address, abi, and web2 from deployed network
      // const pharmaInstance = new web3.eth.Contract(
      //   PharmaContract.abi,
      //   pharmaDeployedNetwork && pharmaDeployedNetwork.address
      // );

      //Populate state object

      await setWeb3State({
        contractInstance: supplychainInstance,
        accounts: _accounts,
        selectedAccount: web3.currentProvider.selectedAddress,
        networkId: _networkId,
        chainId: web3.eth.getChainId(),
        isMetaMask: web3.currentProvider.isMetaMask,
        web3: web3,
        contractStorageAddress: _contractStorageAddress,
      });
    })();
  }, [web3State.selectedAccount]);

  return (
    <Web3Context.Provider value={web3State}>
      {props.children}
    </Web3Context.Provider>
  );
};

export { Web3Context, Web3ContextProvider };
