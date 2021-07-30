import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { ISupplierContext } from "../../models/supplier.interface";

export const reducer = (state: ISupplierContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SUPPLIER_DASHBOARD_DATA:
      return helper.storeSupplierDashboardDetails(state, action);
    default:
      return state;
  }
};
