import React, { useReducer } from "react";
import { IRawMaterial } from "../../models/material.interface";
import { IMedicine } from "../../models/medicine.interface";
import { IMedicineDP } from "../../models/medicineDP.interface";
import { ITransporterContext } from "../../models/transporter.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Transporter_Initial_State: ITransporterContext = {
  materials: [] as IRawMaterial[],
  medicines: [] as IMedicine[],
  medicinesDP: [] as IMedicineDP[],
  setMaterialList: undefined,
  setMedicineList: undefined,
  setMedicineDPList: undefined,
};

const TransporterContext = React.createContext<ITransporterContext>(
  Transporter_Initial_State
);

const TransporterContextProvider = (props: any) => {
  const [TransporterContextState, dispatchTransporterContextAction] =
    useReducer(reducer, Transporter_Initial_State);

  const storeMaterialListHandler = (_materials: IRawMaterial[] = []) => {
    dispatchTransporterContextAction({
      type: actionTypes.SET_MATERIAL_LIST,
      materials: _materials,
    });
  };

  const storeMedicineListHandler = (_medicines: IMedicine[] = []) => {
    dispatchTransporterContextAction({
      type: actionTypes.SET_MEDICINE_LIST,
      medicines: _medicines,
    });
  };

  const storeMedicineDPListHandler = (_medicinesDP: IMedicineDP[] = []) => {
    dispatchTransporterContextAction({
      type: actionTypes.SET_MEDICINEDP_LIST,
      medicinesDP: _medicinesDP,
    });
  };

  return (
    <TransporterContext.Provider
      value={{
        materials: TransporterContextState.materials,
        medicines: TransporterContextState.medicines,
        medicinesDP: TransporterContextState.medicinesDP,
        setMaterialList: storeMaterialListHandler,
        setMedicineList: storeMedicineListHandler,
        setMedicineDPList: storeMedicineDPListHandler,
      }}
    >
      {props.children}
    </TransporterContext.Provider>
  );
};

export { TransporterContext, TransporterContextProvider };
