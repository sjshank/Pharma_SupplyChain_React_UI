import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AppHeaderComponent from "../../components/AppHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import { APP_FOOTER_TEXT } from "../../utils/constants";
import AppFooterComponent from "../../components/AppFooter";
import Container from "@material-ui/core/Container";
import NotAuthorizedComponent from "../../generic/NotAuthorized";
import useCustomTheme from "../../hooks/useCustomTheme";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import { LoginContextProvider } from "../../context/LoginContext";

type DashboardPageProps = {
  headerTitle: string;
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
    container: {
      marginTop: 10,
    },
  })
);

const DashboardLayout = ({
  headerTitle,
  toggleTheme,
  useDefaultTheme,
  children,
}: DashboardPageProps) => {
  const classes = useStyles();
  const customTheme = useCustomTheme();
  const isAuth = useIsAuthorized();

  const result = isAuth ? (
    <main className={classes.content}>{children}</main>
  ) : (
    <main className={classes.content}>
      <NotAuthorizedComponent />
    </main>
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline>
        <div className={classes.root}>
          <LoginContextProvider>
            <AppHeaderComponent title={headerTitle} />
          </LoginContextProvider>
          <Container className={classes.container}>{result}</Container>
          <AppFooterComponent footerText={APP_FOOTER_TEXT} />
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default DashboardLayout;
