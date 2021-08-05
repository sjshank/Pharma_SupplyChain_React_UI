import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CONTENT_LOADING } from "../../utils/constants";

const LoaderComponent = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div>{CONTENT_LOADING}</div>
      <CircularProgress variant="indeterminate" />
    </div>
  );
};

export default LoaderComponent;
