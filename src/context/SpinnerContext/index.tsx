import React, { useReducer, useState } from "react";
import { ISpinnerState } from "./spinner.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Spinner_Initial_State: ISpinnerState = {
  show: false,
  toggleSpinner: undefined,
};


const SpinnerContext = React.createContext<ISpinnerState>(
  Spinner_Initial_State
);

const SpinnerContextProvider = (props: any) => {
  const [spinnerContextState, dispatchSpinnerContextAction] = useReducer(
    reducer,
    Spinner_Initial_State
  );

  const toggleSpinnerHandler = () => {
    dispatchSpinnerContextAction({
      type: actionTypes.TOGGLE_SPINNER,
    });
  };

  return (
    <SpinnerContext.Provider
      value={{
        show: spinnerContextState.show,
        toggleSpinner: toggleSpinnerHandler,
      }}
    >
      {props.children}
    </SpinnerContext.Provider>
  );
};

export { SpinnerContext, SpinnerContextProvider };
