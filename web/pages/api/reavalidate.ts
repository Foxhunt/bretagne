import { getStoryblokApi, ISbStoryParams } from "@storyblok/react";
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

  if (bodyHmac !== req.headers["storyblok-signature"]) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const sbParams: ISbStoryParams = {
      version: "published",
    };
    const storyblokApi = getStoryblokApi();
    const story = await storyblokApi.getStory(req.body.story_id, sbParams);

    await res.revalidate(story.data.story.full_slug);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
