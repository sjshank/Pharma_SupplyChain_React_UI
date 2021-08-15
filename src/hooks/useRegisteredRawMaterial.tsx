import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { IWeb3State } from "../models/web3.interface";
import { getTransactionData } from "../services/contractAPI";

const useRegisteredRawMaterial = () => {
  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;
  const loadRegisteredRawMaterial = (
    materialId: string | any
  ): Promise<any> => {
    return getTransactionData(
      contractInstance,
      "getRegisteredRawMaterialDetails",
      selectedAccount,
      materialId
    );
  };

  return loadRegisteredRawMaterial;
};

export default useRegisteredRawMaterial;
