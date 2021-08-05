import React, {
  lazy,
  MouseEventHandler,
  ReactNode,
  Suspense,
  useContext,
  useState,
} from "react";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MBasicTableComponent from "../../generic/MBasicTable";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MButtonComponent from "../../generic/MButton";
import PaperHeaderComponent from "../PaperHeader";
import MTypographyComponent from "../../generic/MTypography";
import { Chip } from "@material-ui/core";
import { DELETE_CONFIRMATION_TEXT, ROLE_BRAND } from "../../utils/constants";
import { IUserInfo, IUserInfoContext } from "../../models/userInfo.interface";
import { IUserFields, useStyles } from "./helper";
import { IUserForm } from "../../models/user.interface";
import { UserInfoContext } from "../../context/UserContext";
import useTableHeaders from "../../hooks/useTableHeaders";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";
import MTableHeadersComponent from "../../generic/TableHeaders";
import MTooltipComponent from "../../generic/MTooltip";
import UserFormComponent from "./UserForm";
import MFormDialogComponent from "../../generic/MFormDialog";
import MConfirmationDialogComponent from "../../generic/MConfirmationDialog";
import MTableCellComponent from "../../generic/MTableCell";

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
  const tableHeaders = useTableHeaders("registeredUsers");

  const [userFormState, setUserFormState] = useState<IUserFields>({
    userName: "",
    userAddress: "",
    userLocation: "",
    userRole: "",
    userStatus: true,
    isDeleted: false,
  });

  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  //handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    _field: IUserForm
  ) => {
    setUserFormState({
      ...userFormState,
      [event.target.name]:
        event?.target?.name === "userStatus"
          ? event.target.checked
          : event.target.value,
    });
  };

  //open create user dialog
  const toggleCreateUserDialog: any = () => {
    setUserFormState({
      ...userFormState,
      userAddress: "",
      userName: "",
      userLocation: "",
      userRole: "",
      userStatus: true,
    });
    updateDialogStatus(true, false, "Create User", false, "createUser");
  };

  //open edit user dialog
  const toggleEditUserDialog: any = (data: IUserFields) => {
    if (!data.isDeleted) {
      setUserFormState({
        ...userFormState,
        userAddress: data.userAddress,
        userName: data.userName,
        userLocation: data.userLocation,
        userRole: data.userRole,
        userStatus: data.userStatus === "Active",
      });
      updateDialogStatus(true, false, "Edit User Details", true, "editUser");
    }
  };

  //open delete user dialog
  const toggleDeleteUserDialog: any = (data: IUserFields) => {
    if (!data.isDeleted) {
      setUserFormState({
        ...userFormState,
        userAddress: data.userAddress,
        userName: data.userName,
        userLocation: data.userLocation,
        userRole: data.userRole,
        userStatus: data.userStatus === "Active",
      });
      updateDialogStatus(false, true, "Delete User", false);
    }
  };

  //close dialog
  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const populateTableBody = (): ReactNode => {
    return (
      <TableBody>
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              No records found.
            </TableCell>
          </TableRow>
        )}
        {users &&
          users.map((row: IUserInfo) => (
            <TableRow
              key={row.userAddress}
              className={row.isDeleted ? classes.inActiveStatusCell : ""}
            >
              <MTableCellComponent
                classname={classes.tableBodyCell}
                text={row.userAddress}
              />
              <MTableCellComponent
                classname={classes.tableBodyCell}
                text={row.userName}
              />
              <MTableCellComponent
                classname={classes.tableBodyCell}
                text={row.userLocation}
              />
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
                <span className={classes.status}>
                  {row.isDeleted ? "Deleted" : row.userStatus}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.tableBodyCell}>
                {!row.isDeleted && (
                  <MTooltipComponent title="Edit User" placement="top">
                    <span
                      onClick={() => toggleEditUserDialog(row)}
                      className={classes.actionBtn}
                    >
                      <EditOutlinedIcon color="action" />
                    </span>
                  </MTooltipComponent>
                )}
                {row.userAddress !== userInfo.userAddress &&
                  row.userStatus !== "Inactive" && (
                    <MTooltipComponent title="Delete User" placement="top">
                      <span
                        onClick={() => toggleDeleteUserDialog(row)}
                        className={classes.actionBtn}
                      >
                        <DeleteOutlinedIcon
                          color="error"
                          className={classes.actionBtn}
                        />
                      </span>
                    </MTooltipComponent>
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
            clickHandler={() => createUser(userFormState)}
          />
        )}
        {dialogStatus.isEditMode && (
          <MButtonComponent
            variant="contained"
            label="Submit"
            type="submit"
            color="primary"
            clickHandler={() => editUser(userFormState)}
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
          clickHandler={() => deletUser(userFormState)}
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
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${users.length} records`}
        style={{ color: "#29BB89" }}
      />
      <MBasicTableComponent
        tableBody={populateTableBody()}
        tableHeader={
          <MTableHeadersComponent
            tableHeaders={tableHeaders}
            classes={classes}
          />
        }
        tableName="Registered Users"
        tableId="registeredUsersTbl"
        height="305px"
        stickyHeader={true}
      />
      {(dialogStatus.dialogId == "createUser" ||
        dialogStatus.dialogId == "editUser") && (
        <MFormDialogComponent
          title={dialogStatus.dialogTitle}
          open={dialogStatus.openFormDialog}
          dialogId="userFormDialog"
          footerButtons={populateFormDialogFooter()}
        >
          <UserFormComponent
            handleInputChange={handleInputChange}
            userState={userFormState}
            isEditMode={dialogStatus.isEditMode}
          />
        </MFormDialogComponent>
      )}

      <MConfirmationDialogComponent
        title={dialogStatus.dialogTitle}
        isOpen={dialogStatus.openConfirmDialog}
        dialogId="userFormDialog"
        footerButtons={populateConfirmDialogFooter()}
      >
        <MTypographyComponent
          text={DELETE_CONFIRMATION_TEXT}
          variant="subtitle1"
        />
      </MConfirmationDialogComponent>
    </Paper>
  );
};

export default RegisteredUsersComponent;
