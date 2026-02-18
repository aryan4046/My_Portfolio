import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    // Only rotate the shield for effect
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={0} floatIntensity={2}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 0.05]} />

      {/* CORE OBJECT */}
      <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>

      {/* WIREFRAME SHIELD */}
      <mesh ref={wireframeRef} scale={3.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#915EFF" // Purple brand color
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
};

const ControlsWithAutoReset = (props) => {
  const controlsRef = useRef();

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    let timer;

    const handleChange = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        controls.reset();
      }, 5000); // 5 Seconds
    };

    controls.addEventListener('change', handleChange);

    return () => {
      controls.removeEventListener('change', handleChange);
      clearTimeout(timer);
    };
  }, []);

  return <OrbitControls ref={controlsRef} {...props} />;
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full"
      camera={{ position: [0, 0, 5] }} // Default Front View
    >
      <Suspense fallback={<CanvasLoader />}>
        <ControlsWithAutoReset
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
