import axios, { AxiosResponse } from "axios";
import { setupInterceptorsTo } from "../utils/Interceptors";

const instance = setupInterceptorsTo(
  axios.create({
    baseURL:
      "https://pharma-supply-chain-default-rtdb.asia-southeast1.firebasedatabase.app/",
    timeout: 15000,
  })
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getTransactionDetails: (url: string) => instance.get(url).then(responseBody),
  saveTransactionDetails: (url: string, param: any) =>
    instance.post(url, param).then(responseBody),
};

export const StoreAPI = {
  getAllTxDetails: (queryParam: any): Promise<any> =>
    requests.getTransactionDetails("getAllTransactions?".concat(queryParam)),
  saveAllTxDetails: (param: any): Promise<any> =>
    requests.saveTransactionDetails("saveAllTransactions", param),
};
