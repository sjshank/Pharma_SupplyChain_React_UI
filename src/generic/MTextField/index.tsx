import React, { ChangeEventHandler } from "react";
import TextField from "@material-ui/core/TextField";

type MTextFieldProps = {
  id: string;
  name: string;
  required?: boolean;
  label?: string;
  variant?: string | any;
  classname?: any;
  helpText?: string;
  inputProps?: object;
  value?: any;
  disabled?: boolean;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>, param?: any) => void;
};

const MTextFieldComponent = ({
  id,
  name,
  required,
  label,
  variant,
  classname,
  helpText,
  changeHandler,
  value,
  disabled,
}: MTextFieldProps) => {
  return (
    <TextField
      required={required}
      id={id}
      name={name}
      label={label}
      value={value}
      variant={variant}
      className={classname}
      helperText={helpText}
      disabled={disabled}
      onChange={changeHandler}
    />
  );
};

export default MTextFieldComponent;
