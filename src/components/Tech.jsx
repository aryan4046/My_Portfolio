import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { BallCanvas } from "./canvas";

const Tech = () => {
  // detect mobile screen
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className="w-24 h-24 flex items-center justify-center"
        >
          {/* On Mobile → show normal image */}
          {isMobile ? (
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            /* On Laptop → show 3D ball */
            <BallCanvas icon={technology.icon} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
