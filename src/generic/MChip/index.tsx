import React from "react";
import Chip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

type ChipProps = {
  label: string | any;
  size: any;
  bgColor?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      color: "#fff",
    },
  })
);

const MChipComponent = ({
  label = "",
  size = "medium",
  bgColor = "#1976d2",
}: ChipProps) => {
  const classes = useStyles();
  return (
    <Chip
      size={size}
      label={label}
      className={classes.root}
      style={{ backgroundColor: bgColor }}
    />
  );
};

export default React.memo(MChipComponent);
