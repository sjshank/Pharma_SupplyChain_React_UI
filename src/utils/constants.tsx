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

//Admin Dashboard Constants
export const ADMIN_DASHBOARD_TITLE = "Admin Dashboard";
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
