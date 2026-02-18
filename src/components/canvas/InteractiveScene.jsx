import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Float, OrbitControls } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from 'three';
import CanvasLoader from "../Loader";

const Stars = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color='#f272c8'
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const InteractiveShape = () => {
    const meshRef = useRef();

    // Create geometry once to avoid re-creation on every render
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.5} geometry={geometry}>
                <meshStandardMaterial
                    color="#915eff"
                    polygonOffset
                    polygonOffsetFactor={-5}
                    flatShading
                />
                <lineSegments>
                    <edgesGeometry args={[geometry]} />
                    <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
                </lineSegments>
            </mesh>
        </Float>
    );
};

const InteractiveScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={<CanvasLoader />}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <InteractiveShape />
                <Stars />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default InteractiveScene;
