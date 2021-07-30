import { useRef } from "react";
import { useContext, useEffect } from "react";
import { Web3Context } from "../context/Web3Context";
import { IWeb3State } from "../models/web3.interface";
import { getTransactionData } from "../services/contractAPI";

const useRegisteredUsers = () => {
  const loadUsers = (contractInstance: any, selectedAccount: any) => {
    return getTransactionData(
      contractInstance,
      "getAllRegisteredUsers",
      selectedAccount
    );
  };

  return loadUsers;
};

export default useRegisteredUsers;
