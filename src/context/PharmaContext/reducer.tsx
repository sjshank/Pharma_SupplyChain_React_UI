import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IPharmaContext } from "../../models/pharma.interface";

export const reducer = (state: IPharmaContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_CUSTOMER_DATA:
      return helper.storeCustomerData(state, action);
    case actionTypes.UPDATE_MEDICINESDP_BATCHES:
      return helper.updateMedicineDPBatches(state, action);
    case actionTypes.SET_APPROVED_MEDICINEDP_BATCHES:
      return helper.setApprovedMedicinesDP(state, action);
    case actionTypes.SET_EXPIRED_MEDICINEDP_BATCHES:
      return helper.setExpiredMedicinesDP(state, action);
    default:
      return state;
  }
};
