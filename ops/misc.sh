#!/bin/bash

cd web

# Install shadcn-ui CLI 
npm install -D @shadcn/ui

# Initialize shadcn-ui
npx shadcn-ui init

# Add required components
npx shadcn-ui add button
npx shadcn-ui add input
npx shadcn-ui add sheet
npx shadcn-ui add slider
npx shadcn-ui add switch
npx shadcn-ui add card
npx shadcn-ui add badge

cd ..
