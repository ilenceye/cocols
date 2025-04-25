import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const websites = defineCollection({
  loader: file("data/websites.json"),
  schema: z.object({
    id: z.string(),
    url: z.string(),
    title: z.string(),
  }),
});

export const collections = { websites };
