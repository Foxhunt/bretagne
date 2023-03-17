import { renderRichText } from "@storyblok/react";

export default function Text({ blok }) {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: renderRichText(blok.beschreibung) }}
    />
  );
}
