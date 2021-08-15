import React, { useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import AddressBarComponent from "../../../components/AddressBar";
import { IAddressBar } from "../../../models/addressbar.interface";
import {
  CONTRACT_ADDRESS,
  MATERIAL_DELIVERED_BY_TRANS,
  MATERIAL_SHIPPED_BY_TRANS,
  MEDICINEDP_DELIVERED_BY_TRANS,
  MEDICINEDP_SHIPPED_BY_TRANS,
  MEDICINE_DELIVERED_BY_TRANS,
  MEDICINE_SHIPPED_BY_TRANS,
  ROLE_BRAND,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import { IWeb3State } from "../../../models/web3.interface";
import { Web3Context } from "../../../context/Web3Context";
import { ITransporterContext } from "../../../models/transporter.interface";
import { TransporterContext } from "../../../context/TransporterContext";
import PanelLayout from "../../../layout/Panel";
import MaterialsShipmentComponent from "../../../components/MaterialsShipment";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import useRegisteredRawMaterial from "../../../hooks/useRegisteredRawMaterial";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ISpinnerState } from "../../../models/spinner.interface";
import { ToastContext } from "../../../context/ToastContext";
import { IRawMaterial } from "../../../models/material.interface";
import MedicinesShipmentComponent from "../../../components/MedicinesShipment";
import { IMedicine } from "../../../models/medicine.interface";
import useMedicineBatchDetails from "../../../hooks/useMedicineBatchDetails";
import MedicinesDPShipmentComponent from "../../../components/MedicineDPShipment";
import useMedicineDPBatchDetails from "../../../hooks/useMedicineDPBatchDetails";
import { IMedicineDP } from "../../../models/medicineDP.interface";
import withUsers from "../../../hoc/withUsers";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "15px",
      marginBottom: "15px",
    },
  })
);

