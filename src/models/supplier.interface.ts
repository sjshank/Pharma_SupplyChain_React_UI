import { IRawMaterial } from "./material.interface";

export interface ISupplierContext {
  materialCount: number | string | any;
  batchesShippedCount: number | string | any;
  registeredMaterials: IRawMaterial[] | any[];
  storeSupplierData: any;
}
