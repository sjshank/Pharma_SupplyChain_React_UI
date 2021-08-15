import React from "react";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import TimelineBoxHeaderComponent from "../generic/TimelineBoxHeader";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withTimelineHeader = (
  WrappedComponent: React.ComponentType<any>,
  slideDirection: "left" | "right" | "up" | "down",
  nameCondition: number,
  processCondition: number
): React.ReactNode => {
  class WithTimelineHeader extends React.Component {
    render() {
      const classes = this.props["classes"];
      const dataInfo = this.props["dataInfo"];
      return (
        <>
          <Slide
            direction={slideDirection}
            timeout={500}
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={clsx(
                classes.timelineContainer,
                classes[`${slideDirection === "right" ? "left" : "right"}`]
              )}
            >
              <div className={classes.content}>
                <TimelineBoxHeaderComponent
                  title={this.props["headerTitle"]}
                  name={`${
                    dataInfo[this.props["objectLookup"]]
                      ? dataInfo[this.props["objectLookup"]]["userName"]
                      : ""
                  } (${
                    dataInfo[this.props["objectLookup"]]
                      ? dataInfo[this.props["objectLookup"]]["userAddress"]
                      : ""
                  })`}
                  dateOfReg={
                    dataInfo[this.props["objectLookup"]]
                      ? dataInfo[this.props["objectLookup"]]["registrationDate"]
                      : ""
                  }
                  showName={parseInt(dataInfo["packageStatus"]) > nameCondition}
                  isCompleted={
                    parseInt(dataInfo["packageStatus"]) >= processCondition
                  }
                />
                <Divider />
                <WrappedComponent {...this.props} />
              </div>
            </div>
          </Slide>
        </>
      );
    }
  }
  WithTimelineHeader["displayName"] = `WithTimelineHeader(${getDisplayName(
    WrappedComponent
  )})`;
  return WithTimelineHeader;
};

export default withTimelineHeader;
