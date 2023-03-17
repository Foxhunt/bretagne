import { Physics } from "@react-three/cannon";
import { AdaptiveDpr, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "next/router";
import { Suspense } from "react";
import Objects from "./objects";
import Sand from "./sand";
import Water from "./water";

const DisabaleRender = () => useFrame(() => null, 1000);

export default function Beack({ projekte }) {
  const router = useRouter();
  const stopRenderAndPhysics = router.asPath !== "/";

  return (
    <div className="h-screen">
      <Canvas
        camera={{
          fov: 70,
          position: [0, 40, 60],
          far: 4000,
          near: 0.1,
        }}
        frameloop="demand"
        shadows
        performance={{
          min: 0.1,
          max: 1,
          current: 0.5,
          debounce: 100,
        }}
      >
        {stopRenderAndPhysics && <DisabaleRender />}
        <AdaptiveDpr pixelated />
        {/* <Stats showPanel={0} className="stats" /> */}
        <pointLight
          position={[100, 50, -100]}
          intensity={3}
          castShadow
          shadow-mapSize-height={512 * 4}
          shadow-mapSize-width={512 * 4}
        />
        <color attach="background" args={["#eeeeee"]} />
        <ambientLight />
        <OrbitControls
          makeDefault
          enableRotate={false}
          enablePan={false}
          enableZoom={false}
          // onChange={(e) => console.log(e.target.object.position)}
        />
        <Physics>
          {/* <Debug> */}
          <Sand
            rotation={[-Math.PI / 1.9, 0, 0]}
            material={{ friction: 1, restitution: 1 }}
          />
          <Suspense>
            {/* @ts-ignore */}
            <Water
              rotation={[-Math.PI / 2.1, 0, 0]}
              material={{ friction: 0.1, restitution: 0 }}
            />
          </Suspense>
          <Objects projekte={projekte} />
          {/* </Debug> */}
        </Physics>
      </Canvas>
    </div>
  );
}
