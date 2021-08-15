import React, { useContext, useEffect } from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ISpinnerState } from "../../../models/spinner.interface";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../models/web3.interface";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import { IRawMaterial } from "../../../models/material.interface";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import {
  CONTRACT_ADDRESS,
  LOGISTICS_TAGGED,
  MANUFACTURER_DASHBOARD_TITLE,
  MEDICINE_BATCH_REGISTERED,
  MEDICINE_BATCH_UPDATED,
  MEDICINE_SEND_FOR_INSPECTION,
  RAW_MATERIAL_REJECTED_SENT_TO_SUPPLIER,
  ROLE_BRAND,
  SUPPLIERS_TAGGED,
  TOTAL_BATCHES,
  TOTAL_MEDICINES_MANUFACTURED,
  TOTAL_RAW_MATERIALS_RECVD,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import MedicinesManufacturedComponent from "../../../components/MedicinesManufactured";
import RawMaterialsReceivedComponent from "../../../components/RawMaterialsReceived";
import { IMedicine } from "../../../models/medicine.interface";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetailsinMaterialRecord,
  populateUserDetailsinMedicineRecord,
} from "../../../utils/helpers";
import { IManufacturerContext } from "../../../models/manufacturer.interface";
import { ManufacturerContext } from "../../../context/ManufacturerContext";
import { ToastContext } from "../../../context/ToastContext";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import useRegisteredRawMaterial from "../../../hooks/useRegisteredRawMaterial";
import useMedicineBatchDetails from "../../../hooks/useMedicineBatchDetails";
import { IDialogContext } from "../../../models/dialog.interface";
import { DialogContext } from "../../../context/DialogContext";
import { ISummaryBar } from "../../../models/summarybar.interface";
import SummaryBarComponent from "../../../components/SummaryBar";
import { IAddressBar } from "../../../models/addressbar.interface";
import AddressBarComponent from "../../../components/AddressBar";
import RegisteredUsersBarComponent from "../../../components/RegisteredUsersBar";
import { allTransactionRef } from "../../../config/firebaseConfig";
import PanelLayout from "../../../layout/Panel";
import withUsers from "../../../hoc/withUsers";

type ManufacturerDashboardProps = {};

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
    registeredUserRoot: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
  })
);

