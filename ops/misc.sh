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

cd ..
