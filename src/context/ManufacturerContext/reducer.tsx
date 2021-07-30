import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IManufacturerContext } from "../../models/manufacturer.interface";

export const reducer = (state: IManufacturerContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_MANUFACTURER_DASHBOARD_DATA:
      return helper.storeManufacturerDashboardDetails(state, action);
    default:
      return state;
  }
};
