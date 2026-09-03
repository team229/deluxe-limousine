import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string(),
    featuredImage: z.string().optional(),
    slug: z.string().optional(),
    category: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional()
  })
});

export const collections = {
  blog: blogCollection,
};
