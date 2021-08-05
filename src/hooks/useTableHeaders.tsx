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

const registeredRawMaterialsTable: Array<ITableHeader> = [
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
  {
    name: "Manufacturer",
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
  {
    name: "Action",
    id: "action",
  },
];

const rawMaterialsReceivedTable: Array<ITableHeader> = [
  {
    name: "Material Name",
    id: "producerName",
  },
  // {
  //   name: "Material Description",
  //   id: "description",
  // },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Supplier",
    id: "supplier",
  },
  {
    name: "Transporter",
    id: "shipper",
  },
  {
    name: "Status",
    id: "packageStatus",
  },
  {
    name: "Action",
    id: "action",
  },
];

const medicinesManufacturedTable: Array<ITableHeader> = [
  {
    name: "Medicine Name",
    id: "medicineName",
  },
  // {
  //   name: "Description",
  //   id: "description",
  // },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Distributor",
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
  {
    name: "Action",
    id: "action",
  },
];

const medicineBatchesReceivedTable: Array<ITableHeader> = [
  {
    name: "Medicine Name",
    id: "medicineName",
  },
  // {
  //   name: "Description",
  //   id: "description",
  // },
  {
    name: "Location",
    id: "location",
  },
  {
    name: "Qty",
    id: "quantity",
  },
  {
    name: "Manufacturer",
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
  {
    name: "Action",
    id: "action",
  },
];

const medicineSubContractsReceivedTable: Array<ITableHeader> = [
  {
    name: "Sub Contract ID",
    id: "medicineSubContract",
  },
  {
    name: "Distributor",
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
  {
    name: "Action",
    id: "action",
  },
];

const medicineDetailsTable: Array<ITableHeader> = [
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
  // {
  //   name: "Manufacturer",
  //   id: "manufacturer",
  // },
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
      headers = registeredRawMaterialsTable;
      break;
    case "receivedRawMaterials":
      headers = rawMaterialsReceivedTable;
      break;
    case "medicinesManufactured":
      headers = medicinesManufacturedTable;
      break;
    case "medicineBatchesReceived":
      headers = medicineBatchesReceivedTable;
      break;
    case "medicineSubContractReceived":
      headers = medicineSubContractsReceivedTable;
      break;
    case "medicineDetails":
      headers = medicineDetailsTable;
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
    default:
      break;
  }
  return headers;
};

export default useTableHeaders;
