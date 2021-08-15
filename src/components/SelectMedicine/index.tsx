import React, { useContext, useState } from "react";
import MSimpleSelectComponent from "../../generic/MBasicSelect";
import { makeStyles } from "@material-ui/core/styles";
import { IMedicine } from "../../models/medicine.interface";
import { DistributorContext } from "../../context/DistributorContext";
import { IDistributorContext } from "../../models/distributor.interface";

type SelectMedicineProps = {
  handleMedicineChange: any;
  selectedMedicine?: string;
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

const SelectMedicineComponent = ({
  handleMedicineChange,
  selectedMedicine = "",
}: SelectMedicineProps) => {
  const formClasses = useFormStyles();

  const distributorContext =
    useContext<IDistributorContext>(DistributorContext);
  const { medicineBatchesReceivedFromManuf } = distributorContext;
  const medicineOptions: any = [];
  medicineBatchesReceivedFromManuf.forEach((mat: IMedicine) => {
    if (parseInt(mat.packageStatus) == 7) {
      medicineOptions.push({ key: mat.medicineName, value: mat.medicineId });
    }
  });

  return (
    <div className={formClasses.root}>
      <div className={formClasses.textFieldBar}>
        <MSimpleSelectComponent
          required={true}
          id="medicine"
          name="medicine"
          label="Select Medicine for Distribution to Pharmaceutical"
          variant="outlined"
          selectedValue={selectedMedicine}
          options={medicineOptions ? medicineOptions : []}
          classname={formClasses.select}
          changeHandler={handleMedicineChange}
        />
      </div>
    </div>
  );
};

export default SelectMedicineComponent;
