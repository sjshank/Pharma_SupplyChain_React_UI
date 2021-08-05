import React, { useContext, useEffect, useState } from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { SpinnerContext } from "../../context/SpinnerContext";
import { ISpinnerState } from "../../models/spinner.interface";
import { UserInfoContext } from "../../context/UserContext";
import { IUserInfoContext } from "../../models/userInfo.interface";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import DashboardLayout from "../../layout/DashboardPage";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import { IRawMaterial } from "../../models/material.interface";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import {
  CONTRACT_ADDRESS,
  LOGISTICS_TAGGED,
  MANUFACTURER_DASHBOARD_TITLE,
  MEDICINE_BATCH_REGISTERED,
  MEDICINE_BATCH_SHIPMENT,
  MEDICINE_BATCH_UPDATED,
  ROLE_BRAND,
  SUPPLIERS_TAGGED,
  TOTAL_BATCHES,
  TOTAL_MEDICINES_MANUFACTURED,
  TOTAL_RAW_MATERIALS_RECVD,
  YOUR_ADDRESS,
} from "../../utils/constants";
import MedicinesManufacturedComponent from "../../components/MedicinesManufactured";
import RawMaterialsReceivedComponent from "../../components/RawMaterialsReceived";
import { IMedicine } from "../../models/medicine.interface";
import {
  populateRoleBasedList,
  populateTxBlockDetails,
  populateUserDetailsinMaterialRecord,
  populateUserDetailsinMedicineRecord,
} from "../../utils/helpers";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import { IManufacturerContext } from "../../models/manufacturer.interface";
import { ManufacturerContext } from "../../context/ManufacturerContext";
import { ToastContext } from "../../context/ToastContext";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import useRegisteredRawMaterial from "../../hooks/useRegisteredRawMaterial";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import { ISummaryBar } from "../../models/summarybar.interface";
import SummaryBarComponent from "../../components/SummaryBar";
import { IAddressBar } from "../../models/addressbar.interface";
import AddressBarComponent from "../../components/AddressBar";
import RegisteredUsersBarComponent from "../../components/RegisteredUsersBar";
import { allTransactionRef } from "../../config/firebaseConfig";

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
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    createUserBtn: {
      float: "right",
      marginTop: "-35px",
      color: "rgb(41, 187, 137)",
      border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
  })
);

const ManufacturerDashboardComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

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

  const [userList, setUserList] = useState<any>({
    users: [],
    supplierCount: 0,
    transporterCount: 0,
  });

  useEffect(() => {
    try {
      if (contractInstance && rawMaterialsReceived.length === 0) {
        toggleSpinner();
        //Get all the shipped raw material addresses
        const result = getTransactionData(
          contractInstance,
          "getAllShippedRawMaterialList",
          selectedAccount,
          selectedAccount
        );

        result
          .then((materialIds: any) => {
            let _listOfRecvdMaterials: Array<IRawMaterial> = [];
            let _filtereRawMaterials: Array<IRawMaterial> = [];
            //Retrieve raw material details for each material id
            materialIds.forEach((matId: any) => {
              loadRegisteredRawMaterial(
                contractInstance,
                selectedAccount,
                matId
              )
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
                      loadMedicineDetails(
                        contractInstance,
                        selectedAccount,
                        medId
                      ).then((_record: any) => {
                        let medicineData: IMedicine = { ..._record };
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
  }, [contractInstance]);

  useEffect(() => {
    if (contractInstance && userList?.users?.length === 0) {
      loadUsers(contractInstance, selectedAccount)
        .then((users: any) => {
          const list = populateRoleBasedList(users);
          setUserList({
            ...userList,
            users: users,
            supplierCount: list.supplierList.length,
            transporterCount: list.transporterList.length,
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        });
    }
  }, [contractInstance]);

  const createNewMedicineBatch = (medicineBatchObj: IMedicine) => {
    toggleSpinner();
    //create new medicine batch using recvd material
    const result: Promise<any> = sendTransaction(
      contractInstance,
      "createMedicinePackage",
      selectedAccount,
      medicineBatchObj.materialId,
      medicineBatchObj.medicineName,
      medicineBatchObj.location,
      medicineBatchObj.description,
      parseInt(medicineBatchObj.quantity),
      medicineBatchObj.shipper,
      medicineBatchObj.distributor
    );
    result
      .then(async (response: any) => {
        let _updatedMaterialRecord: any = {};
        const _listOfRecvdMaterials: Array<IRawMaterial> = [
          ...rawMaterialsReceived,
        ];
        let _updatedList: IRawMaterial[] = [];
        //reload updated material details
        await loadRegisteredRawMaterial(
          contractInstance,
          selectedAccount,
          medicineBatchObj.materialId
        )
          .then((_record: any) => {
            _updatedMaterialRecord = { ..._record };
            _updatedList = _listOfRecvdMaterials.map((mat: IRawMaterial) => {
              if (
                mat.materialId == _record.materialId &&
                selectedAccount?.toLowerCase() ===
                  mat.manufacturer.toLowerCase()
              ) {
                return _record;
              } else {
                return mat;
              }
            });
          })
          .catch((e: any) => {
            toggleToast("error", e?.errorMessage);
          });
        let _listOfMedicineManu: Array<IMedicine> = [
          ...registeredMedicineBatch,
        ];

        //update medicine batch details with latest values
        const _medicineBatchEvt = response?.events?.MedicinePackageInitialize;
        await loadMedicineDetails(
          contractInstance,
          selectedAccount,
          _medicineBatchEvt?.returnValues?.MedicineID
        )
          .then((_record: any) => {
            _listOfMedicineManu.push(_record as IMedicine);

            //get all transaction details for medicine
            populateTxBlockDetails(
              populateUserDetailsinMedicineRecord(_record, userList.users)
            )?.then((medicineTxData: any) => {
              //get all transaction details for material
              populateTxBlockDetails(
                populateUserDetailsinMaterialRecord(
                  _updatedMaterialRecord,
                  userList.users
                )
              )?.then((materialTxData: any) => {
                //store data in firebase
                const medicineRef = allTransactionRef.child(
                  _medicineBatchEvt?.returnValues?.MedicineID
                );
                medicineRef.set({
                  medicineInfo: { ...medicineTxData },
                  materialInfo: { ...materialTxData },
                });
                storeManufacturerDashboardData(
                  _listOfMedicineManu.length,
                  medicineShippedCount,
                  [..._updatedList],
                  [..._listOfMedicineManu]
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

  const transportMedicineBatch = (medicineBatchObj: IMedicine) => {
    toggleSpinner();
    //load & ship medicine to distributor
    const response: Promise<any> = sendTransaction(
      contractInstance,
      "loadAndShipMedicineBatch",
      selectedAccount,
      medicineBatchObj.medicineId,
      medicineBatchObj.distributor
    );
    response
      .then(async (_result: any) => {
        const _medicineList = [...registeredMedicineBatch];
        await loadMedicineDetails(
          contractInstance,
          selectedAccount,
          medicineBatchObj.medicineId
        )
          .then(async (medData: any) => {
            const _updatedList = _medicineList.map((medicine: IMedicine) => {
              if (medicine.medicineId == medData.medicineId) {
                return medData;
              } else {
                return medicine;
              }
            });

            //reload updated material details
            await loadRegisteredRawMaterial(
              contractInstance,
              selectedAccount,
              medData.materialId
            )
              .then((matData: any) => {
                //get all transaction details for medicine
                populateTxBlockDetails(
                  populateUserDetailsinMedicineRecord(medData, userList.users)
                )?.then((medicineTxData: any) => {
                  //get all transaction details for material
                  populateTxBlockDetails(
                    populateUserDetailsinMaterialRecord(matData, userList.users)
                  )?.then((materialTxData: any) => {
                    //store data in firebase
                    const medicineRef = allTransactionRef.child(
                      medData.medicineId
                    );
                    medicineRef.update({
                      medicineInfo: { ...medicineTxData },
                      materialInfo: { ...materialTxData },
                    });

                    storeManufacturerDashboardData(
                      medicineBatchCount,
                      medicineShippedCount + 1,
                      rawMaterialsReceived,
                      [..._updatedList]
                    );
                    toggleToast("success", MEDICINE_BATCH_SHIPMENT);
                  });
                });
              })
              .catch((e: any) => {
                toggleToast("error", e?.errorMessage);
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
        }, 150);
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
        const _medicineList = [...registeredMedicineBatch];
        //get updated medicine details
        await loadMedicineDetails(
          contractInstance,
          selectedAccount,
          medicineBatchObj.medicineId
        )
          .then((_record: any) => {
            const _updatedList = _medicineList.map((medicine: IMedicine) => {
              if (medicine.medicineId == _record.medicineId) {
                return _record;
              } else {
                return medicine;
              }
            });
            storeManufacturerDashboardData(
              medicineBatchCount,
              medicineShippedCount + 1,
              rawMaterialsReceived,
              [..._updatedList]
            );
            toggleToast("success", MEDICINE_BATCH_UPDATED);
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
        value: userList.supplierCount,
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
        value: userList.transporterCount,
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
    <DashboardLayout headerTitle={MANUFACTURER_DASHBOARD_TITLE}>
      <div className={classes.root}>
        <SummaryBarComponent
          summaryBarList={populateDashboardSummaryBarData()}
        />
        <AddressBarComponent addressBarList={populateUserAddressBarData()} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <RawMaterialsReceivedComponent
              userList={userList.users}
              rawMaterialsReceived={rawMaterialsReceived}
              userInfo={userInfo}
              createNewMedicineBatch={createNewMedicineBatch}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <MedicinesManufacturedComponent
              regMedicineBatches={registeredMedicineBatch}
              userList={userList.users}
              transportMedicineBatch={transportMedicineBatch}
              updateMedicineBatch={updateMedicineBatch}
            />
          </Grid>
        </Grid>
        {userList.users.length > 0 && (
          <RegisteredUsersBarComponent
            roles={["supplier", "transporter"]}
            users={populateRoleBasedList(userList.users) as any}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManufacturerDashboardComponent;
