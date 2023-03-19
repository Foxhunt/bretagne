import {
  getStoryblokApi,
  ISbStoriesParams,
  ISbStoryParams,
  storyblokEditable,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Content from "../../components/content";
import Header from "../../components/header";

export default function Post({ story }) {
  story = useStoryblokState(story);

  return (
    <div
      {...storyblokEditable(story.content)}
      className="w-full min-h-screen bg-[#F5F5F5]"
    >
      <Header story={story} />
      <main className="flex flex-col gap-5 pt-5 px-6 sm:px-20 md:px-30 lg:px-52">
        <section>
          <h1 className="font-bold break-all text-4xl ">
            {story.content.projektname}
          </h1>
          <p className="text-3xl break-all">{story.content.name}</p>
        </section>
        <p className="md:columns-2 gap-5 text-justify">
          {story.content.beschreibung}
        </p>
        <div className="grid items-center justify-items-center md:grid-cols-2 md:grid-flow-dense gap-5">
          {story.content.blocks?.map((block) => (
            <Content blok={block} key={block._uid} />
          ))}
        </div>
      </main>
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
    revalidate: 3600, // revalidate every hour
  };
};
