import { getTransactionData } from "../services/contractAPI";

const useMedicineBatchDetails = () => {
  const loadMedicineDetails = (
    contractInstance: any,
    selectedAccount: any | string,
    medicineId: string | any
  ) => {
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
