import React, { MouseEventHandler, useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MButtonComponent from "../../../generic/MButton";
import MTypographyComponent from "../../../generic/MTypography";
import MTextFieldComponent from "../../../generic/MTextField";
import { useHistory } from "react-router";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../models/web3.interface";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ISpinnerState } from "../../../models/spinner.interface";
import {
  IUserInfoContext,
} from "../../../models/userInfo.interface";
import { UserInfoContext } from "../../../context/UserContext";
import { AUTHENTICATION_SUCCESS, ROLE_BASED_ROUTES, USER_ROLE_LIST } from "../../../utils/constants";
import { ILoginContext } from "../../../models/login.interface";
import { LoginContext } from "../../../context/LoginContext";
import { useEffect } from "react";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import { ToastContext } from "../../../context/ToastContext";

const useFormStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: theme.spacing(4),
  },
  textFieldBar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: "310px",
  },
}));

const LoginFormComponent = () => {
  const formClasses = useFormStyles();
  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfoAction } = userInfoContext;

  const loginContext = useContext<ILoginContext>(LoginContext);
  const { loginInfo, storeLoginInfo } = loginContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    if (loginInfo && loginInfo.userAddress != "" && loginInfo.userName != "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [loginInfo]);

  const inputChangeHandler = (e: any) => {
    storeLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitClick: MouseEventHandler = async (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    try {
      toggleSpinner();
      const result = sendTransaction(
        contractInstance,
        "validateUser",
        selectedAccount,
        loginInfo.userAddress,
        loginInfo.userName
      );
      result
        .then((res: any) => {
          toggleToast("success", AUTHENTICATION_SUCCESS);
          if (res.status) {
            const _userInfo = getTransactionData(
              contractInstance,
              "getUserInfo",
              selectedAccount,
              loginInfo.userAddress
            );
            _userInfo.then((user: any) => {
              let _userDetails = {
                ...user,
                userRole: parseInt(user.userRole),
                userRoleName: USER_ROLE_LIST[parseInt(user.userRole)],
              };
              userInfoAction.setUserInfo(_userDetails);
              history.push(ROLE_BASED_ROUTES[_userDetails.userRoleName]);
            });
          }
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
        });
    } catch (e) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  return (
    <form noValidate className={formClasses.root}>
      <MTypographyComponent
        variant="h4"
        component="h5"
        color="primary"
        align="center"
        text="Sign In"
      />
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="userName"
          name="userName"
          label="User Name"
          variant="outlined"
          classname={formClasses.textField}
          changeHandler={(e) => inputChangeHandler(e)}
          value={loginInfo.userName}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="userAddress"
          name="userAddress"
          label="Account Address"
          variant="outlined"
          classname={formClasses.textField}
          helpText="Ethereum account address"
          changeHandler={(e) => inputChangeHandler(e)}
          value={loginInfo.userAddress}
        />
      </div>
      <div>
        <MButtonComponent
          label="Submit"
          color="primary"
          variant="contained"
          size="medium"
          disabled={btnDisabled}
          clickHandler={handleSubmitClick}
        />
      </div>
    </form>
  );
};

export default React.memo(LoginFormComponent);
