export interface IWeb3State {
  contractInstance?: string | any;
  accounts?: Array<string> | Array<any>;
  selectedAccount?: string | null;
  networkId?: string | any;
  chainId?: string;
  isMetaMask?: boolean;
  contractStorageAddress?: string | any;
  web3?: any;
  contractAddress?: string | any;
}
