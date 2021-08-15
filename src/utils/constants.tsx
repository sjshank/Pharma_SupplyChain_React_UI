//APP constants
export const APP_TITLE = "BLOCKCHAIN IN PHARMA SUPPLY CHAIN";
export const PHARMA_SUPPLY_CHAIN = "PHARMA SUPPLY CHAIN";
export const APP_DESC =
  "The pharma blockchain based solution will enable streamlined visibility of movement and stakeholders through which drugs or medicines transit in the supply chain. The improved traceability facilitates the optimization of flows of goods and an efficient stock management system.";
export const CURRENT_YEAR = `${new Date().getFullYear()}`;
export const APP_FOOTER_TEXT = `${new Date().getFullYear()} Built with ❤️ by `;
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
  transporter: "/transporter",
  inspector: "/inspector",
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
      roleName: "Inspector",
      permission: "Quality Checker",
      color: "#fff",
      bgColor: "#1E56A0",
      roleCode: 9,
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
      bgColor: "#87431D",
      roleCode: 3,
    },
    {
      roleName: "Distributor",
      permission: "Sub-Medicine Batch Distributor",
      color: "#fff",
      bgColor: "#9A0F98",
      roleCode: 5,
    },
    {
      roleName: "Pharma",
      permission: "Medicine Seller",
      color: "#fff",
      bgColor: "#007880",
      roleCode: 6,
    },
    {
      roleName: "Transporter",
      permission: "Goods Transporter",
      color: "#fff",
      bgColor: "#522546",
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
    bgColor: "#522546",
  },
  manufacturer: {
    color: "#fff",
    bgColor: "#87431D",
  },
  distributor: {
    color: "#fff",
    bgColor: "#9A0F98",
  },
  pharma: {
    color: "#fff",
    bgColor: "#007880",
  },
  admin: {
    color: "#fff",
    bgColor: "#053742",
  },
  inspector: {
    color: "#fff",
    bgColor: "#1E56A0",
  },
  rejected: {
    color: "#fff",
    bgColor: "#D72323",
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
  "inspector",
];

export const ROLE_ASSOCIATED_COLORS = Object.freeze({
  "1": ROLE_BRAND["supplier"]["bgColor"],
  "2": ROLE_BRAND["transporter"]["bgColor"],
  "3": ROLE_BRAND["manufacturer"]["bgColor"],
  // "4": ROLE_BRAND["wholesaler"]["bgColor"],
  "5": ROLE_BRAND["distributor"]["bgColor"],
  "6": ROLE_BRAND["pharma"]["bgColor"],
  // "7": ROLE_BRAND["revoke"]["bgColor"],
  "8": ROLE_BRAND["admin"]["bgColor"],
  "9": ROLE_BRAND["inspector"]["bgColor"],
});

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
  "Package Registered",
  "Under Quality Control check",
  "Rejected by Inspector",
  "Approved & Shipment initiated",
  "Picked by Transporter",
  "Delivered at Manufacturer",
  "Rejected by Manufacturer",
  "Approved by Manufacturer",
];
export const SEND_FOR_INSPECTION_TEXT =
  "This action will submit a request to associated Quality Control Inspector for raw material inspection. you will no longer allow to make any updates further. Would you like to proceed ?";
export const INITIATE_SHIPMENT_TEXT =
  "This action will initiate shipment of Raw Material package to associated Manufacturer. You will no longer allow to make any updates further.";

export const QC_INSPECTION_HELP_TEXT =
  "Quality checker for inspecting temperature, weight, moisture etc.";
export const MATERIAL_INITIATE_QC = "Initiate Quality Control Inspection";
export const REG_NEW_MATERIAL = "Register Raw Material";
export const EDIT_MATERIAL = "Edit Raw Material";
export const TOTAL_RAW_MATERIALS = "Total Raw Materials";
export const MANUFACTURERS_ASSOC = "Manufacturers Associated";
export const TRANSPORTERS_ASSOC = "Transporters Associated";
export const RAW_MATERIAL_REGISTERED = "Raw material registered.";
export const RAW_MATERIAL_UPDATED = "Raw material updated.";
export const MATERIAL_PACKAGE_SHIPMENT = "Material package shipment initiated.";
export const MATERIAL_SEND_FOR_INSPECTION =
  "Quality control inspection initiated for Raw Material.";

