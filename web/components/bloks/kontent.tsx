import { storyblokEditable } from "@storyblok/react";

export default function Kontent({ blok }) {
  console.log(blok);
  return <p {...storyblokEditable(blok)}>{blok.kontent.filename}</p>;
}
