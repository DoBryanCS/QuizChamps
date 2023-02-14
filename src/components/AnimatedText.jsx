import React from "react";
import AnimatedText from 'react-animated-text-content';

const AnimatedTexte = ({text}) => {
  return (
    <AnimatedText
      type="words"
      interval={0.02}
      duration={0.2}
      className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      animation={{
        y: "100px",
        ease: "ease",
      }}
    >
      {text}
    </AnimatedText>
  );
};

export default AnimatedTexte;
