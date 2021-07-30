import React, { useReducer } from "react";
import { IRawMaterial } from "../../models/material.interface";
import { ISupplierContext } from "../../models/supplier.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Supplier_Initial_State: ISupplierContext = {
  materialCount: 0,
  batchesShippedCount: 0,
  registeredMaterials: [] as IRawMaterial[],
  storeSupplierData: undefined,
};

const SupplierContext = React.createContext<ISupplierContext>(
  Supplier_Initial_State
);

const SupplierContextProvider = (props: any) => {
  const [SupplierContextState, dispatchSupplierContextAction] = useReducer(
    reducer,
    Supplier_Initial_State
  );

  const storeSupplierDashboardDataHandler = (
    _materialCount: any,
    _batchesShippedCount: any,
    _registeredMaterials: any[]
  ) => {
    dispatchSupplierContextAction({
      type: actionTypes.SET_SUPPLIER_DASHBOARD_DATA,
      materialCount: _materialCount,
      batchesCount: _batchesShippedCount,
      materials: _registeredMaterials,
    });
  };

  return (
    <SupplierContext.Provider
      value={{
        materialCount: SupplierContextState.materialCount,
        batchesShippedCount: SupplierContextState.batchesShippedCount,
        registeredMaterials: SupplierContextState.registeredMaterials,
        storeSupplierData: storeSupplierDashboardDataHandler,
      }}
    >
      {props.children}
    </SupplierContext.Provider>
  );
};

export { SupplierContext, SupplierContextProvider };
