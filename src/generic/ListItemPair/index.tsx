import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

type PairProps = {
  classes: any;
  label: string;
  value?: any;
};

const ListItemPairComponent = ({ classes, label, value }: PairProps) => {
  return (
    <ListItem button>
      <div style={{ width: "100%" }}>
        <ListItemText
          primary={label}
          style={{ float: "left" }}
          className={classes.eachItemText}
        />
        <ListItemText
          primary={value}
          style={{ float: "right" }}
          className={classes.eachItemText}
        />
      </div>
    </ListItem>
  );
};

export default ListItemPairComponent;
