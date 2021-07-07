import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { APP_FOOTER_TEXT } from "../../utils/constants";
import AppFooterComponent from "../../components/AppFooter";

type LandingPageProps = {
  children: React.ReactNode;
  toggleTheme?: () => void;
  useDefaultTheme?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      minHeight: `calc(100vh - 30px)`,
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
  })
);

const LandingPageLayout = ({
  toggleTheme,
  useDefaultTheme,
  children,
}: LandingPageProps) => {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <main className={classes.content}>{children}</main>
        <AppFooterComponent footerText={APP_FOOTER_TEXT} />
      </div>
    </CssBaseline>
  );
};

export default LandingPageLayout;
