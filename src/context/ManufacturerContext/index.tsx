import React, { useReducer } from "react";
import { IManufacturerContext } from "../../models/manufacturer.interface";
import { IRawMaterial } from "../../models/material.interface";
import { IMedicine } from "../../models/medicine.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Manufacturer_Initial_State: IManufacturerContext = {
  medicineBatchCount: 0,
  medicineShippedCount: 0,
  rawMaterialsReceived: [] as IRawMaterial[],
  registeredMedicineBatch: [] as IMedicine[],
  storeManufacturerDashboardData: undefined,
};

const ManufacturerContext = React.createContext<IManufacturerContext>(
  Manufacturer_Initial_State
);

const ManufacturerContextProvider = (props: any) => {
  const [ManufacturerContextState, dispatchManufacturerContextAction] =
    useReducer(reducer, Manufacturer_Initial_State);

  const storeManufacturerDashboardDataHandler = (
    _medicineCount: any,
    _batchesCount: any,
    _materials: any[],
    _medicines: any[]
  ) => {
    dispatchManufacturerContextAction({
      type: actionTypes.SET_MANUFACTURER_DASHBOARD_DATA,
      medicineCount: _medicineCount,
      batchesCount: _batchesCount,
      materials: _materials,
      medicines: _medicines,
    });
  };

  return (
    <ManufacturerContext.Provider
      value={{
        medicineBatchCount: ManufacturerContextState.medicineBatchCount,
        medicineShippedCount: ManufacturerContextState.medicineShippedCount,
        rawMaterialsReceived: ManufacturerContextState.rawMaterialsReceived,
        registeredMedicineBatch:
          ManufacturerContextState.registeredMedicineBatch,
        storeManufacturerDashboardData: storeManufacturerDashboardDataHandler,
      }}
    >
      {props.children}
    </ManufacturerContext.Provider>
  );
};

export { ManufacturerContext, ManufacturerContextProvider };
