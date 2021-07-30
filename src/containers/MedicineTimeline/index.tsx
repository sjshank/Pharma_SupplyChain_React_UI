import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { ToastContext } from "../../context/ToastContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overviewTitle: {
      textAlign: "center",
      marginTop: 10,
      fontWeight: 600,
      color: "#444",
    },
    outerOverviewSection: {
      padding: 10,
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    },
  })
);

const MedicineTimelineComponent = () => {
  const classes = useStyles();

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  useEffect(() => {
    //call to database to get medicine timeline details
  }, []);

  return <></>;
};

export default MedicineTimelineComponent;
