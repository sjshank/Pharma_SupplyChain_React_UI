import React, { useReducer } from "react";
import { IMedicineDP } from "../../models/medicineDP.interface";
import { IPharmaContext } from "../../models/pharma.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Pharma_Initial_State: IPharmaContext = {
  medicineBatchesReceivedFromDist: [] as IMedicineDP[],
  expiredCount: 0,
  approvedCount: 0,
  medicineIDs: [] as string[],
  subContractIDs: [],
  customers: [],
  storePharmaDashboardData: undefined,
  storeCustomerData: undefined,
};

const PharmaContext = React.createContext<IPharmaContext>(Pharma_Initial_State);

const PharmaContextProvider = (props: any) => {
  const [PharmaContextState, dispatchPharmaContextAction] = useReducer(
    reducer,
    Pharma_Initial_State
  );

  const storePharmaDashboardDataHandler = (
    _medicines: IMedicineDP[] = [],
    _expired: number = 0,
    _approved: number = 0,
    _medicineIds: String[] = [],
    _customers: any[] = [],
    _subContracts: any[] = []
  ) => {
    dispatchPharmaContextAction({
      type: actionTypes.SET_PHARMA_DASHBOARD_DATA,
      medicines: _medicines,
      expired: _expired,
      approved: _approved,
      medicineIds: _medicineIds,
      customers: _customers,
      subContracts: _subContracts,
    });
  };

  const storeCustomerDataHandler = (_customers: any[]) => {
    dispatchPharmaContextAction({
      type: actionTypes.SET_CUSTOMER_DATA,
      customers: _customers,
    });
  };

  return (
    <PharmaContext.Provider
      value={{
        medicineBatchesReceivedFromDist:
          PharmaContextState.medicineBatchesReceivedFromDist,
        expiredCount: PharmaContextState.expiredCount,
        approvedCount: PharmaContextState.approvedCount,
        medicineIDs: PharmaContextState.medicineIDs,
        subContractIDs: PharmaContextState.subContractIDs,
        customers: PharmaContextState.customers,
        storePharmaDashboardData: storePharmaDashboardDataHandler,
        storeCustomerData: storeCustomerDataHandler,
      }}
    >
      {props.children}
    </PharmaContext.Provider>
  );
};

export { PharmaContext, PharmaContextProvider };
