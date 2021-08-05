import { IError } from "../models/error.interface";
import { CUSTOM_ERROR_MESSAGES } from "../utils/constants";

export const getTransactionData = (
  contract: any,
  methodName: string,
  accountName: string | null | undefined,
  ...requestParams: any
) => {
  try {
    const response = contract.methods[methodName](...requestParams).call({
      from: accountName,
    });
    return new Promise((resolve, reject) => {
      response
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(populateCustomErrorObject(err));
        });
    });
  } catch (e) {
    throw populateCustomErrorObject(e);
  }
};

export const sendTransaction = (
  contract: any,
  methodName: string,
  accountName: string | null | undefined,
  ...requestParams: any
) => {
  try {
    const response = contract.methods[methodName](...requestParams).send({
      from: accountName,
    });
    return new Promise((resolve, reject) => {
      response
        .then((result: any) => {
          resolve(result);
        })
        .catch((err: any) => {
          reject(populateCustomErrorObject(err));
        });
    });
  } catch (e) {
    throw populateCustomErrorObject(e);
  }
};

const populateCustomErrorObject = (errorObject: IError) => {
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
