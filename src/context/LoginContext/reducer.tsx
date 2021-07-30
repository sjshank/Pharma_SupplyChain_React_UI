import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { ILoginContext } from "../../models/login.interface";

export const reducer = (state: ILoginContext, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_STATE:
      return helper.storeLoginDetails(state, action);
    default:
      return state;
  }
};
