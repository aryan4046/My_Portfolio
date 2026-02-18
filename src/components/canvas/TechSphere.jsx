import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture, Decal, Float } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";
import { Suspense } from "react";

const TechBall = (props) => {
    const meshRef = useRef();

    // Custom geometry for the "core" look
    // Icosahedron with flat shading gives a nice faceted look
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Smooth rotation
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.2;

        // Gentle floating
        meshRef.current.position.y = Math.sin(time / 1.5) * 0.1;
    });

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={1}>
            <group {...props} dispose={null}>
                {/* Main Faceted Sphere - Metallic/Copper Look */}
                <mesh
                    ref={meshRef}
                    geometry={geometry}
                    scale={2.2}
                >
                    {/* High metalness and roughness map to simulate the panels */}
                    <meshStandardMaterial
                        color="#bfacc6" // Slight purple tint to metallic
                        emissive="#5e3869" // Glow from inside
                        emissiveIntensity={0.2}
                        roughness={0.1}
                        metalness={0.9}
                        flatShading={true}
                    />
                </mesh>

                {/* Wireframe Overlay for "Tech" feel */}
                <mesh scale={2.5}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
                </mesh>

                {/* Inner Core (Black) */}
                <mesh scale={1.8}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="black" roughness={0.8} />
                </mesh>
            </group>
        </Float>
    );
};

const TechSphereCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <div className='w-full h-full absolute inset-0 z-[-1]'>
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ preserveDrawingBuffer: true }}
                camera={{ position: [20, 3, 5], fov: 25 }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />

                    {/* Lighting setup for metallic look */}
                    <ambientLight intensity={0.2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1}
                        castShadow
                    />
                    {/* Colored lights to enhance the "Sci-Fi" feel */}
                    <pointLight position={[-10, -10, -10]} color="#915eff" intensity={5} />
                    <pointLight position={[10, 5, -10]} color="#ffad33" intensity={5} />

                    <TechBall />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default TechSphereCanvas;
