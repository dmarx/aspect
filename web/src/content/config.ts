import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
    created: z.string().datetime().optional(),
    updated: z.string().datetime().optional(),
  }),
});

export const collections = {
  'notes': notes,
};
