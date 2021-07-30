import { useContext, useEffect, useState } from "react";
import { Theme, createMuiTheme } from "@material-ui/core/styles";
import { IUserInfoContext } from "../models/userInfo.interface";
import { UserInfoContext } from "../context/UserContext";
import { ROLE_BRAND } from "../utils/constants";

const useCustomTheme = () => {
  const defaultTheme = createMuiTheme();
  const userInfoContext = useContext<IUserInfoContext>(UserInfoContext);
  const { userInfo } = userInfoContext;
  const [customTheme, setCustomTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const theme = createMuiTheme({
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: userInfo?.userRoleName?.toLowerCase()
              ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
              : "",
            color: userInfo?.userRoleName?.toLowerCase()
              ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["color"]
              : "",
          },
        },
        MuiButton: {
          outlined: {
            cursor: "pointer !important",
            color: userInfo?.userRoleName?.toLowerCase()
              ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
              : "",
            borderColor: userInfo?.userRoleName?.toLowerCase()
              ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
              : "",
          },
          outlinedSecondary: {
            color: "#444444",
            borderColor: "#444444",
            "&:hover": {
              color: "#444444 !important",
              borderColor: "#444444 !important",
              backgroundColor: "#fff",
            },
          },
          containedPrimary: {
            cursor: "pointer !important",
            color: userInfo?.userRoleName?.toLowerCase()
              ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["color"]
              : "",
            backgroundColor: userInfo?.userRoleName?.toLowerCase()
              ? `${
                  ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
                }`
              : "",
            "&:disabled": {
              color: "rgba(0, 0, 0, 0.26)",
              backgroundColor: "rgba(0, 0, 0, 0.26) !important",
              opacity: 0.8,
            },
            "&:hover": {
              color: userInfo?.userRoleName?.toLowerCase()
                ? ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["color"]
                : "",
              backgroundColor: userInfo?.userRoleName?.toLowerCase()
                ? `${
                    ROLE_BRAND[userInfo?.userRoleName?.toLowerCase()]["bgColor"]
                  }`
                : "",
            },
          },
          containedSecondary: {
            color: "#444444",
            borderColor: "#444444",
            backgroundColor: "#fff",
            "&:hover": {
              color: "#444444 !important",
              borderColor: "#444444 !important",
              backgroundColor: "#fff",
            },
          },
          text: {
            cursor: "pointer !important",
            color: "#fff",
            background: "transparent",
            "&:hover": {
              transform: "scale(1.2)",
              background: "none",
            },
          },
        },
      },
    });
    setCustomTheme(theme);
  }, [userInfo]);

  return customTheme;
};

export default useCustomTheme;
