import React, { MouseEventHandler, useContext } from "react";
import MTypographyComponent from "../../generic/MTypography";
import TableCell from "@material-ui/core/TableCell";
import { IUserInfo } from "../../models/userInfo.interface";
import {
  MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR,
  ROLE_BRAND,
  TRACK_UPDATES,
} from "../../utils/constants";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MedicineTable from "../../generic/MedicineTable";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import { IMedicineDP } from "../../models/medicineDP.interface";
import MTooltipComponent from "../../generic/MTooltip";
import { PharmaContext } from "../../context/PharmaContext";
import { IPharmaContext } from "../../models/pharma.interface";
import MChipComponent from "../../generic/MChip";

type MedicineBatchDPReceivedProps = {
  userList: IUserInfo[];
  updateMedicineDPBatchStatus: any;
};

const MedicineBatchDPReceivedComponent = ({
  userList,
  updateMedicineDPBatchStatus,
}: MedicineBatchDPReceivedProps) => {
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

  const pharmaContext = useContext<IPharmaContext>(PharmaContext);
  const { medicineBatchesReceivedFromDist } = pharmaContext;

  const populateColumns = (row: IMedicineDP, classes: any) => {
    return (
      <>
        {/* <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus > 2 && (
            <MChipComponent
              label={
                MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
                  row?.packageStatus
                ]
              }
              size="small"
              bgColor={
                row?.packageStatus == 3
                  ? ROLE_BRAND["rejected"]["bgColor"]
                  : ROLE_BRAND["pharma"]["bgColor"]
              }
            />
          )}
        </TableCell> */}
        <TableCell align="left" className={classes.tableBodyCell}>
          {row?.packageStatus == 2 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMedicineDPBatchStatus(row, false)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Received as Expired/Damaged"
                  placement="top"
                >
                  <span>Reject</span>
                </MTooltipComponent>
              </Fab>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMedicineDPBatchStatus(row, true)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="All requirements are fullfilled by medicine batch"
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
        text={`Showing ${medicineBatchesReceivedFromDist.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MedicineTable
        tableName="Medicine Batches Received"
        tableId="MedicineDPBatchesReceivedTbl"
        dataList={medicineBatchesReceivedFromDist}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="medicineBatchDPReceived"
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

export default MedicineBatchDPReceivedComponent;
