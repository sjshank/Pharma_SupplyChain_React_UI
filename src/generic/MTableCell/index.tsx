import React from "react";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../MTooltip";

type CellProps = {
  text: string | any;
  classname: any;
  placement?: any;
};

const MTableCellComponent = ({
  classname,
  text,
  placement = "top",
}: CellProps) => {
  return (
    <MTooltipComponent placement={placement} title={text}>
      <TableCell align="left" className={classname}>
        {text}
      </TableCell>
    </MTooltipComponent>
  );
};

export default MTableCellComponent;
