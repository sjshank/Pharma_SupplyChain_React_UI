import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MTypographyComponent from "../../generic/MTypography";

type MetricProps = {
  IconComp: React.ReactNode;
  label: string;
  value?: string | number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    label: {
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    details: {
      display: "flex",
      flexDirection: "row",
    },
    icon: {
      flex: "1 0 auto",
      textAlign: "left",
    },
    value: {
      flex: "1 0 auto",
      textAlign: "right",
      fontWeight: theme.typography.fontWeightMedium,
      // color: "#053742",
    },
  })
);

const MetricsComponent = ({ IconComp, label, value }: MetricProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <div className={classes.label}>
        <MTypographyComponent
          text={label}
          variant="button"
        />
      </div>
      <div className={classes.details}>
        <div className={classes.icon}>{IconComp}</div>
        <div className={classes.value}>
          <MTypographyComponent
            text={value}
            key="h4"
            component="h4"
            variant="h4"
          />
        </div>
      </div>
    </Paper>
  );
};

export default MetricsComponent;
