import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { IUserForm } from "../../models/user.interface";
import { USER_ROLES } from "../../utils/constants";

export interface IUserFields {
  userName: {
    value: string | any;
    disabled?: boolean;
  };
  userAddress: {
    value: string | any;
    disabled?: boolean;
  };
  userLocation: {
    value: string | any;
    disabled?: boolean;
  };
  userRole: {
    value: string | any | number;
    disabled?: boolean;
  };
  userStatus?: {
    value: string | any | number;
    disabled?: boolean;
  };
}

export const getFormMetaData = (
  formClasses: any,
  handleInputChange: any,
  selectChangeHandler: any
) => {
  const metaData: Array<IUserForm> = [
    {
      id: "userAddress",
      name: "userAddress",
      label: "Wallet Address",
      variant: "outlined",
      fieldType: "TextField",
      isRequired: true,
      isValid: false,
      userValue: "",
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.textField,
      validationRule: /^\s*$/,
    },
    {
      id: "userName",
      name: "userName",
      label: "User Name",
      variant: "outlined",
      fieldType: "TextField",
      isRequired: true,
      isValid: false,
      userValue: "",
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.textField,
      validationRule: /^\s*$/,
    },
    {
      id: "userLocation",
      name: "userLocation",
      label: "Location",
      variant: "outlined",
      fieldType: "TextField",
      isRequired: true,
      isValid: false,
      userValue: "",
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.textField,
      validationRule: /^\s*$/,
    },
    {
      id: "userRole",
      name: "userRole",
      label: "Role",
      variant: "outlined",
      fieldType: "Select",
      isRequired: true,
      isValid: false,
      userValue: "",
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.select,
      validationRule: /^\s*$/,
      dataList: USER_ROLES.DEFAULT.map((uRole) => {
        return { key: uRole.roleName, value: uRole.roleCode };
      }),
    },
    {
      id: "userStatus",
      name: "userStatus",
      label: "Status",
      fieldType: "Switch",
      isRequired: true,
      isValid: false,
      userValue: false,
      color: "primary",
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.switch,
      validationRule: /^\s*$/,
      labelPlacement: "end",
    },
  ];

  return metaData;
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    createUserBtn: {
      float: "right",
      marginTop: "-35px",
      color: "rgb(41, 187, 137)",
      border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    inActiveStatusCell: {
      opacity: 0.7,
      backgroundColor: "#eeeeee",
      cursor: "text",
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
    },
    status: {
      textTransform: "capitalize",
    },
    roleChip: {
      fontSize: 10,
      width: "110px",
      textTransform: "uppercase",
    },
    actionBtn: {
      cursor: "pointer",
    },
  })
);

export const useFormStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
  },

  textFieldBar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: "310px",
  },
  select: {
    width: "310px",
  },
  switch: {
    color: "#1EAE98",
  },
}));

export const registeredUsersTableHeader: Array<{ name: string; id: string }> = [
  {
    name: "User Address",
    id: "userAddress",
  },
  {
    name: "Name",
    id: "userName",
  },
  {
    name: "Location",
    id: "userLocation",
  },
  {
    name: "Role",
    id: "userRole",
  },
  {
    name: "Status",
    id: "userStatus",
  },
  {
    name: "Action",
    id: "action",
  },
];
