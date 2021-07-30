import { Grid } from "@material-ui/core";
import React from "react";
import { ISummaryBar } from "../../models/summarybar.interface";
import MetricsComponent from "../Metrics";

type SummaryBarProps = {
  summaryBarList: ISummaryBar[];
};

const SummaryBarComponent = ({ summaryBarList }: SummaryBarProps) => {
  return (
    summaryBarList && (
      <Grid container spacing={2}>
        {summaryBarList.map((summaryInfo: ISummaryBar, index: any) => {
          return (
            <Grid
              key={`${summaryInfo.label}-${summaryInfo.value}-${index}`}
              item
              xs={summaryInfo?.sizeXS}
              sm={summaryInfo?.sizeSM}
              lg={summaryInfo?.sizeLG}
            >
              <MetricsComponent
                label={summaryInfo.label}
                value={summaryInfo.value}
                IconComp={summaryInfo.iconComp}
              />
            </Grid>
          );
        })}
      </Grid>
    )
  );
};

export default SummaryBarComponent;
