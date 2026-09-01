// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
      host: true,
    },
  },
  redirects: {
    '/limousine-service': '/limo-service-orange-county/',
    '/executive-suv-service': '/black-car-service/',
    '/hummer-limo-rental': '/hummer-limo-service/',
    '/sprinter-van-limo': '/sprinter-limo/',
  },
});
