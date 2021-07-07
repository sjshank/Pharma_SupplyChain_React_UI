import React, { MouseEventHandler, useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MButtonComponent from "../../../generic/MButton";
import MTypographyComponent from "../../../generic/MTypography";
import MTextFieldComponent from "../../../generic/MTextField";
import ILoginForm from "../../../models/loginForm.interface";
import { useHistory } from "react-router";
import getFormMetaData from "./metadataUtil";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../context/Web3Context/web3.interface";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ISpinnerState } from "../../../context/SpinnerContext/spinner.interface";
import { IUserInfoContext } from "../../../context/UserContext/userInfo.interface";
import { UserInfoContext } from "../../../context/UserContext";
import { USER_ROLE_LIST } from "../../../utils/constants";

interface ILogin {
  userName: string | any;
  userAddress: string | any;
}

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
  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfoAction } = userInfoContext;

  const formClasses = useFormStyles();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<ILogin>({
    userName: "",
    userAddress: "",
  });
  const errorFields = useRef(new Set());
  const history = useHistory();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: ILoginForm
  ) => {
    setLoginState({ ...loginState, [event.target.id]: event.target.value });
    // const _inputVal = event.target.value;
    // let { id, hasValidationRule, isValid, validationRule } = _field;
    // if (hasValidationRule) {
    //   const _pattern = new RegExp(validationRule);
    //   const res = _pattern.test(_inputVal);
    //   errorFields.current.add({ eleId: id, isValidData: !res });
    // }
    // const _isDisabledBtn = Array.from(errorFields.current).every(
    //   (_eField: any) => {
    //     _eField && _eField.isValidData === true;
    //   }
    // );
    // setBtnDisabled(_isDisabledBtn);
  };

  const handleSubmitClick: MouseEventHandler = async (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    toggleSpinner();
    await contractInstance.methods
      .validateUser(loginState.userAddress, loginState.userName)
      .send({ from: selectedAccount })
      .then(async (res: any) => {
        if (res) {
          const _userInfo = await contractInstance.methods
            .getUserInfo(loginState.userAddress)
            .call();
          if (_userInfo) {
            toggleSpinner();
            const _userDetails = {
              ..._userInfo,
              userRole: parseInt(_userInfo.userRole),
              userRoleName: USER_ROLE_LIST[parseInt(_userInfo.userRole)],
            };
            userInfoAction.setUserInfo(_userDetails);
            history.push("/dashboard");
          }
        }
      })
      .catch((err: any) => {
        toggleSpinner();
        console.error("---Error while validating user---", err);
      });
  };

  const loginFormMetaData: Array<ILoginForm> = getFormMetaData(
    formClasses,
    handleInputChange
  );

  return (
    <form noValidate className={formClasses.root}>
      <MTypographyComponent
        variant="h4"
        component="h5"
        color="primary"
        align="center"
        text="Sign In"
      />
      {loginFormMetaData &&
        loginFormMetaData.map((field: ILoginForm) => {
          return (
            <div key={field.id} className={formClasses.textFieldBar}>
              <MTextFieldComponent
                required={field.isRequired}
                id={field.id}
                label={field.label}
                variant={field.variant}
                classname={field.fieldClassname}
                inputProps={field}
                helpText={field.helpText}
                changeHandler={(e) => field.changeHandler(e, field)}
              />
            </div>
          );
        })}
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

export default LoginFormComponent;
