import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ListItemPairComponent from "../../generic/ListItemPair";
import { MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR } from "../../utils/constants";
import NotAvailableComponent from "../../generic/NotAvailable";
import withTimelineHeader from "../../hoc/withTimelineHeader";

type BoxProps = {
  classes: any;
  dataInfo: any;
  headerTitle: string;
  objectLookup: string;
};

const MedicineDistributorTimelineBoxComponent = ({
  classes,
  dataInfo,
  headerTitle,
  objectLookup,
}: BoxProps) => {
  return (
    <>
      {parseInt(dataInfo.packageStatus) == 0 && <NotAvailableComponent />}
      {parseInt(dataInfo.packageStatus) > 0 && (
        <>
          <Divider />
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
            {dataInfo.distributorDetails && (
              <ListItemPairComponent
                label="Distributed From"
                value={dataInfo.distributorDetails.userLocation}
                classes={classes}
              />
            )}
            {dataInfo.pharmaDetails && (
              <>
                <ListItemPairComponent
                  label="Logistic Partner"
                  value={dataInfo.transporterDetails.userName}
                  classes={classes}
                />
                <ListItemPairComponent
                  label="Receiver"
                  value={dataInfo.pharmaDetails.userName}
                  classes={classes}
                />
              </>
            )}
            <ListItemPairComponent
              label="Status"
              value={
                MEDICINE_SHIPPMENT_STATUS_LIST_AT_DISTRIBUTOR[
                  parseInt(dataInfo.packageStatus)
                ]
              }
              classes={classes}
            />
            <Divider />
            <div className={classes.updateBox}>
              {dataInfo.txData[1] && (
                <Chip
                  label={`Batch received on ${
                    dataInfo.txData[1]
                      ? dataInfo.txData[1]["customizedTxTime"]
                      : ""
                  }`}
                  className={classes.eachChipItem}
                />
              )}
              {/* {dataInfo.txData[2] && (
                  <Chip
                    label={`Batch confirmation on ${
                      dataInfo.txData[2]
                        ? dataInfo.txData[2]["customizedTxTime"]
                        : ""
                    }`}
                    icon={<DoneIcon />}
                    className={classes.eachChipItem}
                  />
                )} */}
              {dataInfo.txData[3] && (
                <Chip
                  label={`Shipment initiated on ${
                    dataInfo.txData[3]
                      ? dataInfo.txData[3]["customizedTxTime"]
                      : ""
                  }`}
                  className={classes.eachChipItem}
                />
              )}
              {/* {dataInfo.txData[4] && (
                  <Chip
                    label={`Batch delivered to Pharma on ${
                      dataInfo.txData[4]
                        ? dataInfo.txData[4]["customizedTxTime"]
                        : ""
                    }`}
                    icon={<DoneIcon />}
                    className={classes.eachChipItem}
                  />
                )} */}
            </div>
          </List>
        </>
      )}
    </>
  );
};

export default withTimelineHeader(
  MedicineDistributorTimelineBoxComponent,
  "right",
  0,
  3
);
