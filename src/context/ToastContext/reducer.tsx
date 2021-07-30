import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IToast } from "../../models/toast.interface";

export const reducer = (state: IToast, action: any) => {
  switch (action.type) {
    case actionTypes.TOGGLE_TOAST:
      return helper.toggleToast(state, action);
    default:
      return state;
  }
};
