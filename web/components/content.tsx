import {
  renderRichText,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

export default function Content({ blok }) {
  return (
    <div className="group">
      <div
        {...storyblokEditable(blok)}
        className="flex flex-col md:flex-row md:group-even:flex-row-reverse gap-6"
      >
        {blok.component !== "text" && (
          <div className="flex-1">
            <StoryblokComponent blok={blok} />
          </div>
        )}
        {(blok.titel || blok.beschreibung) && (
          <div className="flex-1 ">
            {blok.titel && (
              <p className="text-4xl pb-6 font-oswald">{blok.titel}</p>
            )}
            {blok.beschreibung && (
              <p
                className="text-justify font-cardo"
                dangerouslySetInnerHTML={{
                  __html: renderRichText(blok.beschreibung),
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-200 to-transparent mt-6" />
    </div>
  );
}
