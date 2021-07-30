import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IUserInfo } from "../../models/userInfo.interface";
import MTextFieldComponent from "../../generic/MTextField";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { IMedicineDP } from "../../models/medicineDP.interface";

interface IMedicineBatchFields {
  pharma: string | any;
  shipper: string | any;
  manufacturer: string | any;
}

type MedicineBatchSubContractProps = {
  medicineBatchDPState: IMedicineDP;
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

const MedicineBatchSubContractDPComponent = ({
  medicineBatchDPState,
  handleInputChange,
  isEditMode,
  userList,
  formStyles,
}: MedicineBatchSubContractProps) => {
  let formClasses = useFormStyles();

  /*  Populate Registered Pharma & Transporter list */
  const pharmas: Array<{ key: any; value: any }> = [];
  const transporters: Array<{ key: any; value: any }> = [];

  if (Array.isArray(userList)) {
    userList.map((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === "6"
      ) {
        return pharmas.push({ key: usr.userName, value: usr.userAddress });
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
          disabled={true}
          value={medicineBatchDPState.medicineName}
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
          disabled={true}
          value={medicineBatchDPState.quantity}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="pharma"
          name="pharma"
          label="Select Pharmaceutical Shop"
          variant="outlined"
          disabled={isEditMode}
          selectedValue={medicineBatchDPState.pharma}
          options={pharmas ? pharmas : []}
          helpText="Pharma's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
          placeholder="Select Pharmaceutical Shop"
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="shipper"
          name="shipper"
          label="Select Transporter"
          variant="outlined"
          disabled={isEditMode}
          selectedValue={medicineBatchDPState.shipper}
          options={transporters ? transporters : []}
          helpText="Transporter's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
          placeholder="Select Transporter"
        />
      </div>
    </div>
  );
};

export default MedicineBatchSubContractDPComponent;
