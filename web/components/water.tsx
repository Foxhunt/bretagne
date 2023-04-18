import { Triplet } from "@pmndrs/cannon-worker-api/src/types";
import { HeightfieldProps } from "@pmndrs/cannon-worker-api/src/body";
import { useHeightfield } from "@react-three/cannon";
import { useDetectGPU } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BufferGeometry, Float32BufferAttribute, Mesh } from "three";

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
  }, [elementSize, heights]);

  return <bufferGeometry ref={ref} />;
}

const elementSize = 10;

type Props = {
  seaLevel: number;
};

export default function Water(props: HeightfieldProps & Props) {
  const three = useThree();
  const GPUTier = useDetectGPU();

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
    let time = state.clock.elapsedTime;

    if (!GPUTier.isMobile) {
      for (let i = 0; i < heights.length; i++) {
        for (let j = 0; j < heights[i].length; j++) {
          heights[i][j] = Math.sin(time * 0.4 + j * 0.8) * props.seaLevel;
        }
      }
      setHeights(heights.concat());
      setPosition([
        position[0],
        Math.cos(time * 0.1) * props.seaLevel,
        position[2],
      ]);
    }
  });

  return (
    <mesh ref={ref} receiveShadow>
      <HeightmapGeometry heights={heights} elementSize={elementSize} />
      <meshStandardMaterial color={"#000000"} />
    </mesh>
  );
}
