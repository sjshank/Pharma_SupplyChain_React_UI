import React, { MouseEventHandler, useContext } from "react";
import MTypographyComponent from "../../generic/MTypography";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../../generic/MTooltip";
import { IUserInfo } from "../../models/userInfo.interface";
import {
  INITIATE_MEDICINE_SHIPMENT_HELP_TEXT,
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  TRACK_UPDATES,
} from "../../utils/constants";
import { ITransporterContext } from "../../models/transporter.interface";
import { TransporterContext } from "../../context/TransporterContext";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { IMedicine } from "../../models/medicine.interface";
import MedicineTable from "../../generic/MedicineTable";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";

type MedicineShipmentProps = {
  userList: IUserInfo[];
  updateMedicineBatchStatus: any;
};

const MedicinesShipmentComponent = ({
  userList,
  updateMedicineBatchStatus,
}: MedicineShipmentProps) => {
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

  const transporterContext =
    useContext<ITransporterContext>(TransporterContext);
  const { medicines } = transporterContext;

  const populateColumns = (row: IMedicine, classes: any) => {
    return (
      <>
        <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus == 3 && (
            <>
              <MTooltipComponent
                title={INITIATE_MEDICINE_SHIPMENT_HELP_TEXT}
                placement="top"
              >
                <Fab
                  variant="extended"
                  size="small"
                  className={classes.fabBtn}
                  onClick={() =>
                    updateMedicineBatchStatus(
                      row?.medicineId,
                      row?.distributor,
                      true
                    )
                  }
                >
                  <NavigationIcon fontSize="small" />
                  Ship Medicine Batch
                </Fab>
              </MTooltipComponent>
            </>
          )}
        </TableCell>
        <TableCell align="left" className={classes.tableBodyCell}>
          {row?.packageStatus >= 4 && (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="Delivered"
                  checked={row?.packageStatus >= 5}
                  disabled={row?.packageStatus >= 5}
                  className={classes.statusCheckbox}
                  onChange={(e) => {
                    updateMedicineBatchStatus(
                      row?.medicineId,
                      row?.distributor,
                      false
                    );
                  }}
                />
              }
              label={MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[5]}
            />
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
        tableName="Medicines Shipment (Manuf-Dist)"
        tableId="MedicineShipmentMDTbl"
        dataList={medicines}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicineShipment"
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

export default MedicinesShipmentComponent;
