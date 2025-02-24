#!/bin/bash

cd web

# Install shadcn-ui CLI 
npm install -D @shadcn-ui/cli

# Initialize shadcn-ui
npx @shadcn-ui/cli init

# Add required components
npx @shadcn-ui/cli add button
npx @shadcn-ui/cli add input
npx @shadcn-ui/cli add sheet
npx @shadcn-ui/cli add slider
npx @shadcn-ui/cli add switch
npx @shadcn-ui/cli add card
npx @shadcn-ui/cli add badge

cd ..
