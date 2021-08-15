import React, { ReactNode, useContext } from "react";
import MBasicTableComponent from "../MBasicTable";
import MTableHeadersComponent from "../TableHeaders";
import useTableHeaders from "../../hooks/useTableHeaders";
import { ROLE_BRAND } from "../../utils/constants";
import { createStyles, makeStyles, Theme, Fade } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import UserBadgeComponent from "../../generic/UserBadge";
import NoRecordsComponent from "../../generic/NoRecordsFound";
import MTableCellComponent from "../../generic/MTableCell";
import { IRawMaterial } from "../../models/material.interface";
import { IUserInfo, IUserInfoContext } from "../../models/userInfo.interface";
import { UserInfoContext } from "../../context/UserContext";

type MaterialTableProps = {
  dataList: IRawMaterial[];
  userList: IUserInfo[];
  tableHeaderIdentifier: string;
  tableName: string;
  tableId: string;
  height?: string;
  showManufacturerCol?: boolean;
  showShipperCol?: boolean;
  showSupplierCol?: boolean;
  getColumns: any;
};

const MaterialTable = ({
  dataList,
  userList,
  getColumns,
  tableHeaderIdentifier,
  tableName,
  tableId,
  height,
  showManufacturerCol = false,
  showShipperCol = false,
  showSupplierCol = false,
}: MaterialTableProps) => {
  const tableHeaders = useTableHeaders(tableHeaderIdentifier);
  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      tableHeadCell: {
        fontSize: 15,
        padding: "4px",
        color: "rgba(0, 0, 0, 0.54)",
        fontWeight: theme.typography.fontWeightBold,
      },
      tableBodyCell: {
        fontSize: 11,
        padding: "4px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      statusChip: {
        width: "100%",
        backgroundColor: "#381460",
        color: "#fff",
      },
      fabBtn: {
        color: ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"],
        fontSize: 10,
        fontWeight: 600,
        marginLeft: 5,
        marginRight: 5,
        "&:hover": {
          color: "#fff",
          backgroundColor:
            ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"],
        },
      },
      statusCheckbox: {
        color: `${
          ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
        }`,
        marginLeft: 8,
      },
    })
  );
  const classes = useStyles();

  const populateTableBody = (): any => {
    return (
      <Fade in={true} timeout={1000}>
        <TableBody>
          {dataList.length === 0 && (
            <NoRecordsComponent length={tableHeaders.length} />
          )}
          {dataList.map((row: IRawMaterial) => (
            <Fade
              in={true}
              timeout={1000}
              key={row.materialId + row.producerName}
            >
              <TableRow key={row.materialId}>
                <MTableCellComponent
                  classname={classes.tableBodyCell}
                  text={row.producerName}
                />
                <MTableCellComponent
                  classname={classes.tableBodyCell}
                  text={row.description}
                />
                <MTableCellComponent
                  classname={classes.tableBodyCell}
                  text={row.location}
                />
                <MTableCellComponent
                  classname={classes.tableBodyCell}
                  text={row.quantity}
                />
                {showSupplierCol && (
                  <TableCell align="left" className={classes.tableBodyCell}>
                    <UserBadgeComponent
                      title={row.supplier}
                      users={userList}
                      role="1"
                    />
                  </TableCell>
                )}
                {showManufacturerCol && (
                  <TableCell align="left" className={classes.tableBodyCell}>
                    <UserBadgeComponent
                      title={row.manufacturer}
                      users={userList}
                      role="3"
                    />
                  </TableCell>
                )}
                {showShipperCol && (
                  <TableCell align="left" className={classes.tableBodyCell}>
                    <UserBadgeComponent
                      title={row.shipper}
                      users={userList}
                      role="2"
                    />
                  </TableCell>
                )}
                {getColumns(row, classes)}
              </TableRow>
            </Fade>
          ))}
        </TableBody>
      </Fade>
    );
  };

  return (
    <MBasicTableComponent
      tableBody={populateTableBody()}
      tableHeader={
        <MTableHeadersComponent tableHeaders={tableHeaders} classes={classes} />
      }
      tableName={tableName}
      tableId={tableId}
      height={height}
      stickyHeader={true}
    />
  );
};

export default MaterialTable;
