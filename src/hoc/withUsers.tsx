import React, { useState } from "react";
import { useEffect } from "react";
import useRegisteredUsers from "../hooks/useRegisteredUsers";
import { populateRoleBasedList } from "../utils/helpers";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withUsers = (WrappedComponent: any): any => {
  const WithUsers = (props: any) => {
    const loadUsers = useRegisteredUsers();
    const [userList, setUserList] = useState<any>({
      users: [],
      manufacturerCount: 0,
      transporterCount: 0,
      supplierCount: 0,
      pharmaCount: 0,
      distributorCount: 0,
      inspector: "",
    });
    useEffect(() => {
      loadUsers()
        .then((res: any) => {
          const list = populateRoleBasedList(res);
          setUserList({
            ...userList,
            users: res,
            manufacturerCount: list.manufacturerList.length,
            transporterCount: list.transporterList.length,
            supplierCount: list.supplierList.length,
            pharmaCount: list.pharmaList.length,
            distributorCount: list.distributorList.length,
            inspector: list.inspectorList[0],
          });
        })
        .catch((e: any) => {
          console.log(e);
        });
    }, []);

    const updatedProps = {
      ...props,
      userList: userList,
    };
    return (
      <>
        <WrappedComponent {...updatedProps} />
      </>
    );
  };
  WithUsers["displayName"] = `WithUsers(${getDisplayName(WrappedComponent)})`;
  return WithUsers;
};

export default withUsers;
