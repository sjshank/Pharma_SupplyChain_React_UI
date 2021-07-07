import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppHeaderComponent from "../../components/AppHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ADMIN_DASHBOARD_TITLE, APP_FOOTER_TEXT } from "../../utils/constants";
import AppFooterComponent from "../../components/AppFooter";
import Container from "@material-ui/core/Container";

type DashboardPageProps = {
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

const DashboardLayout = ({
  toggleTheme,
  useDefaultTheme,
  children,
}: DashboardPageProps) => {
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <AppHeaderComponent title={ADMIN_DASHBOARD_TITLE} />
        <Container>
          <main className={classes.content}>{children}</main>
        </Container>
        <AppFooterComponent footerText={APP_FOOTER_TEXT} />
      </div>
    </CssBaseline>
  );
};

export default DashboardLayout;
