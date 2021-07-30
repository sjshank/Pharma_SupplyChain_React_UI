import { IUserInfo, IUserInfoContext } from "../../models/userInfo.interface";

const UserInfo_Default_State: IUserInfo = {
  userName: null,
  userRole: 0,
  userAddress: null,
  userLocation: "",
  userRoleName: "",
  isDeleted: false,
};

export const setUserInfo = (
  state: IUserInfoContext,
  action: any
): IUserInfoContext => {
  const _userDetails: IUserInfo = { ...action.userDetails };
  localStorage.setItem("userInfo", JSON.stringify(_userDetails));
  return {
    ...state,
    userInfo: _userDetails,
  };
};

export const logoutUser = (
  state: IUserInfoContext,
  action: any
): IUserInfoContext => {
  localStorage.clear();
  return {
    ...state,
    userInfo: UserInfo_Default_State,
  };
};
