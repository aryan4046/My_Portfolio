import React, { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float, Sphere, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const NeuralNetwork = ({ count = 200 }) => {
    const ref = useRef();
    // Using maath to generate random points in a sphere shell
    const sphere = random.inSphere(new Float32Array(count * 3), { radius: 3 });

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color='#915eff'
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const ConnectingLines = () => {
    // A secondary wireframe sphere to represent connections
    return (
        <mesh scale={2.8} rotation={[0, 0, 0]}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial
                color="#915eff"
                wireframe
                transparent
                opacity={0.05}
            />
        </mesh>
    )
}


const Core = (props) => {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.15;
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group {...props}>
                {/* The "Brain" / Core - Segmented Icosahedron */}
                <mesh ref={meshRef} scale={2.5}>
                    {/* Visualizing the "Segemented" look via flat shading on an Icosahedron */}
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#1a1a1a" // Dark core
                        emissive="#5e3869" // Purple glow
                        emissiveIntensity={0.4}
                        roughness={0.2}
                        metalness={0.9}
                        flatShading={true} // CRITICAL for the segmented look
                    />
                </mesh>

                {/* Edge Highlight */}
                <mesh scale={2.51} ref={meshRef}> {/* Reuse ref to rotate together, or separate if different rotation needed */}
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        wireframe
                        transparent
                        opacity={0.1}
                    />
                </mesh>

            </group>
        </Float>
    );
};

const AiNeuralCoreCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <div className='w-full h-full absolute inset-0 z-0'>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                    />

                    {/* Ambient light for base visibility */}
                    <ambientLight intensity={0.5} />

                    {/* Directional lights for definition */}
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                    <spotLight position={[-10, -10, -5]} intensity={5} color="#915eff" angle={0.5} penumbra={1} />

                    <Core />
                    <NeuralNetwork count={400} />
                    <ConnectingLines />

                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default AiNeuralCoreCanvas;
