import { ISpinnerState } from "./spinner.interface";
import * as helper from "./helper";
import * as actionTypes from "./actionTypes";

export const reducer = (state: ISpinnerState, action: any) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SPINNER:
      return helper.toggleSpinner(state, action);
    default:
      return state;
  }
};
