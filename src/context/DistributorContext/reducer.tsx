import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IDistributorContext } from "../../models/distributor.interface";

export const reducer = (state: IDistributorContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_DISTRIBUTOR_DASHBOARD_DATA:
      return helper.storeDistributorDashboardDetails(state, action);
    default:
      return state;
  }
};
