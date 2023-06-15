import { apiPlugin, getStoryblokApi, storyblokInit } from "@storyblok/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import bild from "../components/bloks/bild";
import gltf from "../components/bloks/gltf";
import pointcloud from "../components/bloks/pointcloud";
import text from "../components/bloks/text";
import ton from "../components/bloks/ton";
import video from "../components/bloks/video";

import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Beach from "../components/beach";
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
    text,
  },
});

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ibm-plex-mono",
});

type Props = {
  projekte: { path: string; titelbild: string }[];
};

export default function MyApp({
  Component,
  pageProps,
  projekte,
}: AppProps & Props) {
  const router = useRouter();
  const inIndex = router.asPath === "/" || router.asPath === "/index";

  useEffect(() => {
    let homeTimeout;

    const backToHome = (event) => {
      clearTimeout(homeTimeout);
      console.log(event);
      homeTimeout = setTimeout(() => {
        if (router.asPath !== "/") {
          router.push("/");
          console.log("back to home");
        }
      }, 5 * 60 * 1000);
    };

    router.events.on("routeChangeComplete", backToHome);
    window.addEventListener("mousemove", backToHome);

    return () => {
      clearTimeout(homeTimeout);
      window.removeEventListener("mousemove", backToHome);
      router.events.off("routeChangeComplete", backToHome);
    };
  }, [router]);

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
            <li className={`px-14 py-1 ${inIndex ? "font-bold" : ""}`}>
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
        <Beach projekte={projekte} seaLevel={pageProps.seaLevel} />
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
): Promise<AppInitialProps<any> & Props> => {
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
