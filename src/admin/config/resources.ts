/**
 * One declarative description per content type. The list page, the form and
 * the payload sent to the API are all derived from these definitions, so a new
 * content type means an entry here plus a Prisma model - not a new screen.
 */

import type { IconName } from '@/admin/components/Icon'

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'url'
  | 'email'
  | 'select'
  | 'boolean'
  | 'list'
  | 'image'
  | 'number'

export interface FieldDef {
  name: string
  label: string
  kind: FieldKind
  help?: string
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  /** Shown as a column in the list view. */
  column?: boolean
  /** Full width in the two-column form grid. */
  wide?: boolean
}

export interface CollectionDef {
  /** URL segment, matching the API route under /admin. */
  name: string
  title: string
  /** Singular noun used in buttons and confirmations. */
  singular: string
  description: string
  icon: IconName
  fields: FieldDef[]
  /** Rows carry a position and can be moved up and down. */
  ordered?: boolean
  /** Which field to show as the row's headline in the list. */
  titleField: string
}

export interface SingletonDef {
  name: string
  title: string
  description: string
  icon: IconName
  /** PUT replaces the whole record; these forms always send every field. */
  fields: FieldDef[]
}

const publishedField: FieldDef = {
  name: 'published',
  label: 'Published',
  kind: 'boolean',
  help: 'Unpublished entries stay in the CMS but disappear from the site.',
  column: true,
}

