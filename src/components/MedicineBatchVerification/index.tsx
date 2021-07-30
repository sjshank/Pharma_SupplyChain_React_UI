import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import MButtonComponent from "../../generic/MButton";
import MTypographyComponent from "../../generic/MTypography";
import { IUserInfo } from "../../models/userInfo.interface";
import { IMedicine } from "../../models/medicine.interface";
import RegisterMedicineBatchComponent from "../RegisterMedicineBatch";
import { VERIFY_PROCEED_HELP_TEXT_AT_DIST } from "../../utils/constants";

type MedicineBatchVerificationProps = {
  medicineBatchFormState: IMedicine;
  userList: IUserInfo[];
  proceedWithMedicineSubContractCreation: any;
};

const userFormtyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: theme.spacing(4),
  },
  textFieldBar: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  textField: {
    width: "100%",
  },
  select: {
    width: "100%",
    textAlign: "left",
  },
  verifyModal: {
    paddingBottom: theme.spacing(2),
  },
  verifyFooterModalBtn: {
    textAlign: "center",
  },
  verifyModalRejectBtn: {
    margin: theme.spacing(2),
  },
}));

const MedicineBatchVerificationComponent = ({
  userList,
  medicineBatchFormState,
  proceedWithMedicineSubContractCreation,
}: MedicineBatchVerificationProps) => {
  const classes = userFormtyles();
  return (
    <>
      <div className={classes.verifyModal}>
        <MTypographyComponent
          text={VERIFY_PROCEED_HELP_TEXT_AT_DIST}
          variant="caption"
        />
      </div>
      <RegisterMedicineBatchComponent
        medicineBatchFormState={medicineBatchFormState}
        userList={userList}
        isEditMode={true}
        formStyles={classes}
      />
    </>
  );
};

export default MedicineBatchVerificationComponent;
