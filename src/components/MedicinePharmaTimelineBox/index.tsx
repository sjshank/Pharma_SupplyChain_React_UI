import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ListItemPairComponent from "../../generic/ListItemPair";
import { MEDICINE_SHIPPMENT_STATUS_LIST_AT_PHARMA } from "../../utils/constants";
import NotAvailableComponent from "../../generic/NotAvailable";
import { isMedicineApproved, isMedicineExpired } from "../../utils/helpers";
import withTimelineHeader from "../../hoc/withTimelineHeader";

type BoxProps = {
  classes: any;
  dataInfo: any;
  headerTitle: string;
  objectLookup: string;
  customerInfo: any;
};

const MedicinePharmaTimelineBoxComponent = ({
  classes,
  dataInfo,
  customerInfo = null,
  headerTitle,
  objectLookup,
}: BoxProps) => {
  return (
    <>
      {parseInt(dataInfo.packageStatus) < 3 && <NotAvailableComponent />}
      {parseInt(dataInfo.packageStatus) > 2 && (
        <>
          <Divider />
          <List component="nav" className={classes.list}>
            <ListItemPairComponent
              label="Medicine"
              value={dataInfo.medicineName}
              classes={classes}
            />
            <ListItemPairComponent
              label="Quantity (numbers)"
              value={dataInfo.quantity}
              classes={classes}
            />
            {customerInfo && (
              <ListItemPairComponent
                label="Shop Address"
                value={customerInfo.shopAddress}
                classes={classes}
              />
            )}
            <ListItemPairComponent
              label="Batch Status"
              value={
                MEDICINE_SHIPPMENT_STATUS_LIST_AT_PHARMA[
                  parseInt(dataInfo.packageStatus)
                ]
              }
              classes={classes}
            />
            {customerInfo && (
              <>
                <ListItemPairComponent
                  label="Buyer"
                  value={customerInfo.buyer}
                  classes={classes}
                />
                <ListItemPairComponent
                  label="Amount Paid"
                  value={customerInfo.amountPaid}
                  classes={classes}
                />
                <ListItemPairComponent
                  label="Date of Sale"
                  value={customerInfo.dateOfSale}
                  classes={classes}
                />
              </>
            )}

            <Divider />
            <div className={classes.updateBox}>
              {dataInfo.txData[3] && (
                <Chip
                  label={`Batch received on ${
                    dataInfo.txData[3]
                      ? dataInfo.txData[3]["customizedTxTime"]
                      : ""
                  }`}
                  className={classes.eachChipItem}
                />
              )}
              {dataInfo.txData[4] && (
                <Chip
                  label={`Batch confirmation on ${
                    dataInfo.txData[4]
                      ? dataInfo.txData[4]["customizedTxTime"]
                      : ""
                  }`}
                  className={classes.eachChipItem}
                />
              )}
              {isMedicineExpired(dataInfo) && dataInfo.txData[4] && (
                <Chip
                  label="EXPIRED/DAMAGED"
                  className={classes.eachChipItem}
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    backgroundColor: "red",
                  }}
                />
              )}
              {isMedicineApproved(dataInfo) && dataInfo.txData[4] && (
                <Chip
                  label={`Approved & Ready for sale on ${
                    dataInfo.txData[4]
                      ? dataInfo.txData[4]["customizedTxTime"]
                      : ""
                  }`}
                  className={classes.eachChipItem}
                />
              )}
              {customerInfo && (
                <Chip
                  label="SOLD OUT"
                  className={classes.eachChipItem}
                  style={{ fontSize: 16, fontWeight: 600 }}
                />
              )}
            </div>
          </List>
        </>
      )}
    </>
  );
};

export default withTimelineHeader(
  MedicinePharmaTimelineBoxComponent,
  "left",
  2,
  4
);
