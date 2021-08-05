import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ListItemPairComponent from "../../generic/ListItemPair";
import { MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER } from "../../utils/constants";
import withTimelineHeader from "../../hoc/withTimelineHeader";

type BoxProps = {
  classes: any;
  dataInfo: any;
  headerTitle: string;
  objectLookup: string;
};

const MedicineManufacturerTimelineBoxComponent = ({
  classes,
  dataInfo,
  headerTitle,
  objectLookup,
}: BoxProps) => {
  return (
    <List component="nav" className={classes.list}>
      <ListItemPairComponent
        label="Medicine"
        value={dataInfo.medicineName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Quantity Supplied (numbers)"
        value={dataInfo.quantity}
        classes={classes}
      />
      <ListItemPairComponent
        label="Manufacturing Location"
        value={dataInfo.location}
        classes={classes}
      />
      <ListItemPairComponent
        label="Logistic Partner"
        value={dataInfo.transporterDetails.userName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Receiver"
        value={dataInfo.distributorDetails.userName}
        classes={classes}
      />
      <ListItemPairComponent
        label="Status"
        value={
          parseInt(dataInfo.packageStatus) >= 2
            ? MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[2]
            : MEDICINE_SHIPPMENT_STATUS_LIST_AT_MANUFACTURER[
                parseInt(dataInfo.packageStatus)
              ]
        }
        classes={classes}
      />
      <Divider />
      <div className={classes.updateBox}>
        {dataInfo.txData[0] && (
          <Chip
            label={`Package confirmation on ${
              dataInfo.txData[0] ? dataInfo.txData[0]["customizedTxTime"] : ""
            }`}
            className={classes.eachChipItem}
          />
        )}
        {dataInfo.txData[0] && (
          <Chip
            label={`Medicine batch registered on ${
              dataInfo.txData[0] ? dataInfo.txData[0]["customizedTxTime"] : ""
            }`}
            className={classes.eachChipItem}
          />
        )}
        {dataInfo.txData[1] && (
          <Chip
            label={`Shipment initiated on ${
              dataInfo.txData[1] ? dataInfo.txData[1]["customizedTxTime"] : ""
            }`}
            className={classes.eachChipItem}
          />
        )}
        {/* {dataInfo.txData[2] && (
              <Chip
                label={`Batch delivered to Distributor on ${
                  dataInfo.txData[2]
                    ? dataInfo.txData[3]["customizedTxTime"]
                    : ""
                }`}
                icon={<DoneIcon />}
                className={classes.eachChipItem}
              />
            )} */}
      </div>
    </List>
  );
};

export default withTimelineHeader(
  MedicineManufacturerTimelineBoxComponent,
  "left",
  -1,
  1
);
