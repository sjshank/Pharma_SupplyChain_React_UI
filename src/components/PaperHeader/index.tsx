import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MTypographyComponent from "../../generic/MTypography";

type PaperHeaderProps = {
  IconComp: React.ReactNode;
  label: string;
  textVariant: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
  })
);

const PaperHeaderComponent = ({
  IconComp,
  label,
  textVariant,
}: PaperHeaderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.icon}>{IconComp}</div>
      <MTypographyComponent text={label} variant={textVariant} />
    </div>
  );
};

export default PaperHeaderComponent;
