import React, { useReducer } from "react";
import { ILogin, ILoginContext } from "../../models/login.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Login_Initial_State: ILoginContext = {
  loginInfo: { userAddress: "", userName: "" },
  storeLoginInfo: undefined,
};

const LoginContext = React.createContext<ILoginContext>(Login_Initial_State);

const LoginContextProvider = (props: any) => {
  const [loginContextState, dispatchLoginContextAction] = useReducer(
    reducer,
    Login_Initial_State
  );

  const storeLoginDetailsHandler = (_loginState: ILogin) => {
    dispatchLoginContextAction({
      type: actionTypes.SET_LOGIN_STATE,
      ..._loginState,
    });
  };

  return (
    <LoginContext.Provider
      value={{
        loginInfo: { ...loginContextState.loginInfo },
        storeLoginInfo: storeLoginDetailsHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
