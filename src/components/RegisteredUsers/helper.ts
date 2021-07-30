import { createStyles, makeStyles, Theme } from "@material-ui/core";

export interface IUserFields {
  userName: string | any;
  userAddress: string | any;
  userLocation: string | any;
  userRole: string | any | number;
  userStatus?: string | any | number;
  isDeleted: boolean | any;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: "280px",
    },
    label: {
      display: "flex",
      justifyContent: "start",
      textAlign: "left",
      // color: "#053742",
    },
    icon: {
      textAlign: "left",
      marginRight: "4px",
    },
    createUserBtn: {
      float: "right",
      marginTop: "-35px",
      // color: "rgb(41, 187, 137)",
      // border: "1px solid rgb(41, 187, 137)",
      fontWeight: 600,
    },
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    inActiveStatusCell: {
      opacity: 0.7,
      backgroundColor: "#eeeeee",
      cursor: "text",
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
      maxWidth: "250px",
      overflowWrap: "break-word",
    },
    status: {
      textTransform: "capitalize",
    },
    roleChip: {
      fontSize: 10,
      width: "110px",
      textTransform: "uppercase",
    },
    actionBtn: {
      cursor: "pointer",
    },
  })
);

export const useFormStyles = makeStyles((theme: Theme) => ({
  root: {
    justifyContent: "left",
    alignItems: "left",
    textAlign: "left",
  },

  textFieldBar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: "310px",
  },
  select: {
    width: "310px",
  },
  switch: {
    color: "#1EAE98",
  },
}));
