import { apiPlugin, storyblokInit } from "@storyblok/react";
import { AppProps } from "next/app";
import text from "../components/bloks/text";
import projekt from "../components/bloks/projekt";
import pointcloud from "../components/bloks/pointcloud";
import kontent from "../components/bloks/kontent";
import bild from "../components/bloks/bild";
import video from "../components/bloks/video";
import ton from "../components/bloks/ton";
import gltf from "../components/bloks/gltf";

import "../styles/index.css";

const NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

storyblokInit({
  accessToken: NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    projekt,
    text,
    pointcloud,
    kontent,
    bild,
    video,
    ton,
    gltf,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
