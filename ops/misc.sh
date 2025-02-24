#!/bin/bash

cd web

# Initialize shadcn-ui with CLI add
npx --yes create-shadcn-astro@latest --yes

# Add required components
npx --yes shadcn-ui@latest add button --yes
npx --yes shadcn-ui@latest add input --yes
npx --yes shadcn-ui@latest add sheet --yes
npx --yes shadcn-ui@latest add slider --yes
npx --yes shadcn-ui@latest add switch --yes
npx --yes shadcn-ui@latest add card --yes
npx --yes shadcn-ui@latest add badge --yes

cd ..
