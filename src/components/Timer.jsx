import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FadeIn, SlideInDown } from "react-animated-components";
import { FadeOut } from "react-animated-components";

const Timer = ({ timer }) => {
  return (
    <FadeIn
    durationMs={900}
    >
      <SlideInDown
      durationMs={500}
      
      >
        <CircularProgressbar
          value={timer}
          text={timer}
          counterClockwise={true}
          minValue={0}
          maxValue={10}
          className="flex justify-center "
        />
      </SlideInDown>
    </FadeIn>
  );
};

export default Timer;
