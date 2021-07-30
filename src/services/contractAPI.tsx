import { populateCustomErrorObject } from "../utils/helpers";

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
