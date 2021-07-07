export interface IUser {
  address: string;
  userName: string;
  location: string;
  roleName: string;
  roleCode: string | number;
  status: string;
}

export interface IUserRole {
  roleName: string;
  bgColor: string;
  permission: string;
  color: string;
}

export interface IUserForm {
  id: string;
  name?: string;
  isRequired?: boolean;
  label: string;
  userValue: any;
  variant?: string;
  isValid?: boolean;
  changeHandler?: any;
  selectChangeHandler?: any;
  fieldClassname?: any;
  helpText?: string;
  validationRule?: any;
  hasValidationRule?: boolean;
  fieldType: string;
  dataList?: Array<IOption>;
  defaultvalue?: any;
  color?: "deafult" | "primary" | "secondary";
  size?: "medium" | "small";
  disabled?: boolean;
  checked?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom" | undefined;
}

export interface IOption {
  key: any;
  value: any;
}
