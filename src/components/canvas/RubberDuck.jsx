import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, ContactShadows, Html, Float } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../Loader";
import * as THREE from "three";

const Duck = ({ isMobile, mouse }) => {
    const group = useRef();
    const body = useRef();
    const head = useRef();
    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Floating animation
        // On mobile, float gently. On desktop, also float.
        group.current.position.y = Math.sin(t * 1.5) * 0.1;

        // Head follows mouse
        // Simple lerp for smooth tracking
        if (head.current) {
            const targetRotX = (mouse.current[1] / window.innerHeight) * 0.5;
            const targetRotY = (mouse.current[0] / window.innerWidth) * 0.5;

            head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, targetRotX, 0.1);
            head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetRotY, 0.1);
        }

        // click animation (Squash and jump)
        if (clicked) {
            const jumpTime = (t * 10) % (Math.PI * 2);
            group.current.position.y += Math.sin(jumpTime) * 0.5;
            group.current.rotation.y += 0.1;

            if (group.current.rotation.y > Math.PI * 2) {
                setClick(false);
                group.current.rotation.y = 0;
            }
        }
    });

    return (
        <group
            ref={group}
            scale={isMobile ? 0.6 : 0.7}
            position={isMobile ? [0, -1, 0] : [0, -1.5, 0]}
            onClick={() => setClick(true)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Body */}
                <mesh ref={body} position={[0, 0, 0]}>
                    {/* A stretched sphere for the body */}
                    <sphereGeometry args={[1.6, 32, 32]} />
                    <meshStandardMaterial
                        color="#FFD700"
                        roughness={0.3}
                        metalness={0.1}
                    />
                </mesh>

                {/* Tail */}
                <mesh position={[1.2, 0.5, 0]} rotation={[0, 0, -0.5]}>
                    <coneGeometry args={[0.5, 1, 32]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.1} />
                </mesh>

                {/* Head Group */}
                <group ref={head} position={[-1, 1, 0]}>
                    {/* Head Sphere */}
                    <mesh>
                        <sphereGeometry args={[0.9, 32, 32]} />
                        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.1} />
                    </mesh>

                    {/* Beak */}
                    <mesh position={[-0.8, -0.1, 0]} rotation={[0, 0, 1.57]}>
                        <coneGeometry args={[0.3, 0.8, 32]} />
                        <meshStandardMaterial color="#FF8C00" roughness={0.4} />
                    </mesh>

                    {/* Eyes */}
                    <mesh position={[-0.6, 0.3, 0.35]}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                        <meshStandardMaterial color="black" />
                    </mesh>
                    <mesh position={[-0.6, 0.3, -0.35]}>
                        <sphereGeometry args={[0.12, 16, 16]} />
                        <meshStandardMaterial color="black" />
                    </mesh>

                    {/* Sunglasses (Simple Bars for now to look cool) */}
                    {hovered && (
                        <group position={[-0.65, 0.3, 0]}>
                            <mesh position={[0, 0, 0.35]}>
                                <boxGeometry args={[0.05, 0.2, 0.3]} />
                                <meshStandardMaterial color="black" opacity={0.8} transparent />
                            </mesh>
                            <mesh position={[0, 0, -0.35]}>
                                <boxGeometry args={[0.05, 0.2, 0.3]} />
                                <meshStandardMaterial color="black" opacity={0.8} transparent />
                            </mesh>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[0.02, 0.05, 0.8]} />
                                <meshStandardMaterial color="black" />
                            </mesh>
                        </group>
                    )}
                </group>

                {/* Wings */}
                <mesh position={[0, 0.2, 1.3]} rotation={[0.5, 0, 0]} scale={[1, 0.5, 0.2]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.2, -1.3]} rotation={[-0.5, 0, 0]} scale={[1, 0.5, 0.2]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#FFD700" roughness={0.3} />
                </mesh>
            </Float>

            {hovered && (
                <Html position={[0, 2.5, 0]} center>
                    <div className="bg-white px-3 py-1 rounded-full text-black text-sm font-bold shadow-lg whitespace-nowrap">
                        Quack! 🦆
                    </div>
                </Html>
            )}
        </group>
    );
};

const RubberDuckCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mouse = useRef([0, 0]);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalized coordinates
            mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2];
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className='w-full h-full absolute inset-0 z-10 pointer-events-none'>
            {/* z-10 to be above background, pointer-events-none on container so it doesn't block text selection, but enable on canvas */}
            <Canvas
                className="pointer-events-auto"
                shadows
                camera={{ position: [20, 3, 5], fov: 25 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <ambientLight intensity={0.5} />
                    <spotLight
                        position={[-20, 50, 10]}
                        angle={0.12}
                        penumbra={1}
                        intensity={1}
                        castShadow
                        shadow-mapSize={1024}
                    />
                    <pointLight intensity={1} />

                    {/* OrbitControls allows user to rotate around the duck if they want, but restricted */}
                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />

                    <Duck isMobile={isMobile} mouse={mouse} />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

import { OrbitControls, Preload } from "@react-three/drei";

export default RubberDuckCanvas;
