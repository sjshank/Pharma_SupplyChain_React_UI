import React from "react";
import MTextFieldComponent from "../../../generic/MTextField";
import { ICustomer } from "../../../models/customer.interface";

type CustomerFormProps = {
  customerFormState: ICustomer;
  classes: any;
  handleInputChange: any;
};

const CustomerFormComponent = ({
  classes,
  customerFormState,
  handleInputChange,
}: CustomerFormProps) => {
  return (
    <div>
      <div className={classes.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="customerName"
          name="customerName"
          label="Buyer Name"
          variant="outlined"
          value={customerFormState.customerName}
          classname={classes.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={classes.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="customerAge"
          name="customerAge"
          label="Buyer Age (In Numbers)"
          type="number"
          variant="outlined"
          value={customerFormState.customerAge}
          classname={classes.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={classes.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="doctorName"
          name="doctorName"
          label="Doctor Name"
          variant="outlined"
          value={customerFormState.doctorName}
          classname={classes.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={classes.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="quantity"
          name="quantity"
          type="number"
          label="Quantity (In Numbers)"
          variant="outlined"
          disabled={true}
          value={customerFormState.quantity}
          classname={classes.textField}
          changeHandler={handleInputChange}
        />
      </div>
      <div className={classes.textFieldBar}>
        <MTextFieldComponent
          required={true}
          id="amountPaid"
          name="amountPaid"
          type="number"
          label="Amount Paid (In Rupees)"
          variant="outlined"
          value={customerFormState.amountPaid}
          classname={classes.textField}
          changeHandler={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CustomerFormComponent;
