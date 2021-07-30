import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IPharmaContext } from "../../models/pharma.interface";

export const reducer = (state: IPharmaContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_PHARMA_DASHBOARD_DATA:
      return helper.storePharmaDashboardDetails(state, action);
      case actionTypes.SET_CUSTOMER_DATA:
        return helper.storeCustomerData(state, action);
    default:
      return state;
  }
};
