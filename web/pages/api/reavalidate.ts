import StoryblokClient, { ISbStoryParams } from "storyblok-js-client";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  let bodyHmac = crypto.createHmac("sha1", process.env.STORYBLOK_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (bodyHmac !== req.headers["webhook-signature"]) {
    console.error("Invalid token");
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const storyblok = new StoryblokClient({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    });

    const sbParams: ISbStoryParams = {
      version: "published",
    };
    const story = await storyblok.getStory(req.body.story_id, sbParams);

    await res.revalidate("/" + story.data.story.full_slug);
    await res.revalidate("/projekte");

    console.log(`Revalidated ${story.data.story.full_slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
}
