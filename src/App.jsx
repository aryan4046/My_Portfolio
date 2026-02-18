import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  CanvasCursor,
  AntigravityBackground, // Add this
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <AntigravityBackground />
        <StarsCanvas />
        <CanvasCursor />
        {/* HERO SECTION */}
        <div className="relative">
          <Navbar />
          <Hero />
        </div>

        {/* OTHER SECTIONS */}
        <About />
        <Tech />
        <Works />

        {/* CONTACT SECTION */}
        <div className="relative z-0">
          <Contact />
        </div>
        {/* FOOTER */}
        <footer className="w-full py-8 mt-20 border-t border-white/10 bg-primary">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6 items-center text-sm text-secondary">

            {/* Top Line */}
            <div className="flex flex-wrap justify-center gap-6">

              <span>
                📧{" "}
                <a
                  href="mailto:aryansamani4046@gmail.com"
                  className="hover:text-white transition"
                >
                  aryansamani4046@gmail.com
                </a>
              </span>

              <span>
                📞{" "}
                <a
                  href="tel:+919879072148"
                  className="hover:text-white transition"
                >
                  +91-9879072148
                </a>
              </span>

              <span>📍 Ahmedabad, India</span>

              <a
                href="https://www.linkedin.com/in/your-link"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                🔗 LinkedIn
              </a>

              <a
                href="https://github.com/aryan4046"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                💻 GitHub
              </a>
            </div>

            {/* Bottom Line */}
            <div className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Aryan Samani · Built with React & Three.js
            </div>

          </div>
        </footer>


      </div>
    </BrowserRouter>
  );
};

export default App;
