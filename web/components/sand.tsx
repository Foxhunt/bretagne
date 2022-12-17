import { PlaneProps, useBox } from "@react-three/cannon";
import { useTrailTexture } from "@react-three/drei";
import { DoubleSide, Mesh } from "three";

export default function Sand(props: PlaneProps) {
  const [ref] = useBox<Mesh>(() => ({
    ...props,
    args: [500, 500, 1],
    collisionFilterGroup: 4,
    collisionFilterMask: 1,
  }));

  const [texture, onMove] = useTrailTexture({
    size: 512,
    radius: 0.05,
    maxAge: 10 * 1000,
    interpolate: 1,
    smoothing: 0,
  });

  return (
    <>
      <mesh
        rotation={props.rotation}
        position={[0, 0.1, 0]}
        onPointerMove={onMove}
      >
        <boxGeometry args={[500, 500, 1]} />
        <meshStandardMaterial
          color={"#000000"}
          transparent
          alphaMap={texture}
        />
      </mesh>
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[500, 500, 1]} />
        <meshStandardMaterial color={"#ffffff"} side={DoubleSide} />
      </mesh>
    </>
  );
}
