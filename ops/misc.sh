#!/bin/bash

cd web

# Install Astro integrations
npm install @astrojs/tailwind @astrojs/react

# Install Radix UI components
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-dialog

# Install other UI dependencies
npm install lucide-react class-variance-authority clsx tailwind-merge @tailwindcss/typography

cd ..
