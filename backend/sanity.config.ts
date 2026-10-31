import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is not set (see backend/README.md)')
}

export default defineConfig({
  name: 'rean',
  title: 'REAN Campaign',
  // Served at /studio on the shared Vercel domain (see ../vercel.json).
  basePath: '/studio',
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
