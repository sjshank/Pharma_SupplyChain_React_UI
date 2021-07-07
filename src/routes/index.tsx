import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import RouteItem from "../models/route.interface";
import LoginComponent from "../containers/Login";
import AdminDashboardComponent from "../containers/Admin";
import CircularProgress from "@material-ui/core/CircularProgress";
import DefaultComponent from "../components/Default";
import { Helmet } from "react-helmet";
import {
  PHARMA_SUPPLY_CHAIN,
  APP_TITLE,
  ADMIN_DASHBOARD_TITLE,
} from "../utils/constants";
import MSpinnerComponent from "../generic/MSpinner";

//Build app routing data array using RouteItem interface
export const routes: Array<RouteItem> = [
  {
    key: "router-login",
    title: APP_TITLE,
    path: "/",
    enabled: true,
    component: LoginComponent,
  },
  {
    key: "router-dashboard",
    title: ADMIN_DASHBOARD_TITLE,
    path: "/dashboard",
    enabled: true,
    component: AdminDashboardComponent,
  },
];

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense
          fallback={
            <div className="">
              <CircularProgress variant="indeterminate" />
            </div>
          }
        >
           <MSpinnerComponent />
          {routes.map((route: RouteItem) =>
            route.subRoutes ? (
              route.subRoutes.map((item: RouteItem) => (
                <div key={`${item.key}-${item.title}`}>
                  <Helmet>
                    <title>{`${PHARMA_SUPPLY_CHAIN} | ${route.title}`}</title>
                  </Helmet>
                  <Route
                    path={`${item.path}`}
                    component={item.component || DefaultComponent}
                    exact
                  />
                </div>
              ))
            ) : (
              <div key={`${route.key}-${route.title}`}>
                <Helmet>
                  <title>{`${PHARMA_SUPPLY_CHAIN} | ${route.title}`}</title>
                </Helmet>
                <Route
                  path={`${route.path}`}
                  component={route.component || DefaultComponent}
                  exact
                />
              </div>
            )
          )}
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoute;
