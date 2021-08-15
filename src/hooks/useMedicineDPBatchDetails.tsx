import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { IWeb3State } from "../models/web3.interface";
import { getTransactionData } from "../services/contractAPI";

const useMedicineDPBatchDetails = () => {
  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;
  const loadMedicineDPDetails = (
    medicineSubContractId: string | any
  ) => {
    return getTransactionData(
      contractInstance,
      "getMedicineBatchSubContractDetails",
      selectedAccount,
      medicineSubContractId
    );
  };

  return loadMedicineDPDetails;
};

export default useMedicineDPBatchDetails;
