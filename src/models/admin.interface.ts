import { IUserInfo } from "./userInfo.interface";

export interface IAdminContext {
  usersCount: number;
  registeredUsers: Array<IUserInfo>;
  storeAdminData: any;
}
