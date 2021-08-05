import { IPharmaContext } from "../../models/pharma.interface";

export const storePharmaDashboardDetails = (
  state: IPharmaContext,
  action: any
) => {
  return {
    ...state,
    medicineBatchesReceivedFromDist: action["medicines"],
    expiredCount: action["expired"],
    approvedCount: action["approved"],
    medicineIDs: action["medicineIds"],
    subContractIDs: action["_subContracts"],
    customers: action["customers"],
  };
};

export const storeCustomerData = (state: IPharmaContext, action: any) => {
  return {
    ...state,
    customers: action["customers"],
  };
};
