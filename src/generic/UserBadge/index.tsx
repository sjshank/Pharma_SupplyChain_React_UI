import React from "react";
import { IUserInfo } from "../../models/userInfo.interface";
import { ROLE_ASSOCIATED_COLORS } from "../../utils/constants";
import { populateUserName } from "../../utils/helpers";
import MTooltipComponent from "../MTooltip";

type UserBadgeProps = {
  title: string;
  users: IUserInfo[];
  role: string | number | any;
};

const UserBadgeComponent = ({ title, users, role }: UserBadgeProps) => {
  return (
    <MTooltipComponent title={title} placement="top">
      <span style={{ color: ROLE_ASSOCIATED_COLORS[role], fontWeight: 600 }}>
        {populateUserName(role, title, users)}
      </span>
    </MTooltipComponent>
  );
};

export default React.memo(UserBadgeComponent);
