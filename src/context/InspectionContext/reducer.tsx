import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IInspectionBoard } from "../../models/inspection.interface";

export const reducer = (state: IInspectionBoard, action: any) => {
  switch (action.type) {
    case actionTypes.SET_MATERIAL_LIST:
      return helper.storeMaterialList(state, action);
    case actionTypes.SET_MEDICINE_LIST:
      return helper.storeMedicineList(state, action);
    default:
      return state;
  }
};
