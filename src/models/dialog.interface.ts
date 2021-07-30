export interface IDialog {
  dialogTitle: string;
  openFormDialog: boolean;
  openConfirmDialog: boolean;
  isEditMode: boolean;
  dialogId?: string | any;
}

export interface IDialogContext {
  dialogStatus: IDialog;
  updateDialogStatus: any;
  updateDialogTitle?: any;
}
