import { IMedicineDP } from "./medicineDP.interface";

export interface IPharmaContext {
  medicineBatchesReceivedFromDist: IMedicineDP[];
  expiredCount: number | any;
  approvedCount: number | any;
  medicineIDs: string[];
  subContractIDs?: any[];
  customers: any[];
  storePharmaDashboardData: any;
  storeCustomerData: any;
}
