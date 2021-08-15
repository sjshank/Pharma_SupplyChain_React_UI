import React from "react";
import { TransporterContextProvider } from "../../context/TransporterContext";
import DashboardLayout from "../../layout/DashboardPage";
import { TRANSPORTER_DASHBOARD_TITLE } from "../../utils/constants";
import ShipmentBoardComponent from "./Shipment";

const InspectorDashboardBoardComponent = () => {
  return (
    <TransporterContextProvider>
      <DashboardLayout headerTitle={TRANSPORTER_DASHBOARD_TITLE}>
        <ShipmentBoardComponent />
      </DashboardLayout>
    </TransporterContextProvider>
  );
};

export default InspectorDashboardBoardComponent;
