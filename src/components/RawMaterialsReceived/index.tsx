import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { IRawMaterial } from "../../models/material.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../../generic/MTooltip";
import MTypographyComponent from "../../generic/MTypography";
import {
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER,
  ROLE_BRAND,
} from "../../utils/constants";
import useTableHeaders from "../../hooks/useTableHeaders";
import MChipComponent from "../../generic/MChip";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import MaterialTable from "../../generic/MaterialTable";

type RawMaterialShippedProps = {
  rawMaterialsReceived: Array<IRawMaterial>;
  userList: Array<IUserInfo>;
  isReadonly?: boolean;
  title?: string;
  materialTableHeaders?: any;
  updateMaterialPackageStatus: any;
};

const RawMaterialsReceivedComponent = ({
  rawMaterialsReceived,
  userList,
  isReadonly,
  title = "Raw Materials Received",
  materialTableHeaders = undefined,
  updateMaterialPackageStatus,
}: RawMaterialShippedProps) => {
  let tableHeaders = useTableHeaders("receivedRawMaterials");
  if (materialTableHeaders) {
    tableHeaders = materialTableHeaders;
  }

  const populateColumns = (row: IRawMaterial, classes: any) => {
    return (
      <>
        <TableCell align="left" className={classes.tableBodyCell}>
          <MChipComponent
            label={
              MATERIAL_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[row?.packageStatus]
            }
            size="small"
            bgColor={
              row?.packageStatus == 6
                ? ROLE_BRAND["rejected"]["bgColor"]
                : ROLE_BRAND["manufacturer"]["bgColor"]
            }
          />
        </TableCell>
        <TableCell align="left" className={classes.tableBodyCell}>
          {!isReadonly && row?.packageStatus == 5 && (
            <>
              <Fab
                variant="extended"
                size="small"
                className={classes.fabBtn}
                onClick={() => updateMaterialPackageStatus(row, false)}
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
                onClick={() => updateMaterialPackageStatus(row, true)}
              >
                <NavigationIcon fontSize="small" />
                <MTooltipComponent
                  title="Approve & Use for medicine manufacturing"
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
        text={`Showing ${rawMaterialsReceived.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MaterialTable
        tableName="Raw Materials Received"
        tableId="receivedRawMaterialTbl"
        dataList={rawMaterialsReceived}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="receivedRawMaterials"
        showManufacturerCol={false}
        showSupplierCol={true}
        showShipperCol={true}
        getColumns={populateColumns}
      />
    </>
  );
};

export default RawMaterialsReceivedComponent;
