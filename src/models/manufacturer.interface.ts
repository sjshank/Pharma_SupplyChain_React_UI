import { IRawMaterial } from "./material.interface";
import { IMedicine } from "./medicine.interface";

export interface IManufacturerContext {
  medicineBatchCount: number | any;
  medicineShippedCount: number | any;
  rawMaterialsReceived: IRawMaterial[];
  registeredMedicineBatch: IMedicine[];
  storeManufacturerDashboardData: any;
}
