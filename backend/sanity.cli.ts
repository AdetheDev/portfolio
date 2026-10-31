import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Asset URLs must match the /studio mount point (basePath in sanity.config.ts).
  vite: (config) => ({ ...config, base: '/studio/' }),
})
