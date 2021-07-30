//APP constants
export const APP_TITLE = "BLOCKCHAIN IN PHARMA SUPPLY CHAIN";
export const PHARMA_SUPPLY_CHAIN = "PHARMA SUPPLY CHAIN";
export const APP_DESC =
  "The pharma blockchain based solution will enable streamlined visibility of movement and stakeholders through which drugs or medicines transit in the supply chain. The improved traceability facilitates the optimization of flows of goods and an efficient stock management system.";
export const CURRENT_YEAR = `${new Date().getFullYear()}`;
export const APP_FOOTER_TEXT = `${new Date().getFullYear()} Built with ❤️ by Saurabh Shankariya`;
export const METAMASK_ERR =
  "MetaMask plugin is not installed ! Download Google Chrome &amp; install plugin.";
export const METAMASK_INSTALLED = "MetaMask is installed !!!";
export const METAMASK_NOT_INSTALLED = "MetaMask is not installed !!!";

export const ROLE_BASED_ROUTES = Object.freeze({
  admin: "/admin",
  supplier: "/supplier",
  manufacturer: "/manufacturer",
  distributor: "/distributor",
  pharma: "/pharma",
});

export const NOT_AUTHORIZED_ERR =
  "Your are not authorized to view page content ! ";

export const PAGE_NOT_FOUND = "OOPS !!! Page not found.";
export const AUTHENTICATION_SUCCESS = "Authenticated Successfully !";
export const YOUR_ADDRESS = "Your Address";
export const CONTRACT_ADDRESS = "Pharma SupplyChain Contract Address";
export const NO_RECORDS_FOUND = "No records found.";

//Admin Dashboard Constants
export const ADMIN_DASHBOARD_TITLE = "Admin Dashboard";
export const USERS = "Users";
export const ROLES = "Roles";
export const TOTAL_BATCHES = "Total Batches";
export const TOTAL_MATERIAL_BATCHES = "Packages Shipped";
export const TOTAL_MEDICINE_BATCHES = "Batches Shipped";
export const TOTAL_MEDICINES_DELIVERED = "Batches Delivered";
export const STORAGE_CONTRACT_ADDRESS = "Storage Contract Address";
export const USER_ROLES_LABEL = "User Roles";
export const REGISTERED_USERS = "Registered Users";
export const DELETE_CONFIRMATION_TEXT =
  "This will permanently delete user. Do you still want to proceed ?";
export const USER_ROLES = Object.freeze({
  DEFAULT: [
    {
      roleName: "Admin",
      permission: "SupplyChain Administrator",
      color: "#fff",
      bgColor: "#053742",
      roleCode: 8,
    },
    {
      roleName: "Supplier",
      permission: "Raw Material Supplier",
      color: "#fff",
      bgColor: "#381460",
      roleCode: 1,
    },
    {
      roleName: "Manufacturer",
      permission: "Medicine Batch Creator",
      color: "#fff",
      bgColor: "#FA163F",
      roleCode: 3,
    },
    {
      roleName: "Distributor",
      permission: "Sub-Medicine Batch Distributor",
      color: "#fff",
      bgColor: "#17B978",
      roleCode: 5,
    },
    {
      roleName: "Pharma",
      permission: "Medicine Seller",
      color: "#fff",
      bgColor: "#E79C2A",
      roleCode: 6,
    },
    {
      roleName: "Transporter",
      permission: "Goods Transporter",
      color: "#fff",
      bgColor: "#444444",
      roleCode: 2,
    },
  ],
});

export const ROLE_BRAND: any = {
  supplier: {
    color: "#fff",
    bgColor: "#381460",
  },
  transporter: {
    color: "#fff",
    bgColor: "#444444",
  },
  manufacturer: {
    color: "#fff",
    bgColor: "#FA163F",
  },
  distributor: {
    color: "#fff",
    bgColor: "#17B978",
  },
  pharma: {
    color: "#fff",
    bgColor: "#E79C2A",
  },
  admin: {
    color: "#fff",
    bgColor: "#053742",
  },
};

export const USER_ROLE_LIST: Array<string> = [
  "norole",
  "supplier",
  "transporter",
  "manufacturer",
  "wholesaler",
  "distributor",
  "pharma",
  "revoke",
  "admin",
];

export const TOAST_OPTIONS = Object.freeze({
  autoDismiss: true,
  autoDismissTimeout: 5000,
  PlacementType: "top-center",
  Placement: "top-center",
  transitionState: "entering",
});

export const USER_REGISTERED_SUCCESS = "User registered successfully.";
export const USER_UPDATED_SUCCESS = "User updated successfully.";
export const USER_DELETED_SUCCESS = "User deleted successfully.";
export const RAW_MATERIAL_SHIPMENT_STATUS =
  "Raw Material Packages Status (Active Users)";
export const MED_BATCHES_SHIPMENT_STATUS =
  "Medicine Batches Status (Active Users)";

//Supplier Dashboard Constants
export const SUPPLIER_DASHBOARD_TITLE = "Raw Material Supplier Dashboard";
export const MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER: Array<string> = [
  "At Producer",
  "Package in Transit",
  "Delivered to Manufacturer",
];
export const INITIATE_SHIPMENT_TEXT =
  "This action will initiate shipment of Raw Material package to associated Manufacturer. You will no longer allow to make any updates further.";

