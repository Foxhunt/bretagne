import { Physics } from "@react-three/cannon";
import { AdaptiveDpr, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { getStoryblokApi } from "@storyblok/react";
import { GetStaticProps } from "next";
import { Suspense } from "react";
import Objects from "../components/objects";
import Sand from "../components/sand";
import Water from "../components/water";

export default function Index({ projekte }) {
  return (
    <Canvas
      camera={{
        fov: 70,
        position: [0, 40, 60],
        far: 4000,
        near: 0.1,
      }}
      frameloop="demand"
      shadows
      performance={{
        min: 0.1,
        max: 1,
        current: 0.5,
        debounce: 100,
      }}
    >
      <AdaptiveDpr pixelated />
      <Stats showPanel={0} className="stats" />
      <pointLight
        position={[100, 50, -100]}
        intensity={3}
        castShadow
        shadow-mapSize-height={512 * 4}
        shadow-mapSize-width={512 * 4}
      />
      <color attach="background" args={["#eeeeee"]} />
      <ambientLight />
      <OrbitControls
        makeDefault
        // enableRotate={false}
        // enablePan={false}
        // enableZoom={false}
        // onChange={(e) => console.log(e.target.object.position)}
      />
      <Physics>
        {/* <Debug> */}
        <Sand
          rotation={[-Math.PI / 1.9, 0, 0]}
          material={{ friction: 1, restitution: 1 }}
        />
        <Suspense>
          {/* @ts-ignore */}
          <Water
            rotation={[-Math.PI / 2.1, 0, 0]}
            material={{ friction: 0.1, restitution: 0 }}
          />
        </Suspense>
        <Objects projekte={projekte} />
        {/* </Debug> */}
      </Physics>
    </Canvas>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    version: "draft",
  });

  const projekte = data.stories.map((story) => "/" + story.slug);

  return {
    props: { projekte },
    revalidate: 3600, // revalidate every hour
  };
};
