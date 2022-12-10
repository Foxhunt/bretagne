import { Debug, Physics } from "@react-three/cannon";
import { OrbitControls, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Objects from "../components/objects";
import Sand from "../components/sand";
import Water from "../components/water";

export default function Index() {
  return (
    <>
      <Canvas
        camera={{
          fov: 70,
          position: [0, 40, 60],
          far: 4000,
          near: 0.1,
        }}
        shadows
      >
        <color attach="background" args={["#00BFFF"]} />
        <ambientLight />
        <pointLight
          position={[100, 100, 30]}
          castShadow
          shadow-mapSize-height={512 * 4}
          shadow-mapSize-width={512 * 4}
        />
        <OrbitControls
          makeDefault
          // enableRotate={false}
          // enablePan={false}
          // enableZoom={false}
          onChange={(e) => console.log(e.target.object.position)}
        />
        <Physics broadphase="SAP">
          {/* <Debug > */}
          <Sand
            rotation={[-Math.PI / 1.9, 0, 0]}
            material={{ friction: 1, restitution: 0 }}
          />
          <Water
            rotation={[-Math.PI / 2.1, 0, 0]}
            material={{ friction: 0, restitution: 0 }}
          />
          <Objects count={10} />
          {/* </Debug> */}
        </Physics>
      </Canvas>
    </>
  );
}
