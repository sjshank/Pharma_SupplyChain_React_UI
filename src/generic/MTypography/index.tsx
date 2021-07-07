import React from "react";
import Typography from "@material-ui/core/Typography";

type MTypoProps = {
  text: string | number | any;
  variant?: string | any;
  component?: string | any;
  color?: string | any;
  align?: string | any;
  gutterBottom?: boolean | any;
  classname?: any;
};

const MTypographyComponent = ({
  text,
  variant,
  color,
  align,
  component,
  gutterBottom,
  classname,
}: MTypoProps) => {
  return (
    <Typography
      variant={variant}
      color={color}
      align={align}
      component={component}
      gutterBottom={gutterBottom}
      className={classname}
    >
      {text}
    </Typography>
  );
};

export default MTypographyComponent;
