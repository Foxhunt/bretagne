import {
  SphereProps,
  Triplet,
  useRaycastClosest,
  useSphere,
} from "@react-three/cannon";
import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";

export default function Object(props: SphereProps) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    linearDamping: 0.1,
    angularDamping: 1,
    args: [3],
    material: { friction: 1, restitution: 1 },
    ...props,
  }));

  const [position, setPosition] = useState<Triplet>([0, 0, 0]);

  useEffect(() => {
    return api.position.subscribe(setPosition);
  }, []);

  useRaycastClosest(
    {
      from: position,
      to: [position[0], position[1] + 100, position[2]],
      skipBackfaces: true,
    },
    (result) => {
      if (result.hasHit) {
        // api.sleep();
        // api.position.set(position[0], position[1] + 1, position[2]);
      }
    },
    [position]
  );

  return (
    <>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          api.velocity.set(0, 10, -10);
        }}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[3]} />
        {/* <dodecahedronGeometry args={[1.5]} /> */}
        <meshStandardMaterial color={"#aaaaff"} transparent opacity={1} />
      </mesh>
      <Line
        points={[position, [position[0], position[1] + 100, position[2]]]}
        color={"#ff0000"}
      />
    </>
  );
}
