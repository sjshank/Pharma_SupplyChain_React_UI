import { IDistributorContext } from "../../models/distributor.interface";

export const storeDistributorDashboardDetails = (
  state: IDistributorContext,
  action: any
) => {
  return {
    ...state,
    batchesShippedCount: action["batchesCount"],
    medicineBatchesReceivedFromManuf: action["medicinesReceived"],
    medicineBatchesTransferredToPharma: action["medicinesTransferred"],
  };
};

export const updateReceivedMedicines = (
  state: IDistributorContext,
  action: any
) => {
  return {
    ...state,
    medicineBatchesReceivedFromManuf: action["medicinesReceived"],
  };
};

export const updateTransferredMedicines = (
  state: IDistributorContext,
  action: any
) => {
  return {
    ...state,
    medicineBatchesTransferredToPharma: action["medicinesTransferred"],
  };
};
