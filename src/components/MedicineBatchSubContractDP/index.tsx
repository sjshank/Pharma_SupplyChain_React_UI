import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IUserInfo } from "../../models/userInfo.interface";
import MTextFieldComponent from "../../generic/MTextField";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { IMedicineDP } from "../../models/medicineDP.interface";
import { getUserListForDropdown } from "../../utils/helpers";

type MedicineBatchSubContractProps = {
  medicineBatchDPState: IMedicineDP;
  handleInputChange?: any;
  isEditMode?: boolean;
  userList: Array<IUserInfo>;
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

  const result = getUserListForDropdown(userList);

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
          id="description"
          name="description"
          type="text"
          label="Medicine Description"
          variant="outlined"
          disabled={true}
          value={medicineBatchDPState.description}
          classname={formClasses.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="location"
          name="location"
          type="text"
          label="Location"
          variant="outlined"
          disabled={true}
          value={medicineBatchDPState.location}
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
          options={result.pharmas ? result.pharmas : []}
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
          options={result.transporters ? result.transporters : []}
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
