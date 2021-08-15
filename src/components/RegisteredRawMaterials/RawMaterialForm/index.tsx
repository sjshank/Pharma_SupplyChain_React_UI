import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IUserInfo } from "../../../models/userInfo.interface";
import MTextFieldComponent from "../../../generic/MTextField";
import MSimpleSelectComponent from "../../../generic/MBasicSelect";
import { IRawMaterial } from "../../../models/material.interface";
import { QC_INSPECTION_HELP_TEXT } from "../../../utils/constants";
import { getUserListForDropdown } from "../../../utils/helpers";

type RawMaterialFormProps = {
  rawMaterialState: IRawMaterial;
  handleInputChange?: any;
  isEditMode?: boolean;
  userList: Array<IUserInfo>;
  formStyles?: any;
  isFormDisabled?:boolean
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
  isFormDisabled = false
}: RawMaterialFormProps) => {
  let formClasses = useFormStyles();
  if (formStyles) {
    formClasses = formStyles;
  }
  const result = getUserListForDropdown(userList);

  return (
    <div>
      <div className={formClasses.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="producerName"
          name="producerName"
          label="Material Name"
          variant="outlined"
          value={rawMaterialState.producerName}
          disabled={isFormDisabled}
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
          value={rawMaterialState.description}
          disabled={isFormDisabled}
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
          value={rawMaterialState.location}
          disabled={isFormDisabled}
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
          label="Quantity (In Kgs)"
          variant="outlined"
          value={rawMaterialState.quantity}
          disabled={isFormDisabled}
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
          selectedValue={rawMaterialState.manufacturer}
          disabled={isFormDisabled}
          options={result.manuFactures ? result.manuFactures : []}
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
          selectedValue={rawMaterialState.shipper}
          disabled={isFormDisabled}
          options={result.transporters ? result.transporters : []}
          helpText="Transporter's wallet address"
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
      {/* remove disable when more than 1 inspector is available */}
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="inspector"
          name="inspector"
          label="Quality Control Inspector"
          variant="outlined"
          disabled={true}
          selectedValue={result.inspectors[0]?.value}
          options={result.inspectors ? result.inspectors : []}
          helpText={QC_INSPECTION_HELP_TEXT}
          classname={formClasses.select}
          changeHandler={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RawMaterialFormComponent;
