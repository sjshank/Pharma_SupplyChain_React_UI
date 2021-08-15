import React from "react";
import { PharmaContextProvider } from "../../context/PharmaContext";
import DashboardLayout from "../../layout/DashboardPage";
import { PHARMA_DASHBOARD_TITLE } from "../../utils/constants";
import PharmaShopComponent from "./Shop";

const PharmaDashboardComponent = () => {
  return (
    <PharmaContextProvider>
      <DashboardLayout headerTitle={PHARMA_DASHBOARD_TITLE}>
        <PharmaShopComponent />
      </DashboardLayout>
    </PharmaContextProvider>
  );
};

export default PharmaDashboardComponent;
