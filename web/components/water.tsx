import { HeightfieldProps, Triplet, useHeightfield } from "@react-three/cannon";
import { useDetectGPU, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  RepeatWrapping,
  Texture,
} from "three";

function HeightmapGeometry({
  elementSize,
  heights,
}: {
  elementSize: number;
  heights: number[][];
}): JSX.Element {
  const ref = useRef<BufferGeometry>(null);

  useEffect(() => {
    if (!ref.current) return;
    const dx = elementSize;
    const dy = elementSize;

    /* Create the vertex data from the heights. */
    const vertices = heights.flatMap((row, i) =>
      row.flatMap((z, j) => [i * dx, j * dy, z])
    );

    /* Create the faces. */
    const indices = [];
    for (let i = 0; i < heights.length - 1; i++) {
      for (let j = 0; j < heights[i].length - 1; j++) {
        const stride = heights[i].length;
        const index = i * stride + j;
        indices.push(index + 1, index + stride, index + stride + 1);
        indices.push(index + stride, index + 1, index);
      }
    }

    const uvs = heights.flatMap((row, i, col) =>
      row.flatMap((z, j) => [i / col.length, j / row.length])
    );

    ref.current.setIndex(indices);
    ref.current.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3)
    );
    ref.current.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    ref.current.computeVertexNormals();
    ref.current.computeBoundingBox();
    ref.current.computeBoundingSphere();
  }, [heights]);

  return <bufferGeometry ref={ref} />;
}

const elementSize = 10;

export default function Water(props: HeightfieldProps) {
  const three = useThree();
  const GPUTier = useDetectGPU();
  const texture = useTexture("/background_hg.png", (texture: Texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.rotation = Math.PI / 2;
    texture.repeat.set(1, 1);
  });

  const [heights, setHeights] = useState<number[][]>(
    Array(Math.floor(three.viewport.width / 2.2)).fill(Array(30).fill(0))
  );

  const [position, setPosition] = useState<Triplet>([
    (-heights.length * elementSize) / 2,
    0,
    15,
  ]);
  const [ref, api] = useHeightfield(
    () => ({
      args: [
        heights,
        {
          elementSize,
        },
      ],
      position,
      collisionFilterGroup: 2,
      collisionFilterMask: 1 | 2 | 8,
      ...props,
    }),
    useRef<Mesh>(),
    [heights, position]
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!GPUTier.isMobile) {
      for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[i].length; j++) {
          heights[i][j] = Math.sin(time * 0.4 + j * 0.8) * 1.5;
        }
      }
      setHeights(heights.concat());
    }

    setPosition([position[0], Math.cos(time * 0.1) * 1.5, position[2]]);
  });

  return (
    <mesh ref={ref} receiveShadow>
      <HeightmapGeometry heights={heights} elementSize={elementSize} />
      <meshStandardMaterial
        // map={texture}
        color={"#000000"}
        // transparent
        // opacity={0.9}
        // side={DoubleSide}
        // wireframe={true}
      />
    </mesh>
  );
}
