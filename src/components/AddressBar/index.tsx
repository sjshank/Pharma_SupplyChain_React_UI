import { Grid } from "@material-ui/core";
import React from "react";
import { IAddressBar } from "../../models/addressbar.interface";
import AddressInfoComponent from "../AddressInfo";

type AddressBarProps = {
  addressBarList: IAddressBar[];
};

const AddressBarComponent = ({ addressBarList }: AddressBarProps) => {
  return (
    addressBarList && (
      <Grid container spacing={2}>
        {addressBarList.map((addrInfo: IAddressBar, ind) => {
          return (
            <Grid
              key={`${addrInfo.label}-${addrInfo.value}-${ind}`}
              item
              xs={addrInfo?.sizeXS}
              sm={addrInfo?.sizeSM}
              lg={addrInfo?.sizeLG}
            >
              <AddressInfoComponent
                label={addrInfo.label}
                value={addrInfo.value}
                IconComp={addrInfo.iconComp}
              />
            </Grid>
          );
        })}
      </Grid>
    )
  );
};

export default AddressBarComponent;
