import React from "react";
import background from './assets/background.jpg';

const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <img
        src={background}
        alt="background"
        className="w-full h-full object-cover"
      />
    </div>


  );
};

export default Background;
