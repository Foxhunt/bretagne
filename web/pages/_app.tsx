import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import bild from "../components/bloks/bild";
import gallery from "../components/bloks/gallery";
import gltf from "../components/bloks/gltf";
import pointcloud from "../components/bloks/pointcloud";
import ton from "../components/bloks/ton";
import video from "../components/bloks/video";

import Beach from "../components/beach";
import "../styles/index.css";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";

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

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ibm-plex-mono",
});

function MyApp({
  Component,
  pageProps,
  projekte,
}: AppProps & {
  projekte: { path: string; titelBild: string }[];
}) {
  return (
    <main className={`${ibm_plex_mono.variable} font-mono`}>
      <nav className="flex items-center justify-center">
        <ul className="flex flex-col md:flex-row align-center text-xl text-center py-9">
          <li className="px-14 py-1">Exkursion</li>
          <Link href="/">
            <li className="px-14 py-1 font-bold">Extra Muros 2022 Bretange</li>
          </Link>
          <li className="px-14 py-1">Projekte</li>
        </ul>
      </nav>
      <div className="relative">
        <Beach projekte={projekte} />
        <Component {...pageProps} />
      </div>
      <div className="w-full h-64 flex flex-col items-center justify-center bg-[#D3D3D3] text-xs text-center">
        <p>© 2023 Raum für Gestaltung – Fachbereich Medien,</p>
        <p>Hochschule Düsseldorf, University of Applied Science, Düsseldorf.</p>
        <p>Münsterstraße 156, 40476, Düsseldorf.</p>
        <p>Datenschutz, Impressum.</p>
      </div>
    </main>
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
