import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const RobotCanvas = () => {
    const [colorIndex, setColorIndex] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);

    // Motion values for mouse position (-1 to 1)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for head and eyes
    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transforms
    const headRotateX = useTransform(springY, [-1, 1], [10, -10]); // Up/Down
    const headRotateY = useTransform(springX, [-1, 1], [-15, 15]); // Left/Right
    const eyeMoveX = useTransform(springX, [-1, 1], [-6, 6]);
    const eyeMoveY = useTransform(springY, [-1, 1], [-4, 4]);

    const colors = [
        { primary: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)', shadow: 'rgba(255, 255, 255, 0.2)' },
        { primary: '#00f2ff', glow: 'rgba(0, 242, 255, 0.8)', shadow: 'rgba(0, 242, 255, 0.2)' },
        { primary: '#ff007a', glow: 'rgba(255, 0, 122, 0.8)', shadow: 'rgba(255, 0, 122, 0.2)' },
        { primary: '#39ff14', glow: 'rgba(57, 255, 20, 0.8)', shadow: 'rgba(57, 255, 20, 0.2)' },
        { primary: '#ffcc00', glow: 'rgba(255, 204, 0, 0.8)', shadow: 'rgba(255, 204, 0, 0.2)' },
    ];

    const currentColor = colors[colorIndex];

    const handleInteraction = () => {
        setColorIndex((prev) => (prev + 1) % colors.length);
    };

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;

            // Calculate position relative to center (-1 to 1)
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Natural blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, 4000);
        return () => clearInterval(blinkInterval);
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-full bg-transparent pt-[150px] sm:pt-[320px]">
            <div
                className="relative group cursor-pointer animate-fly-in scale-75 sm:scale-100"
                onClick={handleInteraction}
            >
                {/* Glow removed as requested */}

                <div className="relative animate-float flex flex-col items-center">

                    {/* Head Unit */}
                    {/* Head Unit */}
                    <motion.div
                        className="relative z-30 w-40 h-36 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] rounded-[50%_50%_45%_45%] shadow-[inset_2px_2px_10px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.9)] border-t border-white/5"
                        style={{
                            rotateY: headRotateY,
                            rotateX: headRotateX,
                            perspective: 1000
                        }}
                    >
                        {/* Face Screen */}
                        <div className="absolute inset-4 bg-[#080808] rounded-[45%] flex flex-col items-center justify-center border border-white/5 shadow-inner">
                            {/* Eyes */}
                            <motion.div
                                className="flex space-x-8 mb-3"
                                style={{
                                    x: eyeMoveX,
                                    y: eyeMoveY
                                }}
                            >
                                {[0, 1].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-6 h-1.5 rounded-full transition-all duration-500 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}
                                        style={{
                                            backgroundColor: currentColor.primary,
                                            boxShadow: `0 0 10px ${currentColor.glow}, 0 0 20px ${currentColor.glow}`,
                                            borderRadius: '10px 10px 0 0'
                                        }}
                                    />
                                ))}
                            </motion.div>
                            {/* Mouth */}
                            <div
                                className={`w-10 h-3 border-b-4 rounded-[0_0_20px_20px] transition-all duration-500 h-3`}
                                style={{
                                    borderColor: currentColor.primary,
                                    filter: `drop-shadow(0 0 8px ${currentColor.glow})`
                                }}
                            />
                        </div>

                        {/* Ear Sensors */}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border-l border-white/10">
                            <div className="w-1.5 h-6 rounded-full transition-colors duration-500" style={{ backgroundColor: currentColor.primary, boxShadow: `0 0 10px ${currentColor.glow}` }} />
                        </div>
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border-r border-white/10">
                            <div className="w-1.5 h-6 rounded-full transition-colors duration-500" style={{ backgroundColor: currentColor.primary, boxShadow: `0 0 10px ${currentColor.glow}` }} />
                        </div>
                    </motion.div>

                    {/* Torso & Arms Area */}
                    <div className="relative w-32 -mt-3 flex justify-center">

                        {/* Left Arm - The Hello Arm */}
                        <div className={`absolute -left-12 top-4 w-12 h-20 origin-[top_right] rotate-[20deg]`}>
                            {/* Upper Arm */}
                            <div className="w-8 h-16 bg-gradient-to-r from-[#1a1a1a] to-[#252525] rounded-full shadow-xl border-l border-white/5" />
                            {/* Hand / Palm */}
                            <div className="absolute -bottom-6 -left-2 w-10 h-10 bg-[#151515] rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center origin-center">
                                <div className="flex items-end space-x-1 px-1">
                                    <div className="w-1.5 h-4 bg-[#333] rounded-full" />
                                    <div className="w-1.5 h-6 bg-[#444] rounded-full" />
                                    <div className="w-1.5 h-5 bg-[#333] rounded-full" />
                                    <div className="w-1.5 h-4 bg-[#333] rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Main Body */}
                        <div className="relative z-20 w-32 h-36 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#050505] rounded-[35%_35%_50%_50%] shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),0_10px_40px_rgba(0,0,0,1)] border-t border-white/5 flex flex-col items-center pt-10">
                            {/* Core Power Ring */}
                            <div
                                className="w-14 h-14 rounded-full border-[3px] flex items-center justify-center transition-all duration-700 relative"
                                style={{
                                    borderColor: currentColor.primary,
                                    boxShadow: `0 0 20px ${currentColor.glow}, inset 0 0 15px ${currentColor.glow}`
                                }}
                            >
                                <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: currentColor.primary }} />
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentColor.primary }} />
                            </div>
                        </div>

                        {/* Right Arm - Static/Idle */}
                        <div className="absolute -right-12 top-4 w-12 h-20 origin-[top_left] -rotate-[20deg]">
                            <div className="w-8 h-16 bg-gradient-to-l from-[#1a1a1a] to-[#252525] rounded-full shadow-xl border-r border-white/5" />
                            <div className="absolute -bottom-6 right-0 w-10 h-10 bg-[#151515] rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center">
                                <div className="flex items-end space-x-1 px-1">
                                    <div className="w-1.5 h-4 bg-[#333] rounded-full" />
                                    <div className="w-1.5 h-6 bg-[#444] rounded-full" />
                                    <div className="w-1.5 h-5 bg-[#333] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shadow removed as requested */}
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        @keyframes fly-in {
          0% { transform: translateY(100px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes hello-wave {
          0% { transform: rotate(20deg); }
          15% { transform: rotate(-130deg); } /* Lift arm way up */
          30% { transform: rotate(-110deg); } /* Wave move 1 */
          45% { transform: rotate(-140deg); } /* Wave move 2 */
          60% { transform: rotate(-110deg); } /* Wave move 3 */
          75% { transform: rotate(-140deg); } /* Wave move 4 */
          100% { transform: rotate(20deg); }  /* Return to idle */
        }

        @keyframes shadow-breath {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateX(-50%) scale(0.6); opacity: 0.3; }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fly-in {
          animation: fly-in 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-hello-wave {
          animation: hello-wave 2s cubic-bezier(0.45, 0, 0.55, 1);
        }

        .animate-shadow-breath {
          animation: shadow-breath 4s ease-in-out infinite;
        }
      `}</style>
        </div >
    );
};

export default RobotCanvas;
