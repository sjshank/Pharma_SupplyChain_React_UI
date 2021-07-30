import { useContext } from "react";
import { useHistory } from "react-router";
import { UserInfoContext } from "../context/UserContext";
import { IUserInfoContext } from "../models/userInfo.interface";

const useIsAuthorized = () => {
  const history = useHistory();
  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const isAuthTrue =
    history?.location?.pathname === "/".concat(userInfo.userRoleName);
  return isAuthTrue;
};

export default useIsAuthorized;
