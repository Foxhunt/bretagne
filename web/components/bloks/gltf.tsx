import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function GLTG({ gltf }) {
  const { scene } = useLoader(GLTFLoader, gltf) as any;
  return <primitive object={scene} />;
}

export default function GLTF({ blok }) {
  return (
    <div className="w-full aspect-square">
      <Canvas>
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={0.01}
          enablePan={false}
          enableZoom={false}
        />
        <ambientLight />
        <Suspense fallback={null}>
          {blok.gltf && <GLTG gltf={blok.gltf.filename} />}
        </Suspense>
      </Canvas>
      {blok.titel && <p className="pt-5">{blok.titel}</p>}
    </div>
  );
}
