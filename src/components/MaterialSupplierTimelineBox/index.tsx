import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ListItemPairComponent from "../../generic/ListItemPair";
import { MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER } from "../../utils/constants";
import withTimelineHeader from "../../hoc/withTimelineHeader";

type BoxProps = {
  classes: any;
  dataInfo: any;
  headerTitle: string;
  objectLookup: string;
};

const MaterialSupplierTimelineBoxComponent = ({
  classes,
  dataInfo,
  headerTitle,
  objectLookup,
}: BoxProps) => {
  return (
    <List component="nav" className={classes.list}>
      <ListItemPairComponent
        label="Raw Material"
        value={dataInfo.producerName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Quantity Supplied (kg)"
        value={dataInfo.quantity}
        classes={classes}
      />
      <ListItemPairComponent
        label="Supplier Location"
        value={dataInfo.location}
        classes={classes}
      />
      <ListItemPairComponent
        label="Logistic Partner"
        value={dataInfo?.transporterDetails.userName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Receiver"
        value={dataInfo?.manufacturerDetails.userName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Status"
        value={
          MATERIAL_SHIPPMENT_STATUS_LIST_AT_SUPPLIER[
            parseInt(dataInfo.packageStatus)
          ]
        }
        classes={classes}
      />
      <Divider />
      <div className={classes.updateBox}>
        <Chip
          label={`Material registered on ${
            dataInfo?.txData[0] ? dataInfo?.txData[0]["customizedTxTime"] : ""
          }`}
          className={classes.eachChipItem}
        />
        <Chip
          label={`Shipment initiated on ${
            dataInfo?.txData[1] ? dataInfo?.txData[1]["customizedTxTime"] : ""
          }`}
          className={classes.eachChipItem}
        />
        {/* <Chip
              label={`Package delivered to Manufacturer on ${
                dataInfo?.txData[2] ? dataInfo?.txData[2]['customizedTxTime'] : ""
              }`}
              icon={<DoneIcon />}
              className={classes.eachChipItem}
            /> */}
      </div>
    </List>
  );
};

export default withTimelineHeader(
  MaterialSupplierTimelineBoxComponent,
  "right",
  0,
  2
);
