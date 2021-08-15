import { IMedicine } from "../../models/medicine.interface";

export const MEDICINE_STATE: IMedicine = {
  medicineId: "",
  materialId: "",
  medicineName: "",
  description: "",
  location: "",
  quantity: 0,
  shipper: "",
  manufacturer: "",
  distributor: "",
  packageStatus: "",
  inspector: "",
};

export const medicineReducer = (state: IMedicine, action: any): IMedicine => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "SET_MEDICINE":
      const data: IMedicine = action["data"];
      return {
        ...state,
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
        inspector: data.inspector,
      };
    case "RESET":
      return MEDICINE_STATE;
    default:
      return state;
  }
};

export const VIEW_STATE: any = {
  isSelectMaterial: true,
  showMaterialDetails: false,
  isSubmitMedicineDetails: false,
  isEditMedicine: false,
};

export const viewReducer = (state: any, action: any): any => {
  switch (action.type) {
    case "SELECT_MATERIAL":
      return {
        ...state,
        isSelectMaterial: action["isSelectMaterial"],
        isSubmitMedicineDetails: false,
        showMaterialDetails: false,
        isEditMedicine: false,
      };
    case "SHOW_MATERIAL_DETAILS":
      return {
        ...state,
        isSelectMaterial: false,
        isEditMedicine: false,
        isSubmitMedicineDetails: false,
        showMaterialDetails: action["showMaterialDetails"],
      };
    case "SUBMIT_MEDICINE_DETAILS":
      return {
        ...state,
        isSubmitMedicineDetails: action["isSubmitMedicineDetails"],
        isSelectMaterial: false,
        showMaterialDetails: false,
        isEditMedicine: false,
      };
    case "EDIT_MEDICINE_DETAILS":
      return {
        ...state,
        isEditMedicine: action["isEditMedicine"],
        isSelectMaterial: false,
        showMaterialDetails: false,
        isSubmitMedicineDetails: false,
      };
    default:
      return state;
  }
};

import { IRawMaterial } from "../../models/material.interface";

export const RAW_MATERIAL_STATE: IRawMaterial = {
  producerName: "",
  description: "",
  location: "",
  quantity: 0,
  shipper: "",
  manufacturer: "",
  inspector: "",
  supplier: "",
  materialId: "",
};

export const materialReducer = (
  state: IRawMaterial,
  action: any
): IRawMaterial => {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "SET_RAW_MATERIAL":
      const data: IRawMaterial = action["data"];
      return {
        ...state,
        materialId: data.materialId,
        producerName: data.producerName,
        description: data.description,
        location: data.location,
        quantity: data.quantity,
        manufacturer: data.manufacturer,
        shipper: data.shipper,
        inspector: data.inspector,
      };
    case "RESET":
      return RAW_MATERIAL_STATE;
    default:
      return state;
  }
};
