import React, { useContext, useState } from "react";
import { createStyles, makeStyles, Grow, Theme } from "@material-ui/core";
import MTypographyComponent from "../../generic/MTypography";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import { IWeb3State } from "../../models/web3.interface";
import { Web3Context } from "../../context/Web3Context";
import { ISpinnerState } from "../../models/spinner.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import { IMedicine } from "../../models/medicine.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import { ToastContext } from "../../context/ToastContext";
import { IRawMaterial } from "../../models/material.interface";
import useRegisteredRawMaterial from "../../hooks/useRegisteredRawMaterial";
import useMedicineBatchDetails from "../../hooks/useMedicineBatchDetails";
import {
  MATERIAL_DETAILS_SUBTITLE,
  MEDICINE_DETAILS_SUBTITLE,
  SHOW_LESS,
  SHOW_MORE,
} from "../../utils/constants";

type MedicineDetailsExpProps = {
  medicineId: string;
  userList: IUserInfo[];
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expandcollapseIconBar: {
      position: "absolute",
      marginTop: -20,
      textAlign: "center",
      justifyContent: "center",
      width: "100%",
    },
    medicineDetailsTxt: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      color: "#1976d2",
    },
    expandcollapseIcon: {
      fontSize: 40,
      backgroundColor: "#fff",
      border: "3px solid #1976d2",
      borderRadius: "50%",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.2)",
        transition: "0.3s ease-in-out",
        transitionTimingFunction: "ease-in-out",
      },
    },
    subTitle: {
      textAlign: "left",
      float: "left",
      fontWeight: 600,
      paddingLeft: "1rem",
    },
    dlTop: {
      display: "flex",
      clear: "both",
      marginTop: -25,
      marginBottom: 20,
    },
    dtItem: {
      padding: "1rem",
      paddingRight: 0,
      textAlign: "left",
      fontSize: 14,
    },
    ddItem: {
      padding: "1rem",
      paddingLeft: 0,
      textAlign: "left",
      marginInlineStart: 8,
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: 14,
      fontWeight: 600,
    },
  })
);

const MedicineDetailsExplorerComponent = ({
  medicineId,
  userList,
}: MedicineDetailsExpProps) => {
  const classes = useStyles();
  const loadRegisteredRawMaterial = useRegisteredRawMaterial();
  const loadMedicineDetails = useMedicineBatchDetails();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [medicineBatchState, setMedicineBatchState] = useState<IMedicine>({
    medicineId: "",
    materialId: "",
    medicineName: "",
    description: "",
    location: "",
    quantity: 0,
    shipper: "",
    manufacturer: "",
    distributor: "",
    packageStatus: "",
  });
  const [materialBatchState, setMaterialBatchState] = useState<IRawMaterial>({
    materialId: "",
    producerName: "",
    description: "",
    location: "",
    quantity: 0,
    shipper: "",
    manufacturer: "",
    supplier: "",
    packageStatus: "",
  });

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const toastContext = useContext<any>(ToastContext);
  const { toggleToast } = toastContext;

  const populateUserName = (_role: string, _address: string) => {
    const userDetails = userList.find((usr: IUserInfo) => {
      if (
        !usr.isDeleted &&
        usr.userStatus === "Active" &&
        usr.userRole === _role &&
        usr.userAddress === _address
      ) {
        return usr;
      }
    });
    return userDetails?.userName;
  };

  const toggleExpandCollapse = () => {
    setIsExpanded((prevState) => !prevState);
    if (contractInstance && medicineBatchState.medicineId !== medicineId) {
      toggleSpinner();
      const result: Promise<any> = loadMedicineDetails(
        contractInstance,
        selectedAccount,
        medicineId
      );
      result
        .then((res: any) => {
          const _medicineDetails = res as IMedicine;
          loadRegisteredRawMaterial(
            contractInstance,
            selectedAccount,
            _medicineDetails.materialId
          )
            .then((record: any) => {
              setMaterialBatchState(record as IRawMaterial);
              setMedicineBatchState(res as IMedicine);
            })
            .catch((e: any) => {
              toggleToast("error", e?.errorMessage);
            })
            .finally(() => {
              toggleSpinner();
            });
        })
        .catch((e: any) => {
          toggleToast("error", e?.errorMessage);
        });
    }
  };

  return (
    <>
      {isExpanded && (
        <Grow in={true} timeout={500}>
          {/* medicine section */}
          <>
            <div>
              <MTypographyComponent
                variant="button"
                text={MEDICINE_DETAILS_SUBTITLE}
                classname={classes.subTitle}
              />
              <dl className={classes.dlTop}>
                <dt className={classes.dtItem}>Medicine Name:</dt>
                <dd className={classes.ddItem}>
                  {medicineBatchState.medicineName}
                </dd>
                <dt className={classes.dtItem}>Medicine Desc:</dt>
                <dd className={classes.ddItem}>
                  {medicineBatchState.description}
                </dd>
                <dt className={classes.dtItem}>Coming From:</dt>
                <dd className={classes.ddItem}>
                  {medicineBatchState.location}
                </dd>
                <dt className={classes.dtItem}>Manufacturer:</dt>
                <dd className={classes.ddItem}>
                  <MTooltipComponent
                    title={medicineBatchState.manufacturer}
                    placement="bottom"
                  >
                    <span>
                      {populateUserName("3", medicineBatchState.manufacturer)}
                    </span>
                  </MTooltipComponent>
                </dd>
              </dl>
            </div>

            {/* material section */}

            <div>
              <MTypographyComponent
                variant="button"
                text={MATERIAL_DETAILS_SUBTITLE}
                classname={classes.subTitle}
              />
              <dl className={classes.dlTop}>
                <dt className={classes.dtItem}>Material Name:</dt>
                <dd className={classes.ddItem}>
                  {materialBatchState.producerName}
                </dd>
                <dt className={classes.dtItem}>Material Desc:</dt>
                <dd className={classes.ddItem}>
                  {materialBatchState.description}
                </dd>
                <dt className={classes.dtItem}>Coming From:</dt>
                <dd className={classes.ddItem}>
                  {materialBatchState.location}
                </dd>
                <dt className={classes.dtItem}>Supplier:</dt>
                <dd className={classes.ddItem}>
                  <MTooltipComponent
                    title={materialBatchState.supplier}
                    placement="bottom"
                  >
                    <span>
                      {populateUserName("1", materialBatchState.supplier)}
                    </span>
                  </MTooltipComponent>
                </dd>
              </dl>
            </div>
          </>
        </Grow>
      )}
      <div className={classes.expandcollapseIconBar}>
        {!isExpanded && (
          <MTooltipComponent title={SHOW_MORE} placement="bottom">
            <span onClick={toggleExpandCollapse}>
              <ExpandMoreOutlinedIcon
                className={classes.expandcollapseIcon}
                style={{ color: "#1976d2" }}
              />
            </span>
          </MTooltipComponent>
        )}
        {isExpanded && (
          <MTooltipComponent title={SHOW_LESS} placement="bottom">
            <span onClick={toggleExpandCollapse}>
              <ExpandLessOutlinedIcon
                className={classes.expandcollapseIcon}
                style={{ color: "#1976d2" }}
              />
            </span>
          </MTooltipComponent>
        )}
      </div>
    </>
  );
};

export default MedicineDetailsExplorerComponent;
