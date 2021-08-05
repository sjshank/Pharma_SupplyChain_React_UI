import React, { useEffect, useState } from "react";
import { createStyles, Fade, makeStyles, Theme } from "@material-ui/core";
import { useParams } from "react-router";
import { allTransactionRef } from "../../config/firebaseConfig";
import AppFooterComponent from "../../components/AppFooter";
import {
  APP_FOOTER_TEXT,
  SUPPLY_CHAIN_UPDATES_PAGE_TITLE,
} from "../../utils/constants";
import MaterialSupplierTimelineBoxComponent from "../../components/MaterialSupplierTimelineBox";
import MedicineManufacturerTimelineBoxComponent from "../../components/MedicineManufacturerTimelineBox";
import MedicineDistributorTimelineBoxComponent from "../../components/MedicineDistributorTimelineBox";
import MedicinePharmaTimelineBoxComponent from "../../components/MedicinePharmaTimelineBox";
import MSpinnerComponent from "../../generic/MSpinner";
import NotAvailableComponent from "../../generic/NotAvailable";
import MTypographyComponent from "../../generic/MTypography";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#053742",
      fontFamily: "Helvetica, sans-serif",
      minHeight: `calc(100vh)`,
      paddingTop: 20,
      paddingBottom: 20,
    },
    pageTitle: {
      fontFamily: "'Special Elite', cursive !important",
      color: "#fff",
      textAlign: "center",
      fontSize: 40,
      marginBottom: 20,
      textDecoration: "underline",
    },
    timeline: {
      position: "relative",
      maxWidth: 1200,
      margin: "auto",
      "&:after": {
        content: '""',
        position: "absolute",
        width: 6,
        backgroundColor: "#fff",
        top: 0,
        bottom: 0,
        left: "50%",
        marginLeft: -3,
      },
    },
    timelineContainer: {
      padding: "10px 40px",
      position: "relative",
      backgroundColor: "inherit",
      width: "50%",
      "&:after": {
        content: '""',
        position: "absolute",
        width: 25,
        height: 25,
        right: -17,
        backgroundColor: "#fff",
        border: "4px solid #FF9F55",
        top: 15,
        borderRadius: "50%",
        zIndex: 1,
      },
    },
    left: {
      left: 0,
      "&:before": {
        content: '" "',
        height: 0,
        position: "absolute",
        top: 22,
        width: 0,
        zIndex: 1,
        right: 30,
        border: "medium solid white",
        borderWidth: "10px 0 10px 10px",
        borderColor: "transparent transparent transparent white",
      },
    },
    right: {
      left: "50%",
      "&:before": {
        content: '" "',
        height: 0,
        position: "absolute",
        top: 22,
        width: 0,
        zIndex: 1,
        left: 30,
        transform: "rotate(180deg)",
        border: "medium solid white",
        borderWidth: "10px 0 10px 10px",
        borderColor: "transparent transparent transparent white",
      },
      "&:after": {
        left: -16,
      },
    },
    content: {
      padding: "10px 15px",
      backgroundColor: "#fff",
      position: "relative",
      borderRadius: 6,
      zoom: "90%",
    },
    barTitle: {
      fontSize: 16,
      fontWeight: 600,
    },
    ulBox: {
      listStyle: "none",
      paddingLeft: 0,
      marginLeft: 0,
      color: theme.palette.primary.main,
      fontSize: 12,
      fontWeight: 600,
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      "& .MuiListItem-button": {
        padding: "4px !important",
      },
    },
    eachItemText: {
      "& span": { fontSize: "11px !important", lineHeight: "1 !important" },
    },
    updateBox: {
      marginTop: 15,
      marginBottom: 5,
      textAlign: "center",
    },
    eachChipItem: {
      margin: 4,
      fontSize: 12,
      height: 25,
      backgroundColor: "#4caf50",
      color: "#fff",
      width: "100%",
    },
    notAvailableRoot: {
      textAlign: "center",
      fontSize: 20,
      margin: 20,
      marginTop: "18%",
      color: "#fff",
      textTransform: "capitalize",
    },
    printIcon: {
      color: "#fff",
      margin: 10,
      marginRight: 20,
      cursor: "pointer",
    },
  })
);

const MedicineTimelineComponent = () => {
  const classes = useStyles();
  const { id }: any = useParams();
  const [transactionData, setTransactionData] = useState<any>(null as any);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //call to database to get medicine timeline details
    allTransactionRef.child(id).on("value", (snapshot) => {
      setTransactionData(snapshot.val());
      setLoading(false);
    });
  }, [id]);

  const handlePint = () => {
    if (window) {
      window.print();
    }
  };

  return (
    <>
      <div className={classes.root}>
        {transactionData && (
          <>
            <div style={{ float: "right" }}>
              <PrintIcon
                fontSize="small"
                className={classes.printIcon}
                onClick={handlePint}
              />
            </div>
            <Fade in={true} timeout={800}>
              <MTypographyComponent
                text={SUPPLY_CHAIN_UPDATES_PAGE_TITLE}
                variant="h4"
                classname={classes.pageTitle}
              />
            </Fade>
            <div className={classes.timeline}>
              <MaterialSupplierTimelineBoxComponent
                classes={classes}
                dataInfo={transactionData["materialInfo"]}
                headerTitle="Commodity Supplier"
                objectLookup="supplierDetails"
              />
              <MedicineManufacturerTimelineBoxComponent
                classes={classes}
                dataInfo={transactionData["medicineInfo"]}
                headerTitle="Medicine Batch Manufacturer"
                objectLookup="manufacturerDetails"
              />
              <MedicineDistributorTimelineBoxComponent
                classes={classes}
                dataInfo={transactionData["medicineInfo"]}
                headerTitle="Medicine Batch Distributor"
                objectLookup="distributorDetails"
              />
              <MedicinePharmaTimelineBoxComponent
                customerInfo={transactionData["customerInfo"]}
                classes={classes}
                dataInfo={transactionData["medicineInfo"]}
                headerTitle="Pharmaceutical Shop"
                objectLookup="pharmaDetails"
              />
            </div>
          </>
        )}
        {loading && <MSpinnerComponent open={loading} />}
        {!loading && !transactionData && (
          <Fade in={true} timeout={500}>
            <div className={classes.notAvailableRoot}>
              <NotAvailableComponent />
            </div>
          </Fade>
        )}
      </div>
      <AppFooterComponent footerText={APP_FOOTER_TEXT} />
    </>
  );
};

export default MedicineTimelineComponent;
