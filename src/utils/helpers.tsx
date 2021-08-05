import { IError } from "../models/error.interface";
import { IUserInfo } from "../models/userInfo.interface";
import { CUSTOM_ERROR_MESSAGES, USER_ROLE_LIST } from "./constants";
import _ from "lodash";

declare const window: Window &
  typeof globalThis & {
    WEB3: any;
  };

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
      usr.userAddress?.toLowerCase() === _address?.toLowerCase()
    ) {
      return usr;
    }
  });
  return userDetails?.userName;
};

export const populateTxBlockDetails = (record: any = {} as any) => {
  try {
    if (window && window?.WEB3) {
      const _web3Object = window?.WEB3;
      const allTransactionInfo: any = [];
      let outputObject: any = {};
      const _txBlocks = record.transactionBlocks
        ? record.transactionBlocks
        : [];
      if (Array.isArray(_txBlocks)) {
        return new Promise((resolve, reject) => {
          _txBlocks.forEach((bNumber) => {
            _web3Object.eth
              .getBlock(bNumber)
              .then((result: any) => {
                if (result) {
                  allTransactionInfo.push({
                    txTime: result.timestamp,
                    customizedTxTime: getFormattedDate(result.timestamp),
                    hash: result.hash,
                    number: result.number,
                  });
                }
                if (allTransactionInfo.length === _txBlocks.length) {
                  Object.assign(outputObject, record);
                  outputObject["txData"] = _.sortBy(allTransactionInfo, [
                    "number",
                  ]);
                  resolve(outputObject);
                }
              })
              .catch((err: any) => {
                console.error(err);
                reject({
                  errorCode: CUSTOM_ERROR_MESSAGES[0].code,
                  errorMessage: CUSTOM_ERROR_MESSAGES[0].errMsg,
                });
              });
          });
        });
      }
    }
  } catch (e) {
    throw {
      errorCode: CUSTOM_ERROR_MESSAGES[0].code,
      errorMessage: CUSTOM_ERROR_MESSAGES[0].errMsg,
    };
  }
};

export const getMedicineURL = (id: string): string => {
  return `${location.origin}/medicine/${id}`;
};

export const isPublicFacing = (): boolean => {
  return location.pathname.indexOf("/medicine") > -1;
};

// export const getUserDetails = (
//   _role: string,
//   _address: string,
//   userList: IUserInfo[]
// ): any => {
//   const userDetails: IUserInfo | any = userList.find((usr: IUserInfo) => {
//     if (
//       !usr.isDeleted &&
//       usr.userStatus === "Active" &&
//       usr.userRole === _role &&
//       usr.userAddress?.toLowerCase() === _address?.toLowerCase()
//     ) {
//       return usr;
//     }
//   });
//   return {
//     userName: userDetails.userName,
//     userAddress: userDetails.userAddress,
//     userLocation: userDetails.userLocation,
//     userRole: userDetails.userRole,
//     userStatus: userDetails.userStatus,
//     registrationDate: userDetails.registrationDate,
//     isDeleted: userDetails.isDeleted,
//   };
// };

export const populateUserDetails = (
  _role: any,
  _address: any,
  userList: any
) => {
  const userDetails: IUserInfo | any = userList.find((usr: IUserInfo) => {
    if (
      !usr.isDeleted &&
      usr.userStatus === "Active" &&
      usr.userRole === _role &&
      usr.userAddress?.toLowerCase() === _address?.toLowerCase()
    ) {
      return usr;
    }
  });
  return {
    userName: userDetails.userName,
    userAddress: userDetails.userAddress,
    userLocation: userDetails.userLocation,
    userRole: userDetails.userRole,
    userStatus: userDetails.userStatus,
    registrationDate: userDetails.registrationDate,
    isDeleted: userDetails.isDeleted,
  };
};

export const populateUserDetailsinMaterialRecord = (
  materialRecord: any,
  userList: IUserInfo[]
) => {
  const updatedRecord = { ...materialRecord };
  updatedRecord.supplierDetails = populateUserDetails(
    "1",
    updatedRecord.supplier,
    userList
  );
  updatedRecord.manufacturerDetails = populateUserDetails(
    "3",
    updatedRecord.manufacturer,
    userList
  );
  updatedRecord.transporterDetails = populateUserDetails(
    "2",
    updatedRecord.shipper,
    userList
  );

  return updatedRecord;
};

export const populateUserDetailsinMedicineRecord = (
  medicineRecord: any,
  userList: IUserInfo[]
) => {
  const updatedRecord = { ...medicineRecord };
  updatedRecord.manufacturerDetails = populateUserDetails(
    "3",
    updatedRecord.manufacturer,
    userList
  );
  updatedRecord.transporterDetails = populateUserDetails(
    "2",
    updatedRecord.shipper,
    userList
  );
  updatedRecord.distributorDetails = populateUserDetails(
    "5",
    updatedRecord.distributor,
    userList
  );

  return updatedRecord;
};

export const isMedicineApproved = (medicine: any): boolean => {
  return ["1"].indexOf(medicine?.saleStatus) > -1;
};

export const isMedicineExpired = (medicine: any): boolean => {
  return ["0", "2", "3"].indexOf(medicine?.saleStatus) > -1;
};

export const getFormattedDate = (timestamp: any) => {
  return new Date(timestamp * 1000)
    .toLocaleDateString()
    .concat(", " + new Date(timestamp * 1000).toLocaleTimeString());
};
