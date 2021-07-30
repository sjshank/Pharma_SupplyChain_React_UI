export default interface ILoginForm {
  id: string;
  name: string;
  isRequired: boolean;
  label: string;
  variant: string;
  isValid: boolean;
  changeHandler?: any;
  fieldClassname: any;
  helpText?: string;
  validationRule?: any;
  hasValidationRule?: boolean;
}
