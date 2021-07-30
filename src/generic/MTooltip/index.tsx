import React, { ReactElement } from "react";
import { ReactNode } from "react";
import Tooltip from "@material-ui/core/Tooltip";

type TooltipProps = {
  placement:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top"
    | undefined;
  title: any;
  children: any;
};

const MTooltipComponent = ({ title, placement, children }: TooltipProps) => {
  return (
    <Tooltip title={title} placement={placement}>
      {children}
    </Tooltip>
  );
};

export default MTooltipComponent;