export const TOTAL_RAW_MATERIALS = "Total Raw Materials";
export const MANUFACTURERS_ASSOC = "Manufacturers Associated";
export const TRANSPORTERS_ASSOC = "Transporters Associated";
export const RAW_MATERIAL_REGISTERED = "Raw material registered.";
export const RAW_MATERIAL_UPDATED = "Raw material updated.";
export const MATERIAL_PACKAGE_SHIPMENT = "Material package shipment initiated.";

//Manufacturer Dashboard Constants
export const MANUFACTURER_DASHBOARD_TITLE = "Medicine Manufacturer Dashboard";
export const MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER: Array<string> = [
  "At Producer",
  "Package Received",
  "Approved",
];
export const MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER: Array<string> = [
  "At Manufacturer",
  "Batch in Transit",
  "Delivered to Distributor",
  "Transfer Initiated to Pharma",
  "Delivered to Pharma",
];
export const VERIFY_PROCEED_HELP_TEXT =
  "Verify received raw material & proceed with medicine batch details registration.";

export const TOTAL_RAW_MATERIALS_RECVD = "Total Raw Materials Received";
export const TOTAL_MEDICINES_MANUFACTURED = "Total Medicines Manufactured";
export const SUPPLIERS_TAGGED = "Suppliers Tagged";
export const LOGISTICS_TAGGED = "Logistics Tagged";
export const MEDICINE_BATCH_REGISTERED = "Medicine batch registered.";
export const MEDICINE_BATCH_UPDATED = "Medicine batch updated.";
export const MEDICINE_BATCH_SHIPMENT = "Medicine batch shipment initiated.";

//Distributor Dashboard Constants
export const DISTRIBUTOR_DASHBOARD_TITLE = "Medicine Distributor Dashboard";
export const MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR: Array<string> = [
  "At Manufacturer",
  "Batch Received",
  "",
  "Transfer Initiated",
  "Delivered to Pharma",
];
export const VERIFY_PROCEED_HELP_TEXT_AT_DIST =
  "Verify received medicine batch details & proceed with Pharmaceutical request.";

export const MEDICINE_INITIATE_SHIPMENT_TEXT =
  "This action will initiate shipment of Medicine batch to associated Distributor. You will no longer allow to make any updates further.";

export const TOTAL_MEDICINES_RECVD = "Total Medicines Received";
export const PHARMA_TAGGED = "Pharmaceuticals Tagged";

//Pharma Dashboard Constants
export const PHARMA_DASHBOARD_TITLE = "Pharma Shop Dashboard";
export const MEDICINE_SUB_CONTRACT_SHIPPMENT_STATUS_LIST_AT_PHARMA: Array<string> =
  ["In Transit", "Batch Received", "Updated", "Delivered"];

export const VERIFY_UPDATE_HELP_TEXT_AT_PHARMA =
  "Verify received medicine batch & update the status approve/expired/damaged.";

export const MEDICINE_STATUS_UPDATE_BY_PHARMA =
  "Verify received medicine batch & update status from below options.";

export const MEDICINE_STATUS_OPTIONS_AT_PHARMA: Array<{
  key: string;
  value: string;
}> = [
  {
    key: "Not Found",
    value: "0",
  },
  {
    key: "Approve",
    value: "1",
  },
  {
    key: "Expire",
    value: "2",
  },
  {
    key: "Received Damage",
    value: "3",
  },
];

export const MEDICINE_SALE_STATUS_AT_PHARMA: Array<{
  key: string;
  value: string;
}> = [
  {
    key: "Sold Out",
    value: "4",
  },
  {
    key: "Expired",
    value: "2",
  },
  {
    key: "Damaged",
    value: "3",
  },
];

export const MEDICINES_SUB_CONTRACT_BATCHES_RCVD = "Medicine Batches Received";
export const MEDICINES_APPROVED = "Approved";
export const MEDICINES_EXPIRED_DAMAGED = "Expired/Damaged";
export const MEDICINES_SOLD_OUT = "Sold Out";
export const MEDICINE_SUB_CONTRACT_STATUS_UPDATED = "Batch status updated.";
export const MEDICINE_SUB_CONTRACT_RCVD = "Medicine Sub Contracts Received";
export const MEDICINE_DETAILS_SUBTITLE = "Medicine Details :";
export const MATERIAL_DETAILS_SUBTITLE = "Material Details :";
export const SHOW_MORE = "Show More";
export const SHOW_LESS = "Show Less";
export const MEDICINE_SOLD_TO_CUSTOMER = "Medicines Sold To Customers";
export const CUSTOMER_FORM_TEXT =
  "Submit buyer information & update medicine status.";

/**** CUSTOM ERRORS ****/
export const CUSTOM_ERROR_MESSAGES: Array<{
  code: number;
  keyword: string;
  errMsg: string;
}> = [
  {
    code: 0,
    keyword: "generic error",
    errMsg: "We are facing technical difficulties. Please try again.",
  },
  {
    code: 4001,
    keyword: "user denied transaction",
    errMsg: "Transaction rejected.",
  },
  {
    code: -32602,
    keyword: "must provide an ethereum address",
    errMsg:
      "Something went wrong ! Please make sure you are connected to correct Ethereum address.",
  },
];
