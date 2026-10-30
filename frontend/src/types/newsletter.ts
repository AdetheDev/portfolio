/** Shared content contract between the CMS layer (backend) and the UI (frontend). */

/** Resolved Sanity image. */
export interface NewsletterImage {
  url: string
  alt: string
  width: number
  height: number
}

export interface NewsletterCategory {
  title: string
  slug: string
}

export interface NewsletterAuthor {
  name: string
  image?: NewsletterImage
}

/** Portable Text, as returned by Sanity. Render with `@portabletext/react`. */
export interface PortableTextSpan {
  _type: 'span'
  _key: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _type: 'link'
  _key: string
  href: string
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: 'normal' | 'h2' | 'h3' | 'blockquote'
  listItem?: 'bullet' | 'number'
  level?: number
  children: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
}

/** Inline body image, already resolved to the shared image shape. */
export interface PortableTextImage {
  _type: 'image'
  _key: string
  image: NewsletterImage
}

export type NewsletterBody = Array<PortableTextBlock | PortableTextImage>

export interface NewsletterSummary {
  slug: string
  title: string
  excerpt: string
  /** ISO 8601 datetime. Returned posts always have publishedAt <= now. */
  publishedAt: string
  coverImage?: NewsletterImage
  category?: NewsletterCategory
}

export interface NewsletterPost extends NewsletterSummary {
  body: NewsletterBody
  author?: NewsletterAuthor
}

export interface NewsletterList {
  items: NewsletterSummary[]
  total: number
}
