import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import RouteItem from "../models/route.interface";
import { Helmet } from "react-helmet";
import { APP_TITLE, PHARMA_SUPPLY_CHAIN } from "../utils/constants";
import { SpinnerContextProvider } from "../context/SpinnerContext";
import MSpinnerComponent from "../generic/MSpinner";
import LoaderComponent from "../generic/Loader";

// Lazy loading

const Default = lazy(() => import("../generic/Default"));

//Build app routing data array using RouteItem interface
export const routes: Array<RouteItem> = [
  {
    key: "router-login",
    title: APP_TITLE,
    path: "/medicine/:id",
    enabled: true,
    component: lazy(() => import("../containers/MedicineTimeline")),
  },
];

const PublicRoute = () => {
  return (
    <SpinnerContextProvider>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<LoaderComponent />}>
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
          </Suspense>
        </Switch>
      </BrowserRouter>
    </SpinnerContextProvider>
  );
};

export default PublicRoute;
