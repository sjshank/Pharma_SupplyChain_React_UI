import { IAdminContext } from "../../models/admin.interface";

export const storeAdminDashboardDetails = (
  state: IAdminContext,
  action: any
) => {
  return {
    ...state,
    usersCount: action["usersCount"],
    registeredUsers: action["users"],
  };
};
