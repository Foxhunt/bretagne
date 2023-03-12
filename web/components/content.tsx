import {
  renderRichText,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

export default function Content({ blok }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="flex even:flex-row-reverse gap-6"
    >
      <div className="flex-1">
        <StoryblokComponent blok={blok} />
      </div>
      {(blok.titel || blok.beschreibung) && (
        <div className="flex-1 ">
          <p className="text-3xl font-semibold pb-6">{blok.titel}</p>
          <p
            className="text-justify"
            dangerouslySetInnerHTML={{
              __html: renderRichText(blok.beschreibung),
            }}
          />
        </div>
      )}
    </div>
  );
}
