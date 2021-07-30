import React, { ReactNode } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MBasicTableComponent from "../MBasicTable";
import PaperHeaderComponent from "../../components/PaperHeader";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import { IUserInfo } from "../../models/userInfo.interface";
import MTooltipComponent from "../MTooltip";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../TableHeaders";
import MTypographyComponent from "../MTypography";

type UserListProps = {
  label: string;
  tableName: string;
  tableId: string;
  color: string;
  users: Array<IUserInfo>;
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

const UserListComponent = ({
  label,
  tableName,
  tableId,
  color,
  users,
}: UserListProps) => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("userInfo");

  const populateTableBody = () => {
    return (
      <TableBody>
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {users.map((row: any) => (
          <TableRow key={row.userAddress}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <span style={{ color: color, fontWeight: 600 }}>
                {row.userName}
              </span>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.userAddress} placement="top">
                <span>{row.userAddress}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.userLocation}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.userStatus}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={<SupervisedUserCircleOutlinedIcon style={{ color: color }} />}
        label={label}
        textVariant="button"
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${users.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MBasicTableComponent
        tableBody={populateTableBody()}
        tableHeader={
          <MTableHeadersComponent
            tableHeaders={tableHeaders}
            classes={classes}
          />
        }
        tableName={tableName}
        tableId={tableId}
        height="120px"
        stickyHeader={true}
      />
    </Paper>
  );
};

export default UserListComponent;
