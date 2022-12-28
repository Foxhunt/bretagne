import { storyblokEditable } from "@storyblok/react";

export default function Text({ blok }) {
  return <p {...storyblokEditable(blok)}>{blok.text}</p>;
}
