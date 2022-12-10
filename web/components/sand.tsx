import { usePlane, PlaneProps, useBox } from "@react-three/cannon";
import { useTrailTexture } from "@react-three/drei";
import { DoubleSide } from "three";

export default function Sand(props: PlaneProps) {
  // const [ref] = usePlane(() => ({ ...props, args: [5, 5] }));
  const [ref] = useBox(() => ({ ...props, args: [500, 500, 1] }));

  const [texture, onMove] = useTrailTexture({
    size: 512,
    radius: 0.05,
    maxAge: 10 * 1000,
    interpolate: 1,
    smoothing: 0,
  });

  return (
    <>
      <mesh ref={ref} onPointerMove={onMove}>
        <boxGeometry args={[500, 500, 1]} />
        <meshStandardMaterial
          attachArray="material"
          color={"#000000"}
          transparent
          alphaMap={texture}
        />
      </mesh>
      <mesh rotation={props.rotation} position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[500, 500, 1]} />
        <meshStandardMaterial
          attachArray="material"
          color={"#fff200"}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
}
