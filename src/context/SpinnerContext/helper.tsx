import { ISpinnerState } from "../../models/spinner.interface";

export const toggleSpinner = (state: ISpinnerState, action: any) => {
  const { show }: ISpinnerState = { ...state };
  return {
    ...state,
    show: !show,
  };
};
