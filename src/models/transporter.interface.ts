import { IRawMaterial } from "./material.interface";
import { IMedicine } from "./medicine.interface";
import { IMedicineDP } from "./medicineDP.interface";

export interface ITransporterBoard {
  materials: IRawMaterial[];
  medicines: IMedicine[];
  medicinesDP: IMedicineDP[];
}

export interface ITransporterContext extends ITransporterBoard {
  setMaterialList: any;
  setMedicineList: any;
  setMedicineDPList: any;
}
