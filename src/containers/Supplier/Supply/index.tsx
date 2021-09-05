import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { SpinnerContext } from "../../../context/SpinnerContext";
import { ISpinnerState } from "../../../models/spinner.interface";
import { Web3Context } from "../../../context/Web3Context";
import { IWeb3State } from "../../../models/web3.interface";
import {
  CONTRACT_ADDRESS,
  MANUFACTURERS_ASSOC,
  MATERIAL_SEND_FOR_INSPECTION,
  RAW_MATERIAL_REGISTERED,
  RAW_MATERIAL_UPDATED,
  ROLE_BRAND,
  TOTAL_BATCHES,
  TOTAL_RAW_MATERIALS,
  TRANSPORTERS_ASSOC,
  YOUR_ADDRESS,
} from "../../../utils/constants";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";
import RegisteredRawMaterialsComponent from "../../../components/RegisteredRawMaterials";
import { IRawMaterial } from "../../../models/material.interface";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { populateRoleBasedList } from "../../../utils/helpers";
import AddressBarComponent from "../../../components/AddressBar";
import { IAddressBar } from "../../../models/addressbar.interface";
import { ISummaryBar } from "../../../models/summarybar.interface";
import SummaryBarComponent from "../../../components/SummaryBar";
import {
  getTransactionData,
  sendTransaction,
} from "../../../services/contractAPI";
import { ToastContext } from "../../../context/ToastContext";
import useRegisteredRawMaterial from "../../../hooks/useRegisteredRawMaterial";
import { SupplierContext } from "../../../context/SupplierContext";
import { ISupplierContext } from "../../../models/supplier.interface";
import { DialogContext } from "../../../context/DialogContext";
import { IDialogContext } from "../../../models/dialog.interface";
import RegisteredUsersBarComponent from "../../../components/RegisteredUsersBar";
import PanelLayout from "../../../layout/Panel";
import withUsers from "../../../hoc/withUsers";

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

const SupplyBoardComponent = (props: any) => {
  const classes = useStyles();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const userListState = props["userList"];

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

  useEffect(() => {
    try {
      if (contractInstance) {
        toggleSpinner();
        getTransactionData(
          contractInstance,
          "getListOfRegisteredRawMaterial",
          selectedAccount,
          selectedAccount
        )
          .then((addresses: any) => {
            let _listOfMaterials: Array<IRawMaterial> = [];
            let _batchesShippedCount = 0;
            addresses.forEach((addr: any) => {
              loadRegisteredRawMaterial(addr)
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
            }, 400);
          });
      }
    } catch (e: any) {
      toggleSpinner();
      toggleToast("error", e?.errorMessage);
    }
  }, []);

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
        rawMaterialObj.manufacturer,
        userListState?.inspector?.userAddress
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
            const _updatedRawMaterial: IRawMaterial =
              RawMaterialInitializeEvt?.returnValues as IRawMaterial;
            const _rawMaterialList: IRawMaterial[] = [...registeredMaterials];
            _rawMaterialList.push(_updatedRawMaterial);
            storeSupplierData(_rawMaterialList.length, batchesShippedCount, [
              ..._rawMaterialList,
            ]);
            toggleToast("success", RAW_MATERIAL_REGISTERED);
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
        rawMaterialObj.manufacturer,
        userListState?.inspector?.userAddress
      );
      res
        .then((_result: any) => {
          const RawMaterialInitializeEvt =
            _result.events["RawMaterialInitialize"];
          const _updatedRawMaterial: IRawMaterial =
            RawMaterialInitializeEvt?.returnValues as IRawMaterial;
          const _rawMaterialList: IRawMaterial[] = [...registeredMaterials];

          const updatedList = _rawMaterialList.map((material: IRawMaterial) => {
            if (
              material.materialId?.toLowerCase() ===
              _updatedRawMaterial.materialId?.toLowerCase()
            ) {
              material.description = _updatedRawMaterial.description;
              material.producerName = _updatedRawMaterial.producerName;
              material.location = _updatedRawMaterial.location;
              material.quantity = _updatedRawMaterial.quantity;
              material.shipper = _updatedRawMaterial.shipper;
              material.manufacturer = _updatedRawMaterial.manufacturer;
              material.packageStatus = parseInt(
                _updatedRawMaterial.packageStatus
              );
              return material;
            }
            return material;
          });

          storeSupplierData(updatedList.length, batchesShippedCount, [
            ...updatedList,
          ]);
          toggleToast("success", RAW_MATERIAL_UPDATED);
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

  const sendRawMaterialForQualityCheck = (rawMaterialObj: IRawMaterial) => {
    try {
      toggleSpinner();
      //Initiate raw material shipment
      const _result = sendTransaction(
        contractInstance,
        "sendMaterialPackageForInspection",
        selectedAccount,
        rawMaterialObj.materialId,
        rawMaterialObj.inspector
      );
      _result
        .then((res: any) => {
          const updatedRawMaterialPackageStatusEvt =
            res?.events["UpdatedRawMaterialPackageStatus"]["returnValues"];
          const _rawMaterialList = [...registeredMaterials];
          const updatedList = _rawMaterialList.map((material: IRawMaterial) => {
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
          });
          storeSupplierData(materialCount, batchesShippedCount, [
            ...updatedList,
          ]);
          toggleToast("success", MATERIAL_SEND_FOR_INSPECTION);
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
        value: userListState.manufacturerCount,
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

  return (
    <div className={classes.root}>
      <SummaryBarComponent summaryBarList={populateDashboardSummaryBarData()} />
      <AddressBarComponent addressBarList={populateUserAddressBarData()} />
      <PanelLayout panelTitle="Registered Raw Materials">
        <RegisteredRawMaterialsComponent
          RawMaterials={registeredMaterials}
          registerNewMaterial={registerNewMaterial}
          editRawMaterial={editRawMaterial}
          sendRawMaterialForQualityCheck={sendRawMaterialForQualityCheck}
          userList={userListState.users}
        />
      </PanelLayout>
      {userListState.users.length > 0 && (
        <RegisteredUsersBarComponent
          roles={["manufacturer", "transporter"]}
          users={populateRoleBasedList(userListState.users) as any}
        />
      )}
    </div>
  );
};

export default withUsers(SupplyBoardComponent);
