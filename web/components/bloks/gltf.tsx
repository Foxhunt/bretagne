import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Test({ gltf }) {
  const { scene } = useLoader(GLTFLoader, gltf) as any;
  return <primitive object={scene} />;
}

export default function GLTF({ blok }) {
  return (
    <Canvas>
      <OrbitControls autoRotate={true} autoRotateSpeed={0.01} />
      <ambientLight />
      <Suspense fallback={null}>
        {blok.gltf && <Test gltf={blok.gltf.filename} />}
      </Suspense>
    </Canvas>
  );
}
