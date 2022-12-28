import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function Projekt({ blok }) {
  return (
    <main {...storyblokEditable(blok)}>
      <h1>{blok.name}</h1>
      <p>{blok.beschreibung}</p>
      {blok.blocks.map((block) => (
        <StoryblokComponent blok={block} key={block._uid} />
      ))}
    </main>
  );
}
