import React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import MTypographyComponent from "../../generic/MTypography";
import RawMaterialFormComponent from "../RegisteredRawMaterials/RawMaterialForm";
import { IRawMaterial } from "../../models/material.interface";
import { IUserInfo } from "../../models/userInfo.interface";
import { VERIFY_PROCEED_HELP_TEXT } from "../../utils/constants";

type RawMaterialVerificationProps = {
  rawMaterialFormState: IRawMaterial;
  userList: IUserInfo[];
  isFormDisabled?: boolean;
};

const useRawMaterialFormtyles = makeStyles((theme: Theme) => ({
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

const RawMaterialVerificationComponent = ({
  userList,
  rawMaterialFormState,
  isFormDisabled,
}: RawMaterialVerificationProps) => {
  const classes = useRawMaterialFormtyles();
  return (
    <>
      <div className={classes.verifyModal}>
        <MTypographyComponent
          text={VERIFY_PROCEED_HELP_TEXT}
          variant="caption"
        />
      </div>
      <RawMaterialFormComponent
        rawMaterialState={rawMaterialFormState}
        isEditMode={true}
        userList={userList}
        formStyles={classes}
        isFormDisabled={isFormDisabled}
      />
    </>
  );
};

export default RawMaterialVerificationComponent;
