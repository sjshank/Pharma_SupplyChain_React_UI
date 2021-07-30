import { IDialogContext } from "../../models/dialog.interface";

export const updateDialogStatusUtil = (state: IDialogContext, action: any) => {
  return {
    ...state,
    dialogStatus: {
      ...state.dialogStatus,
      dialogTitle: action["title"],
      openFormDialog: action["formDialog"],
      openConfirmDialog: action["confirmDialog"],
      isEditMode: action["isEdit"],
      dialogId: action["dialogId"],
    },
  };
};

export const updateDialogTitleUtil = (state: IDialogContext, action: any) => {
  return {
    ...state,
    dialogStatus: {
      ...state.dialogStatus,
      dialogTitle: action["title"],
    },
  };
};
