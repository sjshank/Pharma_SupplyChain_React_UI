import React, { useContext } from "react";

import MTypographyComponent from "../../generic/MTypography";
import TableCell from "@material-ui/core/TableCell";
import { IRawMaterial } from "../../models/material.interface";
import MTooltipComponent from "../../generic/MTooltip";
import { IUserInfo } from "../../models/userInfo.interface";
import {
  INITIATE_SHIPMENT_HELP_TEXT,
  MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER,
} from "../../utils/constants";
import { ITransporterContext } from "../../models/transporter.interface";
import { TransporterContext } from "../../context/TransporterContext";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MaterialTable from "../../generic/MaterialTable";

type MaterialShipmentProps = {
  userList: IUserInfo[];
  updateMaterialPackageStatus: any;
};
const MaterialsShipmentComponent = ({
  userList,
  updateMaterialPackageStatus,
}: MaterialShipmentProps) => {
  const transporterContext =
    useContext<ITransporterContext>(TransporterContext);
  const { materials } = transporterContext;

  const populateColumns = (row: IRawMaterial, classes: any) => {
    return (
      <>
        <TableCell align="left" className={classes.actionLinkCell}>
          {row?.packageStatus == 3 && (
            <>
              <MTooltipComponent
                title={INITIATE_SHIPMENT_HELP_TEXT}
                placement="top"
              >
                <Fab
                  variant="extended"
                  size="small"
                  className={classes.fabBtn}
                  onClick={() =>
                    updateMaterialPackageStatus(
                      row?.materialId,
                      row?.manufacturer,
                      true
                    )
                  }
                >
                  <NavigationIcon fontSize="small" />
                  Ship Raw Material
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
                    updateMaterialPackageStatus(
                      row?.materialId,
                      row?.manufacturer,
                      false
                    );
                  }}
                />
              }
              label={MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[5]}
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
        text={`Showing ${materials.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MaterialTable
        tableName="Material Shipment"
        tableId="MaterialShipmentTbl"
        dataList={materials}
        userList={userList}
        height="350px"
        tableHeaderIdentifier="materialShipment"
        showManufacturerCol={true}
        showSupplierCol={true}
        getColumns={populateColumns}
      />
    </>
  );
};

export default MaterialsShipmentComponent;
