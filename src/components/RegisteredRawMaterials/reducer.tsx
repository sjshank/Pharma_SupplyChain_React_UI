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

export const reducer = (state: IRawMaterial, action: any): IRawMaterial => {
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
