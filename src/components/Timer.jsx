import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const Timer = ({timer}) => {
  return (
    <CircularProgressbar
      value={timer}
      text={timer}
      counterClockwise={true}
      minValue={0}
      maxValue={10}
      className="flex justify-center "
    />
  );
};

export default Timer;
