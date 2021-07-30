import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IUserInfo } from "../../../models/userInfo.interface";
import MTextFieldComponent from "../../../generic/MTextField";
import MSimpleSelectComponent from "../../../generic/MBasicSelect";

interface IRawMaterialFields {
  supplier?: string | any;
  producerName: string | any;
  description: string | any;
  location: string | any;
  quantity: number | any;
  shipper: string | any;
  manufacturer: string | any;
  packageStatus?: string | number | any;
}

type RawMaterialFormProps = {
  rawMaterialState: IRawMaterialFields;
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

const RawMaterialFormComponent = ({
  rawMaterialState,
  handleInputChange,
  isEditMode = false,
  userList,
  formStyles = null,
}: RawMaterialFormProps) => {
  let formClasses = useFormStyles();
  if (formStyles) {
    formClasses = formStyles;
  }

  /*  Populate Registered Manufacture & Transporter list */
  const manuFactures: Array<{ key: any; value: any }> = [];
  const transporters: Array<{ key: any; value: any }> = [];

  if (Array.isArray(userList)) {
    userList.map((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "3"
      ) {
        return manuFactures.push({ key: usr.userName, value: usr.userAddress });
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
          id="producerName"
          name="producerName"
          label="Material Name"
          variant="outlined"
          disabled={isEditMode}
          value={rawMaterialState.producerName}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="description"
          name="description"
          label="Material Description"
          variant="outlined"
          disabled={isEditMode}
          value={rawMaterialState.description}
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
          value={rawMaterialState.location}
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
          value={rawMaterialState.quantity}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="manufacturer"
          name="manufacturer"
          label="Medicine Manufacturer"
          variant="outlined"
          disabled={isEditMode}
          selectedValue={rawMaterialState.manufacturer}
          options={manuFactures ? manuFactures : []}
          helpText="Manufacturer's wallet address"
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
          selectedValue={rawMaterialState.shipper}
          options={transporters ? transporters : []}
          helpText="Transporter's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RawMaterialFormComponent;
