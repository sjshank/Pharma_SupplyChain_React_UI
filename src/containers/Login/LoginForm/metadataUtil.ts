import ILoginForm from "../../../models/loginForm.interface";

const getFormMetaData = (
  formClasses: any,
  handleInputChange: any,
) => {
  const metaData: Array<ILoginForm> = [
    {
      id: "userName",
      label: "Username",
      variant: "outlined",
      isRequired: true,
      isValid: false,
      hasValidationRule: true,
      changeHandler: handleInputChange,
      fieldClassname: formClasses.textField,
      validationRule: /^\s*$/,
    },
    {
      id: "userAddress",
      label: "Account Address",
      variant: "outlined",
      isRequired: true,
      isValid: false,
      hasValidationRule: true,
      helpText: "Ethereum account address",
      changeHandler: handleInputChange,
      fieldClassname: formClasses.textField,
      validationRule: /^\s*$/,
    },
  ];

  return metaData;
};

export default getFormMetaData;
