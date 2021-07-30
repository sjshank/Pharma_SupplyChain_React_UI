import React, { useReducer } from "react";
import { IAdminContext } from "../../models/admin.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Admin_Initial_State: IAdminContext = {
  usersCount: 0,
  registeredUsers: [] as IUserInfo[],
  storeAdminData: undefined,
};

const AdminContext = React.createContext<IAdminContext>(Admin_Initial_State);

const AdminContextProvider = (props: any) => {
  const [AdminContextState, dispatchAdminContextAction] = useReducer(
    reducer,
    Admin_Initial_State
  );

  const storeAdminDashboardDataHandler = (
    _usersCount: number,
    _users: IUserInfo[]
  ) => {
    dispatchAdminContextAction({
      type: actionTypes.SET_ADMIN_DASHBOARD_DATA,
      usersCount: _usersCount,
      users: _users,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        usersCount: AdminContextState.usersCount,
        registeredUsers: AdminContextState.registeredUsers,
        storeAdminData: storeAdminDashboardDataHandler,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
