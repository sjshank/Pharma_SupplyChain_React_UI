import { getTransactionData } from "../services/contractAPI";
import { Web3Context } from "../context/Web3Context";
import { IWeb3State } from "../models/web3.interface";
import { useContext } from "react";

const useMedicineBatchDetails = () => {
  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;
  const loadMedicineDetails = (medicineId: string | any) => {
    return getTransactionData(
      contractInstance,
      "getMedicineDetailsByBatchId",
      selectedAccount,
      medicineId
    );
  };

  return loadMedicineDetails;
};

export default useMedicineBatchDetails;
