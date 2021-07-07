import { IUserInfoContext } from "./userInfo.interface";
import * as helper from "./helper";
import * as actionTypes from "./actionTypes";

export const reducer = (
  state: IUserInfoContext,
  action: any
): IUserInfoContext => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      return helper.setUserInfo(state, action);
    case actionTypes.LOGOUT:
      return helper.logoutUser(state, action);
    default:
      return state;
  }
};
