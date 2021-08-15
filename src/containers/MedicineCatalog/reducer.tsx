import { IMedicineDP } from "../../models/medicineDP.interface";

export const MEDICINEDP_STATE: IMedicineDP = {
  medicineSubContract: "",
  medicineId: "",
  materialId: "",
  medicineName: "",
  description: "",
  location: "",
  quantity: 0,
  shipper: "",
  distributor: "",
  manufacturer: "",
  packageStatus: "",
  pharma: "",
  transactionBlocksDP: [],
  saleStatus: 0,
};

export const medicineDPReducer = (
  state: IMedicineDP,
  action: any
): IMedicineDP => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "SET_MEDICINEDP":
      const data: IMedicineDP = action["data"];
      return {
        ...state,
        medicineSubContract: data.medicineSubContract,
        medicineId: data.medicineId,
        materialId: data.materialId,
        medicineName: data.medicineName,
        description: data.description,
        location: data.location,
        quantity: data.quantity,
        shipper: data.shipper,
        manufacturer: data.manufacturer,
        distributor: data.distributor,
        packageStatus: data.packageStatus,
        pharma: data.pharma,
        transactionBlocksDP: data.transactionBlocksDP,
        saleStatus: data.saleStatus,
      };
    case "RESET":
      return MEDICINEDP_STATE;
    case "UPDATE_SALE_STATUS":
      return {
        ...state,
        saleStatus: action["status"],
      };
    default:
      return state;
  }
};

import { ICustomer } from "../../models/customer.interface";

export const CUSTOMER_STATE: ICustomer = {
  medicineSubContract: "",
  materialId: "",
  medicineId: "",
  customerName: "",
  customerAge: 0,
  doctorName: "",
  quantity: 0,
  amountPaid: 0,
  pharma: "",
};

export const customerReducer = (state: ICustomer, action: any): ICustomer => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "SET_CUSTOMER":
      const data: ICustomer = action["data"];
      return {
        ...state,
        medicineSubContract: data.medicineSubContract,
        medicineId: data.medicineId,
        materialId: data.materialId,
        pharma: data.pharma,
        doctorName: data.doctorName,
        customerAge: data.customerAge,
        customerName: data.customerName,
        quantity: data.quantity,
        amountPaid: data.amountPaid,
      };
    case "RESET":
      return CUSTOMER_STATE;
    default:
      return state;
  }
};
