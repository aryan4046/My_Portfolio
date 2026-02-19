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
            <div className="w-24 h-24 rounded-full bg-tertiary border-2 border-secondary flex justify-center items-center shadow-[0_0_15px_rgba(145,94,255,0.4)]">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-16 h-16 object-contain p-1"
                loading="lazy"
              />
            </div>
          ) : (
            <BallCanvas icon={technology.icon} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
