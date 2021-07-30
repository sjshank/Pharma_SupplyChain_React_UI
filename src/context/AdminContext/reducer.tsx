import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IAdminContext } from "../../models/admin.interface";

export const reducer = (state: IAdminContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_DASHBOARD_DATA:
      return helper.storeAdminDashboardDetails(state, action);
    default:
      return state;
  }
};
