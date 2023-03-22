import {
  SphereProps,
  Triplet,
  useRaycastClosest,
  useSphere,
} from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Mesh, RepeatWrapping, Texture } from "three";

export default function Object({
  onClick,
  titelbild,
  ...props
}: SphereProps & { onClick: (e: any) => void; titelbild: string }) {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 10,
    linearDamping: 0.1,
    angularDamping: 0.1,
    args: [1.8],
    material: { friction: 1, restitution: Math.random() },
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    ...props,
  }));

  const [position, setPosition] = useState<Triplet>([0, 0, 0]);
  const [isUnderwater, setIsUnderwater] = useState(true);

  useEffect(() => {
    if (isUnderwater) {
      return api.position.subscribe((position) => {
        setPosition([position[0], position[1] - 1.5, position[2]]);
      });
    }
  }, [api.position, isUnderwater]);

  useRaycastClosest(
    {
      from: position,
      to: [position[0], position[1] + 50, position[2]],
      collisionFilterGroup: 8,
      collisionFilterMask: 2,
    },
    (result) => {
      if (isUnderwater) {
        api.velocity.set(0, 4, 0);
        api.collisionFilterMask.set(1);
        setIsUnderwater(true);
      }
    },
    [position, isUnderwater]
  );

  useRaycastClosest(
    {
      from: position,
      to: [position[0], position[1] - 5, position[2]],
      collisionFilterGroup: 8,
      collisionFilterMask: 2,
    },
    (result) => {
      if (isUnderwater) {
        // console.log("bottom", result.hasHit);
        api.collisionFilterMask.set(1 | 2 | 4);
        setIsUnderwater(false);
      }
    },
    [position, isUnderwater]
  );

  const [hovered, setHovered] = useState(false);

  const texture = useTexture(titelbild, (texture: Texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  return (
    <>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHovered(false);
        }}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[hovered ? 3.5 : 3]} />
        <meshStandardMaterial
          map={texture}
          color={!hovered ? "#c0c0d8" : "#4dd2ff"}
        />
      </mesh>
      {/* {isUnderwater && (
        <Line
          points={[position, [position[0], position[1] + 50, position[2]]]}
          color={"#ff0000"}
        />
      )}
      {isUnderwater && (
        <Line
          points={[position, [position[0], position[1] - 5, position[2]]]}
          color={"#00ff00"}
        />
      )} */}
    </>
  );
}