const ShipmentBoardComponent = (props: any) => {
  const classes = useStyles();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();
  const loadMedicineDPDetails = useMedicineDPBatchDetails();
  const userListState = props["userList"];

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const transporterContext =
    useContext<ITransporterContext>(TransporterContext);
  const {
    materials,
    setMaterialList,
    medicines,
    setMedicineList,
    medicinesDP,
    setMedicineDPList,
  } = transporterContext;

  useEffect(() => {
    try {
      if (contractInstance) {
        toggleSpinner();
        const result: Promise<any> = getTransactionData(
          contractInstance,
          "getTaggedTransporterMaterialList",
          selectedAccount,
          selectedAccount
        );
        result
          .then((materialIds: any) => {
            let counter = 0;
            materialIds.forEach((materialId: any) => {
              loadRegisteredRawMaterial(materialId)
                .then((record: any) => {
                  if (
                    [3, 4, 5, 6, 7].indexOf(parseInt(record["packageStatus"])) >
                    -1
                  ) {
                    materials.push(record as IRawMaterial);
                  }
                  counter++;
                  if (counter === materialIds.length) {
                    setMaterialList([...materials]);
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
          "getTaggedTransporterMedicineList",
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
                  if (
                    [3, 4, 5, 6, 7].indexOf(
                      parseInt(medicineData["packageStatus"])
                    ) > -1
                  ) {
                    medicines.push(medicineData);
                  }
                  counter++;
                  if (counter === medicineIds.length) {
                    setMedicineList([...medicines]);
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

  useEffect(() => {
    const medicineDPResult: Promise<any> = getTransactionData(
      contractInstance,
      "getTransporterTaggedMedicineSubBatchList",
      selectedAccount,
      selectedAccount
    );
    medicineDPResult
      .then((medicineSubContractIds: any) => {
        let counter = 0;
        medicineSubContractIds.forEach((medicineSubContractId: string) => {
          loadMedicineDPDetails(medicineSubContractId)
            .then((record: any) => {
              const medicineDataDP: IMedicineDP = {
                ...record,
                ...record["medicineInfo"],
                ...record["medicineEntity"],
              };
              if (parseInt(medicineDataDP["packageStatus"]) >= 0) {
                medicinesDP.push(medicineDataDP);
              }
              counter++;
              if (counter === medicineSubContractIds.length) {
                setMedicineDPList([...medicinesDP]);
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
  }, []);

  const updateMaterialPackageStatus = (
    selectMaterialId,
    manufacturer,
    isShipment
  ) => {
    try {
      toggleSpinner();
      const _methodName = isShipment
        ? "loadMaterialPackageForShipment"
        : "deliverShippedMaterialPackage";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        selectMaterialId,
        manufacturer
      );
      result
        .then((res: any) => {
          const updatedRawMaterialPackageStatusEvt =
            res?.events["UpdatedMaterialShipmentStatus"]["returnValues"];
          const updatedMaterials: IRawMaterial[] = [...materials].map(
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

          setMaterialList([...updatedMaterials]);
          toggleToast(
            "success",
            isShipment ? MATERIAL_SHIPPED_BY_TRANS : MATERIAL_DELIVERED_BY_TRANS
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const updateMedicineBatchStatus = (
    selectedMedicineId,
    distributor,
    isShipment
  ) => {
    try {
      toggleSpinner();
      const _methodName = isShipment
        ? "loadMedicineBatchForShipment"
        : "deliverShippedMedicineBatch";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        selectedMedicineId,
        distributor
      );
      result
        .then((res: any) => {
          const UpdatedMedicineShipmentStatusEvt =
            res?.events["UpdatedMedicineShipmentStatus"]["returnValues"];
          const updatedMedicines: IMedicine[] = [...medicines].map(
            (medicine: IMedicine) => {
              if (
                UpdatedMedicineShipmentStatusEvt &&
                UpdatedMedicineShipmentStatusEvt.medicineId?.toLowerCase() ===
                  medicine.medicineId.toLowerCase()
              ) {
                medicine.packageStatus = parseInt(
                  UpdatedMedicineShipmentStatusEvt.packageStatus
                );
                medicine.transactionBlocks =
                  UpdatedMedicineShipmentStatusEvt.transactionBlocks;
                return medicine;
              } else {
                return medicine;
              }
            }
          );

          setMedicineList([...updatedMedicines]);
          toggleToast(
            "success",
            isShipment ? MEDICINE_SHIPPED_BY_TRANS : MEDICINE_DELIVERED_BY_TRANS
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
        });
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  };

  const updateMedicineDPBatchStatus = (
    selectedMedicineSubContractId,
    pharma,
    isShipment
  ) => {
    try {
      toggleSpinner();
      const _methodName = isShipment
        ? "loadMedicineSubBatchForShipment"
        : "deliverShippedMedicineSubBatch";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        selectedMedicineSubContractId,
        pharma
      );
      result
        .then((res: any) => {
          const UpdatedMedicineSubBatchShipmentStatusEvt =
            res?.events["UpdatedMedicineSubBatchShipmentStatus"][
              "returnValues"
            ];
          const updatedMedicinesDP: IMedicineDP[] = [...medicinesDP].map(
            (medicineDP: IMedicineDP) => {
              if (
                UpdatedMedicineSubBatchShipmentStatusEvt &&
                UpdatedMedicineSubBatchShipmentStatusEvt.medicineSubContract?.toLowerCase() ===
                  medicineDP.medicineSubContract.toLowerCase() &&
                UpdatedMedicineSubBatchShipmentStatusEvt.medicineId?.toLowerCase() ===
                  medicineDP.medicineId.toLowerCase()
              ) {
                medicineDP.packageStatus = parseInt(
                  UpdatedMedicineSubBatchShipmentStatusEvt.packageStatus
                );
                medicineDP.transactionBlocksDP =
                  UpdatedMedicineSubBatchShipmentStatusEvt.transactionBlocksDP;
                return medicineDP;
              } else {
                return medicineDP;
              }
            }
          );

          setMedicineDPList([...updatedMedicinesDP]);
          toggleToast(
            "success",
            isShipment
              ? MEDICINEDP_SHIPPED_BY_TRANS
              : MEDICINEDP_DELIVERED_BY_TRANS
          );
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {
          toggleSpinner();
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
            style={{ color: ROLE_BRAND["transporter"]["bgColor"] }}
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
      <PanelLayout panelTitle="Raw Material Package Shipment (Supplier to Manufacturer)">
        <MaterialsShipmentComponent
          userList={userListState.users}
          updateMaterialPackageStatus={updateMaterialPackageStatus}
        />
      </PanelLayout>
      <PanelLayout panelTitle="Medicine Batch Shipment (Manufacturer to Distributor)">
        <MedicinesShipmentComponent
          userList={userListState.users}
          updateMedicineBatchStatus={updateMedicineBatchStatus}
        />
      </PanelLayout>
      <PanelLayout panelTitle="Medicine Batch Shipment (Distributor to Pharmaceutical Shop)">
        <MedicinesDPShipmentComponent
          userList={userListState.users}
          updateMedicineDPBatchStatus={updateMedicineDPBatchStatus}
          medicinesDP={medicinesDP}
        />
      </PanelLayout>
    </div>
  );
};

export default withUsers(ShipmentBoardComponent);
