interface ITableHeader {
  name: string;
  id: string;
}

const userRolesTable: Array<ITableHeader> = [
  {
    name: "Role Name",
    id: "roleName",
  },
  {
    name: "Permission",
    id: "permission",
  },
];

const registeredUsersTableHeader: Array<ITableHeader> = [
  {
    name: "User Address",
    id: "userAddress",
  },
  {
    name: "Name",
    id: "userName",
  },
  {
    name: "Location",
    id: "userLocation",
  },
  {
    name: "Role",
    id: "userRole",
  },
  {
    name: "Status",
    id: "userStatus",
  },
  {
    name: "Action",
    id: "action",
  },
];

const materialInfoTbl: ITableHeader[] = [
  {
    name: "Material Name",
    id: "producerName",
  },
  {
    name: "Description",
    id: "description",
  },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
];

const medicineInfoTbl: ITableHeader[] = [
  {
    name: "Medicine Name",
    id: "medicineName",
  },
  {
    name: "Description",
    id: "description",
  },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
];

const statusInfoTbl: ITableHeader[] = [
  {
    name: "Status",
    id: "packageStatus",
  },
  {
    name: "Action",
    id: "action",
  },
];

const registeredRawMaterialsTable: Array<ITableHeader> = [
  {
    name: "Manufacturer",
    id: "manufacturer",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
];

const rawMaterialsReceivedTable: Array<ITableHeader> = [
  {
    name: "Supplier",
    id: "supplier",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
];

const medicinesManufacturedTable: Array<ITableHeader> = [
  {
    name: "Distributor",
    id: "distributor",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
];

const medicineBatchesReceivedTable: Array<ITableHeader> = [
  {
    name: "Manufacturer",
    id: "manufacturer",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
];


const medicineDetailsTable: Array<ITableHeader> = [
  {
    name: "Manufacturer",
    id: "manufacturer",
  },
  {
    name: "",
    id: "action",
  },
];

const customerListTable: Array<ITableHeader> = [
  {
    name: "Buyer",
    id: "customerName",
  },
  {
    name: "Age",
    id: "customerAge",
  },
  {
    name: "Doctor",
    id: "doctorName",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Amount Paid",
    id: "amountPaid",
  },
  {
    name: "Updates",
    id: "viewUpdates",
  },
];

const userInfoTable: Array<ITableHeader> = [
  {
    name: "User Name",
    id: "userName",
  },
  {
    name: "Address",
    id: "userAddress",
  },
  {
    name: "Location",
    id: "userLocation",
  },
  {
    name: "Status",
    id: "userStatus",
  },
];

const batchInfoRawMaterialTable: Array<ITableHeader> = [
  {
    name: "Material Name",
    id: "producerName",
  },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Sender",
    id: "supplier",
  },
  {
    name: "Receiver",
    id: "manufacturer",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
  {
    name: "Status",
    id: "packageStatus",
  },
];

const batchInfoMedicineDetailsTable: Array<ITableHeader> = [
  {
    name: "Medicine Name",
    id: "medicineName",
  },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Sender",
    id: "manufacturer",
  },
  {
    name: "Receiver",
    id: "distributor",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
  {
    name: "Status",
    id: "packageStatus",
  },
];

const materialInspectionTable: Array<ITableHeader> = [
  {
    name: "Sender",
    id: "supplier",
  },
  {
    name: "Receiver",
    id: "manufacturer",
  },
];

const materialShipmentTable: Array<ITableHeader> = [
  {
    name: "Sender",
    id: "supplier",
  },
  {
    name: "Receiver",
    id: "manufacturer",
  },
];

const medicineInspectionTble: Array<ITableHeader> = [
  {
    name: "Sender",
    id: "manufacturer",
  },
  {
    name: "Receiver",
    id: "distributor",
  },
];

const medicineShipmentTbl: Array<ITableHeader> = [
  {
    name: "Sender",
    id: "manufacturer",
  },
  {
    name: "Receiver",
    id: "distributor",
  },
];

const medicineBatchDPReceivedTbl: Array<ITableHeader> = [
  {
    name: "Manufacturer",
    id: "manufacturer",
  },
  {
    name: "Distributor",
    id: "distributor",
  },
  // {
  //   name: "Status",
  //   id: "packageStatus",
  // },
  {
    name: "Action",
    id: "action",
  },
];

const getMaterialInfo = () => {
  return materialInfoTbl;
};

const getMedicineInfo = () => {
  return medicineInfoTbl;
};

const getStatusInfo = () => {
  return statusInfoTbl;
};

const populateMaterialTblHeaders = (customHeaders) => {
  return [...getMaterialInfo(), ...customHeaders, ...getStatusInfo()];
};

const populateMedicineTblHeaders = (customHeaders) => {
  return [...getMedicineInfo(), ...customHeaders, ...getStatusInfo()];
};

const useTableHeaders = (tableName: string) => {
  let headers: ITableHeader[] = [];

  switch (tableName) {
    case "userRoles":
      headers = userRolesTable;
      break;
    case "registeredUsers":
      headers = registeredUsersTableHeader;
      break;
    case "registeredRawMaterials":
      headers = populateMaterialTblHeaders(registeredRawMaterialsTable);
      break;
    case "receivedRawMaterials":
      headers = populateMaterialTblHeaders(rawMaterialsReceivedTable);
      break;
    case "medicinesManufactured":
      headers = populateMedicineTblHeaders(medicinesManufacturedTable);
      break;
    case "medicineBatchesReceived":
      headers = populateMedicineTblHeaders(medicineBatchesReceivedTable);
      break;
    case "medicineDetails":
      headers = [...getMedicineInfo(), ...medicineDetailsTable];
      break;
    case "customers":
      headers = customerListTable;
      break;
    case "userInfo":
      headers = userInfoTable;
      break;
    case "batchInfoMaterial":
      headers = batchInfoRawMaterialTable;
      break;
    case "batchInfoMedicine":
      headers = batchInfoMedicineDetailsTable;
      break;
    case "materialInspection":
      headers = populateMaterialTblHeaders(materialInspectionTable);
      break;
    case "materialShipment":
      headers = populateMaterialTblHeaders(materialShipmentTable);
      break;
    case "medicineInspection":
      headers = populateMedicineTblHeaders(medicineInspectionTble);
      break;
    case "medicineShipment":
      headers = populateMedicineTblHeaders(medicineShipmentTbl);
      break;
    case "medicineBatchDPReceived":
      headers = [...getMedicineInfo(), ...medicineBatchDPReceivedTbl];
      break;
    default:
      break;
  }
  return headers;
};

export default useTableHeaders;
