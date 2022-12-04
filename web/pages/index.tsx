import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Object from "../components/object";
import Sand from "../components/sand";
import Water from "../components/water";

export default function Index() {
  return (
    <>
      <Canvas
        camera={{
          fov: 75,
          position: [0, 13, 20],
          far: 4000,
          near: 0.1,
        }}
      >
        <color attach="background" args={["#00BFFF"]} />
        <ambientLight />
        <OrbitControls
          makeDefault
          // enableRotate={false}
          // enablePan={false}
          // enableZoom={false}
          // onChange={(e) => console.log(e.target.object.position)}
        />
        <Physics broadphase="SAP">
          <Sand
            position={[0, 0, 0]}
            rotation={[-Math.PI / 1.9, 0, 0]}
            material={{ friction: 1, restitution: 0 }}
          />
          <Water
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2.1, 0, 0]}
            material={{ friction: 0, restitution: 0 }}
          />
          {Array(10)
            .fill("")
            .map((_, i) => (
              <Object
                key={i}
                position={[50 * Math.random() - 25, 10, -50 * Math.random()]}
              />
            ))}
        </Physics>
      </Canvas>
    </>
  );
}
