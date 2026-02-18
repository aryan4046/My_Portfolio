import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, ContactShadows, Html } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../Loader";
import * as THREE from "three";

const Robot = ({ mouse }) => {
    const group = useRef();
    const body = useRef();
    const head = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const [hovered, setHover] = useState(false);
    const [clicked, setClick] = useState(false);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Body floating animation
        body.current.position.y = Math.sin(t) * 0.1;

        // Head follows mouse
        // Lerp rotation for smooth movement
        const targetRotX = (mouse.current[1] / window.innerHeight) * 0.5;
        const targetRotY = (mouse.current[0] / window.innerWidth) * 0.5;

        head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, targetRotX, 0.1);
        head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetRotY, 0.1);

        // Arm animation (waving if hovered)
        if (hovered) {
            rightArm.current.rotation.z = Math.sin(t * 10) * 0.5 + 0.5;
        } else {
            rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, 0, 0.1);
        }

        // Jump/Spin on click
        if (clicked) {
            group.current.rotation.y += 0.2;
            body.current.position.y += Math.sin(t * 10) * 0.2;
            if (group.current.rotation.y > Math.PI * 4) {
                setClick(false);
                group.current.rotation.y = 0;
            }
        }
    });

    return (
        <group
            ref={group}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => setClick(true)}
            scale={2.5}
        >
            {/* Body */}
            <mesh ref={body} position={[0, -0.5, 0]}>
                <boxGeometry args={[1, 1.2, 0.8]} />
                <meshStandardMaterial color={hovered ? "#ff6b6b" : "#4dabf7"} />
            </mesh>

            {/* Head */}
            <group ref={head} position={[0, 0.6, 0]}>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial color="#ced4da" />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.2, 0.1, 0.41]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[0.2, 0.1, 0.41]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                {/* Antenna */}
                <mesh position={[0, 0.6, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.5]} />
                    <meshStandardMaterial color="gray" />
                </mesh>
                <mesh position={[0, 0.9, 0]}>
                    <sphereGeometry args={[0.08]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Arms */}
            <mesh ref={leftArm} position={[-0.6, 0, 0]}>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
                <meshStandardMaterial color="#4dabf7" />
            </mesh>

            <group ref={rightArm} position={[0.6, 0, 0]} >
                <mesh position={[0, -0.3, 0]}> {/* Pivot correction */}
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#4dabf7" />
                </mesh>
            </group>

            {/* Message Bubble when hovered */}
            {hovered && (
                <Html position={[0, 1.5, 0]} center>
                    <div className="bg-white p-2 rounded-lg text-black text-xs font-bold pointer-events-none whitespace-nowrap">
                        Hi! Click me! 🤖
                    </div>
                </Html>
            )}

        </group>
    );
};

const FunnyRobotCanvas = () => {
    const mouse = useRef([0, 0]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2];
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className='w-full h-full absolute inset-0'>
            <Canvas>
                <Suspense fallback={<CanvasLoader />}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Robot mouse={mouse} />

                    <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default FunnyRobotCanvas;
