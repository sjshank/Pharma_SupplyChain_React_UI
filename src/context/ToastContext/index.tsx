import React, { useReducer } from "react";
import { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { IToast } from "../../models/toast.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Toast_Initial_State: IToast = {
  type: "",
  message: "",
};

const ToastContext = React.createContext<any>({} as any);

const ToastContextProvider = (props: any) => {
  const { addToast } = useToasts();
  const [toastContextState, dispatchToastContextAction] = useReducer(
    reducer,
    Toast_Initial_State
  );

  useEffect(() => {
    if (toastContextState.type && toastContextState.message) {
      addToast(toastContextState.message, {
        appearance: toastContextState.type,
      });
    }
  }, [toastContextState]);

  const toggleToastHandler = (_type: string, _msg: string) => {
    dispatchToastContextAction({
      type: actionTypes.TOGGLE_TOAST,
      toastType: _type,
      message: _msg,
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toggleToast: toggleToastHandler,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
