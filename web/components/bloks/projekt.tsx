import { storyblokEditable } from "@storyblok/react";
import Content from "../content";

export default function Projekt({ blok }) {
  return (
    <main {...storyblokEditable(blok)} className="">
      <div className="flex flex-col place-content-end h-[30vh] relative">
        <img src={blok.titelbild.filename} />
        <h1 className="absolute block w-full text-6xl backdrop-blur-lg text-white px-6 uppercase font-semibold">
          {blok.name}
        </h1>
      </div>
      <div className="flex flex-col gap-10 m-6">
        <p>{blok.beschreibung}</p>
        {blok.blocks.map((block) => (
          <Content blok={block} key={block._uid} />
        ))}
      </div>
    </main>
  );
}