export const singletons: SingletonDef[] = [
  {
    name: 'profile',
    title: 'Profile',
    description: 'Your name, contact details, bio and the two halves of the hero.',
    icon: 'user',
    fields: [
      { name: 'name', label: 'Full name', kind: 'text', required: true },
      { name: 'role', label: 'Job title', kind: 'text', required: true },
      { name: 'location', label: 'Location', kind: 'text', required: true },
      { name: 'email', label: 'Email', kind: 'email', required: true },
      { name: 'resumeUrl', label: 'Resume link', kind: 'url', required: true, wide: true },
      { name: 'avatarUrl', label: 'Portrait', kind: 'image', required: true, wide: true },
      {
        name: 'intro',
        label: 'Hero intro',
        kind: 'textarea',
        required: true,
        wide: true,
        help: 'The single sentence under your name on the home page.',
      },
      {
        name: 'rotatingRoles',
        label: 'Rotating roles',
        kind: 'list',
        required: true,
        wide: true,
        help: 'Cycled one at a time through the "Working today as a ..." sentence.',
      },
      {
        name: 'bio',
        label: 'Biography paragraphs',
        kind: 'list',
        required: true,
        wide: true,
        help: 'Rendered in order on the About page. The first also appears on the home page.',
      },
      { name: 'leftLabel', label: 'Hero left - label', kind: 'text', required: true },
      { name: 'leftCaption', label: 'Hero left - caption', kind: 'text', required: true },
      { name: 'leftStack', label: 'Hero left - stack', kind: 'list', wide: true },
      { name: 'rightLabel', label: 'Hero right - label', kind: 'text', required: true },
      { name: 'rightCaption', label: 'Hero right - caption', kind: 'text', required: true },
      { name: 'rightStack', label: 'Hero right - stack', kind: 'list', wide: true },
    ],
  },
  {
    name: 'settings',
    title: 'Site settings',
    description: 'Document title, social share card and the global maintenance switch.',
    icon: 'settings',
    fields: [
      { name: 'siteTitle', label: 'Site title', kind: 'text', required: true, wide: true },
      {
        name: 'siteDescription',
        label: 'Meta description',
        kind: 'textarea',
        required: true,
        wide: true,
        help: 'Used by search engines and link previews. Aim for 150–160 characters.',
      },
      { name: 'ogImageUrl', label: 'Social share image', kind: 'image', wide: true },
      {
        name: 'themeDefault',
        label: 'Default theme',
        kind: 'select',
        options: [
          { value: 'system', label: 'Follow the device' },
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
      },
      { name: 'footerNote', label: 'Footer note', kind: 'text', wide: true },
      {
        name: 'maintenanceMode',
        label: 'Maintenance mode',
        kind: 'boolean',
        help: 'Shows a maintenance banner on the site without a redeploy.',
      },
    ],
  },
]

export const collections: CollectionDef[] = [
  {
    name: 'projects',
    title: 'Projects',
    singular: 'project',
    description: 'The work shown on the home page and the Work page.',
    icon: 'briefcase',
    ordered: true,
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', kind: 'text', required: true, column: true },
      {
        name: 'slug',
        label: 'Slug',
        kind: 'text',
        required: true,
        column: true,
        help: 'Lowercase words separated by hyphens. Used in the project URL.',
      },
      { name: 'summary', label: 'Summary', kind: 'textarea', required: true, wide: true },
      { name: 'mediaUrl', label: 'Preview image', kind: 'image', required: true, wide: true },
      { name: 'stack', label: 'Tech stack', kind: 'list', required: true, wide: true },
      {
        name: 'type',
        label: 'Type',
        kind: 'select',
        required: true,
        column: true,
        options: [
          { value: 'FREELANCE', label: 'Freelance' },
          { value: 'MINI_PROJECT', label: 'Mini Project' },
          { value: 'PORTFOLIO', label: 'Portfolio' },
        ],
      },
      { name: 'github', label: 'GitHub URL', kind: 'url' },
      { name: 'demo', label: 'Live demo URL', kind: 'url' },
      {
        name: 'featured',
        label: 'Featured',
        kind: 'boolean',
        column: true,
        help: 'Featured projects appear in the home page grid.',
      },
      publishedField,
    ],
  },
  {
    name: 'skills',
    title: 'Skills',
    singular: 'skill',
    description: 'The stack and tools grid, plus the logos in the home page marquee.',
    icon: 'wrench',
    ordered: true,
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Name', kind: 'text', required: true, column: true },
      {
        name: 'role',
        label: 'Qualifier',
        kind: 'text',
        required: true,
        column: true,
        help: 'Shown under the name, e.g. "Frontend" or "Database".',
      },
      {
        name: 'group',
        label: 'Group',
        kind: 'select',
        required: true,
        column: true,
        options: [
          { value: 'STACK', label: 'Tech stack' },
          { value: 'TOOLS', label: 'Tools' },
        ],
      },
      { name: 'iconUrl', label: 'Logo', kind: 'image', required: true, wide: true },
      publishedField,
    ],
  },
  {
    name: 'experiences',
    title: 'Experience',
    singular: 'role',
    description: 'The work history timeline on the About page.',
    icon: 'building',
    ordered: true,
    titleField: 'company',
    fields: [
      { name: 'company', label: 'Company', kind: 'text', required: true, column: true },
      { name: 'role', label: 'Role', kind: 'text', required: true, column: true },
      { name: 'period', label: 'Period', kind: 'text', required: true, column: true },
      { name: 'location', label: 'Location', kind: 'text', required: true },
      { name: 'highlights', label: 'Highlights', kind: 'list', wide: true },
      publishedField,
    ],
  },
  {
    name: 'stats',
    title: 'Stats',
    singular: 'stat',
    description: 'The numbers strip under the home page hero.',
    icon: 'chart',
    ordered: true,
    titleField: 'label',
    fields: [
      { name: 'value', label: 'Value', kind: 'text', required: true, column: true },
      { name: 'label', label: 'Label', kind: 'text', required: true, column: true },
      publishedField,
    ],
  },
  {
    name: 'blocks',
    title: 'Page copy',
    singular: 'block',
    description: 'Section headings, calls to action, button labels and the 404 page.',
    icon: 'pen',
    ordered: true,
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Name', kind: 'text', required: true, column: true },
      {
        name: 'key',
        label: 'Key',
        kind: 'text',
        required: true,
        column: true,
        help: 'How the site looks this block up. Changing it hides the block until the site is updated.',
      },
      {
        name: 'page',
        label: 'Page',
        kind: 'select',
        required: true,
        column: true,
        options: [
          { value: 'home', label: 'Home' },
          { value: 'about', label: 'About' },
          { value: 'work', label: 'Work' },
          { value: 'news', label: 'News' },
          { value: 'global', label: 'Global' },
        ],
      },
      { name: 'eyebrow', label: 'Eyebrow', kind: 'text' },
      { name: 'title', label: 'Heading', kind: 'text', wide: true },
      { name: 'description', label: 'Description', kind: 'textarea', wide: true },
      { name: 'body', label: 'Extra paragraphs', kind: 'list', wide: true },
      { name: 'primaryLabel', label: 'Primary button - label', kind: 'text' },
      { name: 'primaryHref', label: 'Primary button - link', kind: 'text' },
      { name: 'secondaryLabel', label: 'Secondary button - label', kind: 'text' },
      { name: 'secondaryHref', label: 'Secondary button - link', kind: 'text' },
      publishedField,
    ],
  },
  {
    name: 'topics',
    title: 'News topics',
    singular: 'topic',
    description: 'The filter chips on the News page and the query each one runs.',
    icon: 'newspaper',
    ordered: true,
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Label', kind: 'text', required: true, column: true },
      {
        name: 'query',
        label: 'Search query',
        kind: 'text',
        required: true,
        column: true,
        help: 'Passed to NewsAPI. Supports operators, e.g. "ai OR machine learning".',
      },
      publishedField,
    ],
  },
  {
    name: 'socials',
    title: 'Social links',
    singular: 'link',
    description: 'The links in the footer.',
    icon: 'link',
    ordered: true,
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Label', kind: 'text', required: true, column: true },
      {
        name: 'href',
        label: 'URL',
        kind: 'text',
        required: true,
        column: true,
        wide: true,
        help: 'A full URL, or a mailto: address.',
      },
      publishedField,
    ],
  },
  {
    name: 'nav',
    title: 'Navigation',
    singular: 'link',
    description: 'The links in the navbar and the mobile tab bar.',
    icon: 'compass',
    ordered: true,
    titleField: 'label',
    fields: [
      { name: 'label', label: 'Label', kind: 'text', required: true, column: true },
      {
        name: 'to',
        label: 'Path',
        kind: 'text',
        required: true,
        column: true,
        help: 'Must begin with /, e.g. /work.',
      },
      publishedField,
    ],
  },
]

export function findCollection(name: string) {
  return collections.find((collection) => collection.name === name)
}

export function findSingleton(name: string) {
  return singletons.find((singleton) => singleton.name === name)
}

/** Blank form state, so a "new" form starts from typed defaults not undefined. */
export function emptyValues(fields: FieldDef[]): Record<string, unknown> {
  return Object.fromEntries(
    fields.map((field) => {
      if (field.kind === 'list') return [field.name, []]
      if (field.kind === 'boolean') return [field.name, field.name === 'published']
      if (field.kind === 'number') return [field.name, 0]
      if (field.kind === 'select') return [field.name, field.options?.[0]?.value ?? '']
      return [field.name, '']
    }),
  )
}
