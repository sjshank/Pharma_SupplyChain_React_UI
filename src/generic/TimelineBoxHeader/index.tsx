import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MTypographyComponent from "../MTypography";
import UpdateIcon from "@material-ui/icons/Update";
import Grid from "@material-ui/core/Grid";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { getFormattedDate } from "../../utils/helpers";
import MTooltipComponent from "../MTooltip";

type BoxHeaderProps = {
  title: string;
  name: string;
  dateOfReg: string | any;
  showName: boolean;
  isCompleted: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    barTitle: {
      fontSize: 16,
      fontWeight: 600,
    },
    ulBox: {
      listStyle: "none",
      paddingLeft: 0,
      marginLeft: 0,
      color: theme.palette.primary.main,
      fontSize: 12,
      fontWeight: 600,
    },
    truncate: {
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    statusBadge: {
      textAlign: "center",
      fontSize: 11,
      fontWeight: 600,
    },
  })
);

const TimelineBoxHeaderComponent = ({
  title,
  name,
  dateOfReg,
  showName = false,
  isCompleted = false,
}: BoxHeaderProps) => {
  const classes = useStyles();
  const regDate = getFormattedDate(parseInt(dateOfReg));
  return (
    <>
      <MTypographyComponent
        text={title}
        variant="h5"
        classname={classes.barTitle}
      />
      {showName && (
        <Grid container wrap="nowrap">
          <Grid item sm={10} zeroMinWidth>
            <ul className={classes.ulBox}>
              <li className={classes.truncate}>
                <PersonIcon
                  fontSize="small"
                  color="primary"
                  style={{ verticalAlign: "bottom" }}
                />
                <MTooltipComponent title={name} placement="top">
                  <span>{name}</span>
                </MTooltipComponent>
              </li>
              <li>
                <AccessTimeIcon
                  fontSize="small"
                  color="primary"
                  style={{ verticalAlign: "bottom" }}
                />
                <span>Registered on : {regDate}</span>
              </li>
            </ul>
          </Grid>
          <Grid item sm={2} zeroMinWidth>
            <div className={classes.statusBadge}>
              {!isCompleted && (
                <>
                  <UpdateIcon fontSize="large" style={{ fill: "#FFB740" }} />
                  <span style={{ color: "#FFB740" }}>IN PROGRESS</span>
                </>
              )}
              {isCompleted && (
                <>
                  <AssignmentTurnedInIcon
                    fontSize="large"
                    style={{ fill: "#4caf50" }}
                  />
                  <span style={{ color: "#4caf50" }}>COMPLETED</span>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TimelineBoxHeaderComponent;
