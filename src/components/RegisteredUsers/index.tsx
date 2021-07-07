import React, { MouseEventHandler, ReactNode, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MBasicTableComponent from "../../generic/MBasicTable";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MButtonComponent from "../../generic/MButton";
import PaperHeaderComponent from "../PaperHeader";
import { useState } from "react";
import MFormDialogComponent from "../../generic/MFormDialog";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import MTypographyComponent from "../../generic/MTypography";
import { Chip } from "@material-ui/core";
import { ROLE_BRAND } from "../../utils/constants";
import {
  IUserInfo,
  IUserInfoContext,
} from "../../context/UserContext/userInfo.interface";
import { IUserFields, registeredUsersTableHeader, useStyles } from "./helper";
import { IUserForm } from "../../models/user.interface";
import { Web3Context } from "../../context/Web3Context";
import { IWeb3State } from "../../context/Web3Context/web3.interface";
import { SpinnerContext } from "../../context/SpinnerContext";
import { ISpinnerState } from "../../context/SpinnerContext/spinner.interface";
import { UserInfoContext } from "../../context/UserContext";
import UserFormComponent from "./UserForm";

type RegisteredUsersProps = {
  IconComp: React.ReactNode;
  label: string;
  users: Array<IUserInfo>;
  createUser: any;
  editUser: any;
  deletUser: any;
};

const RegisteredUsersComponent = ({
  IconComp,
  label,
  users,
  createUser,
  editUser,
  deletUser,
}: RegisteredUsersProps) => {
  const classes = useStyles();
  const [dialogStatus, setDialogStatus] = useState<any>({
    dialogTitle: "Form Dialog",
    openFormDialog: false,
    openDeleteDialog: false,
    isEditMode: false,
  });

  const [userFormState, setUserFormState] = useState<IUserFields>({
    userName: {
      value: "",
      disabled: false,
    },
    userAddress: {
      value: "",
      disabled: false,
    },
    userLocation: {
      value: "",
      disabled: false,
    },
    userRole: {
      value: "",
      disabled: false,
    },
    userStatus: {
      value: "",
      disabled: false,
    },
  });

  const web3Context = useContext<IWeb3State>(Web3Context);
  const { contractInstance, selectedAccount } = web3Context;

  const spinnerContext = useContext<ISpinnerState>(SpinnerContext);
  const { toggleSpinner } = spinnerContext;

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IUserForm
  ) => {
    const prop: any = event.target.name;
    setUserFormState({
      ...userFormState,
      ...userFormState[prop],
      value: event.target.value,
    });
  };

  const toggleCreateUserDialog: MouseEventHandler = () => {
    setDialogStatus({
      dialogTitle: "Create User",
      isEditMode: false,
      openFormDialog: true,
    });
  };

  const toggleEditUserDialog = (data: IUserInfo) => {
    setUserFormState({
      ...userFormState,
      userAddress: { value: data.userAddress, disabled: true },
      userName: { value: data.userName },
      userLocation: { value: data.userLocation },
      userRole: { value: data.userRole },
    });
    setDialogStatus({
      dialogTitle: "Edit User",
      isEditMode: true,
      openFormDialog: true,
    });
  };

  const toggleDeleteUserDialog = (data: IUserInfo) => {
    setUserFormState({
      ...userFormState,
      userAddress: { value: data.userAddress, disabled: true },
      userName: { value: data.userName },
      userLocation: { value: data.userLocation },
      userRole: { value: data.userRole },
    });
    setDialogStatus({
      dialogTitle: "Delete User",
      openDeleteDialog: true,
    });
  };

  const closeDialog: MouseEventHandler = () => {
    setDialogStatus({
      openFormDialog: false,
      openDeleteDialog: false,
    });
  };

  const handleCreateNewuserAction: MouseEventHandler = async () => {
    await createUser(userFormState);
    setDialogStatus({
      openFormDialog: false,
    });
  };

  const handleEdituserAction: MouseEventHandler = async () => {
    await editUser(userFormState);
    setDialogStatus({
      openFormDialog: false,
    });
  };

  const handleDeleteUserAction: MouseEventHandler = async () => {
    await deletUser(userFormState);
    setDialogStatus({
      openDeleteDialog: false,
    });
  };

  const populateTableHead = (): ReactNode => {
    return (
      <TableHead>
        <TableRow>
          {registeredUsersTableHeader.map((col: any) => {
            return (
              <TableCell
                key={col.id}
                align="left"
                className={classes.tableHeadCell}
              >
                {col.name}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const populateTableBody = (): ReactNode => {
    return (
      <TableBody>
        {users &&
          users.map((row: IUserInfo) => (
            <TableRow
              key={row.userAddress}
              className={
                row.userStatus !== "Active" ? classes.inActiveStatusCell : ""
              }
            >
              <TableCell align="left" className={classes.tableBodyCell}>
                {row.userAddress}
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                {row.userName}
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                {row.userLocation}
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                <Chip
                  className={classes.roleChip}
                  label={row.userRoleName}
                  style={{
                    backgroundColor:
                      ROLE_BRAND[row.userRoleName.toLowerCase()]["bgColor"],
                    color: ROLE_BRAND[row.userRoleName.toLowerCase()]["color"],
                  }}
                />
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                <span className={classes.status}>{row.userStatus}</span>
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                {row.userAddress !== userInfo.userAddress &&
                  row.userStatus !== "Inactive" && (
                    <span
                      onClick={() => toggleEditUserDialog(row)}
                      className={classes.actionBtn}
                    >
                      <EditOutlinedIcon color="action" />
                    </span>
                  )}
                {row.userAddress !== userInfo.userAddress &&
                  row.userStatus !== "Inactive" && (
                    <span
                      onClick={() => toggleDeleteUserDialog(row)}
                      className={classes.actionBtn}
                    >
                      <DeleteOutlinedIcon
                        color="error"
                        className={classes.actionBtn}
                      />
                    </span>
                  )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    );
  };

  const populateFormDialogFooter = (): ReactNode => {
    return (
      <>
        <MButtonComponent
          variant="outlined"
          label="Close"
          clickHandler={closeDialog}
        />
        {!dialogStatus.isEditMode && (
          <MButtonComponent
            variant="contained"
            label="Submit"
            type="submit"
            color="primary"
            clickHandler={handleCreateNewuserAction}
          />
        )}
        {dialogStatus.isEditMode && (
          <MButtonComponent
            variant="contained"
            label="Submit"
            type="submit"
            color="primary"
            clickHandler={handleEdituserAction}
          />
        )}
      </>
    );
  };

  const populateConfirmDialogFooter = (): ReactNode => {
    return (
      <>
        <MButtonComponent
          variant="outlined"
          label="Cancel"
          clickHandler={closeDialog}
        />
        <MButtonComponent
          variant="contained"
          label="Delete"
          color="primary"
          clickHandler={handleDeleteUserAction}
        />
      </>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={IconComp}
        label={label}
        textVariant="button"
      />
      <MButtonComponent
        variant="outlined"
        label="Create User"
        classname={classes.createUserBtn}
        clickHandler={toggleCreateUserDialog}
      />
      <MBasicTableComponent
        tableBody={populateTableBody()}
        tableHeader={populateTableHead()}
        tableName="Registered Users"
        tableId="registeredUsersTbl"
        height="270px"
        stickyHeader={true}
      />
      <MFormDialogComponent
        title={dialogStatus.dialogTitle}
        open={dialogStatus.openFormDialog}
        dialogId="userFormDialog"
        footerButtons={populateFormDialogFooter()}
      >
        <UserFormComponent
          handleInputChange={handleInputChange}
          userState={userFormState}
        />
      </MFormDialogComponent>
      <MConfirmationDialogComponent
        title={dialogStatus.dialogTitle}
        isOpen={dialogStatus.openDeleteDialog}
        dialogId="userFormDialog"
        footerButtons={populateConfirmDialogFooter()}
      >
        <MTypographyComponent
          text="This will permanently delete user. Do you still want to proceed ?"
          variant="subtitle1"
        />
      </MConfirmationDialogComponent>
    </Paper>
  );
};

export default RegisteredUsersComponent;
