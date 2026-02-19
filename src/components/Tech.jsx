import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import useIsMobile from "../hooks/useIsMobile";

const Tech = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28 flex justify-center items-center" key={technology.name}>
          {isMobile ? (
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
          ) : (
            <BallCanvas icon={technology.icon} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
