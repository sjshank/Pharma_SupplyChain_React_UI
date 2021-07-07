import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DashboardLayout from "../../layout/DashboardPage";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import FingerprintOutlinedIcon from "@material-ui/icons/FingerprintOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import Grid from "@material-ui/core/Grid";
import MetricsComponent from "../../components/Metrics";
import AddressInfoComponent from "../../components/AddressInfo";
import UserRolesComponent from "../../components/UserRoles";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import RegisteredUsersComponent from "../../components/RegisteredUsers";
import {
  IUserInfo,
  IUserInfoContext,
} from "../../context/UserContext/userInfo.interface";
import { UserInfoContext } from "../../context/UserContext";
import { IWeb3State } from "../../context/Web3Context/web3.interface";
import { Web3Context } from "../../context/Web3Context";
import { ISpinnerState } from "../../context/SpinnerContext/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import { USER_ROLE_LIST } from "../../utils/constants";
import { useToasts } from "react-toast-notifications";

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
  })
);

const AdminDashboardComponent = () => {
  const classes = useStyles();
  const { addToast } = useToasts();

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount, contractStorageAddress } =
    web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const [dashboardState, setDashboardState] = useState<any>({
    usersCount: 0,
    registeredUsers: [],
  });

  useEffect(() => {
    try {
      toggleSpinner();
      const userList = contractInstance.methods
        .getAllRegisteredUsers()
        .call({ from: userInfo.userAddress })
        .then((response: any) => {
          if (Array.isArray(response)) {
            const _users = response.map((user: any) => {
              return {
                ...user,
                userRole: parseInt(user.userRole),
                userRoleName: USER_ROLE_LIST[parseInt(user.userRole)],
              };
            });
            setDashboardState({
              ...dashboardState,
              usersCount: _users.length,
              registeredUsers: _users,
            });
          }
        });
      toggleSpinner();
    } catch (e: any) {
      toggleSpinner();
    }
    return () => {
      setDashboardState({
        ...dashboardState,
        usersCount: 0,
        registeredUsers: [],
      });
    };
  }, []);

  const createUserHandler = async (userObject: any) => {
    toggleSpinner();
    await contractInstance.methods
      .registerUser(
        // userObject.userAddress.value,
        // userObject.userName.value,
        // userObject.userLocation.value,
        // userObject.userRole.value,
        // "Active"
        "0xf2a42F8A5329Ae4CD259d3ac1Ddf2CEE6002f0dc",
        "USER_SUP",
        "Maharashtra",
        1,
        "Active"
      )
      .send({ from: selectedAccount })
      .then(async (res: any) => {
        const _result = await contractInstance.methods
          .getAllRegisteredUsers()
          .call({ from: selectedAccount });
        if (_result) {
          toggleSpinner();
          addToast("User registered successfully !", {
            appearance: "success",
          });
        }
        // setDashboardState({
        //   ...dashboardState,
        //   usersCount: _result.length,
        //   registeredUsers: _result,
        // });
      })
      .catch((err: any) => {
        toggleSpinner();
        console.error("---Error while creating new user---", err);
      });
  };

  const editUserHandler = async (userObject: any) => {
    toggleSpinner();
    await contractInstance.methods
      .updateUser(
        // userObject.userAddress.value,
        // userObject.userName.value,
        // userObject.userLocation.value,
        // userObject.userRole.value,
        // "Active"
        "0xf2a42F8A5329Ae4CD259d3ac1Ddf2CEE6002f0dc",
        "USER_SUPPLIER",
        "MH",
        1,
        "Active"
      )
      .send({ from: selectedAccount })
      .then(async (res: any) => {
        const _result = await contractInstance.methods
          .getAllRegisteredUsers()
          .call({ from: selectedAccount });
        if (_result) {
          toggleSpinner();
          addToast("User updated successfully !", {
            appearance: "success",
          });
        }
      })
      .catch((err: any) => {
        toggleSpinner();
        console.error("---Error while updating user---", err);
      });
  };

  const deletUserHandler = async (userObject: any) => {
    toggleSpinner();
    await contractInstance.methods
      .deleteUser("0xf2a42F8A5329Ae4CD259d3ac1Ddf2CEE6002f0dc")
      .send({ from: selectedAccount })
      .then(async (res: any) => {
        const _result = await contractInstance.methods
          .getAllRegisteredUsers()
          .call({ from: selectedAccount });
        if (_result) {
          console.log(_result);
          toggleSpinner();
          addToast("User deleted successfully !", {
            appearance: "success",
          });
        }
      })
      .catch((err: any) => {
        toggleSpinner();
        console.error("---Error while updating user---", err);
      });
  };

  const populateMetricsGrid = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <MetricsComponent
            label="Users"
            value={dashboardState.usersCount}
            IconComp={
              <GroupOutlinedIcon
                fontSize="large"
                style={{ color: "#29BB89" }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricsComponent
            label="Roles"
            value={USER_ROLE_LIST.length}
            IconComp={
              <FingerprintOutlinedIcon
                fontSize="large"
                style={{ color: "#23049D" }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MetricsComponent
            label="Total Batches"
            value="17"
            IconComp={
              <AddShoppingCartOutlinedIcon
                fontSize="large"
                style={{ color: "#FDCA40" }}
              />
            }
          />
        </Grid>
      </Grid>
    );
  };

  const populateAddressGrid = () => {
    const _userAddress = `User Address (${userInfo.userName})`;
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={6}>
            <AddressInfoComponent
              label="Your Address"
              value={selectedAccount}
              IconComp={<ContactsOutlinedIcon style={{ color: "#DC2ADE" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <AddressInfoComponent
              label={_userAddress}
              value={userInfo.userAddress}
              IconComp={<LocalMallOutlinedIcon style={{ color: "#FB3640" }} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={6}>
            <AddressInfoComponent
              label="Pharma SupplyChain Contract Address"
              value={contractInstance?._address}
              IconComp={<ContactsOutlinedIcon style={{ color: "#DC2ADE" }} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6}>
            <AddressInfoComponent
              label="Storage Contract Address"
              value={contractStorageAddress}
              IconComp={<LocalMallOutlinedIcon style={{ color: "#FB3640" }} />}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const populateUserRolesGrid = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={4}>
          <UserRolesComponent
            label="User Roles"
            IconComp={
              <SupervisedUserCircleOutlinedIcon style={{ color: "#65D6CE" }} />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={8}>
          {dashboardState.registeredUsers.length > 0 && (
            <RegisteredUsersComponent
              label="Registered Users"
              users={dashboardState.registeredUsers}
              IconComp={<LockOutlinedIcon style={{ color: "#321313" }} />}
              createUser={createUserHandler}
              editUser={editUserHandler}
              deletUser={deletUserHandler}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <DashboardLayout>
      <div className={classes.root}>
        {populateMetricsGrid()}
        {populateAddressGrid()}
        {populateUserRolesGrid()}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardComponent;
