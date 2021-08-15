import React, { useReducer } from "react";
import { IDistributorContext } from "../../models/distributor.interface";
import { IMedicine } from "../../models/medicine.interface";
import { IMedicineDP } from "../../models/medicineDP.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Distributor_Initial_State: IDistributorContext = {
  batchesShippedCount: 0,
  medicineBatchesReceivedFromManuf: [] as IMedicine[],
  medicineBatchesTransferredToPharma: [] as IMedicineDP[],
  storeDistributorDashboardData: undefined,
  updateReceivedMedicines: undefined,
  updateTransferredMedicines: undefined,
};

const DistributorContext = React.createContext<IDistributorContext>(
  Distributor_Initial_State
);

const DistributorContextProvider = (props: any) => {
  const [DistributorContextState, dispatchDistributorContextAction] =
    useReducer(reducer, Distributor_Initial_State);

  const storeDistributorDashboardDataHandler = (
    _batchesCount: any,
    _medicinesReceived: any[],
    _medicinesTransferred: any[]
  ) => {
    dispatchDistributorContextAction({
      type: actionTypes.SET_DISTRIBUTOR_DASHBOARD_DATA,
      batchesCount: _batchesCount,
      medicinesReceived: _medicinesReceived,
      medicinesTransferred: _medicinesTransferred,
    });
  };

  const updateMedicineListReceivedFromManuf = (_medicinesReceived: any[]) => {
    dispatchDistributorContextAction({
      type: actionTypes.SET_RECEIEVED_MEDICINES,
      medicinesReceived: _medicinesReceived,
    });
  };

  const updateTransferredMedicineDPList = (_medicinesTransferred: any[]) => {
    dispatchDistributorContextAction({
      type: actionTypes.SET_TRANSFERRED_MEDICINES,
      medicinesTransferred: _medicinesTransferred,
    });
  };

  return (
    <DistributorContext.Provider
      value={{
        batchesShippedCount: DistributorContextState.batchesShippedCount,
        medicineBatchesReceivedFromManuf:
          DistributorContextState.medicineBatchesReceivedFromManuf,
        medicineBatchesTransferredToPharma:
          DistributorContextState.medicineBatchesTransferredToPharma,
        storeDistributorDashboardData: storeDistributorDashboardDataHandler,
        updateReceivedMedicines: updateMedicineListReceivedFromManuf,
        updateTransferredMedicines: updateTransferredMedicineDPList,
      }}
    >
      {props.children}
    </DistributorContext.Provider>
  );
};

export { DistributorContext, DistributorContextProvider };
