export interface IWeb3State {
  contractInstance: string | any;
  userContractInstance?: string | any;
  supplierContractInstance?: string | any;
  manufacturerContractInstance?: string | any;
  distributorContractInstance?: string | any;
  pharmaContractInstance?: string | any;
  accounts?: Array<string> | Array<any>;
  selectedAccount?: string | null;
  networkId?: string | any;
  chainId?: string;
  isMetaMask?: boolean;
  contractStorageAddress?: string | any;
  web3?: any;
  contractAddress?: string | any;
}
