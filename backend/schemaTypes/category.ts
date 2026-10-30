import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
