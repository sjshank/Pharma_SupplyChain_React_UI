import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { NO_RECORDS_FOUND } from "../../utils/constants";

type NoRecordsProps = {
  length: number;
};

const NoRecordsComponent = ({ length }: NoRecordsProps) => {
  return (
    <TableRow>
      <TableCell colSpan={length} align="center">
        {NO_RECORDS_FOUND}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(NoRecordsComponent);
