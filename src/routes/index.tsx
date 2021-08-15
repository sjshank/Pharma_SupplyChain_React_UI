import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import RouteItem from "../models/route.interface";
import { Helmet } from "react-helmet";
import {
  PHARMA_SUPPLY_CHAIN,
  APP_TITLE,
  ADMIN_DASHBOARD_TITLE,
  SUPPLIER_DASHBOARD_TITLE,
  MANUFACTURER_DASHBOARD_TITLE,
  DISTRIBUTOR_DASHBOARD_TITLE,
  PHARMA_DASHBOARD_TITLE,
  INSPECTOR_DASHBOARD_TITLE,
  TRANSPORTER_DASHBOARD_TITLE,
} from "../utils/constants";
import { AdminContextProvider } from "../context/AdminContext";
import { DialogContextProvider } from "../context/DialogContext";
import { SupplierContextProvider } from "../context/SupplierContext";
import { ManufacturerContextProvider } from "../context/ManufacturerContext";
import { DistributorContextProvider } from "../context/DistributorContext";
import { PharmaContextProvider } from "../context/PharmaContext";
import LoaderComponent from "../generic/Loader";

// Lazy loading

const Default = lazy(() => import("../generic/Default"));
const Spinner = lazy(() => import("../generic/MSpinner"));

//Build app routing data array using RouteItem interface
export const routes: Array<RouteItem> = [
  {
    key: "router-login",
    title: APP_TITLE,
    path: "/",
    enabled: true,
    component: lazy(() => import("../containers/Login")),
  },
  {
    key: "router-admin",
    title: ADMIN_DASHBOARD_TITLE,
    path: "/admin",
    enabled: true,
    component: lazy(() => import("../containers/Admin")),
  },
  {
    key: "router-supplier",
    title: SUPPLIER_DASHBOARD_TITLE,
    path: "/supplier",
    enabled: true,
    component: lazy(() => import("../containers/Supplier")),
  },
  {
    key: "router-manufacturer",
    title: MANUFACTURER_DASHBOARD_TITLE,
    path: "/manufacturer",
    enabled: true,
    component: lazy(() => import("../containers/Manufacturer")),
  },
  {
    key: "router-distributor",
    title: DISTRIBUTOR_DASHBOARD_TITLE,
    path: "/distributor",
    enabled: true,
    component: lazy(() => import("../containers/Distributor")),
  },
  {
    key: "router-pharma",
    title: PHARMA_DASHBOARD_TITLE,
    path: "/pharma",
    enabled: true,
    component: lazy(() => import("../containers/Pharma")),
  },
  {
    key: "router-inspector",
    title: INSPECTOR_DASHBOARD_TITLE,
    path: "/inspector",
    enabled: true,
    component: lazy(() => import("../containers/Inspector")),
  },
  {
    key: "router-transporter",
    title: TRANSPORTER_DASHBOARD_TITLE,
    path: "/transporter",
    enabled: true,
    component: lazy(() => import("../containers/Transporter")),
  },
  {
    key: "router-logout",
    path: "/logout",
    title: APP_TITLE,
    enabled: true,
    component: lazy(() => import("../containers/Login")),
  },
];

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<LoaderComponent />}>
          <Spinner />
          <DialogContextProvider>
            <AdminContextProvider>
              <SupplierContextProvider>
                {routes.map((route: RouteItem) =>
                  route.subRoutes ? (
                    route.subRoutes.map((item: RouteItem) => (
                      <div key={`${item.key}-${item.title}`}>
                        <Helmet>
                          <title>{`${PHARMA_SUPPLY_CHAIN} | ${route.title}`}</title>
                        </Helmet>
                        <Route
                          path={`${item.path}`}
                          component={item.component || Default}
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
                        component={route.component || Default}
                        exact
                      />
                    </div>
                  )
                )}
              </SupplierContextProvider>
            </AdminContextProvider>
          </DialogContextProvider>
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoute;
