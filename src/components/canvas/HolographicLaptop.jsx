import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, Float, Html, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

const HoloScreens = ({ isMobile }) => {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.position.y = Math.sin(t / 2) * 0.1;
        group.current.rotation.y = Math.sin(t / 8) * 0.05; // Very subtle idle rotation
    });

    return (
        <group ref={group}>
            {/* 
               CENTER SCREEN: Main System Command
               Large, central focus
            */}
            <Html transform position={[0, 0, 0]} distanceFactor={1.2}>
                <div className="w-[800px] h-[500px] bg-black/90 backdrop-blur-xl rounded-xl border border-blue-500/40 shadow-[0_0_80px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col select-none pointer-events-none">
                    <div className="bg-white/5 p-3 flex items-center justify-between border-b border-white/10 px-6">
                        <div className="text-xs text-blue-400 font-mono tracking-widest">ARYAN_OS // ROOT</div>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="p-8 font-mono text-lg text-blue-100/90 leading-relaxed flex-1 flex flex-col justify-end">
                        <div className="opacity-50 mb-4">
                            <div>$ init system --verbose</div>
                            <div>{'>'} Loading core modules... <span className="text-green-400">DONE</span></div>
                            <div>{'>'} Initializing visual interface... <span className="text-green-400">DONE</span></div>
                            <div>{'>'} Connecting to neural network... <span className="text-yellow-400">PENDING</span></div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-2">Welcome, User.</div>
                        <div className="text-blue-300">System is ready for interaction.</div>
                        <div className="mt-4 flex gap-3">
                            <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-sm text-blue-300">React v18.2</div>
                            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-sm text-purple-300">Three.js r160</div>
                        </div>
                        <div className="animate-pulse text-blue-500 mt-2">_</div>
                    </div>
                </div>
            </Html>

            {/* 
               LEFT SCREEN: Code/Logic 
            */}
            <Html transform position={[-2.5, 0, 1.0]} rotation={[0, 0.4, 0]} distanceFactor={1.6}>
                <div className="w-[400px] h-[500px] bg-black/85 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)] p-5 flex flex-col select-none pointer-events-none">
                    <div className="text-purple-400 text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">CORE LOGIC</div>
                    <div className="space-y-3 font-mono text-sm text-gray-300">
                        <div className="bg-white/5 p-3 rounded border-l-2 border-purple-500">
                            <div className="text-xs text-purple-300 mb-1">function createImpact()</div>
                            <div className="pl-2 border-l border-gray-700 ml-1">
                                <div>const innovation = true;</div>
                                <div>return transform(world);</div>
                            </div>
                        </div>
                        <div className="bg-white/5 p-3 rounded border-l-2 border-blue-500">
                            <div className="text-xs text-blue-300 mb-1">class Developer</div>
                            <div className="pl-2 border-l border-gray-700 ml-1">
                                <div>this.skills = ['FullStack', 'AI'];</div>
                                <div>this.passion = 'Infinite';</div>
                            </div>
                        </div>
                        <div className="flex-1 bg-black/40 rounded p-2 text-[10px] text-gray-500 font-mono overflow-hidden opacity-50">
                            {Array(10).fill(0).map((_, i) => <div key={i}>{`0x${(Math.random() * 100000).toString(16)}...`}</div>)}
                        </div>
                    </div>
                </div>
            </Html>

            {/* 
               RIGHT SCREEN: Metrics/Data
            */}
            <Html transform position={[2.5, 0, 1.0]} rotation={[0, -0.4, 0]} distanceFactor={1.6}>
                <div className="w-[400px] h-[500px] bg-black/85 backdrop-blur-md rounded-xl border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] p-5 flex flex-col select-none pointer-events-none">
                    <div className="text-green-400 text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">SYSTEM METRICS</div>

                    <div className="flex-1 flex flex-col gap-4">
                        {/* Circle Charts */}
                        <div className="flex justify-around">
                            <div className="relative w-20 h-20 rounded-full border-4 border-gray-800 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90"><circle cx="40" cy="40" r="36" stroke="#22c55e" strokeWidth="4" fill="none" strokeDasharray="226" strokeDashoffset="25" /></svg>
                                <span className="text-lg font-bold text-white">98%</span>
                            </div>
                            <div className="relative w-20 h-20 rounded-full border-4 border-gray-800 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90"><circle cx="40" cy="40" r="36" stroke="#3b82f6" strokeWidth="4" fill="none" strokeDasharray="226" strokeDashoffset="60" /></svg>
                                <span className="text-lg font-bold text-white">75%</span>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="h-32 flex items-end justify-between gap-2 border-b border-gray-700 pb-2">
                            {[60, 45, 75, 50, 90, 30, 80].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-green-500/40 hover:bg-green-400 transition-colors rounded-t"></div>
                            ))}
                        </div>

                        {/* Status Lines */}
                        <div className="space-y-2 mt-auto">
                            <div className="flex justify-between text-xs text-gray-400"><span>Performance</span><span className="text-green-400">Optimal</span></div>
                            <div className="flex justify-between text-xs text-gray-400"><span>Latency</span><span className="text-blue-400">12ms</span></div>
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    )
}

const ResponsiveGroup = () => {
    const { viewport } = useThree();
    // Determine mobile state based on 3D viewport width
    // At z=0, typical mobile width is < 5-6 units with default camera
    const isMobile = viewport.width < 8;

    // Dynamic scaling:
    // On Desktop: keep it around 1.35
    // On Mobile: scale it down to fit width
    const baseScale = isMobile ? viewport.width / 6.5 : 1.35;
    const scale = Math.min(Math.max(baseScale, 0.6), 1.5);

    // Dynamic positioning:
    // Pushing it further down on small screens to avoid overlaying the DOM text
    const yPos = isMobile ? -2.2 : -1.2;

    return (
        <group position={[0, yPos, 0]} scale={scale}>
            <HoloScreens isMobile={isMobile} />
            <ContactShadows opacity={0.4} scale={30} blur={2.5} far={4.5} />
            {/* Ambient light for better visibility when scaled */}
            <ambientLight intensity={0.5} />
        </group>
    );
};

const HolographicLaptopCanvas = () => {
    return (
        <div className='w-full h-full absolute inset-0 z-0'>
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        enableZoom={false}
                        autoRotate={false}
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 3}
                        minAzimuthAngle={-Math.PI / 2}
                        maxAzimuthAngle={Math.PI / 2}
                    />

                    <ResponsiveGroup />

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HolographicLaptopCanvas;