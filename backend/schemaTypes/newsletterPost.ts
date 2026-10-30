import { defineField, defineType } from 'sanity'

export const newsletterPost = defineType({
  name: 'newsletterPost',
  title: 'Newsletter post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      // Sanity's default isUnique check enforces uniqueness per document type.
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'Posts go live at this time. Future dates stay hidden.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          validation: (r) =>
            r.custom((alt, ctx) => {
              const hasAsset = Boolean((ctx.parent as { asset?: unknown } | undefined)?.asset)
              return hasAsset && !alt ? 'Alt text is required when a cover image is set' : true
            }),
        }),
      ],
    }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }] }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'coverImage', author: 'author.name' },
    prepare: ({ title, date, media, author }) => ({
      title,
      media,
      subtitle: [date ? new Date(date).toLocaleDateString('en-GB') : 'No date', author]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})
