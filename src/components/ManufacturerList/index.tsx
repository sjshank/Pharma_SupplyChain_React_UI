import React from "react";
import UserListComponent from "../../generic/UserList";
import { ROLE_BRAND } from "../../utils/constants";

type ManufacturerListProps = {
  list: Array<any>;
};

const ManufacturerListComponent = ({
  list,
}: ManufacturerListProps) => {
  return (
    <UserListComponent
      users={list}
      label="Manufacturers"
      tableName="Manufacturers Table"
      tableId="manufacturerTbl"
      color={ROLE_BRAND["manufacturer"]["bgColor"]}
    />
  );
};

export default ManufacturerListComponent;
