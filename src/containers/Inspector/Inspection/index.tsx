import React, { useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { IInspectionContext } from "../../../models/inspection.interface";
import { IAddressBar } from "../../../models/addressbar.interface";
import {
  CONTRACT_ADDRESS,
  MEDICINE_APPROVED_SENT_FOR_SHIPMENT,
  MEDICINE_REJECTED_SENT_TO_MANUF,
  RAW_MATERIAL_APPROVED_SENT_FOR_SHIPMENT,
  RAW_MATERIAL_REJECTED_SENT_TO_SUPPLIER,
  ROLE_BRAND,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import { IWeb3State } from "../../../models/web3.interface";
import { Web3Context } from "../../../context/Web3Context";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AddressBarComponent from "../../../components/AddressBar";
import { useEffect } from "react";
import { ISpinnerState } from "../../../models/spinner.interface";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ToastContext } from "../../../context/ToastContext";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import useRegisteredRawMaterial from "../../../hooks/useRegisteredRawMaterial";
import { IRawMaterial } from "../../../models/material.interface";
import PanelLayout from "../../../layout/Panel";
import { DialogContext } from "../../../context/DialogContext";
import { IDialogContext } from "../../../models/dialog.interface";
import MedicineInspectionComponent from "../../../components/MedicineInspection";
import { IMedicine } from "../../../models/medicine.interface";
import useMedicineBatchDetails from "../../../hooks/useMedicineBatchDetails";
import { InspectionContext } from "../../../context/InspectionContext";
import MaterialInspectionComponent from "../../../components/MaterialInspection";
import withUsers from "../../../hoc/withUsers";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderRadius: "0px",
    },
  })
);

const InspectionBoardComponent = (props: any) => {
  const classes = useStyles();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();
  const userListState = props["userList"];

  const inspectionContext = useContext<IInspectionContext>(InspectionContext);
  const { materials, medicines, setMaterialList, setMedicineList } =
    inspectionContext;

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  useEffect(() => {
    try {
      if (contractInstance) {
        toggleSpinner();
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getTaggedInspectorMaterialList",
          selectedAccount,
          selectedAccount
        );
        result
          .then((materialIds: any) => {
            let counter = 0;
            materialIds.forEach((materialId: any) => {
              loadRegisteredRawMaterial(materialId)
                .then((record: any) => {
                  materials.push(record as IRawMaterial);
                  counter++;
                  if (counter === materialIds.length) {
                    debugger;
                    setMaterialList(materials);
                  }
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            setTimeout(() => {
              toggleSpinner();
            }, 500);
          });

        const medicineResult: Promise<any> = getTransactionData(
          contractInstance,
          "getTaggedInspectorMedicineList",
          selectedAccount,
          selectedAccount
        );
        medicineResult
          .then((medicineIds: any) => {
            let counter = 0;
            medicineIds.forEach((medicineId: any) => {
              loadMedicineDetails(medicineId)
                .then((record: any) => {
                  const medicineData: IMedicine = {
                    ...record,
                    ...record.medicineEntity,
                  };
                  medicines.push(medicineData);
                  counter++;
                  if (counter === medicineIds.length) {
                    setMedicineList(medicines);
                  }
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  }, []);

  const updateMaterialPackageStatus = (
    materialId: string,
    transporter: string,
    isApprove: boolean
  ) => {
    try {
      toggleSpinner();
      const _methodName = isApprove
        ? "approveMaterialPackageAfterInspection"
        : "rejectMaterialPackageAfterInspection";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        materialId,
        transporter
      );
      result
        .then((res: any) => {
          const updatedRawMaterialPackageStatusEvt =
            res?.events["UpdatedPackageStatus"]["returnValues"];
          const updatedList: IRawMaterial[] = [...materials].map(
            (material: IRawMaterial) => {
              if (
                updatedRawMaterialPackageStatusEvt &&
                updatedRawMaterialPackageStatusEvt.materialId?.toLowerCase() ===
                  material.materialId.toLowerCase()
              ) {
                material.packageStatus = parseInt(
                  updatedRawMaterialPackageStatusEvt.packageStatus
                );
                return material;
              } else {
                return material;
              }
            }
          );

          setMaterialList(updatedList);
          toggleToast(
            "success",
            isApprove
              ? RAW_MATERIAL_APPROVED_SENT_FOR_SHIPMENT
              : RAW_MATERIAL_REJECTED_SENT_TO_SUPPLIER
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const updateMedicineBatchStatus = (
    medicineObj: IMedicine,
    isApprove: boolean
  ) => {
    try {
      toggleSpinner();
      const _methodName = isApprove
        ? "approveMedicineBatchAfterInspection"
        : "rejectMedicineBatchAfterInspection";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        medicineObj.medicineId,
        medicineObj.shipper
      );
      result
        .then((res: any) => {
          const UpdatedMedicineStatusEvt =
            res?.events["UpdatedMedicineStatus"]["returnValues"];
          const updatedList: IMedicine[] = [...medicines].map(
            (medicine: IMedicine) => {
              if (
                UpdatedMedicineStatusEvt &&
                UpdatedMedicineStatusEvt.medicineId?.toLowerCase() ===
                  medicine.medicineId.toLowerCase()
              ) {
                medicine.packageStatus = parseInt(
                  UpdatedMedicineStatusEvt.packageStatus
                );
                medicine.transactionBlocks =
                  UpdatedMedicineStatusEvt.transactionBlocks;
                return medicine;
              } else {
                return medicine;
              }
            }
          );

          setMedicineList([...updatedList]);
          toggleToast(
            "success",
            isApprove
              ? MEDICINE_APPROVED_SENT_FOR_SHIPMENT
              : MEDICINE_REJECTED_SENT_TO_MANUF
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
          updateDialogStatus(false, false);
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const populateUserAddressBarData = (): IAddressBar[] => {
    const addressBarList: IAddressBar[] = [
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: YOUR_ADDRESS,
        value: selectedAccount,
        iconComp: (
          <ContactsOutlinedIcon
            style={{ color: ROLE_BRAND["inspector"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 12,
        sizeLG: 6,
        label: CONTRACT_ADDRESS,
        value: contractInstance?._address,
        iconComp: <ContactsOutlinedIcon style={{ color: "#DC2ADE" }} />,
      },
    ];
    return addressBarList;
  };

  return (
    <div className={classes.root}>
      <AddressBarComponent addressBarList={populateUserAddressBarData()} />
      <PanelLayout panelTitle="Raw Material Quality Control Inspection">
        {materials && (
          <MaterialInspectionComponent
            userList={userListState.users}
            updateMaterialPackageStatus={updateMaterialPackageStatus}
            materials={materials}
          />
        )}
      </PanelLayout>
      <PanelLayout panelTitle="Medicine Batch Quality Control Inspection">
        {medicines && (
          <MedicineInspectionComponent
            updateMedicineBatchStatus={updateMedicineBatchStatus}
            userList={userListState.users}
            medicines={medicines}
          />
        )}
      </PanelLayout>
    </div>
  );
};

export default withUsers(InspectionBoardComponent);
