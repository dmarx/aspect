#!/bin/bash

cd web

# Remove existing node_modules and package-lock.json to ensure clean install
rm -rf node_modules package-lock.json

# Install primary dependencies
npm install

# Install UI dependencies
npm install @radix-ui/react-slot @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-dialog lucide-react class-variance-authority clsx tailwind-merge @tailwindcss/typography --legacy-peer-deps

cd ..
