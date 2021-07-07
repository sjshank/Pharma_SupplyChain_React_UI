import React, { useEffect, useReducer } from "react";
import {
  IUserInfo,
  IUserInfoAction,
  IUserInfoContext,
} from "./userInfo.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const UserInfo_Initial_State: IUserInfo = {
  userName: null,
  userRole: 0,
  userAddress: null,
  userLocation: "",
  userRoleName: "",
};

const UserInfo_Action_Initial_State: IUserInfoAction = {
  setUserInfo: undefined,
  logout: undefined,
};

const UserInfoContext_Initial_State: IUserInfoContext = {
  userInfo: { ...UserInfo_Initial_State },
  userInfoAction: { ...UserInfo_Action_Initial_State },
};

const UserInfoContext = React.createContext<IUserInfoContext>({
  ...UserInfoContext_Initial_State,
});

const UserInfoContextProvider = (props: any) => {
  const [UserInfoContextState, dispatchUserInfoContextAction] = useReducer(
    reducer,
    { ...UserInfoContext_Initial_State }
  );

  useEffect(() => {
    const userDetails = JSON.parse("" + localStorage.getItem("userInfo"));
    if (userDetails) {
      dispatchUserInfoContextAction({
        type: actionTypes.SET_USER_INFO,
        userDetails,
      });
    }
  }, []);

  const setUserInfoHandler = (userDetails: IUserInfo) => {
    dispatchUserInfoContextAction({
      type: actionTypes.SET_USER_INFO,
      userDetails,
    });
  };

  const logoutHandler = () => {
    dispatchUserInfoContextAction({
      type: actionTypes.LOGOUT,
    });
  };

  return (
    <UserInfoContext.Provider
      value={{
        userInfo: UserInfoContextState.userInfo,
        userInfoAction: {
          setUserInfo: setUserInfoHandler,
          logout: logoutHandler,
        },
      }}
    >
      {props.children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoContextProvider };
