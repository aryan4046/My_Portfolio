import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
        }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-12 h-12 relative flex justify-center items-center group cursor-pointer overflow-visible">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#915EFF" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Rotating Tech Ring */}
              <g className="origin-center animate-[spin_4s_linear_infinite]" style={{ transformOrigin: "50px 50px" }}>
                <circle cx="50" cy="50" r="45" stroke="#ffffff10" strokeWidth="4" fill="none" />
                <path d="M 50 5 A 45 45 0 0 1 95 50" stroke="url(#logo-grad)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 50 95 A 45 45 0 0 1 5 50" stroke="url(#logo-grad)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>

              {/* Center "AS" Text */}
              <text x="50" y="68" fontSize="42" fontWeight="900" textAnchor="middle" fill="white" className="group-hover:fill-url(#logo-grad) transition-colors duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">AS</text>
            </svg>
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Aryan Samani
          </p>
        </Link>

        {/* ================= Desktop Menu ================= */}
        <div className="hidden sm:flex flex-row items-center gap-8">
          <ul className="list-none flex flex-row gap-10">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`${active === nav.title ? "text-white" : "text-secondary"
                  } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
                {/* Glowing Underline Animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] blur-sm transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Resume Button (Desktop) */}
          <a
            href="/Aryan Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-white text-[18px] font-medium transition relative group"
          >
            Resume
            {/* Glowing Underline Animation */}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] blur-sm transition-all duration-300 group-hover:w-full"></span>
          </a>

        </div>

        {/* ================= Mobile Menu ================= */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[170px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4 w-full">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
                    } hover:text-white`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              {/* Resume Button (Mobile - Perfect Line) */}
              <li
                className={`font-medium cursor-pointer text-[16px] text-secondary hover:text-white`}
                onClick={() => setToggle(false)}
              >
                <a
                  href="/Aryan Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
