import React from "react";

interface RouteItem {
  key: String;
  title: String;
  path?: String;
  component?: React.FC;
  enabled: boolean;
  subRoutes?: Array<RouteItem>;
}

export default RouteItem;