//Manufacturer Dashboard Constants
export const MANUFACTURER_DASHBOARD_TITLE = "Medicine Manufacturer Dashboard";
export const MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER: Array<string> = [
  "Package Registered",
  "Under Quality Control check",
  "Rejected by Inspector",
  "Approved & Shipment initiated",
  "Picked by Transporter",
  "Delivered at Manufacturer",
  "Rejected by Manufacturer",
  "Approved by Manufacturer",
];
export const MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER: Array<string> = [
  "Batch Registered",
  "Under Quality Control check",
  "Rejected by Inspector",
  "Approved & Shipment initiated",
  "Picked by Transporter",
  "Delivered at Distributor",
  "Rejected by Distributor",
  "Approved by Distributor",
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
export const MEDICINE_SEND_FOR_INSPECTION =
  "Quality control inspection initiated for Medicine batch.";

//Distributor Dashboard Constants
export const DISTRIBUTOR_DASHBOARD_TITLE = "Medicine Distributor Dashboard";
export const MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR: string[] = [
  "Transfer Request Submitted",
  "Picked by Transporter",
  "Delivered at Pharma Shop",
  "Rejected by Pharma Shop",
  "Approved by Pharma Shop",
];
export const VERIFY_PROCEED_HELP_TEXT_AT_DIST =
  "Verify received medicine batch details & proceed with Pharmaceutical request.";

export const MEDICINE_INITIATE_SHIPMENT_TEXT =
  "This action will initiate shipment of Medicine batch to associated Distributor. You will no longer allow to make any updates further.";

export const TOTAL_MEDICINES_RECVD = "Total Medicines Received";
export const PHARMA_TAGGED = "Pharmaceuticals Tagged";
export const MEDICINE_BATCHES_RCVD_MD = "Initiate & Transfer Medicine Batch";
export const MEDICINE_SUB_BATCH_TRANSFER =
  "Transfer request submitted for medicine batch.";

//Pharma Dashboard Constants
export const PHARMA_DASHBOARD_TITLE = "Pharma Shop Dashboard";
export const MEDICINE_SHIPPMENT_STATUS_LIST_AT_PHARMA: Array<string> = [
  "At Manufacturer",
  "Batch Received",
  "",
  "Batch received at Pharma",
  "Medicine status updated",
];

export const MEDICINE_BATCH_APPROVED_BY_PHARMA = "Medicine batch approved.";
export const MEDICINE_BATCH_REJECTED_BY_PHARMA =
  "Medicine batch rejected & assigned back to distributor.";

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
    value: "2",
  },
  {
    key: "Expired",
    value: "1",
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
export const MEDICINE_SOLD_TO_CUSTOMER = "Buyer's Information";
export const CUSTOMER_FORM_TEXT =
  "Submit buyer information & update medicine status.";

/**** QUALITY CONTROL INSPECTOR ************/

export const INSPECTOR_DASHBOARD_TITLE = "Quality Control Inspection Board";
export const MATERIALS_FOR_INSPECTION =
  "Materials Available For Quality Control Inspection";
export const MATERIALS_COMPLETED_INSPECTION =
  "Materials Completed Quality Control Inspection";

export const MEDICINES_FOR_INSPECTION =
  "Medicine Batches Available For Quality Control Inspection";
export const MEDICINES_COMPLETED_INSPECTION =
  "Medicine Batches Completed Quality Control Inspection";

export const REJECT_RM = "Reject Raw Material";
export const REJECT_AM = "Approve Raw Material";
export const MATERIAL_QC_NOT_MEET =
  "This raw material does not meet defined quality control requirements. Would like to reject ?";
export const MATERIAL_QC_MEET =
  "This raw material meet all the defined quality control requirements. Would like to approve & proceed with shipment ?";
export const RAW_MATERIAL_APPROVED_SENT_FOR_SHIPMENT =
  "Raw material approved & sent for shipment.";
export const RAW_MATERIAL_REJECTED_SENT_TO_SUPPLIER =
  "Raw material rejected & assigned back  to supplier.";

export const MEDICINE_APPROVED_SENT_FOR_SHIPMENT =
  "Medicine batch approved & sent for shipment.";
export const MEDICINE_REJECTED_SENT_TO_MANUF =
  "Medicine batch rejected & assigned back  to manufacturer.";

/************************************** */

/**** GOODS TRANSPORTS ************/

export const TRANSPORTER_DASHBOARD_TITLE = "Goods Transporter Dashboard";
export const INITIATE_SHIPMENT_HELP_TEXT =
  "Initiate raw material package shipment";
export const MATERIAL_SHIPPED_BY_TRANS =
  "Raw Material package successfully shipped to associated manufacturer";
export const MATERIAL_DELIVERED_BY_TRANS =
  "Raw Material package successfully delievered to associated manufacturer";
export const INITIATE_MEDICINE_SHIPMENT_HELP_TEXT =
  "Initiate medicine batch shipment";
export const MEDICINE_SHIPPED_BY_TRANS =
  "Medicine batch successfully shipped to associated distributor";
export const MEDICINE_DELIVERED_BY_TRANS =
  "Medicine batch successfully delivered to associated distributor";
export const MEDICINEDP_SHIPPED_BY_TRANS =
  "Medicine batch successfully shipped to associated pharma shop";
export const MEDICINEDP_DELIVERED_BY_TRANS =
  "Medicine batch successfully delivered to associated pharma shop";

/*************************************** */

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
  {
    code: -32000,
    keyword: "USR_NT_REG",
    errMsg: "Incorrect credentials. User does not exist.",
  },
  {
    code: -32001,
    keyword: "USR_EXIST",
    errMsg: "User is already registered.",
  },
  {
    code: -32002,
    keyword: "USR_NT_ACTIVE",
    errMsg: "User is not active.",
  },
  {
    code: -32003,
    keyword: "USR_DELETED",
    errMsg: "Incorrect credentials. User is removed.",
  },
  {
    code: -32004,
    keyword: "OACC",
    errMsg: "Access denied. Only admin user has an access.",
  },
  {
    code: -32005,
    keyword: "ORMSCC",
    errMsg: "Access denied. Only raw material supplier has an access.",
  },
  {
    code: -32006,
    keyword: "RM_MUST_AT_S",
    errMsg: "Action denied. Raw material package should be at supplier.",
  },
  {
    code: -32007,
    keyword: "RM_MUST_AT_M",
    errMsg: "Action denied. Raw material package should be at manufacturer.",
  },
  {
    code: -32008,
    keyword: "OMCC",
    errMsg: "Access denied. Only product manufacturer has an access.",
  },
  {
    code: -32009,
    keyword: "M_MUST_AT_M",
    errMsg: "Action denied. Medicine batch should be at manufacturer.",
  },
  {
    code: -32010,
    keyword: "M_MUST_AT_D",
    errMsg: "Action denied. Medicine batch should be at manufacturer.",
  },
  {
    code: -32011,
    keyword: "M_MUST_AT_P",
    errMsg: "Action denied. Medicine batch should be at pharmaceutical shop.",
  },
  {
    code: -32012,
    keyword: "ODCC",
    errMsg: "Access denied. Only product distributor has an access.",
  },
  {
    code: -32013,
    keyword: "OPCC",
    errMsg: "Access denied. Only pharmaceutical shop has an access.",
  },
  {
    code: -32014,
    keyword: "M_MUST_AT_APRD",
    errMsg: "Action denied. Medicine is not approved by receiver.",
  },
  {
    code: -32015,
    keyword: "IN_PROCESS",
    errMsg:
      "Unable to proceed futher as previous process is still under progress.",
  },
];

export const TRACK_UPDATES = "Medicine Batch Updates";
export const CONTENT_LOADING = "Please wait...";
export const SUPPLY_CHAIN_UPDATES_PAGE_TITLE = "Medicine Supply Chain Updates";
