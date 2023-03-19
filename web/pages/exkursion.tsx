import {
  getStoryblokApi,
  ISbStoriesParams,
  storyblokEditable,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticProps } from "next";
import Content from "../components/content";

export default function Exkursion({ story }) {
  story = useStoryblokState(story);

  return (
    <div
      {...storyblokEditable(story.content)}
      className="w-full min-h-screen bg-[#F5F5F5]"
    >
      <main className="flex flex-col gap-5 pt-5 px-6 sm:px-20 md:px-30 lg:px-52">
        <div className="grid items-center justify-items-center md:grid-cols-2 md:grid-flow-dense gap-5">
          {story.content.blocks?.map((block) => (
            <Content blok={block} key={block._uid} />
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // home is the default slug for the homepage in Storyblok

  // load the draft version
  const sbParams: ISbStoriesParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/exkursion`, sbParams);

  return {
    props: data,
    revalidate: 3600, // revalidate every hour
  };
};
