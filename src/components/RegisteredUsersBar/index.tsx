import React from "react";
import { Grid } from "@material-ui/core";
import DistributorListComponent from "../DistributorList";
import ManufacturerListComponent from "../ManufacturerList";
import PharmaListComponent from "../PharmaList";
import SupplierListComponent from "../SupplierList";
import TransporterListComponent from "../TransporterList";

type UserBarProps = {
  roles: string[];
  users: any[];
};

const COMPONENT_MAP = {
  supplier: {
    cName: SupplierListComponent,
    pname: "supplierList",
  },
  manufacturer: {
    cName: ManufacturerListComponent,
    pname: "manufacturerList",
  },
  distributor: {
    cName: DistributorListComponent,
    pname: "manufacturerList",
  },
  pharma: {
    cName: PharmaListComponent,
    pname: "pharmaList",
  },
  transporter: {
    cName: TransporterListComponent,
    pname: "transporterList",
  },
};

const RegisteredUsersBarComponent = ({ roles, users }: UserBarProps) => {
  return (
    <Grid container spacing={2}>
      {roles.map((role: string) => {
        const COMP = COMPONENT_MAP[role]?.cName;
        const list = users[COMPONENT_MAP[role]?.pname];
        return (
          <Grid item xs={12} sm={12} lg={6} key={role}>
            <COMP list={list} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RegisteredUsersBarComponent;
