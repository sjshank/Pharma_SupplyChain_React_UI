import React from "react";
import { SupplierContextProvider } from "../../context/SupplierContext";
import DashboardLayout from "../../layout/DashboardPage";
import { SUPPLIER_DASHBOARD_TITLE } from "../../utils/constants";
import SupplyBoardComponent from "./Supply";

const SupplierDashboardBoardComponent = () => {
  return (
    <SupplierContextProvider>
      <DashboardLayout headerTitle={SUPPLIER_DASHBOARD_TITLE}>
        <SupplyBoardComponent />
      </DashboardLayout>
    </SupplierContextProvider>
  );
};

export default SupplierDashboardBoardComponent;
