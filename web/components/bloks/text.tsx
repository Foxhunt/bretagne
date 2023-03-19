import { renderRichText, RichTextSchema } from "@storyblok/react";
import cloneDeep from "clone-deep";

const mySchema = cloneDeep(RichTextSchema);

mySchema.nodes.heading = (node) => {
  let className: string;
  switch (node.attrs.level) {
    case 1:
      className = "text-6xl";
      break;
    case 2:
      className = "text-5xl";
      break;
    case 3:
      className = "text-4xl";
      break;
    case 4:
      className = "text-3xl";
      break;
    case 5:
      className = "text-2xl";
      break;
    case 6:
      className = "text-1xl";
      break;
    default:
      className = "text-xl";
  }
  return {
    tag: [
      {
        tag: `h${node.attrs.level}`,
        attrs: { class: className },
      },
    ],
  };
};

export default function Text({ blok }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: renderRichText(blok.beschreibung, {
          schema: mySchema,
        }),
      }}
    />
  );
}
