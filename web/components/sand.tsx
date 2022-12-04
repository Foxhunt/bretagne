import { usePlane, PlaneProps } from "@react-three/cannon";
import { useTrailTexture } from "@react-three/drei";

export default function Sand(props: PlaneProps) {
  const [ref] = usePlane(() => ({ ...props }));

  const [texture, onMove] = useTrailTexture({
    size: 512,
    radius: 0.05,
    maxAge: 60 * 1000,
    interpolate: 1,
    smoothing: 0,
  });

  return (
    <>
      <mesh ref={ref} onPointerMove={onMove}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          attachArray="material"
          color={"#000000"}
          transparent
          alphaMap={texture}
        />
      </mesh>
      <mesh rotation={props.rotation} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial attachArray="material" color={"#fff200"} />
      </mesh>
    </>
  );
}
