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
