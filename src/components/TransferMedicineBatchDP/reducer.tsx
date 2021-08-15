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
      };
    case "RESET":
      return MEDICINEDP_STATE;
    case "SET_MEDICINEDP_PARTIAL":
      const inputData: IMedicineDP = action["data"];
      return {
        ...state,
        medicineSubContract: inputData.medicineSubContract,
        medicineId: inputData.medicineId,
        materialId: inputData.materialId,
        medicineName: inputData.medicineName,
        description: inputData.description,
        location: inputData.location,
        quantity: inputData.quantity,
        shipper: "",
        manufacturer: inputData.manufacturer,
        distributor: inputData.distributor,
        packageStatus: 0,
        pharma: "",
        transactionBlocksDP: [],
      };
    default:
      return state;
  }
};

export const VIEW_STATE: any = {
  isSelectMedicine: true,
  isSubmitTransferRequest: false,
};

export const viewReducer = (state: any, action: any): any => {
  switch (action.type) {
    case "SELECT_MEDICINE":
      return {
        ...state,
        isSelectMedicine: action["isSelectMedicine"],
        isSubmitTransferRequest: false,
      };
    case "SUBMIT_TRANSFER_REQUEST":
      return {
        ...state,
        isSelectMedicine: false,
        isSubmitTransferRequest: action["isSubmitTransferRequest"],
      };
    default:
      return state;
  }
};
