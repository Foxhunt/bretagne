import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function Content({ blok }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className={`flex justify-center md:last:col-span-2 md:last:row-span-2 ${
        blok.zweispaltig ? "col-span-2" : ""
      }`}
    >
      <StoryblokComponent blok={blok} />
    </div>
  );
}
