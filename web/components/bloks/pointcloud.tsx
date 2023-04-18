import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import * as THREE from "three";
import { BufferAttribute } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useIntersection } from "react-use";

const DisabaleRender = () => useFrame(() => null, 1000);
export const ContextControl = ({ isIntersecting }) => {
  const { gl } = useThree();

  useEffect(() => {
    if (isIntersecting && gl.getContext().isContextLost) {
      gl.forceContextRestore();
    }
  }, [gl, isIntersecting]);
  return null;
};

const vertexShader = `
uniform vec3 mousePos;
${THREE.ShaderLib.points.vertexShader}
`.replace(
  `#include <begin_vertex>`,
  `#include <begin_vertex>

  // vec3 seg = position - mousePos;
  // vec3 dir = normalize(seg);
  // float dist = length(seg);
  // float force = clamp(100. / dist, -50., 50.);
  // transformed.z *= clamp(mousePos.x, -3., 3.);`
);

const fragmentShader = `
varying vec3 vColor;
void main() {

  // gl_FragColor = vec4(vColor, step(length(gl_PointCoord.xy - vec2(0.5)), 0.5));

  gl_FragColor = vec4(vColor, 1.);
  //   smoothstep(
  //     .5,
  //     .0,
  //     length(gl_PointCoord.xy - vec2(.5))
  //   )
  // );
} `;

function Particles({ pointCount, colors, depth, width, height }: any) {
  const positions = useMemo(() => {
    const maxSpread = 100;

    return new Float32Array(
      [...new Array(pointCount)].flatMap((_, i) => [
        ((i % width) - width / 2) / 7,
        ((i / width - height / 2) / 7) * -1,
        // 0
        depth[i] ** 5 * maxSpread - maxSpread / 2,
      ])
    );
  }, [depth, height, pointCount, width]);

  const materialRef = useRef<THREE.ShaderMaterial>(undefined!);
  const geometryRef = useRef<THREE.BufferGeometry>(undefined!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const x = Math.sin(t * 0.6) * 30;
    const y = Math.cos(t * 0.6) * 30;

    materialRef.current.uniforms.mousePos.value.x = x;
    materialRef.current.uniforms.mousePos.value.y = y;
  });

  useEffect(() => {
    const color = geometryRef.current.attributes.color as BufferAttribute;
    color.needsUpdate = true;

    const position = geometryRef.current.attributes.position as BufferAttribute;
    position.needsUpdate = true;

    materialRef.current.needsUpdate = true;
    materialRef.current.uniformsNeedUpdate = true;
  }, [colors, depth, height, materialRef, pointCount, positions, width]);

  // https://threejs.org/docs/#api/en/objects/Points
  return (
    <points>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          usage={THREE.StaticDrawUsage}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          usage={THREE.StreamDrawUsage}
          attach="attributes-color"
          array={new Float32Array(colors)}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        key={Math.random()}
        ref={materialRef}
        vertexColors
        transparent
        uniforms={{
          size: { value: 4 },
          scale: { value: 1 },
          mousePos: { value: new THREE.Vector3(0, 0, -20) },
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </points>
  );
}

export default function Pointcloud({ blok }) {
  const [colors, setColors] = useState<Array<number>>([]);
  const [depth, setDepth] = useState<Array<number>>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imageIsPending, startImageTransition] = useTransition();
  const [depthIsPending, startDepthTransition] = useTransition();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "";
    img.src = blok.image.filename.replace(
      "https://a.storyblok.com",
      "https://s3.amazonaws.com/a.storyblok.com"
    );
    img.addEventListener("load", () => {
      setWidth(img.width);
      setHeight(img.height);

      const canvas = document.createElement("canvas");
      const context = canvas!.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0, img.width, img.height);
      startImageTransition(() => {
        setColors(
          Array.from(context.getImageData(0, 0, img.width, img.height).data)
            .filter((_, i) => i % 4 !== 3)
            .map((v) => v / 256)
        );
      });
    });

    const depth = new Image();
    depth.crossOrigin = "";
    depth.src = blok.depth.filename.replace(
      "https://a.storyblok.com",
      "https://s3.amazonaws.com/a.storyblok.com"
    );
    depth.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      const context = canvas!.getContext("2d")!;

      canvas.width = depth.width;
      canvas.height = depth.height;

      context.drawImage(depth, 0, 0, depth.width, depth.height);
      startDepthTransition(() => {
        setDepth(
          Array.from(context.getImageData(0, 0, depth.width, depth.height).data)
            .filter((_, i) => i % 4 === 2)
            .map((v) => v / 256)
        );
      });
    });
  }, [blok.depth.filename, blok.image.filename]);

  const ref = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(ref, {
    rootMargin: "300px",
    threshold: 0,
  });

  // console.log(intersection?.isIntersecting, intersection?.target);

  const controlRef = useRef<OrbitControlsImpl>(null);
  const [resetTimeout, setResetTimeout] = useState(0);
  useEffect(() => {
    if (!controlRef.current) return;

    const interval = setTimeout(() => {
      controlRef.current?.reset();
    }, 10000);
    return () => clearTimeout(interval);
  }, [resetTimeout]);

  return (
    <div
      ref={ref}
      className={`w-full aspect-square ${
        !intersection?.isIntersecting ? "invisible" : ""
      }`}
    >
      <Canvas
        frameloop="demand"
        resize={{
          debounce: { scroll: 0, resize: 0 },
          scroll: false,
          offsetSize: true,
        }}
        camera={{ position: [0, 0, 100], far: 1000 }}
        raycaster={{ params: { Points: { threshold: 0.2 } } }}
        onWheel={(self) => {
          console.log("wheel");
          setResetTimeout((v) => v + 1);
        }}
        onPointerUp={(self) => {
          console.log("pointerUp");
          setResetTimeout((v) => v + 1);
        }}
      >
        <ContextControl isIntersecting={intersection?.isIntersecting} />
        {!intersection?.isIntersecting && <DisabaleRender />}
        <OrbitControls
          ref={controlRef}
          autoRotate
          autoRotateSpeed={-0.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
          // enablePan={false}
          // enableZoom={false}
          // minAzimuthAngle={-Math.PI / 3}
          // maxAzimuthAngle={Math.PI / 3}
          // onUpdate={(self) => console.log(self)}
        />
        {colors.length > 0 &&
          depth.length > 0 &&
          !imageIsPending &&
          !depthIsPending && (
            <Particles
              key={Math.random()}
              width={width}
              height={height}
              pointCount={colors.length / 3}
              depth={depth}
              colors={colors}
            />
          )}
      </Canvas>
      {blok.titel && <p className="pt-5">{blok.titel}</p>}
    </div>
  );
}
