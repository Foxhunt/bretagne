import { usePlane, PlaneProps } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

export default function Sand(props: PlaneProps) {
  const [ref, api] = usePlane(() => ({ ...props, args: [5, 400] }));

  useFrame((state, delta, frame) => {
    const time = state.clock.getElapsedTime();
    api.position.set(0, 1 * Math.sin(time * 0.2 * Math.PI), 0);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[500, 400]} />
      <meshLambertMaterial color={"#0000aa"} />
    </mesh>
  );
}
