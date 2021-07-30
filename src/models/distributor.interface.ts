import { IMedicine } from "./medicine.interface";
import { IMedicineDP } from "./medicineDP.interface";

export interface IDistributorContext {
  batchesShippedCount: number | any;
  medicineBatchesReceivedFromManuf: IMedicine[];
  medicineBatchesTransferredToPharma: IMedicineDP[];
  storeDistributorDashboardData: any;
}
