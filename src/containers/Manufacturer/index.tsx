import React from "react";
import { ManufacturerContextProvider } from "../../context/ManufacturerContext";
import DashboardLayout from "../../layout/DashboardPage";
import { MANUFACTURER_DASHBOARD_TITLE } from "../../utils/constants";
import ManufacturingBoardComponent from "./Manufacturing";

const ManufacturerDashboardComponent = () => {
  return (
    <ManufacturerContextProvider>
      <DashboardLayout headerTitle={MANUFACTURER_DASHBOARD_TITLE}>
        <ManufacturingBoardComponent />
      </DashboardLayout>
    </ManufacturerContextProvider>
  );
};

export default ManufacturerDashboardComponent;
