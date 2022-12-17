import {
  SphereProps,
  Triplet,
  useRaycastClosest,
  useSphere,
} from "@react-three/cannon";
import { Line, useTexture } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Mesh, RepeatWrapping, Texture } from "three";

export default function Object({
  onClick,
  ...props
}: SphereProps & { onClick: (e: any) => void }) {
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
        // console.log("position", position);
        setPosition([position[0], position[1] - 1.5, position[2]]);
      });
    }
  }, [isUnderwater]);

  useRaycastClosest(
    {
      from: position,
      to: [position[0], position[1] + 50, position[2]],
      collisionFilterGroup: 8,
      collisionFilterMask: 2,
    },
    (result) => {
      if (isUnderwater) {
        // console.log("top", result.hasHit);
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

  const texture = useTexture("/IMG_0334.jpg", (texture: Texture) => {
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
          console.log("onPointerOver");
          setHovered(true);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          console.log("onPointerOut");
          setHovered(false);
        }}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[hovered ? 3.5 : 3]} />
        {/* <dodecahedronGeometry args={[1.5]} /> */}
        <meshStandardMaterial
          map={texture}
          color={hovered ? "#aaffaa" : "#aaaaff"}
          opacity={1}
        />
      </mesh>
      {isUnderwater && (
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
      )}
    </>
  );
}