const ManufacturingBoardComponent = (props: any) => {
  const classes = useStyles();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();
  const userListState = props["userList"];

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  const manufacturerContext =
    useContext<IManufacturerContext>(ManufacturerContext);
  const {
    medicineBatchCount,
    medicineShippedCount,
    rawMaterialsReceived,
    registeredMedicineBatch,
    storeManufacturerDashboardData,
  } = manufacturerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  useEffect(() => {
    try {
      if (contractInstance && rawMaterialsReceived.length === 0) {
        toggleSpinner();
        //Get all the shipped raw material addresses
        const result = getTransactionData(
          contractInstance,
          "getTaggedManufacturerMaterialList",
          selectedAccount,
          selectedAccount
        );

        result
          .then((materialIds: any) => {
            let _listOfRecvdMaterials: Array<IRawMaterial> = [];
            let _filtereRawMaterials: Array<IRawMaterial> = [];
            //Retrieve raw material details for each material id
            materialIds.forEach((matId: any) => {
              loadRegisteredRawMaterial(matId)
                .then((res: any) => {
                  _listOfRecvdMaterials.push(res as IRawMaterial);
                  if (_listOfRecvdMaterials.length === materialIds.length) {
                    //populate only selected manufacturer related raw material records
                    _filtereRawMaterials = _listOfRecvdMaterials.filter(
                      (mat: IRawMaterial) =>
                        mat?.manufacturer?.toLowerCase() ===
                        selectedAccount?.toLowerCase()
                    );
                  }
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            });

            //Get all the manufactured medicine ids
            const response = getTransactionData(
              contractInstance,
              "getManufacturedMedicinesAddress",
              selectedAccount,
              selectedAccount
            );
            response
              .then((medicineIds: any) => {
                let _listOfMedicineManu: Array<IMedicine> = [];
                let _medicineShippedCount = 0;
                if (medicineIds.length === 0) {
                  storeManufacturerDashboardData(
                    _listOfMedicineManu.length,
                    _medicineShippedCount,
                    [..._filtereRawMaterials],
                    []
                  );
                } else {
                  medicineIds
                    .forEach((medId: any) => {
                      //populate medicine details by batch id
                      loadMedicineDetails(medId).then((_record: any) => {
                        let medicineData: IMedicine = {
                          ..._record,
                          ..._record.medicineEntity,
                        };
                        // medicineData.medicineId = medId;
                        _listOfMedicineManu.push(medicineData);
                        //increment the medicineshippmentcount based on packagestatus
                        medicineData.packageStatus >= 1
                          ? (_medicineShippedCount = _medicineShippedCount + 1)
                          : "";
                        if (_listOfMedicineManu.length === medicineIds.length) {
                          storeManufacturerDashboardData(
                            _listOfMedicineManu.length,
                            _medicineShippedCount,
                            [..._filtereRawMaterials],
                            [..._listOfMedicineManu]
                          );
                        }
                      });
                    })
                    .catch((e: any) => {
                      toggleToast("error", e?.errorMessage);
                    });
                }
              })
              .catch((e: any) => {
                toggleToast("error", e?.errorMessage);
              });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          })
          .finally(() => {
            setTimeout(() => {
              toggleSpinner();
            }, 300);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  }, []);

  const updateMaterialPackageStatus = (
    materialObj: IRawMaterial,
    isApprove: boolean
  ) => {
    try {
      toggleSpinner();
      const _methodName = isApprove
        ? "approveMaterialPackage"
        : "rejectMaterialPackage";
      const result: Promise<any> = sendTransaction(
        contractInstance,
        _methodName,
        selectedAccount,
        materialObj.materialId
      );
      result
        .then((res: any) => {
          const updatedRawMaterialPackageStatusEvt =
            res?.events["UpdatedPackageStatusOnReceived"]["returnValues"];
          const updatedList: IRawMaterial[] = [...rawMaterialsReceived].map(
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

          storeManufacturerDashboardData(
            medicineBatchCount,
            medicineShippedCount,
            [...updatedList],
            registeredMedicineBatch
          );
          toggleToast(
            "success",
            isApprove
              ? "Raw material approved & process for medicine manufacturing"
              : RAW_MATERIAL_REJECTED_SENT_TO_SUPPLIER
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

  const createNewMedicineBatch = (
    medicineBatchObj: IMedicine,
    selectedMaterial: IRawMaterial
  ) => {
    toggleSpinner();
    //create new medicine batch using recvd material
    const result: Promise<any> = sendTransaction(
      contractInstance,
      "createMedicinePackage",
      selectedAccount,
      selectedMaterial.materialId,
      medicineBatchObj.medicineName,
      medicineBatchObj.description,
      medicineBatchObj.location,
      parseInt(medicineBatchObj.quantity),
      medicineBatchObj.shipper,
      medicineBatchObj.distributor,
      userListState?.inspector?.userAddress
    );
    result
      .then((response: any) => {
        console.log(response);
        const MedicinePackageInitializeEvt =
          response?.events["MedicinePackageInitialize"]["returnValues"];
        const newMedicineBatch: IMedicine = {
          ...medicineBatchObj,
          medicineId: MedicinePackageInitializeEvt["medicineId"],
          manufacturer: selectedAccount,
          materialId: MedicinePackageInitializeEvt["materialId"],
          inspector: userListState?.inspector?.userAddress,
          packageStatus: MedicinePackageInitializeEvt["medicineBatchStatus"],
          transactionBlocks: MedicinePackageInitializeEvt["transactionBlocks"],
        };

        registeredMedicineBatch.push(newMedicineBatch);
        loadRegisteredRawMaterial(selectedMaterial.materialId)
          .then(() => {
            populateTxBlockDetails(
              populateUserDetailsinMedicineRecord(
                newMedicineBatch,
                userListState.users
              )
            )?.then((medicineTxData: any) => {
              //get all transaction details for material
              populateTxBlockDetails(
                populateUserDetailsinMaterialRecord(
                  selectedMaterial,
                  userListState.users
                )
              )?.then((materialTxData: any) => {
                //store data in firebase
                const medicineRef = allTransactionRef.child(
                  MedicinePackageInitializeEvt["medicineId"]
                );
                medicineRef.set({
                  medicineInfo: { ...medicineTxData },
                  materialInfo: { ...materialTxData },
                });
                storeManufacturerDashboardData(
                  registeredMedicineBatch.length,
                  medicineShippedCount,
                  rawMaterialsReceived,
                  [...registeredMedicineBatch]
                );
                toggleToast("success", MEDICINE_BATCH_REGISTERED);
              });
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
      })
      .catch((e: any) => {
        toggleToast("error", e?.errorMessage);
      })
      .finally(() => {
        setTimeout(() => {
          toggleSpinner();
        }, 200);
        updateDialogStatus(false, false);
      });
  };

  const updateMedicineBatch = (medicineBatchObj: IMedicine) => {
    toggleSpinner();
    //Update medicine details before shipment initiated
    const result = sendTransaction(
      contractInstance,
      "updateMedicineBatch",
      selectedAccount,
      medicineBatchObj.medicineId,
      medicineBatchObj.medicineName,
      medicineBatchObj.location,
      medicineBatchObj.description,
      parseInt(medicineBatchObj.quantity),
      medicineBatchObj.shipper,
      medicineBatchObj.distributor
    );
    result
      .then(async (response: any) => {
        const UpdatedMedicineBatchInfoEvt =
          response?.events["UpdatedMedicineBatchInfo"]["returnValues"];
        const _medicineList = [...registeredMedicineBatch];
        //get updated medicine details
        const _updatedList = _medicineList.map((medicine: IMedicine) => {
          if (medicine.medicineId == medicineBatchObj.medicineId) {
            const updatedMedicineInfo = {
              ...medicine,
              ...UpdatedMedicineBatchInfoEvt,
            };
            return updatedMedicineInfo;
          } else {
            return medicine;
          }
        });
        storeManufacturerDashboardData(
          medicineBatchCount,
          medicineShippedCount,
          rawMaterialsReceived,
          [..._updatedList]
        );
        toggleToast("success", MEDICINE_BATCH_UPDATED);
      })
      .catch((e: any) => {
        toggleToast("error", e?.errorMessage);
      })
      .finally(() => {
        toggleSpinner();
        updateDialogStatus(false, false);
      });
  };

  const sendMedicineForQualityCheck = (medicineObj: IMedicine) => {
    try {
      toggleSpinner();
      const _result = sendTransaction(
        contractInstance,
        "sendMedicineBatchForInspection",
        selectedAccount,
        medicineObj.medicineId,
        medicineObj.inspector
      );
      _result
        .then((res: any) => {
          const UpdatedMedicineBatchStatusEvt =
            res?.events["UpdatedMedicineBatchStatus"]["returnValues"];
          const updatedList = [...registeredMedicineBatch].map(
            (medicine: IMedicine) => {
              if (
                UpdatedMedicineBatchStatusEvt &&
                UpdatedMedicineBatchStatusEvt.medicineId?.toLowerCase() ===
                  medicine.medicineId.toLowerCase()
              ) {
                medicine.packageStatus = parseInt(
                  UpdatedMedicineBatchStatusEvt.packageStatus
                );
                return medicine;
              } else {
                return medicine;
              }
            }
          );
          storeManufacturerDashboardData(
            medicineBatchCount,
            medicineShippedCount,
            rawMaterialsReceived,
            [...updatedList]
          );
          toggleToast("success", MEDICINE_SEND_FOR_INSPECTION);
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

  const populateDashboardSummaryBarData = (): ISummaryBar[] => {
    const summaryBarList: ISummaryBar[] = [
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_RAW_MATERIALS_RECVD,
        value: rawMaterialsReceived.length,
        iconComp: (
          <ReceiptOutlinedIcon fontSize="large" style={{ color: "#4AA96C" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TOTAL_MEDICINES_MANUFACTURED,
        value: medicineBatchCount,
        iconComp: (
          <DnsOutlinedIcon fontSize="large" style={{ color: "#65D6CE" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: SUPPLIERS_TAGGED,
        value: userListState.supplierCount,
        iconComp: (
          <ContactsOutlinedIcon
            fontSize="large"
            style={{ color: ROLE_BRAND["supplier"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: LOGISTICS_TAGGED,
        value: userListState.transporterCount,
        iconComp: (
          <ContactsOutlinedIcon
            fontSize="large"
            style={{ color: ROLE_BRAND["transporter"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 2,
        label: TOTAL_BATCHES,
        value: medicineShippedCount,
        iconComp: (
          <LocalShippingIcon fontSize="large" style={{ color: "#FDCA40" }} />
        ),
      },
    ];

    return summaryBarList;
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
            style={{ color: ROLE_BRAND["manufacturer"]["bgColor"] }}
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
      <SummaryBarComponent summaryBarList={populateDashboardSummaryBarData()} />
      <AddressBarComponent addressBarList={populateUserAddressBarData()} />
      <PanelLayout panelTitle="Raw Material Updates">
        <RawMaterialsReceivedComponent
          userList={userListState.users}
          rawMaterialsReceived={rawMaterialsReceived}
          updateMaterialPackageStatus={updateMaterialPackageStatus}
        />
      </PanelLayout>
      <PanelLayout panelTitle="Medicine Batch Updates">
        <MedicinesManufacturedComponent
          regMedicineBatches={registeredMedicineBatch}
          userList={userListState.users}
          updateMedicineBatch={updateMedicineBatch}
          registerNewMedicineBatch={createNewMedicineBatch}
          sendMedicineForQualityCheck={sendMedicineForQualityCheck}
        />
      </PanelLayout>
      {userListState.users.length > 0 && (
        <RegisteredUsersBarComponent
          roles={["supplier", "transporter"]}
          users={populateRoleBasedList(userListState.users) as any}
        />
      )}
    </div>
  );
};

export default withUsers(ManufacturingBoardComponent);
