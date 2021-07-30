import { IManufacturerContext } from "../../models/manufacturer.interface";

export const storeManufacturerDashboardDetails = (
  state: IManufacturerContext,
  action: any
) => {

  return {
    ...state,
    medicineBatchCount: action["medicineCount"],
    medicineShippedCount: action["batchesCount"],
    rawMaterialsReceived: action["materials"],
    registeredMedicineBatch: action["medicines"],
  };
};
