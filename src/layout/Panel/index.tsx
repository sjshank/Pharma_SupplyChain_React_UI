import React from "react";
import { makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import MTypographyComponent from "../../generic/MTypography";
import Paper from "@material-ui/core/Paper";

type PanelProps = {
  panelTitle: string;
  styleItem?: any;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 25,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "200px",
    },
    pageTitle: {
      marginBottom: 10,
      textAlign: "center",
      color: "#444",
      fontWeight: 600,
    },
  })
);

const PanelLayout = ({ panelTitle, styleItem, children }: PanelProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12} style={styleItem}>
          <Paper component="form" className={classes.paper} elevation={3} square={true}>
            <MTypographyComponent
              text={panelTitle}
              variant="h6"
              classname={classes.pageTitle}
            />
            {children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PanelLayout;
