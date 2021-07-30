import React from "react";
import UserListComponent from "../../generic/UserList";
import { ROLE_BRAND } from "../../utils/constants";

type DistributorListProps = {
  list: Array<any>;
};

const DistributorListComponent = ({ list }: DistributorListProps) => {
  return (
    <UserListComponent
      users={list}
      label="Distributors"
      tableName="Distributors Table"
      tableId="distributorListTbl"
      color={ROLE_BRAND["distributor"]["bgColor"]}
    />
  );
};

export default DistributorListComponent;
