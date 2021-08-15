import React, { ReactNode, useContext } from "react";
import useTableHeaders from "../../hooks/useTableHeaders";
import { createStyles, Fade, makeStyles, Theme } from "@material-ui/core";
import MTypographyComponent from "../../generic/MTypography";
import MBasicTableComponent from "../../generic/MBasicTable";
import MTableHeadersComponent from "../../generic/TableHeaders";
import { IInspectionContext } from "../../models/inspection.interface";
import { InspectionContext } from "../../context/InspectionContext";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import UserBadgeComponent from "../../generic/UserBadge";
import NoRecordsComponent from "../../generic/NoRecordsFound";
import MTableCellComponent from "../../generic/MTableCell";
import { IRawMaterial } from "../../models/material.interface";
import MTooltipComponent from "../../generic/MTooltip";
import { IUserInfo } from "../../models/userInfo.interface";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import { useRef } from "react";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import MButtonComponent from "../../generic/MButton";
import {
  MATERIAL_QC_MEET,
  MATERIAL_QC_NOT_MEET,
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER,
  REJECT_AM,
  REJECT_RM,
  ROLE_BRAND,
} from "../../utils/constants";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MChipComponent from "../../generic/MChip";
import MaterialTable from "../../generic/MaterialTable";

type MaterialInspProps = {
  userList: IUserInfo[];
  updateMaterialPackageStatus: any;
  materials: IRawMaterial[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionLinkCell: {
      fontSize: 11,
      padding: "4px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    actionLink: {
      cursor: "pointer",
      color: "#04009A",
      fontWeight: 600,
      textDecoration: "underline",
      display: "inline-block",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontSize: "16px",
    },
  })
);

const MaterialInspectionComponent = ({
  userList,
  updateMaterialPackageStatus,
  materials,
}: MaterialInspProps) => {
  const populateColumns = (row: IRawMaterial, classes: any) => {
    return (
      <>
        <TableCell>
          <MChipComponent
            label={
              MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[row?.packageStatus]
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
                onClick={() =>
                  updateMaterialPackageStatus(
                    row.materialId,
                    row.shipper,
                    false
                  )
                }
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Quality doesn't meet. Reject raw material"
                  placement="top"
                >
                  <span>Reject</span>
                </MTooltipComponent>
              </Fab>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() =>
                  updateMaterialPackageStatus(row.materialId, row.shipper, true)
                }
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="All requirements are fullfilled by raw material. Approve & Send for Shipment"
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
        text={`Showing ${materials.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MaterialTable
        tableName="Material Inspection"
        tableId="materialInspectiontbl"
        dataList={materials}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="materialInspection"
        showManufacturerCol={true}
        showSupplierCol={true}
        getColumns={populateColumns}
      />
    </>
  );
};

export default MaterialInspectionComponent;
