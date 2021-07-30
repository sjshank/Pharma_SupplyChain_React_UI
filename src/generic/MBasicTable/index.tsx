import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";

type BasicTableProps = {
  showHeader?: boolean;
  tableName: string;
  tableId: string;
  height?: string;
  stickyHeader?: boolean;
  size?: "medium" | "small";
  tableBody: React.ReactNode;
  tableHeader: React.ReactNode;
};

const MBasicTableComponent = ({
  showHeader,
  tableName,
  tableId,
  tableBody,
  tableHeader,
  size = "small",
  height,
  stickyHeader,
}: BasicTableProps) => {
  const useStyles = makeStyles({
    root: {
      height: height,
      overflowY: "auto",
      overflowX: "hidden",
    },
    table: {
      width: "100%",
    },
  });
  const classes = useStyles();

  return (
    <TableContainer className={classes.root}>
      <Table
        stickyHeader={stickyHeader}
        className={classes.table}
        aria-label={tableName}
        id={tableId}
        size={size}
      >
        {tableHeader}
        {tableBody}
      </Table>
    </TableContainer>
  );
};

export default MBasicTableComponent;
