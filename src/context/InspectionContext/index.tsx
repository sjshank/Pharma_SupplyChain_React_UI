import React, { useReducer } from "react";
import { IInspectionContext } from "../../models/inspection.interface";
import { IRawMaterial } from "../../models/material.interface";
import { IMedicine } from "../../models/medicine.interface";
import * as actionTypes from "./actionTypes";
import { reducer } from "./reducer";

const Inspection_Initial_State: IInspectionContext = {
  materials: [] as IRawMaterial[],
  medicines: [] as IMedicine[],
  setMaterialList: undefined,
  setMedicineList: undefined,
};

const InspectionContext = React.createContext<IInspectionContext>(
  Inspection_Initial_State
);

const InspectionContextProvider = (props: any) => {
  const [InspectionContextState, dispatchInspectionContextAction] = useReducer(
    reducer,
    Inspection_Initial_State
  );

  const storeMaterialListHandler = (_materials: IRawMaterial[] = []) => {
    dispatchInspectionContextAction({
      type: actionTypes.SET_MATERIAL_LIST,
      materials: _materials,
    });
  };

  const storeMedicineListHandler = (_medicines: IMedicine[] = []) => {
    dispatchInspectionContextAction({
      type: actionTypes.SET_MEDICINE_LIST,
      medicines: _medicines,
    });
  };

  return (
    <InspectionContext.Provider
      value={{
        materials: InspectionContextState.materials,
        medicines: InspectionContextState.medicines,
        setMaterialList: storeMaterialListHandler,
        setMedicineList: storeMedicineListHandler,
      }}
    >
      {props.children}
    </InspectionContext.Provider>
  );
};

export { InspectionContext, InspectionContextProvider };
