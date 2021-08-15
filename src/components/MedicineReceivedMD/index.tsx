import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useState,
} from "react";
import { IUserInfo } from "../../models/userInfo.interface";
import { IMedicine } from "../../models/medicine.interface";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../../generic/MTooltip";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  ROLE_BRAND,
  TRACK_UPDATES,
} from "../../utils/constants";
import MTypographyComponent from "../../generic/MTypography";
import { IDialogContext } from "../../models/dialog.interface";
import { DialogContext } from "../../context/DialogContext";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MedicineTable from "../../generic/MedicineTable";
import MChipComponent from "../../generic/MChip";

type MedicineReceivedFromManuProps = {
  medicinesReceivedFromManuf: IMedicine[];
  userList: IUserInfo[];
  transferMedicineBatchToPharma?: any;
  updateMedicineBatchStatus: any;
};

//component for showing medicine batches received from Manuf to Dist
const MedicineReceivedMDComponent = ({
  medicinesReceivedFromManuf,
  userList,
  transferMedicineBatchToPharma,
  updateMedicineBatchStatus,
}: MedicineReceivedFromManuProps) => {
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

  const populateColumns = (row: IMedicine, classes: any): ReactNode => {
    return (
      <>
        <TableCell align="left" className={classes.tableBodyCell}>
          <MChipComponent
            label={
              MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 6
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["distributor"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.tableBodyCell}>
          {row?.packageStatus == 5 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMedicineBatchStatus(row, false)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Received as expired/damaged. Reject medicine batch"
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
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Approve & Send to Pharmaceutical"
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
        text={`Showing ${medicinesReceivedFromManuf.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MedicineTable
        tableName="Medicines Received From Manu"
        tableId="MedicinesReceivedFromManuTbl"
        dataList={medicinesReceivedFromManuf}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicineBatchesReceived"
        showManufacturerCol={true}
        showShipperCol={true}
        getColumns={populateColumns}
        dialogStatus={dialogStatus}
        closeDialog={closeDialog}
        handleQRCodeEvent={handleQRCodeEvent}
      />
    </>
  );
};

export default MedicineReceivedMDComponent;
