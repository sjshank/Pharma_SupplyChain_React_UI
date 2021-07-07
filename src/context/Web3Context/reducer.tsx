import { IWeb3State } from "./web3.interface";
import * as helper from "./helper";
import * as actionTypes from "./actionTypes";


export const reducer = (state: IWeb3State, action: any) => {
  switch (action.type) {
    case actionTypes.SET_WEB3_CONTEXT:
      return helper.setWeb3Context(state, action);
    default:
      return state;
  }
};
