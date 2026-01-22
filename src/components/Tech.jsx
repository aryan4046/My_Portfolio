import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8">
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className="w-24 h-24 sm:w-28 sm:h-28 flex justify-center items-center"
        >
          {/* MOBILE VIEW → SIMPLE CIRCLE ICON */}
          {isMobile ? (
            <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex justify-center items-center shadow-md">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-12 h-12 object-contain"
              />
            </div>
          ) : (
            /* DESKTOP VIEW → 3D BALL */
            <BallCanvas icon={technology.icon} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
