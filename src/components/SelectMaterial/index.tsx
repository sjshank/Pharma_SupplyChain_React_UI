import React, { useContext, useState } from "react";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { IRawMaterial } from "../../models/material.interface";
import { makeStyles } from "@material-ui/core/styles";
import { IManufacturerContext } from "../../models/manufacturer.interface";
import { ManufacturerContext } from "../../context/ManufacturerContext";

type SelectMaterialProps = {
  handleMaterialChange: any;
  selectedMaterial?: string;
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
    textAlign: "left",
  },
}));

const SelectMaterialComponent = ({
  handleMaterialChange,
  selectedMaterial = "",
}: SelectMaterialProps) => {
  const formClasses = useFormStyles();

  const manufacturerContext =
    useContext<IManufacturerContext>(ManufacturerContext);
  const { rawMaterialsReceived } = manufacturerContext;
  const materialOptions: any = [];
  rawMaterialsReceived.forEach((mat: IRawMaterial) => {
    if (parseInt(mat.packageStatus) == 7) {
      materialOptions.push({ key: mat.producerName, value: mat.materialId });
    }
  });

  return (
    <div className={formClasses.root}>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="material"
          name="material"
          label="Select Material For Medicine Manufacturing"
          variant="outlined"
          selectedValue={selectedMaterial}
          options={materialOptions ? materialOptions : []}
          classname={formClasses.select}
          changeHandler={handleMaterialChange}
        />
      </div>
    </div>
  );
};

export default SelectMaterialComponent;
