import React from "react";
import AnimatedText from 'react-animated-text-content';

const TimeUp = ({text}) => {
  return (
    <AnimatedText
      type="words"
      interval={0.02}
      duration={0.2}
      animation={{
        y: "100px",
        ease: "ease",
      }}
    >
      {text}
    </AnimatedText>
  );
};

export default TimeUp;
