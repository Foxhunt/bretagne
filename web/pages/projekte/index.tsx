import { getStoryblokApi, ISbStoryData } from "@storyblok/react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ISbComponentType } from "storyblok-js-client";

export default function Projekte({
  projekte,
}: {
  projekte: ISbStoryData<
    ISbComponentType<string> & {
      [index: string]: any;
    }
  >[];
}) {
  return (
    <main className="flex flex-wrap justify-evenly gap-5 py-5 px-6 sm:px-20 md:px-30 lg:px-52">
      {projekte.map((projekt) => (
        <Link key={projekt.id} href={projekt.full_slug}>
          <Image
            className="rounded-full aspect-square object-cover"
            src={projekt.content.titelbild?.filename}
            alt={projekt.name}
            width={300}
            height={300}
          />
        </Link>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    excluding_slugs: "projekte/",
    version: "draft",
  });

  return {
    props: {
      projekte: shuffle(data.stories),
    },
    revalidate: 3600, // revalidate every hour
  };
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
