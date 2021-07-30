import { ISupplierContext } from "../../models/supplier.interface";

export const storeSupplierDashboardDetails = (
  state: ISupplierContext,
  action: any
) => {
  return {
    ...state,
    materialCount: action["materialCount"],
    batchesShippedCount: action["batchesCount"],
    registeredMaterials: action["materials"],
  };
};
