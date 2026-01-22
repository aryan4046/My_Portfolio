import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();

  // 🔥 Store default rotation
  const defaultRotation = useRef([0, 0, 0]);
  const resetTimer = useRef(null);

  // 🔥 Watch rotation and reset after 3 seconds
  useFrame(() => {
    if (!meshRef.current) return;

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => {
      if (meshRef.current) {
        meshRef.current.rotation.set(
          defaultRotation.current[0],
          defaultRotation.current[1],
          defaultRotation.current[2]
        );
      }
    }, 3000); // ⏱ reset after 3 seconds
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[0, 0, 0.5]} />

      <mesh ref={meshRef} castShadow receiveShadow scale={2.7}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />

        {/* LOGO DECAL */}
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full"
      camera={{ position: [0, 0, 5] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* 🔥 Mobile safe controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
        />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
