import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();

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
      frameloop="always"              // 🔥 MUST for mobile
      dpr={[1, 1.5]}                  // 🔥 reduce GPU load
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full"
      camera={{ position: [0, 0, 5] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* 🔥 IMPORTANT: limit controls */}
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
