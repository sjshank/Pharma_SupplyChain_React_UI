import * as helper from "./helper";
import * as actionTypes from "./actionTypes";
import { IDialogContext } from "../../models/dialog.interface";

export const reducer = (state: IDialogContext, action: any) => {
  switch (action.type) {
    case actionTypes.UPDATE_DIALOG_STATUS:
      return helper.updateDialogStatusUtil(state, action);
    case actionTypes.UPDATE_DIALOG_TITLE:
      return helper.updateDialogTitleUtil(state, action);
    default:
      return state;
  }
};
