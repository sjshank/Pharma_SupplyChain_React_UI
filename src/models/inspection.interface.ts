import { IRawMaterial } from "./material.interface";
import { IMedicine } from "./medicine.interface";

export interface IInspectionBoard {
  materials: IRawMaterial[];
  medicines: IMedicine[];
}

export interface IInspectionContext extends IInspectionBoard {
  setMaterialList: any;
  setMedicineList: any;
}
