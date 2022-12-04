import { useSphere, SphereProps } from "@react-three/cannon";

export default function Object(props: SphereProps) {
  const [ref, api] = useSphere(() => ({
    mass: 100,
    linearDamping: 0.1,
    angularDamping: 1,
    args: [1],
    material: { friction: 1, restitution: 1 },
    ...props,
  }));
  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        api.velocity.set(0, 10, 0);
      }}
    >
      <sphereGeometry args={[1.5]} />
      {/* <dodecahedronGeometry args={[1.5]} /> */}
      <meshStandardMaterial color={"#aaaaff"} transparent opacity={1} />
    </mesh>
  );
}
