import {
  getStoryblokApi,
  ISbStoriesParams,
  storyblokEditable,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Content from "../../components/content";

import Image from "next/image";

export default function Post({ story }) {
  story = useStoryblokState(story);

  return (
    <main {...storyblokEditable(story.content)}>
      <div className="flex flex-col place-content-end h-[40vh] relative">
        <Image
          className="object-cover"
          src={story.content.titelbild?.filename}
          alt={story.content.name}
          fill
        />
        <h1 className="absolute backdrop-blur-sm bg-white/10 block w-full text-8xl text-white px-6 pb-3 pt-3 font-oswald">
          {story.content.name}
        </h1>
      </div>
      <div className="flex flex-col gap-8 m-6">
        <p className="font-cardo">{story.content.beschreibung}</p>
        {story.content.blocks?.map((block) => (
          <Content blok={block} key={block._uid} />
        ))}
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
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
  const slug = params.postID;

  // load the draft version
  const sbParams: ISbStoriesParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(
    `cdn/stories/projekte/${slug}`,
    sbParams
  );

  return {
    props: data,
    revalidate: 1, // revalidate every hour
  };
};
