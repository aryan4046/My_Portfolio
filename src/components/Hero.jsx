import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { HolographicLaptopCanvas } from "./canvas";

const TypewriterText = ({ text, className = "", floating = false, delay = 0 }) => {
  const [startFloating, setStartFloating] = useState(false);

  useEffect(() => {
    if (floating) {
      // Estimate typing time: delay + text.length * 0.05
      // We add a small buffer to ensure typing finishes before floating starts
      const typingDuration = (text.length * 0.05 + delay) * 1000 + 500;
      const timer = setTimeout(() => setStartFloating(true), typingDuration);
      return () => clearTimeout(timer);
    }
  }, [floating, text, delay]);

  return (
    <motion.div
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
        hidden: {},
      }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className={`inline-block ${floating ? "cursor-pointer" : ""}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
              }}
              animate={startFloating ? {
                opacity: 1,
                y: [0, -8, 0],
                rotate: [0, 1, -1, 0],
                transition: {
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }
              } : undefined}
              whileHover={startFloating ? {
                y: -20, scale: 1.2, rotate: Math.random() * 20 - 10, color: "#915EFF", transition: { duration: 0.2 }
              } : undefined}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a space character only visually if needed, but flex gap handles spacing */}
        </span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="pointer-events-auto z-10 w-full">
          <h1 className={`${styles.heroHeadText} text-white`}>
            {/* Typing + Floating for the Header */}
            <TypewriterText text="Hi, I'm" floating={true} />{" "}
            <TypewriterText text="Aryan" className="text-[#915EFF]" floating={true} delay={0.4} />
          </h1>

          <div className={`${styles.heroSubText} mt-2 text-white-100`}>
            {/* Typing ONLY for the subtext (No Floating) */}
            <div className="block">
              <TypewriterText text="Aspiring Software Developer | IT Engineering Student" floating={false} delay={1.5} />
            </div>
            <div className="block mt-1">
              <TypewriterText text="Specializing in web development and intelligent AI applications." floating={false} delay={3.5} />
            </div>
          </div>
        </div>
      </div>

      {/* 3D Holographic Laptop */}
      <div className="absolute inset-0 top-[120px] hidden sm:block">
        <HolographicLaptopCanvas />
      </div>
    </section>
  );
};

export default Hero;
