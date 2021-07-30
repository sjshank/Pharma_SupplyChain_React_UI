import React, { ReactNode, useContext, useEffect, useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import DashboardLayout from "../../layout/DashboardPage";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import FingerprintOutlinedIcon from "@material-ui/icons/FingerprintOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Grid from "@material-ui/core/Grid";
import UserRolesComponent from "../../components/UserRoles";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import RegisteredUsersComponent from "../../components/RegisteredUsers";
import { IUserInfoContext } from "../../models/userInfo.interface";
import { UserInfoContext } from "../../context/UserContext";
import { IWeb3State } from "../../models/web3.interface";
import { Web3Context } from "../../context/Web3Context";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import {
  ADMIN_DASHBOARD_TITLE,
  CONTRACT_ADDRESS,
  REGISTERED_USERS,
  ROLES,
  ROLE_BRAND,
  STORAGE_CONTRACT_ADDRESS,
  TOTAL_BATCHES,
  TOTAL_MATERIAL_BATCHES,
  TOTAL_MEDICINES_DELIVERED,
  TOTAL_MEDICINE_BATCHES,
  USERS,
  USER_DELETED_SUCCESS,
  USER_REGISTERED_SUCCESS,
  USER_ROLES_LABEL,
  USER_ROLE_LIST,
  USER_UPDATED_SUCCESS,
  YOUR_ADDRESS,
} from "../../utils/constants";
import { IUserFields } from "../../components/RegisteredUsers/helper";
import { populateUserListWithRoleName } from "../../utils/helpers";
import { IAdminContext } from "../../models/admin.interface";
import { AdminContext } from "../../context/AdminContext";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import { ToastContext } from "../../context/ToastContext";
import { IAddressBar } from "../../models/addressbar.interface";
import { ISummaryBar } from "../../models/summarybar.interface";
import AddressBarComponent from "../../components/AddressBar";
import SummaryBarComponent from "../../components/SummaryBar";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import BatchInfoComponent from "../BatchInfo";
import MTypographyComponent from "../../generic/MTypography";

type AdminDashboardProps = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderRadius: "0px",
    },
    registeredUserRoot: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    createUserBtn: {
      float: "right",
      marginTop: "-35px",
      color: "rgb(41, 187, 137)",
      border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
    overviewTitle: {
      textAlign: "center",
      marginTop: 10,
      fontWeight: 600,
      color: "#444",
    },
    outerOverviewSection: {
      padding: 10,
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    },
  })
);

const AdminDashboardComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount, contractStorageAddress } =
    web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const adminContext = useContext<IAdminContext>(AdminContext);
  const { usersCount, registeredUsers, storeAdminData } = adminContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  const totalMaterialPackagesShippedCountRef = useRef<number>(0);
  const totalMedicineBatchesShippedCountRef = useRef<number>(0);
  const totalMedicineSubBatchesDeliveredCountRef = useRef<number>(0);

  useEffect(() => {
    try {
      if (contractInstance && registeredUsers.length === 0) {
        toggleSpinner();
        loadUsers(contractInstance, selectedAccount)
          .then((res) => {
            if (Array.isArray(res)) {
              const { _users, activeUsersCount } =
                populateUserListWithRoleName(res);
              _users.forEach((user: any) => {
                //total material shipped count
                if (USER_ROLE_LIST[user.userRole] == "manufacturer") {
                  const totalMaterialPackagesCountResponse = getTransactionData(
                    contractInstance,
                    "getTotalMaterialPackagesShippedCount",
                    selectedAccount,
                    user.userAddress
                  );
                  totalMaterialPackagesCountResponse.then((res: any) => {
                    totalMaterialPackagesShippedCountRef.current =
                      totalMaterialPackagesShippedCountRef.current +
                      parseInt(res);
                  });
                }
                //total medicine shipped count
                if (USER_ROLE_LIST[user.userRole] == "distributor") {
                  const totalMedicineBatchesCountResponse = getTransactionData(
                    contractInstance,
                    "getTotalMedicineBatchesShippedCount",
                    selectedAccount,
                    user.userAddress
                  );
                  totalMedicineBatchesCountResponse.then((res: any) => {
                    totalMedicineBatchesShippedCountRef.current =
                      totalMedicineBatchesShippedCountRef.current +
                      parseInt(res);
                  });
                }
                //total medicine delivered count
                if (USER_ROLE_LIST[user.userRole] == "pharma") {
                  const totalMedicineSubBatchesCountResponse =
                    getTransactionData(
                      contractInstance,
                      "getTotalMedicineSubBatchesDeliveredCount",
                      selectedAccount
                    );
                  totalMedicineSubBatchesCountResponse.then((res: any) => {
                    totalMedicineSubBatchesDeliveredCountRef.current =
                      totalMedicineSubBatchesDeliveredCountRef.current +
                      parseInt(res);
                  });
                }
              });
              storeAdminData(activeUsersCount, _users);
            }
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            setTimeout(() => {
              toggleSpinner();
            }, 200);
          });
      }
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  }, []);

  const _showSuccessToast = (msg: string, data: any) => {
    toggleToast("success", msg);
    const { _users, activeUsersCount } = populateUserListWithRoleName(data);
    storeAdminData(activeUsersCount, _users);
  };

  //Create user
  const createUserHandler = async (userObject: IUserFields) => {
    try {
      toggleSpinner();
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "registerUser",
        selectedAccount,
        userObject.userAddress,
        userObject.userName,
        userObject.userLocation,
        userObject.userRole,
        userObject.userStatus ? "Active" : "Inactive"
      );
      result
        .then((res: any) => {
          loadUsers(contractInstance, selectedAccount).then((res: any) => {
            if (Array.isArray(res)) {
              _showSuccessToast(USER_REGISTERED_SUCCESS, res);
            }
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  //Edit user
  const editUserHandler = async (userObject: IUserFields) => {
    try {
      toggleSpinner();
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "updateUser",
        selectedAccount,
        userObject.userAddress,
        userObject.userLocation,
        userObject.userStatus ? "Active" : "Inactive"
      );
      result
        .then((res: any) => {
          loadUsers(contractInstance, selectedAccount).then((res: any) => {
            _showSuccessToast(USER_UPDATED_SUCCESS, res);
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  //Delete user
  const deletUserHandler = async (userObject: any) => {
    try {
      toggleSpinner();
      const result: Promise<any> = sendTransaction(
        contractInstance,
        "deleteUser",
        selectedAccount,
        userObject.userAddress
      );
      result
        .then((res: any) => {
          loadUsers(contractInstance, selectedAccount).then((res: any) => {
            _showSuccessToast(USER_DELETED_SUCCESS, res);
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const populateDashboardSummaryBarData = (): ISummaryBar[] => {
    const summaryBarList: ISummaryBar[] = [
      {
        sizeXS: 12,
        sizeSM: 2,
        label: USERS,
        value: usersCount,
        iconComp: (
          <GroupOutlinedIcon fontSize="large" style={{ color: "#29BB89" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: ROLES,
        value: USER_ROLE_LIST.length,
        iconComp: (
          <FingerprintOutlinedIcon
            fontSize="large"
            style={{ color: "#23049D" }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_MATERIAL_BATCHES,
        value: totalMaterialPackagesShippedCountRef.current,
        iconComp: (
          <LocalShippingIcon fontSize="large" style={{ color: "#FDCA40" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_MEDICINE_BATCHES,
        value: totalMedicineBatchesShippedCountRef.current,
        iconComp: (
          <LocalShippingIcon fontSize="large" style={{ color: "#FDCA40" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: TOTAL_MEDICINES_DELIVERED,
        value: totalMedicineSubBatchesDeliveredCountRef.current,
        iconComp: (
          <AddShoppingCartOutlinedIcon
            fontSize="large"
            style={{ color: "#A5E1AD" }}
          />
        ),
      },
    ];

    return summaryBarList;
  };

  const populateUserAddressBarData = (): IAddressBar[] => {
    const _userAddress = `User Address (${userInfo.userName})`;
    const addressBarList: IAddressBar[] = [
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: YOUR_ADDRESS,
        value: selectedAccount,
        iconComp: (
          <ContactsOutlinedIcon
            style={{ color: ROLE_BRAND["admin"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: _userAddress,
        value: userInfo.userAddress,
        iconComp: <LocalMallOutlinedIcon style={{ color: "#FB3640" }} />,
      },
    ];
    return addressBarList;
  };

  const populateContractAddressBarData = (): IAddressBar[] => {
    const addressBarList: IAddressBar[] = [
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: CONTRACT_ADDRESS,
        value: contractInstance?._address,
        iconComp: <ContactsOutlinedIcon style={{ color: "#DC2ADE" }} />,
      },
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: STORAGE_CONTRACT_ADDRESS,
        value: contractStorageAddress,
        iconComp: <LocalMallOutlinedIcon style={{ color: "#FB3640" }} />,
      },
    ];
    return addressBarList;
  };

  const populateUserRolesGrid = (): ReactNode => {
    return (
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.outerOverviewSection}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <MTypographyComponent
                  variant="h4"
                  text="User Directory"
                  classname={classes.overviewTitle}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={4}>
                <UserRolesComponent
                  label={USER_ROLES_LABEL}
                  IconComp={
                    <SupervisedUserCircleOutlinedIcon
                      style={{ color: "#65D6CE" }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={8}>
                <RegisteredUsersComponent
                  label={REGISTERED_USERS}
                  users={registeredUsers}
                  IconComp={<LockOutlinedIcon style={{ color: "#321313" }} />}
                  createUser={createUserHandler}
                  editUser={editUserHandler}
                  deletUser={deletUserHandler}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <DashboardLayout headerTitle={ADMIN_DASHBOARD_TITLE}>
      <div className={classes.root}>
        <SummaryBarComponent
          summaryBarList={populateDashboardSummaryBarData()}
        />
        <AddressBarComponent addressBarList={populateUserAddressBarData()} />
        <AddressBarComponent
          addressBarList={populateContractAddressBarData()}
        />
        {populateUserRolesGrid()}
        <BatchInfoComponent />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardComponent;
