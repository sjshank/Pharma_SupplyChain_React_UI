import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { UserInfoContext } from "../../context/UserContext";
import { IUserInfo, IUserInfoContext } from "../../models/userInfo.interface";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../models/web3.interface";
import useRegisteredUsers from "../../hooks/useRegisteredUsers";
import { ToastContext } from "../../context/ToastContext";
import { getTransactionData } from "../../services/contractAPI";
import useRegisteredRawMaterial from "../../hooks/useRegisteredRawMaterial";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import { IRawMaterial } from "../../models/material.interface";
import RawMaterialsReceivedComponent from "../../components/RawMaterialsReceived";
import { populateRoleBasedList } from "../../utils/helpers";
import { IMedicine } from "../../models/medicine.interface";
import MedicineReceivedMDComponent from "../../components/MedicineReceivedMD";
import MTypographyComponent from "../../generic/MTypography";
import useTableHeaders from "../../hooks/useTableHeaders";
import {
  MED_BATCHES_SHIPMENT_STATUS,
  RAW_MATERIAL_SHIPMENT_STATUS,
} from "../../utils/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overviewTitle: {
      textAlign: "center",
      marginTop: 10,
      fontWeight: 600,
      color: "#444",
    },
    outerOverviewSection: {
      padding: 10,
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
    },
  })
);

const BatchInfoComponent = () => {
  const classes = useStyles();
  const loadUsers = useRegisteredUsers();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();
  const materialTableHeaders = useTableHeaders("batchInfoMaterial");
  const medicineTableHeaders = useTableHeaders("batchInfoMedicine");

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const [rawMaterials, setRawMaterials] = useState<IRawMaterial[]>([]);
  const [medicineBatches, setMedicineBatches] = useState<IMedicine[]>([]);

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const [userList, setUserList] = useState<any>({
    users: [],
    supplierCount: 0,
    transporterCount: 0,
  });

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
          const _rawMaterials: IRawMaterial[] = [];
          list.manufacturerList.forEach((manufacturer: IUserInfo) => {
            if (
              !manufacturer.isDeleted &&
              manufacturer.userStatus === "Active"
            ) {
              //Get all the shipped raw material addresses for active user
              const result = getTransactionData(
                contractInstance,
                "getAllShippedRawMaterialList",
                selectedAccount,
                manufacturer.userAddress
              );

              result
                .then((materialIds: any) => {
                  //Retrieve raw material details for each material id
                  materialIds.forEach((matId: any) => {
                    loadRegisteredRawMaterial(
                      contractInstance,
                      selectedAccount,
                      matId
                    )
                      .then((res: any) => {
                        _rawMaterials.push(res as IRawMaterial);
                        setTimeout(() => {
                          setRawMaterials(_rawMaterials);
                        }, 100);
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
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        })
        .finally(() => {});
    }
  }, []);

  useEffect(() => {
    if (contractInstance) {
      loadUsers(contractInstance, selectedAccount)
        .then((users: any) => {
          const list = populateRoleBasedList(users);
          const _medicineBatches: IMedicine[] = [];
          list.distributorList.forEach((distributor: IUserInfo) => {
            if (!distributor.isDeleted && distributor.userStatus === "Active") {
              //Get all the shipped medicine batches addresses for active user
              const result: Promise<any> = getTransactionData(
                contractInstance,
                "getAllShippedMedicineList",
                selectedAccount,
                distributor.userAddress
              );

              result
                .then((medicineIds: any) => {
                  //retrieve each medicine details
                  medicineIds
                    .forEach((medId: any, index: number) => {
                      loadMedicineDetails(
                        contractInstance,
                        selectedAccount,
                        medId
                      ).then((_record: any) => {
                        _medicineBatches.push(_record as IMedicine);
                        if (medicineIds.length - 1 == index) {
                          setTimeout(() => {
                            setMedicineBatches(_medicineBatches);
                          }, 100);
                        }
                      });
                    })
                    .catch((e: any) => {
                      toggleToast("error", e?.errorMessage);
                    });
                })
                .catch((e: any) => {
                  toggleToast("error", e?.errorMessage);
                });
            }
          });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        });
    }
  }, []);

  return (
    <>
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.outerOverviewSection}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <MTypographyComponent
                  variant="h4"
                  text="Shipment Status Overview"
                  classname={classes.overviewTitle}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <RawMaterialsReceivedComponent
                  userList={userList.users}
                  rawMaterialsReceived={rawMaterials}
                  userInfo={userInfo}
                  isReadonly={true}
                  title={RAW_MATERIAL_SHIPMENT_STATUS}
                  materialTableHeaders={materialTableHeaders}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <MedicineReceivedMDComponent
                  userList={userList.users}
                  medicinesReceivedFromManuf={medicineBatches}
                  title={MED_BATCHES_SHIPMENT_STATUS}
                  isReadonly={true}
                  medicineTableHeaders={medicineTableHeaders}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default BatchInfoComponent;
