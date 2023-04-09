import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import bild from "../components/bloks/bild";
import gallery from "../components/bloks/gallery";
import gltf from "../components/bloks/gltf";
import pointcloud from "../components/bloks/pointcloud";
import ton from "../components/bloks/ton";
import video from "../components/bloks/video";
import text from "../components/bloks/text";

import Beach from "../components/beach";
import "../styles/index.css";
import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { useRouter } from "next/router";

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
    text,
  },
});

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ibm-plex-mono",
});

export default function MyApp({
  Component,
  pageProps,
  projekte,
}: AppProps & {
  projekte: { path: string; titelbild: string }[];
}) {
  const router = useRouter();
  const inIndex = router.asPath === "/";

  return (
    <div className={`${ibm_plex_mono.variable} font-mono`}>
      <nav
        className={`flex items-center justify-center ${
          inIndex ? "bg-[#EEEEEE]" : "bg-[#F5F5F5]"
        }`}
      >
        <ul className="flex flex-col md:flex-row align-center text-xl text-center py-9">
          <Link href="/exkursion">
            <li
              className={`px-14 py-1 ${
                router.asPath === "/exkursion" ? "font-bold" : ""
              }`}
            >
              Exkursion
            </li>
          </Link>
          <Link href="/">
            <li
              className={`px-14 py-1 ${
                router.asPath === "/" ? "font-bold" : ""
              }`}
            >
              Extra Muros 2022 Bretagne
            </li>
          </Link>
          <Link href="/projekte">
            <li
              className={`px-14 py-1 ${
                router.asPath === "/projekte" ? "font-bold" : ""
              }`}
            >
              Projekte
            </li>
          </Link>
        </ul>
      </nav>
      <div className="relative">
        <Beach projekte={projekte} />
        <Component {...pageProps} projekte={projekte} />
      </div>
      <footer
        className={`w-full h-64 flex flex-col items-center justify-center ${
          inIndex ? "bg-[#d0d0d0]" : "bg-[#F5F5F5]"
        } text-xs text-center`}
      >
        <p>© 2023 Raum für Gestaltung – Fachbereich Medien,</p>
        <Link href="https://hs-duesseldorf.de/">
          <p>
            Hochschule Düsseldorf, University of Applied Science, Düsseldorf.
          </p>
        </Link>
        <p>Münsterstraße 156, 40476, Düsseldorf.</p>
        <p>
          <Link href={"/datenschutz"}>Datenschutz</Link>,{" "}
          <Link href={"/impressum"}>Impressum</Link>.
        </p>
      </footer>
    </div>
  );
}

MyApp.getInitialProps = async (
  appContext: AppContext
): Promise<
  AppInitialProps<any> & {
    projekte: { path: string; titelbild: string }[];
  }
> => {
  const appIinitialProps = await App.getInitialProps(appContext);

  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    excluding_slugs: "projekte/",
    version: "draft",
  });

  const projekte = data.stories.map((story) => ({
    name: story.name,
    path: story.full_slug,
    titelbild: story.content.titelbild?.filename
      ? `/_next/image?url=${encodeURIComponent(
          story.content.titelbild?.filename
        )}&w=640&q=75`
      : "https://picsum.photos/id/12/300",
  }));

  return {
    ...appIinitialProps,
    projekte,
  };
};
