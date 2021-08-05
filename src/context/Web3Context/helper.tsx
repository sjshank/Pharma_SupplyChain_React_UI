import { IWeb3State } from "../../models/web3.interface";
import Web3Config from "../../config/web3Config";
import SupplyChain from "../../contracts/SupplyChain.json";

export const setWeb3Context = (state: IWeb3State, action: any) => {
  const _contextObject: IWeb3State = {
    contractInstance: undefined,
    accounts: [],
    selectedAccount: "",
    networkId: "",
    chainId: "",
    isMetaMask: false,
    contractStorageAddress: undefined,
    web3: null,
    contractAddress: undefined,
  };

  const loadContext = async () => {
    // retrieve web3 object with active connection running on port
    const config: any = await Web3Config();
    _contextObject.web3 = await config.web3Instance;
    //populate all the available accounts from local running blockchain
    _contextObject.accounts = await _contextObject.web3.eth.getAccounts();
    //get the network id of running blockchain
    _contextObject.networkId = await _contextObject.web3.eth.net.getId();
    //get deployed network based on network id for required contract
    const _deployedNetwork = SupplyChain.networks[_contextObject.networkId];
    //generate contract instance based on contract address, abi, and web2 from deployed network
    _contextObject.contractInstance = new _contextObject.web3.eth.Contract(
      SupplyChain.abi,
      _deployedNetwork && _deployedNetwork.address
    );
    _contextObject.contractStorageAddress =
      await _contextObject.web3.eth.getStorageAt(
        _contextObject.contractInstance._address
      );
    return { ...state, ..._contextObject };
  };
  loadContext();

  return { ...state, ..._contextObject };
};
