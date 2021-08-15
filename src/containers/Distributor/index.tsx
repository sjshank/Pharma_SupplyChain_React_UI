import React from "react";
import { DistributorContextProvider } from "../../context/DistributorContext";
import DashboardLayout from "../../layout/DashboardPage";
import { DISTRIBUTOR_DASHBOARD_TITLE } from "../../utils/constants";
import DistributionBoardComponent from "./Distribution";

const DistributorDashboardComponent = () => {
  return (
    <DistributorContextProvider>
      <DashboardLayout headerTitle={DISTRIBUTOR_DASHBOARD_TITLE}>
        <DistributionBoardComponent />
      </DashboardLayout>
    </DistributorContextProvider>
  );
};

export default DistributorDashboardComponent;
