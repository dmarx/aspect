#!/bin/bash

cd web

# Initialize shadcn-ui
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge

cd web
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-dialog lucide-react class-variance-authority clsx tailwind-merge @tailwindcss/typography

cd ..
