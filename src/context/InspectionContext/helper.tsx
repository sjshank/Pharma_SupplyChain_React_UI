import { IInspectionBoard } from "../../models/inspection.interface";

export const storeMaterialList = (state: IInspectionBoard, action: any) => {
  debugger;
  return {
    ...state,
    materials: action["materials"],
  };
};

export const storeMedicineList = (state: IInspectionBoard, action: any) => {
  debugger;
  return {
    ...state,
    medicines: action["medicines"],
  };
};
