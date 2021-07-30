import React from "react";
import UserListComponent from "../../generic/UserList";

type TransportersListProps = {
  list: Array<any>;
};

const TransporterListComponent = ({ list }: TransportersListProps) => {
  return (
    <UserListComponent
      users={list}
      label="Transporters"
      tableName="Transporters Table"
      tableId="transportersListTbl"
      color="#444444"
    />
  );
};

export default TransporterListComponent;
