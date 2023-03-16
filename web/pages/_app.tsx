import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react";
import App, { AppProps, AppContext, AppInitialProps } from "next/app";
import pointcloud from "../components/bloks/pointcloud";
import bild from "../components/bloks/bild";
import video from "../components/bloks/video";
import ton from "../components/bloks/ton";
import gltf from "../components/bloks/gltf";
import gallery from "../components/bloks/gallery";

import "@fontsource/cardo";
import "@fontsource/oswald";

import "../styles/index.css";
import { Physics } from "@react-three/cannon";
import { AdaptiveDpr, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Objects from "../components/objects";
import Sand from "../components/sand";
import Water from "../components/water";

const NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

storyblokInit({
  accessToken: NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    pointcloud,
    bild,
    video,
    ton,
    gltf,
    gallery,
  },
});

function MyApp({
  Component,
  pageProps,
  projekte,
}: AppProps & {
  projekte: { path: string; titelBild: string }[];
}) {
  return (
    <>
      <div className="h-screen">
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
          {/* <Stats showPanel={0} className="stats" /> */}
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
            enableRotate={false}
            enablePan={false}
            enableZoom={false}
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
      </div>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<
  AppInitialProps<any> & {
    projekte: { path: string; titelBild: string }[];
  }
> => {
  const appIinitialProps = await App.getInitialProps(appContext);

  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    version: "draft",
  });

  const projekte = data.stories.map((story) => ({
    path: story.full_slug,
    titelBild:
      `/_next/image?url=${encodeURIComponent(
        story.content.titelbild?.filename
      )}&w=640&q=75` || "",
  }));

  return {
    projekte,
    ...appIinitialProps,
  };
};

export default MyApp;
