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
  placeholder?: string;
  changeHandler: (e: any, param?: any) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "310px",
    },
    helpTextP: {
      marginLeft: "10px",
      marginRight: "10px",
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: 10,
      marginTop: "3px",
      textAlign: "left",
      lineHeight: 1.5,
      letterSpacing: "0.0333em",
      fontWeight: 400,
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
  placeholder,
}: MBasicSelectProps) => {
  const classes = useStyles();

  return (
    <>
      <FormControl required={required} variant={variant} className={classname}>
        <InputLabel>{label}</InputLabel>
        <Select
          id={id}
          name={name}
          value={selectedValue}
          onChange={changeHandler}
          label={label}
          disabled={disabled}
          placeholder={placeholder}
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
      {helpText && <p className={classes.helpTextP}>{helpText}</p>}
    </>
  );
};

export default MSimpleSelectComponent;
