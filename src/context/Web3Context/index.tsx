import React, { useEffect, useReducer, useState } from "react";
import Web3Config from "../../config/web3Config";
import { IWeb3State } from "./web3.interface";
import SupplyChain from "../../contracts/SupplyChain.json";
import { reducer } from "./reducer";

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
      //populate all the available accounts from local running blockchain
      const _accounts = await web3.eth.getAccounts();
      //get the network id of running blockchain
      const _networkId = await web3.eth.net.getId();
      //get deployed network based on network id for required contract
      const deployedNetwork = SupplyChain.networks[_networkId];
      //generate contract instance based on contract address, abi, and web2 from deployed network
      const instance = new web3.eth.Contract(
        SupplyChain.abi,
        deployedNetwork && deployedNetwork.address
      );
      const _contractStorageAddress = await web3.eth.getStorageAt(
        instance._address
      );
      //Populate state object

      await setWeb3State({
        contractInstance: instance,
        accounts: _accounts,
        selectedAccount: web3.currentProvider.selectedAddress,
        networkId: _networkId,
        chainId: web3.eth.getChainId(),
        isMetaMask: web3.currentProvider.isMetaMask,
        web3: web3,
        contractStorageAddress: _contractStorageAddress,
        contractAddress: instance._address,
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
