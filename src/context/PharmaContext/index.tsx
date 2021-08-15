import React, { useReducer } from "react";
import { IMedicineDP } from "../../models/medicineDP.interface";
import { IPharmaContext } from "../../models/pharma.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Pharma_Initial_State: IPharmaContext = {
  medicineBatchesReceivedFromDist: [] as IMedicineDP[],
  customers: [],
  storeCustomerData: undefined,
  approvedMedicinesDP: [] as IMedicineDP[],
  expiredMedicinesDP: [] as IMedicineDP[],
  populateApprovedMedicinesDP: (approvedMedicinesDP: Array<IMedicineDP>) =>
    undefined,
  populateExpiredMedicinesDP: (expiredMedicinesDP: Array<IMedicineDP>) =>
    undefined,
  updateReceivedMedicineDPBatches: (medicinesDP: IMedicineDP[]) => undefined,
};

const PharmaContext = React.createContext<IPharmaContext>(Pharma_Initial_State);

const PharmaContextProvider = (props: any) => {
  const [PharmaContextState, dispatchPharmaContextAction] = useReducer(
    reducer,
    Pharma_Initial_State
  );

  const storeCustomerDataHandler = (_customers: any[]) => {
    dispatchPharmaContextAction({
      type: actionTypes.SET_CUSTOMER_DATA,
      customers: _customers,
    });
  };

  const updateReceivedMedicineDPBatchesHandler = (
    _medicinesDP: IMedicineDP[]
  ) => {
    dispatchPharmaContextAction({
      type: actionTypes.UPDATE_MEDICINESDP_BATCHES,
      medicinesDP: _medicinesDP,
    });
  };

  const populateApprovedMedicinesDPHandler = (_medicinesDP: IMedicineDP[]) => {
    dispatchPharmaContextAction({
      type: actionTypes.SET_APPROVED_MEDICINEDP_BATCHES,
      medicinesDP: _medicinesDP,
    });
  };

  const populateExpiredMedicinesDPHandler = (_medicinesDP: IMedicineDP[]) => {
    dispatchPharmaContextAction({
      type: actionTypes.SET_EXPIRED_MEDICINEDP_BATCHES,
      medicinesDP: _medicinesDP,
    });
  };

  return (
    <PharmaContext.Provider
      value={{
        medicineBatchesReceivedFromDist:
          PharmaContextState.medicineBatchesReceivedFromDist,
        customers: PharmaContextState.customers,
        approvedMedicinesDP: PharmaContextState.approvedMedicinesDP,
        expiredMedicinesDP: PharmaContextState.expiredMedicinesDP,
        storeCustomerData: storeCustomerDataHandler,
        updateReceivedMedicineDPBatches: updateReceivedMedicineDPBatchesHandler,
        populateApprovedMedicinesDP: populateApprovedMedicinesDPHandler,
        populateExpiredMedicinesDP: populateExpiredMedicinesDPHandler,
      }}
    >
      {props.children}
    </PharmaContext.Provider>
  );
};

export { PharmaContext, PharmaContextProvider };
