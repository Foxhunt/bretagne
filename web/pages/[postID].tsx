import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({ story }) {
  story = useStoryblokState(story);

  return <StoryblokComponent blok={story.content} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    starts_with: "projekte/",
    version: "draft",
  });

  const paths = data.stories.map((story) => "/" + story.slug);

  return {
    paths,
    fallback: false,
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
    revalidate: 3600, // revalidate every hour
  };
};
