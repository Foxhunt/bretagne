import {
  getStoryblokApi,
  ISbStoryParams,
  storyblokEditable,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { shuffle } from ".";
import Content from "../../components/content";
import Header from "../../components/header";

export default function Post({ story, projekte }) {
  story = useStoryblokState(story);

  return (
    <div
      {...storyblokEditable(story.content)}
      className="flex flex-col items-center w-full min-h-screen bg-[#F5F5F5]"
    >
      <Header story={story} projekte={projekte} />
      <main className="flex flex-col gap-5 pt-5 mx-5 sm:max-w-sm md:max-w-2xl lg:max-w-7xl">
        <section>
          <h1 className="font-bold break-all pb-2.5 pt-5 text-4xl ">
            {story.content.projektname}
          </h1>
          <p className="text-3xl pb-5 break-all">{story.content.name}</p>
        </section>
        <p className="md:columns-2 gap-10">{story.content.beschreibung}</p>
        <div className="grid items-center justify-items-center md:grid-cols-2 md:grid-flow-dense gap-10">
          {story.content.blocks?.map((block) => (
            <Content blok={block} key={block._uid} />
          ))}
        </div>
      </main>
      <div className="flex flex-wrap justify-evenly gap-5 py-5 px-6 sm:px-20 md:px-30 lg:px-52">
        {shuffle(projekte).map((projekt) => {
          return (
            <Link href={projekt.full_slug} key={projekt.id}>
              <Image
                className="rounded-full aspect-square object-cover hover:scale-105"
                src={projekt.titelbild}
                alt={projekt.name}
                width={200}
                height={200}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    excluding_slugs: "projekte/",
    version: "draft",
  });

  const paths = data.stories.map((story) => "/" + story.full_slug);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // home is the default slug for the homepage in Storyblok
  const slug = params.postID as string;

  // load the draft version
  const sbParams: ISbStoryParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.getStory(`/projekte/${slug}`, sbParams);

  return {
    props: data,
    revalidate: 1, // revalidate every second
  };
};
