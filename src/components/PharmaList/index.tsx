import React from "react";
import UserListComponent from "../../generic/UserList";
import { ROLE_BRAND } from "../../utils/constants";

type PharmaListProps = {
  list: Array<any>;
};

const PharmaListComponent = ({ list }: PharmaListProps) => {
  return (
    <UserListComponent
      users={list}
      label="Pharmaceuticals"
      tableName="Pharmas Table"
      tableId="pharmasListTbl"
      color={ROLE_BRAND["pharma"]["bgColor"]}
    />
  );
};

export default PharmaListComponent;
