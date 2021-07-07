import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { IOption } from "../../models/user.interface";

type MBasicSelectProps = {
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  selectedValue?: any;
  variant?: string | any;
  classname?: any;
  helpText?: string;
  inputProps?: object;
  options: Array<IOption> | any;
  changeHandler: (e: any, param?: any) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "310px",
    },
  })
);
const MSimpleSelectComponent = ({
  id,
  name,
  required,
  label,
  selectedValue = "",
  variant,
  classname,
  helpText,
  options,
  disabled,
  changeHandler,
}: MBasicSelectProps) => {
  const classes = useStyles();

  return (
    <FormControl required={required} variant={variant} className={classes.root}>
      <InputLabel>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        value={selectedValue}
        onChange={changeHandler}
        label={label}
        disabled={disabled}
      >
        {options.map((option: IOption) => {
          return (
            <MenuItem key={option.key} value={option.value}>
              {option.key}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MSimpleSelectComponent;
