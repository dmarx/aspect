// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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
