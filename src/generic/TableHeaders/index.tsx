import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

type TableHeaderProps = {
  tableHeaders: any;
  classes?: any;
};

const MTableHeadersComponent = ({
  tableHeaders,
  classes,
}: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((col: any) => {
          return (
            <TableCell
              key={col.id}
              align="left"
              className={classes?.tableHeadCell}
            >
              {col.name}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default React.memo(MTableHeadersComponent);
