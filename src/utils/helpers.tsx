import { IError } from "../models/error.interface";
import { IUserInfo } from "../models/userInfo.interface";
import { CUSTOM_ERROR_MESSAGES, USER_ROLE_LIST } from "./constants";

export const populateUserListWithRoleName = (data: any) => {
  let activeUsersCount = 0;
  const _users = data.map((user: any) => {
    if (!user.isDeleted) {
      activeUsersCount = activeUsersCount + 1;
    }
    return {
      ...user,
      userRole: parseInt(user.userRole),
      userRoleName: USER_ROLE_LIST[parseInt(user.userRole)],
    };
  });
  return { _users, activeUsersCount };
};

export const populateCustomErrorObject = (errorObject: IError) => {
  const { code, message, stack } = { ...errorObject };
  const customError = CUSTOM_ERROR_MESSAGES.find((err: any) => {
    if (message?.toLowerCase()?.indexOf(err.keyword.toLowerCase()) > -1) {
      return err;
    } else if (code == "INVALID_ARGUMENT") {
      return CUSTOM_ERROR_MESSAGES[0];
    }
  });
  customError ? customError : CUSTOM_ERROR_MESSAGES[0];
  return {
    errorCode: `Error-${customError?.code}`,
    errorMessage: customError?.errMsg,
  };
};

export const populateRoleBasedList = (users: IUserInfo[]) => {
  return {
    supplierList: users.filter((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "1"
      ) {
        return usr;
      }
    }),
    transporterList: users.filter((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "2"
      ) {
        return usr;
      }
    }),
    manufacturerList: users.filter((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "3"
      ) {
        return usr;
      }
    }),
    distributorList: users.filter((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "5"
      ) {
        return usr;
      }
    }),
    pharmaList: users.filter((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "6"
      ) {
        return usr;
      }
    }),
  };
};

export const populateUserName = (
  _role: string,
  _address: string,
  userList: IUserInfo[]
): string | any => {
  const userDetails = userList.find((usr: IUserInfo) => {
    if (
      !usr.isDeleted &&
      usr.userStatus === "Active" &&
      usr.userRole === _role &&
      usr.userAddress === _address
    ) {
      return usr;
    }
  });
  return userDetails?.userName;
};
