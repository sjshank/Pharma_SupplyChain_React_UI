import React from "react";
import MTypographyComponent from "../../generic/MTypography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppFooterComponent from "../AppFooter";
import {
  APP_FOOTER_TEXT,
  APP_TITLE,
  METAMASK_ERR,
  PHARMA_SUPPLY_CHAIN,
} from "../../utils/constants";
import AppHeaderComponent from "../AppHeader";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    metaMaskErr: {
      fontSize: "24px",
      fontStyle: "oblique",
      textAlign: "center",
      padding: "30px",
      paddingTop: "15%",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

const MetamaskComponent = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{`${PHARMA_SUPPLY_CHAIN}`}</title>
      </Helmet>
      <AppHeaderComponent title={APP_TITLE} />
      <div style={{ minHeight: `calc(84vh - 10px)` }}>
        <MTypographyComponent
          text={METAMASK_ERR}
          color="error"
          variant="h5"
          classname={classes.metaMaskErr}
        />
      </div>
      <AppFooterComponent footerText={APP_FOOTER_TEXT} />
    </>
  );
};

export default MetamaskComponent;
