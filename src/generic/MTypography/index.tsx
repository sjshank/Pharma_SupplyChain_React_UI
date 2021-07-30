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
  style?: any;
};

const MTypographyComponent = ({
  text,
  variant,
  color,
  align,
  component,
  gutterBottom,
  classname,
  style,
}: MTypoProps) => {
  return (
    <Typography
      variant={variant}
      color={color}
      align={align}
      component={component}
      gutterBottom={gutterBottom}
      className={classname}
      style={style}
    >
      {text}
    </Typography>
  );
};

export default MTypographyComponent;
