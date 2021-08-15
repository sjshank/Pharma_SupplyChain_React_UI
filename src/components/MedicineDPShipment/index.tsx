import React, { MouseEventHandler, useContext } from "react";
import MTypographyComponent from "../../generic/MTypography";
import TableCell from "@material-ui/core/TableCell";
import { IUserInfo } from "../../models/userInfo.interface";
import {
  INITIATE_MEDICINE_SHIPMENT_HELP_TEXT,
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR,
  TRACK_UPDATES,
} from "../../utils/constants";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MedicineTable from "../../generic/MedicineTable";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import { IMedicineDP } from "../../models/medicineDP.interface";
import MTooltipComponent from "../../generic/MTooltip";

type MedicineDPShipmentProps = {
  userList: IUserInfo[];
  updateMedicineDPBatchStatus: any;
  medicinesDP: IMedicineDP[];
};

const MedicinesDPShipmentComponent = ({
  userList,
  updateMedicineDPBatchStatus,
  medicinesDP,
}: MedicineDPShipmentProps) => {
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

  const populateColumns = (row: IMedicineDP, classes: any) => {
    return (
      <>
        <TableCell align="left" className={classes.tableBodyCell}>
          {row?.packageStatus >= 1 && (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="Delivered"
                  checked={row?.packageStatus >= 2}
                  disabled={row?.packageStatus >= 2}
                  className={classes.statusCheckbox}
                  onChange={(e) => {
                    updateMedicineDPBatchStatus(
                      row?.medicineSubContract,
                      row?.pharma,
                      false
                    );
                  }}
                />
              }
              label={MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[2]}
            />
          )}
        </TableCell>
        <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus == 0 && (
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
                    updateMedicineDPBatchStatus(
                      row?.medicineSubContract,
                      row?.pharma,
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
      </>
    );
  };

  return (
    <>
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${medicinesDP.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MedicineTable
        tableName="Medicines Shipment (Dist-Pharma)"
        tableId="MedicineShipmentMDTbl"
        dataList={medicinesDP}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicineShipment"
        showDistributorCol={true}
        showPharmaCol={true}
        getColumns={populateColumns}
        dialogStatus={dialogStatus}
        closeDialog={closeDialog}
        handleQRCodeEvent={handleQRCodeEvent}
      />
    </>
  );
};

export default MedicinesDPShipmentComponent;
