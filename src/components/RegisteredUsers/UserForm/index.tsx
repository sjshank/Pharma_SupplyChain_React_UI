import React from "react";
import MSimpleSelectComponent from "../../../generic/MBasicSelect";
import MSwitchComponent from "../../../generic/MSwitch";
import MTextFieldComponent from "../../../generic/MTextField";
import { USER_ROLES } from "../../../utils/constants";
import { IUserFields, useFormStyles } from "../helper";

type UserFormProps = {
  userState: IUserFields;
  handleInputChange: any;
};

const UserFormComponent = ({ userState, handleInputChange }: UserFormProps) => {
  const formClasses = useFormStyles();
  return (
    <div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="userAddress"
          name="userAddress"
          label="User Wallet Address"
          variant="outlined"
          disabled={userState.userAddress.disabled}
          value={userState.userAddress.value}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="userName"
          name="userName"
          label="User Name"
          variant="outlined"
          disabled={userState.userName.disabled}
          value={userState.userName.value}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="userLocation"
          name="userLocation"
          label="User Location"
          variant="outlined"
          disabled={userState.userLocation.disabled}
          value={userState.userLocation.value}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="userRole"
          name="userRole"
          label="User Role"
          variant="outlined"
          disabled={userState.userRole.disabled}
          selectedValue={userState.userRole.value}
          options={USER_ROLES.DEFAULT.map((uRole) => {
            return { key: uRole.roleName, value: uRole.roleCode };
          })}
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSwitchComponent
          required={true}
          id="userStatus"
          name="userStatus"
          label="User Status"
          labelPlacement="end"
          switchClassname={formClasses.switch}
          switchColor="primary"
          disabled={userState.userStatus?.disabled}
          value={userState.userStatus?.value}
          changeHandler={handleInputChange}
        />
      </div>
    </div>
  );
};

export default UserFormComponent;
