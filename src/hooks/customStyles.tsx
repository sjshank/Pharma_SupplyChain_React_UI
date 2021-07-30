import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { green, yellow } from "@material-ui/core/colors";

const useCustomStyles = (styleObject) => {
  const styles = makeStyles((theme: Theme) => createStyles(styleObject));

  return styles;
};
