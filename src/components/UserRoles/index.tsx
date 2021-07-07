import React, { ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MBasicTableComponent from "../../generic/MBasicTable";
import Chip from "@material-ui/core/Chip";
import { IUserRole } from "../../models/user.interface";
import { USER_ROLES } from "../../utils/constants";
import PaperHeaderComponent from "../PaperHeader";

type UserRolesProps = {
  IconComp: React.ReactNode;
  label: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
    },
    roleChip: {
      fontSize: 12,
      width: "194px",
    },
  })
);

const UserRolesComponent = ({ IconComp, label }: UserRolesProps) => {
  const classes = useStyles();
  const userRoles: IUserRole[] = USER_ROLES["DEFAULT"];

  const tableColumns: Array<any> = [
    {
      name: "Role Name",
      id: "roleName",
    },
    {
      name: "Permission",
      id: "permission",
    },
  ];

  const populateTableHead = (): ReactNode => {
    return (
      <TableHead>
        <TableRow>
          {tableColumns.map((col: any) => {
            return (
              <TableCell
                key={col.id}
                align="left"
                className={classes.tableHeadCell}
              >
                {col.name}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const populateTableBody = () => {
    return (
      <TableBody>
        {userRoles.map((row: any) => (
          <TableRow key={row.roleName}>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.roleName}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <Chip
                className={classes.roleChip}
                label={row.permission}
                style={{ backgroundColor: row.bgColor, color: row.color }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={IconComp}
        label={label}
        textVariant="button"
      />
      <MBasicTableComponent
        tableBody={populateTableBody()}
        tableHeader={populateTableHead()}
        tableName="User Roles"
        tableId="userRoleTbl"
        height="270px"
        stickyHeader={true}
      />
    </Paper>
  );
};

export default UserRolesComponent;
