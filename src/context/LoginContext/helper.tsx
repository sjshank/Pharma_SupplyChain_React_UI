import { ILoginContext } from "../../models/login.interface";

export const storeLoginDetails = (state: ILoginContext, action: any) => {
  const { loginInfo } = { ...state };
  loginInfo.userAddress = action["userAddress"];
  loginInfo.userName = action["userName"];
  return {
    ...state,
    loginInfo: loginInfo,
  };
};
