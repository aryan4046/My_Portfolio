import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, PerspectiveCamera, OrbitControls, Float, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { styles } from "../../styles";

const HolographicRing = ({ radius, speed, color, thickness, rotationOffset }) => {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.sin(t * speed * 0.5) * 0.2 + rotationOffset[0];
        ref.current.rotation.y = t * speed + rotationOffset[1];
        ref.current.rotation.z = Math.cos(t * speed * 0.5) * 0.2 + rotationOffset[2];
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, thickness, 16, 100]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.4}
                wireframe
            />
        </mesh>
    );
};

const FloatingParticles = ({ count = 50 }) => {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        particles.forEach((particle, i) => {
            // Update particle positions or individual meshes if we used instances
            // For simplicity in this specific "hero" context with few particles, 
            // we can just use a group of small meshes or a Points object.
            // Let's stick to a simple Points implementation or just ignore detailed movement for now 
            // and use a rotating group of stars/dots.
        });
        ref.current.rotation.y = t * 0.05;
        ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    });

    return (
        <group ref={ref}>
            {particles.map((data, i) => (
                <mesh key={i} position={[data.x, data.y, data.z]}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial color={i % 2 === 0 ? "#00ffff" : "#9d4edd"} transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
};

const DashboardUI = () => {
    return (
        <group>
            {/* CENTRAL MAIN PANEL - CODE EDITOR */}
            <Html transform position={[0, 0, 0]} distanceFactor={1.5}>
                <div className="w-[600px] h-[400px] bg-black/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden flex flex-col select-none">
                    {/* Header */}
                    <div className="bg-cyan-900/20 border-b border-cyan-500/30 p-2 flex justify-between items-center">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="text-cyan-400 font-mono text-xs">MAIN_CONTROLLER.js</div>
                    </div>
                    {/* Code Content */}
                    <div className="p-4 font-mono text-sm text-cyan-100/80 flex-1 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
                        <p className="text-pink-500">class <span className="text-yellow-400">Developer</span> <span className="text-white">extends</span> <span className="text-green-400">Human</span> {"{"}</p>
                        <div className="pl-4 border-l border-white/10 ml-1">
                            <p><span className="text-blue-400">constructor</span>() {"{"}</p>
                            <div className="pl-4">
                                <p>this.skills = [<span className="text-green-300">'Three.js'</span>, <span className="text-green-300">'React'</span>, <span className="text-green-300">'AI'</span>];</p>
                                <p>this.passion = <span className="text-purple-400">Infinity</span>;</p>
                                <p>this.status = <span className="text-green-300">'Building the Future'</span>;</p>
                            </div>
                            <p>{"}"}</p>
                            <br />
                            <p><span className="text-blue-400">render</span>() {"{"}</p>
                            <div className="pl-4">
                                <p><span className="text-purple-400">return</span> (</p>
                                <div className="pl-4 text-gray-400">
                                    {"<"}InnovativeSolutions / {">"}
                                </div>
                                <p>);</p>
                            </div>
                            <p>{"}"}</p>
                        </div>
                        <p>{"}"}</p>

                        {/* Cursor Animation */}
                        <div className="mt-2 w-2 h-4 bg-cyan-400 animate-pulse" />
                    </div>
                </div>
            </Html>

            {/* LEFT PANEL - ANALYTICS */}
            <Html transform position={[-2.4, 0.2, 0.5]} rotation={[0, 0.3, 0]} distanceFactor={1.5}>
                <div className="w-[250px] h-[350px] bg-black/70 backdrop-blur-lg border border-purple-500/40 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] p-4 flex flex-col gap-4">
                    <div className="text-purple-400 text-xs font-bold uppercase tracking-widest border-b border-purple-500/20 pb-2">System Analytics</div>

                    {/* Fake Chart 1 */}
                    <div className="flex-1 bg-purple-900/10 rounded border border-purple-500/20 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-2 pb-2 gap-1">
                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-full bg-purple-500/60 rounded-t" />
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-300">
                            <span>Uptime</span>
                            <span className="text-green-400">99.9%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                            <div className="w-[99%] h-full bg-green-400" />
                        </div>

                        <div className="flex justify-between text-xs text-gray-300 mt-2">
                            <span>Performance</span>
                            <span className="text-yellow-400">Optimized</span>
                        </div>
                        <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-yellow-400" />
                        </div>
                    </div>
                </div>
            </Html>

            {/* RIGHT PANEL - NETWORK / NOTIFICATION */}
            <Html transform position={[2.4, 0, 0.5]} rotation={[0, -0.3, 0]} distanceFactor={1.5}>
                <div className="w-[250px] h-[300px] bg-black/70 backdrop-blur-lg border border-blue-500/40 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] p-4 gap-3 flex flex-col">
                    <div className="text-blue-400 text-xs font-bold uppercase tracking-widest border-b border-blue-500/20 pb-2">Network Status</div>

                    <div className="flex items-center gap-3 bg-blue-500/10 p-2 rounded border border-blue-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <div className="text-xs text-blue-200">Connected to 127.0.0.1</div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="text-[10px] text-gray-400 uppercase">Incoming Data Packets</div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between text-xs font-mono text-cyan-300/80 border-b border-white/5 py-1">
                                <span>PKT_0{i}84</span>
                                <span>{Math.floor(Math.random() * 50)}ms</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto flex justify-center">
                        <div className="text-[10px] text-blue-500/70 border border-blue-500/30 px-2 py-1 rounded">SECURE CONNECTION</div>
                    </div>
                </div>
            </Html>
        </group>
    );
}

const HolographicScene = ({ isMobile }) => {
    // Dynamic Scale
    const scale = isMobile ? 0.65 : 1.1;
    const yPosition = isMobile ? -2.5 : -1.5;

    return (
        <group scale={scale} position={[0, yPosition, 0]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>

                {/* 3D RINGS */}
                <group rotation={[0.4, 0, 0]}>
                    <HolographicRing radius={3.5} thickness={0.02} speed={0.5} color="#00ffff" rotationOffset={[0, 0, 0]} />
                    <HolographicRing radius={3.2} thickness={0.03} speed={0.4} color="#bd00ff" rotationOffset={[1, 1, 0]} />
                    <HolographicRing radius={4.0} thickness={0.01} speed={0.2} color="#ffffff" rotationOffset={[0.5, 0, 0.5]} />
                </group>

                {/* THE DASHBOARD UI */}
                <DashboardUI />

                {/* PARTICLES */}
                <FloatingParticles count={80} />

                {/* LIGHTING FOR GLOW */}
                <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={5} />
                <pointLight position={[2, 2, 2]} intensity={1} color="#bd00ff" distance={6} />
                <ambientLight intensity={0.5} />

            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={40} blur={2} far={4} color="#00dcb4" />
        </group>
    );
};

const HolographicDashboardCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Simple effective mobile check
    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 12], fov: 35 }}
            gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
            className="w-full h-full"
        >
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />

            <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 1.8} // Restrict looking too far down
                minPolarAngle={Math.PI / 2.5} // Restrict looking too far up
                minAzimuthAngle={-Math.PI / 4} // Restrict side rotation
                maxAzimuthAngle={Math.PI / 4}
                enablePan={false}
            />

            <HolographicScene isMobile={isMobile} />
        </Canvas>
    );
};

export default HolographicDashboardCanvas;
