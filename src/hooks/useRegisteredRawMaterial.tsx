import { getTransactionData } from "../services/contractAPI";

const useRegisteredRawMaterial = () => {
  const loadRegisteredRawMaterial = (
    contractInstance: any,
    selectedAccount: any | string,
    materialId: string | any
  ) => {
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
