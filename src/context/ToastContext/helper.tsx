import { IToast } from "../../models/toast.interface";

export const toggleToast = (state: IToast, action: any) => {
  return {
    ...state,
    type: action["toastType"],
    message: action["message"],
  };
};
