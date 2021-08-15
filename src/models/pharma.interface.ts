import { IMedicineDP } from "./medicineDP.interface";

export interface IPharmaContext extends IPharmaUpdate {
  medicineBatchesReceivedFromDist: IMedicineDP[];
  customers: any[];
  storeCustomerData: any;
}

interface IPharmaUpdate {
  approvedMedicinesDP: IMedicineDP[];
  expiredMedicinesDP: IMedicineDP[];
  populateApprovedMedicinesDP(approvedMedicinesDP: Array<IMedicineDP>): any;
  populateExpiredMedicinesDP(expiredMedicinesDP: Array<IMedicineDP>): any;
  updateReceivedMedicineDPBatches(medicinesDP: Array<IMedicineDP>): any;
}
