import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    created: z.date(),
    updated: z.date(),
  }),
});

export const collections = {
  'notes': notes,
};
