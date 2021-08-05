import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "../../context/SpinnerContext";
import { ISpinnerState } from "../../models/spinner.interface";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import DashboardLayout from "../../layout/DashboardPage";
import {
  CONTRACT_ADDRESS,
  MANUFACTURERS_ASSOC,
  MATERIAL_PACKAGE_SHIPMENT,
  RAW_MATERIAL_REGISTERED,
  RAW_MATERIAL_UPDATED,
  ROLE_BRAND,
  SUPPLIER_DASHBOARD_TITLE,
  TOTAL_BATCHES,
  TOTAL_RAW_MATERIALS,
  TRANSPORTERS_ASSOC,
  YOUR_ADDRESS,
} from "../../utils/constants";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import RegisteredRawMaterialsComponent from "../../components/RegisteredRawMaterials";
import { IRawMaterial } from "../../models/material.interface";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { populateRoleBasedList } from "../../utils/helpers";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import AddressBarComponent from "../../components/AddressBar";
import { IAddressBar } from "../../models/addressbar.interface";
import { ISummaryBar } from "../../models/summarybar.interface";
import SummaryBarComponent from "../../components/SummaryBar";
import {
  getTransactionData,
  sendTransaction,
} from "../../services/contractAPI";
import { ToastContext } from "../../context/ToastContext";
import useRegisteredRawMaterial from "../../hooks/useRegisteredRawMaterial";
import { SupplierContext } from "../../context/SupplierContext";
import { ISupplierContext } from "../../models/supplier.interface";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import RegisteredUsersBarComponent from "../../components/RegisteredUsersBar";

type SupplierDashboardProps = {};

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

const SupplierDashboardComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const supplierContext = useContext<ISupplierContext>(SupplierContext);
  const {
    materialCount,
    batchesShippedCount,
    registeredMaterials,
    storeSupplierData,
  } = supplierContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { updateDialogStatus } = dialogContext;

  const [userList, setUserList] = useState<any>({
    users: [],
    manufacturerCount: 0,
    transporterCount: 0,
  });

  useEffect(() => {
    try {
      if (contractInstance && registeredMaterials.length === 0) {
        toggleSpinner();
        getTransactionData(
          contractInstance,
          "getListOfRegisteredRawMateriaAddress",
          selectedAccount,
          selectedAccount
        )
          .then((addresses: any) => {
            let _listOfMaterials: Array<IRawMaterial> = [];
            let _batchesShippedCount = 0;
            addresses.forEach((addr: any) => {
              loadRegisteredRawMaterial(contractInstance, selectedAccount, addr)
                .then((record: any) => {
                  _listOfMaterials.push(record);
                  if (parseInt(record.packageStatus) !== 0) {
                    _batchesShippedCount = _batchesShippedCount + 1;
                  }
                  if (_listOfMaterials.length === addresses.length) {
                    storeSupplierData(
                      _listOfMaterials.length,
                      _batchesShippedCount,
                      [..._listOfMaterials]
                    );
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
            }, 300);
          });

        loadUsers(contractInstance, selectedAccount)
          .then((res: any) => {
            const list = populateRoleBasedList(res);
            setUserList({
              ...userList,
              users: res,
              manufacturerCount: list.manufacturerList.length,
              transporterCount: list.transporterList.length,
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
  }, [contractInstance]);

  const registerNewMaterial = (rawMaterialObj: IRawMaterial) => {
    try {
      toggleSpinner();
      //register raw material
      const res: Promise<any> = sendTransaction(
        contractInstance,
        "createRawMaterialPackage",
        selectedAccount,
        rawMaterialObj.description,
        rawMaterialObj.producerName,
        rawMaterialObj.location,
        parseInt(rawMaterialObj.quantity),
        rawMaterialObj.shipper,
        rawMaterialObj.manufacturer
      );
      res
        .then((_result: any) => {
          if (
            _result?.status &&
            _result.events &&
            _result.events["RawMaterialInitialize"]
          ) {
            const RawMaterialInitializeEvt =
              _result.events["RawMaterialInitialize"];
            //get raw material
            loadRegisteredRawMaterial(
              contractInstance,
              selectedAccount,
              RawMaterialInitializeEvt?.returnValues["MaterialID"]
            ).then((res: any) => {
              const _rawMaterialList = [...registeredMaterials];
              _rawMaterialList.push(res);
              storeSupplierData(_rawMaterialList.length, batchesShippedCount, [
                ..._rawMaterialList,
              ]);
              toggleToast("success", RAW_MATERIAL_REGISTERED);
            });
          }
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

  const editRawMaterial = (rawMaterialObj: IRawMaterial) => {
    try {
      toggleSpinner();
      //update raw material
      const res: Promise<any> = sendTransaction(
        contractInstance,
        "updateRawMaterial",
        selectedAccount,
        rawMaterialObj.materialId,
        rawMaterialObj.description,
        rawMaterialObj.producerName,
        rawMaterialObj.location,
        parseInt(rawMaterialObj.quantity),
        rawMaterialObj.shipper,
        rawMaterialObj.manufacturer
      );
      res
        .then((_result: any) => {
          //get raw material
          loadRegisteredRawMaterial(
            contractInstance,
            selectedAccount,
            rawMaterialObj.materialId
          ).then((res: any) => {
            const _rawMaterialList = [...registeredMaterials];
            const _rawMaterialObj = { ...res };
            const updatedList = _rawMaterialList.map(
              (material: IRawMaterial) => {
                if (material.materialId === _rawMaterialObj.materialId) {
                  material.description = _rawMaterialObj.description;
                  material.producerName = _rawMaterialObj.producerName;
                  material.location = _rawMaterialObj.location;
                  material.quantity = _rawMaterialObj.quantity;
                  material.shipper = _rawMaterialObj.shipper;
                  material.manufacturer = _rawMaterialObj.manufacturer;
                }
                return material;
              }
            );
            storeSupplierData(materialCount, batchesShippedCount, [
              ...updatedList,
            ]);
            toggleToast("success", RAW_MATERIAL_UPDATED);
          });
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

  const transportRawMaterial = (rawMaterialObj: IRawMaterial) => {
    try {
      toggleSpinner();
      //Initiate raw material shipment
      const _result = sendTransaction(
        contractInstance,
        "loadAndShipRawMaterialBatch",
        selectedAccount,
        rawMaterialObj.materialId,
        rawMaterialObj.manufacturer
      );
      _result
        .then((res: any) => {
          //get raw material
          loadRegisteredRawMaterial(
            contractInstance,
            selectedAccount,
            rawMaterialObj.materialId
          ).then((res: any) => {
            const _rawMaterialList = [...registeredMaterials];
            const _rawMaterialObj = { ...res };
            const updatedList = _rawMaterialList.map(
              (material: IRawMaterial) => {
                if (material.materialId === _rawMaterialObj.materialId) {
                  material.description = _rawMaterialObj.description;
                  material.producerName = _rawMaterialObj.producerName;
                  material.location = _rawMaterialObj.location;
                  material.quantity = _rawMaterialObj.quantity;
                  material.shipper = _rawMaterialObj.shipper;
                  material.manufacturer = _rawMaterialObj.manufacturer;
                  material.packageStatus = _rawMaterialObj.packageStatus;
                }
                return material;
              }
            );
            storeSupplierData(materialCount, batchesShippedCount + 1, [
              ...updatedList,
            ]);
            toggleToast("success", MATERIAL_PACKAGE_SHIPMENT);
          });
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
        label: TOTAL_RAW_MATERIALS,
        value: materialCount,
        iconComp: (
          <DnsOutlinedIcon fontSize="large" style={{ color: "#65D6CE" }} />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: MANUFACTURERS_ASSOC,
        value: userList.manufacturerCount,
        iconComp: (
          <ContactsOutlinedIcon
            fontSize="large"
            style={{ color: ROLE_BRAND["manufacturer"]["bgColor"] }}
          />
        ),
      },
      {
        sizeXS: 12,
        sizeSM: 3,
        label: TRANSPORTERS_ASSOC,
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
        sizeSM: 3,
        label: TOTAL_BATCHES,
        value: batchesShippedCount,
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
            style={{ color: ROLE_BRAND["supplier"]["bgColor"] }}
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

  const populateRegisteredRawMaterials = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12}>
          <RegisteredRawMaterialsComponent
            RawMaterials={registeredMaterials}
            registerNewMaterial={registerNewMaterial}
            editRawMaterial={editRawMaterial}
            transportRawMaterial={transportRawMaterial}
            userList={userList.users}
            toggleSpinner={toggleSpinner}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <DashboardLayout headerTitle={SUPPLIER_DASHBOARD_TITLE}>
      <div className={classes.root}>
        <SummaryBarComponent
          summaryBarList={populateDashboardSummaryBarData()}
        />
        <AddressBarComponent addressBarList={populateUserAddressBarData()} />
        {populateRegisteredRawMaterials()}
        {userList.users.length > 0 && (
          <RegisteredUsersBarComponent
            roles={["manufacturer", "transporter"]}
            users={populateRoleBasedList(userList.users) as any}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SupplierDashboardComponent;
