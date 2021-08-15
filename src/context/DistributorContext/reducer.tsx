import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IDistributorContext } from "../../models/distributor.interface";

export const reducer = (state: IDistributorContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_DISTRIBUTOR_DASHBOARD_DATA:
      return helper.storeDistributorDashboardDetails(state, action);
    case actionTypes.SET_RECEIEVED_MEDICINES:
      return helper.updateReceivedMedicines(state, action);
    case actionTypes.SET_TRANSFERRED_MEDICINES:
      return helper.updateTransferredMedicines(state, action);
    default:
      return state;
  }
};
