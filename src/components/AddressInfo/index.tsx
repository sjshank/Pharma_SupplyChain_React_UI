import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MTypographyComponent from "../../generic/MTypography";
import PaperHeaderComponent from "../PaperHeader";

type AddressInfoProps = {
  IconComp: React.ReactNode;
  label: string;
  value?: string | number | null;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
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
    value: {
      textAlign: "left",
      fontWeight: 600,
      marginLeft: "2px",
      // color: "#053742",
    },
  })
);

const AddressInfoComponent = ({ IconComp, label, value }: AddressInfoProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent IconComp={IconComp} label={label} textVariant="button"/>
      <MTypographyComponent
        text={value}
        variant="subtitle1"
        component="div"
        classname={classes.value}
      />
    </Paper>
  );
};

export default AddressInfoComponent;
