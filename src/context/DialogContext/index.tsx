import React, { useReducer } from "react";
import { IDialogContext } from "../../models/dialog.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Dialog_Initial_State: IDialogContext = {
  dialogStatus: {
    dialogTitle: "Dialog Title",
    openFormDialog: false,
    openConfirmDialog: false,
    isEditMode: false,
    dialogId: null,
  },
  updateDialogStatus: undefined,
};

const DialogContext = React.createContext<IDialogContext>(Dialog_Initial_State);

const DialogContextProvider = (props: any) => {
  const [DialogContextState, dispatchDialogContextAction] = useReducer(
    reducer,
    Dialog_Initial_State
  );

  const updateDialogStatusHandler = (
    _formDialog: boolean = false,
    _confirmDialog: boolean = false,
    _title: string = "Dialog Title",
    _isEdit: boolean = false,
    _dialogId: any = null
  ) => {
    dispatchDialogContextAction({
      type: actionTypes.UPDATE_DIALOG_STATUS,
      formDialog: _formDialog,
      confirmDialog: _confirmDialog,
      title: _title,
      isEdit: _isEdit,
      dialogId: _dialogId,
    });
  };

  const updateDialogTitleHandler = (_title: string) => {
    dispatchDialogContextAction({
      type: actionTypes.UPDATE_DIALOG_TITLE,
      title: _title,
    });
  };

  return (
    <DialogContext.Provider
      value={{
        dialogStatus: { ...DialogContextState.dialogStatus },
        updateDialogStatus: updateDialogStatusHandler,
        updateDialogTitle: updateDialogTitleHandler,
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
};

export { DialogContext, DialogContextProvider };
