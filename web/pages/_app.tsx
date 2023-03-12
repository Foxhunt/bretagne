import { apiPlugin, storyblokInit } from "@storyblok/react";
import { AppProps } from "next/app";
import pointcloud from "../components/bloks/pointcloud";
import bild from "../components/bloks/bild";
import video from "../components/bloks/video";
import ton from "../components/bloks/ton";
import gltf from "../components/bloks/gltf";
import gallery from "../components/bloks/gallery";

import "@fontsource/cardo";
import "@fontsource/oswald";

import "../styles/index.css";

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

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
