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
        // Match Obsidian's default format: [[page]] or [[page|alias]]
        pageResolver: name => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: permalink => `/aspect/notes/${permalink}`,
        aliasDivider: '|'
      }]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  site: 'https://dmarx.github.io',
  base: '/aspect'
});
