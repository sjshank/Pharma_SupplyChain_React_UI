import React from "react";
import UserListComponent from "../../generic/UserList";

type SupplierListProps = {
  list: Array<any>;
};

const SupplierListComponent = ({ list }: SupplierListProps) => {
  return (
    <UserListComponent
      users={list}
      label="Suppliers"
      tableName="Suppliers Table"
      tableId="supplierListTbl"
      color="#381460"
    />
  );
};

export default SupplierListComponent;
