import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

type MSwitchProps = {
  id: string;
  name: string;
  required?: boolean;
  value?: any;
  switchColor?: "primary" | "secondary" | "default" | undefined;
  label: string;
  labelPlacement: "end" | "start" | "top" | "bottom" | undefined;
  switchClassname?: any;
  checked?: boolean;
  disabled?: boolean;
  style?: any;
  changeHandler?: (e: any, param?: any) => void;
};

const MSwitchComponent = ({
  id,
  name,
  value,
  required,
  switchColor,
  label,
  labelPlacement,
  switchClassname,
  changeHandler,
  checked,
  disabled,
  style,
}: MSwitchProps) => {
  return (
    <FormControl required={required} component="fieldset">
      <FormControlLabel
        value={value}
        name={name}
        style={style}
        control={
          <Switch
            color={switchColor}
            className={switchClassname}
            onChange={changeHandler}
            checked={checked}
            disabled={disabled}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </FormControl>
  );
};

export default React.memo(MSwitchComponent);
