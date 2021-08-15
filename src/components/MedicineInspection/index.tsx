import React, { MouseEventHandler, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  ROLE_BRAND,
  TRACK_UPDATES,
} from "../../utils/constants";
import TableCell from "@material-ui/core/TableCell";
import { IUserInfo } from "../../models/userInfo.interface";
import MTypographyComponent from "../../generic/MTypography";
import { IMedicine } from "../../models/medicine.interface";
import MChipComponent from "../../generic/MChip";
import MTooltipComponent from "../../generic/MTooltip";
import MedicineTable from "../../generic/MedicineTable";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";

type MedicineInspProps = {
  userList: IUserInfo[];
  updateMedicineBatchStatus: any;
  medicines: IMedicine[];
};

const MedicineInspectionComponent = ({
  userList,
  updateMedicineBatchStatus,
  medicines,
}: MedicineInspProps) => {
  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const handleQRCodeEvent: any = (medicineDetail: any) => {
    updateDialogStatus(
      true,
      false,
      TRACK_UPDATES,
      false,
      medicineDetail.medicineId
    );
  };

  const populateColumns = (row: IMedicine, classes: any) => {
    return (
      <>
        <TableCell>
          <MChipComponent
            label={
              MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 2
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["inspector"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus == 1 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMedicineBatchStatus(row, false)}
              >
                <NavigationIcon fontSize="small" />{" "}
                <MTooltipComponent
                  title="Quality doesn't meet. Reject medicine batch"
                  placement="top"
                >
                  <span>Reject</span>
                </MTooltipComponent>
              </Fab>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMedicineBatchStatus(row, true)}
              >
                <NavigationIcon fontSize="small" />{" "}
                <MTooltipComponent
                  title="All requirements are fullfilled by medicine batch. Approve & Send for Shipment"
                  placement="top"
                >
                  <span>Approve</span>
                </MTooltipComponent>
              </Fab>
            </>
          )}
        </TableCell>
      </>
    );
  };

  return (
    <>
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${medicines.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MedicineTable
        tableName="Medicines Inspection"
        tableId="MedicinesInspectionTbl"
        dataList={medicines}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicineInspection"
        showManufacturerCol={true}
        showDistributorCol={true}
        getColumns={populateColumns}
        dialogStatus={dialogStatus}
        closeDialog={closeDialog}
        handleQRCodeEvent={handleQRCodeEvent}
      />
    </>
  );
};

export default MedicineInspectionComponent;
