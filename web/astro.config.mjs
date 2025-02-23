// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from 'remark-wiki-link';


// https://astro.build/config
export default defineConfig({
  site: 'https://dmarx.github.io',
  base: '/aspect',
  integrations: [react(), tailwind()],
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, {
        // Match Obsidian's default format: [[page]] or [[page|alias]]
        pageResolver: name => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: permalink => `/aspect/notes/${permalink}`,
        aliasDivider: '|'
      }]
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
