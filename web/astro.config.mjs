// web/astro.config.mjs
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkWikiLink from 'remark-wiki-link';

export default defineConfig({
  integrations: [
    react(), 
    tailwind()
  ],
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, { 
        wikiLinkClassName: 'wiki-link',
        hrefTemplate: (permalink) => `/notes/${permalink}`
      }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  site: 'https://yourusername.github.io',
  base: '/yourrepo'
});
