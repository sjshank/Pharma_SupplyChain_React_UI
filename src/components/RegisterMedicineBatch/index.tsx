import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IMedicine } from "../../models/medicine.interface";
import MTextFieldComponent from "../../generic/MTextField";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { IUserInfo } from "../../models/userInfo.interface";

type RegistereMedicineBatchProps = {
  medicineBatchFormState: IMedicine;
  handleInputChange?: any;
  isEditMode?: boolean;
  userList?: Array<IUserInfo>;
  formStyles?: any;
};

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
    width: "100%",
  },
  select: {
    width: "100%",
  },
}));

const RegisterMedicineBatchComponent = ({
  medicineBatchFormState,
  handleInputChange,
  isEditMode,
  userList,
  formStyles,
}: RegistereMedicineBatchProps) => {
  let formClasses = useFormStyles();
  if (formStyles) {
    formClasses = formStyles;
  }

  /*  Populate Registered Manufacture & Transporter list */
  const distributors: Array<{ key: any; value: any }> = [];
  const transporters: Array<{ key: any; value: any }> = [];

  if (Array.isArray(userList)) {
    userList.map((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "5"
      ) {
        return distributors.push({ key: usr.userName, value: usr.userAddress });
      }
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "2"
      ) {
        return transporters.push({ key: usr.userName, value: usr.userAddress });
      }
    });
  }

  return (
    <div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="medicineName"
          name="medicineName"
          label="Medicine Name"
          variant="outlined"
          disabled={isEditMode}
          value={medicineBatchFormState.medicineName}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="description"
          name="description"
          label="Medicine Description/Ingredients"
          variant="outlined"
          disabled={isEditMode}
          value={medicineBatchFormState.description}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="location"
          name="location"
          label="Location"
          variant="outlined"
          disabled={isEditMode}
          value={medicineBatchFormState.location}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="quantity"
          name="quantity"
          type="number"
          label="Quantity (In Numbers)"
          variant="outlined"
          disabled={isEditMode}
          value={medicineBatchFormState.quantity}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="distributors"
          name="distributor"
          label="Medicine Distributor"
          variant="outlined"
          disabled={isEditMode}
          selectedValue={medicineBatchFormState.distributor}
          options={distributors ? distributors : []}
          helpText="Distributor's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="shipper"
          name="shipper"
          label="Transporter"
          variant="outlined"
          disabled={isEditMode}
          selectedValue={medicineBatchFormState.shipper}
          options={transporters ? transporters : []}
          helpText="Transporter's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RegisterMedicineBatchComponent;
