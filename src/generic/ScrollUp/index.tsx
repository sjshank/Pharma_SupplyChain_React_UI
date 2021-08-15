import React from "react";
import ScrollUpButton from "react-scroll-up-button";

const ScrollUp = () => {
  return (
    <ScrollUpButton
      StopPosition={0}
      ShowAtPosition={260}
      EasingType="easeOutCubic"
      AnimationDuration={400}
      ContainerClassName="ScrollUpButton__Container"
      TransitionClassName="ScrollUpButton__Toggled"
      ToggledStyle={{ bottom: 40 }}
    />
  );
};

export default ScrollUp;
