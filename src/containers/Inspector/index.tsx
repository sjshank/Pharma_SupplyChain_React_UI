import React from "react";
import { InspectionContextProvider } from "../../context/InspectionContext";
import DashboardLayout from "../../layout/DashboardPage";
import { INSPECTOR_DASHBOARD_TITLE } from "../../utils/constants";
import InspectionBoardComponent from "./Inspection";

const InspectorDashboardBoardComponent = () => {
  return (
    <InspectionContextProvider>
      <DashboardLayout headerTitle={INSPECTOR_DASHBOARD_TITLE}>
        <InspectionBoardComponent />
      </DashboardLayout>
    </InspectionContextProvider>
  );
};

export default InspectorDashboardBoardComponent;
