import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function Content({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className="flex justify-center">
      <StoryblokComponent blok={blok} />
    </div>
  );
}
