import { usePlane, PlaneProps } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";
import { Plane } from "@react-three/drei";

export default function Sand(props: PlaneProps) {
  const [ref, api] = usePlane(() => ({ ...props }));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    api.position.set(0, 1 * Math.sin(time * 0.2 * Math.PI), 0);
  });

  return (
    <Plane ref={ref} args={[1000, 500]} receiveShadow>
      <meshLambertMaterial color={"#0000aa"} side={DoubleSide} />
    </Plane>
  );
}
