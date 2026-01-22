import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-10 px-4">
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className="
            w-20 h-20        /* Mobile size */
            sm:w-24 sm:h-24  /* Tablet */
            md:w-28 md:h-28  /* Laptop */
          "
        >
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
