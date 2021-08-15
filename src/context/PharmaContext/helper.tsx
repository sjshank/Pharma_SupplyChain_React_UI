import { IPharmaContext } from "../../models/pharma.interface";

export const storeCustomerData = (
  state: IPharmaContext,
  action: any
): IPharmaContext => {
  return {
    ...state,
    customers: action["customers"],
  };
};

export const updateMedicineDPBatches = (
  state: IPharmaContext,
  action: any
): IPharmaContext => {
  return {
    ...state,
    medicineBatchesReceivedFromDist: action["medicinesDP"],
  };
};

export const setApprovedMedicinesDP = (
  state: IPharmaContext,
  action: any
): IPharmaContext => {
  return {
    ...state,
    approvedMedicinesDP: action["medicinesDP"],
  };
};

export const setExpiredMedicinesDP = (
  state: IPharmaContext,
  action: any
): IPharmaContext => {
  return {
    ...state,
    expiredMedicinesDP: action["medicinesDP"],
  };
};
