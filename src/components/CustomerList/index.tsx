import React, { MouseEventHandler, useContext } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import PaperHeaderComponent from "../../components/PaperHeader";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import Paper from "@material-ui/core/Paper";
import { ICustomer } from "../../models/customer.interface";
import MBasicTableComponent from "../../generic/MBasicTable";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MTooltipComponent from "../../generic/MTooltip";
import CurrencyFormat from "react-currency-format";
import useTableHeaders from "../../hooks/useTableHeaders";
import MTableHeadersComponent from "../../generic/TableHeaders";
import {
  MEDICINE_SOLD_TO_CUSTOMER,
  NO_RECORDS_FOUND,
  TRACK_UPDATES,
} from "../../utils/constants";
import { PharmaContext } from "../../context/PharmaContext";
import { IPharmaContext } from "../../models/pharma.interface";
import MTypographyComponent from "../../generic/MTypography";
import MedicineTrackerComponent from "../MedicineTracker";
import MedicineQrCodeModalComponent from "../MedicineQrCodeModal";
import { getMedicineURL } from "../../utils/helpers";
import { DialogContext } from "../../context/DialogContext";
import { IDialogContext } from "../../models/dialog.interface";

const useStyles = makeStyles((theme: Theme) =>
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
    tableHeadCell: {
      fontSize: 15,
      padding: "8px",
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: theme.typography.fontWeightBold,
    },
    tableBodyCell: {
      fontSize: 12,
      padding: "8px",
    },
    roleChip: {
      fontSize: 12,
      width: "194px",
    },
  })
);

const CustomerListComponent = () => {
  const classes = useStyles();
  const tableHeaders = useTableHeaders("customers");

  const dialogContext = useContext<IDialogContext>(DialogContext);
  const { dialogStatus, updateDialogStatus } = dialogContext;

  const pharmaContext = useContext<IPharmaContext>(PharmaContext);
  const { customers } = pharmaContext;

  const closeDialog: MouseEventHandler = () => {
    updateDialogStatus(false, false);
  };

  const handleQRCodeEvent: any = (medicineDetail: any) => {
    updateDialogStatus(
      true,
      false,
      TRACK_UPDATES,
      false,
      medicineDetail.medicineId
    );
  };

  const populateTableBody = () => {
    return (
      <TableBody>
        {customers.length === 0 && (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} align="center">
              {NO_RECORDS_FOUND}
            </TableCell>
          </TableRow>
        )}
        {customers.map((row: ICustomer) => (
          <TableRow key={row.medicineId}>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.customerName} placement="top">
                <span>{row.customerName}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.customerAge}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <MTooltipComponent title={row.doctorName} placement="top">
                <span>{row.doctorName}</span>
              </MTooltipComponent>
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              {row.quantity}
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <CurrencyFormat
                value={parseInt(row.amountPaid)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹ "}
              />
            </TableCell>
            <TableCell align="left" className={classes.tableBodyCell}>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li style={{ margin: 5 }}>
                  <MedicineTrackerComponent data={row} />
                </li>
                <li style={{ margin: 5 }}>
                  <MedicineQrCodeModalComponent
                    data={getMedicineURL(row.medicineId)}
                    clickEvent={() => handleQRCodeEvent(row)}
                    dialogTitle={dialogStatus.dialogTitle}
                    dialogId={dialogStatus.dialogId}
                    uui={row.medicineId}
                    isOpen={dialogStatus.openFormDialog}
                    closeDialog={closeDialog}
                  />
                </li>
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  return (
    <Paper className={classes.root} elevation={3} square={true}>
      <PaperHeaderComponent
        IconComp={
          <AssignmentTurnedInOutlinedIcon style={{ color: "#4AA96C" }} />
        }
        label={MEDICINE_SOLD_TO_CUSTOMER}
        textVariant="button"
      />
      <MTypographyComponent
        variant="subtitle1"
        text={`Showing ${customers.length} records`}
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
        tableName="Customer List"
        tableId="customerListTbl"
        // height="120px"
        stickyHeader={true}
      />
    </Paper>
  );
};

export default React.memo(CustomerListComponent);
