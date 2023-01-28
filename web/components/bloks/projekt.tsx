import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function Projekt({ blok }) {
  return (
    <main {...storyblokEditable(blok)} className="m-5">
      <div className="flex flex-col place-content-end h-[40vh] ">
        <h1 className="text-4xl">{blok.name}</h1>
      </div>
      <p className="my-4">{blok.beschreibung}</p>
      <div className="flex flex-wrap items-center gap-4">
        {blok.blocks.map((block) => (
          <StoryblokComponent blok={block} key={block._uid} />
        ))}
      </div>
    </main>
  );
}
