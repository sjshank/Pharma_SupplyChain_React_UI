import { ITransporterBoard } from "../../models/transporter.interface";

export const storeMaterialList = (state: ITransporterBoard, action: any) => {
  return {
    ...state,
    materials: action["materials"],
  };
};

export const storeMedicineList = (state: ITransporterBoard, action: any) => {
  return {
    ...state,
    medicines: action["medicines"],
  };
};

export const storeMedicineDPList = (state: ITransporterBoard, action: any) => {
  return {
    ...state,
    medicinesDP: action["medicinesDP"],
  };
};
