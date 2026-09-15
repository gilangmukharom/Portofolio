import { useState } from 'react'
import type { FieldDef } from '@/admin/config/resources'
import { Icon } from './Icon'
import { MediaPicker } from './MediaPicker'

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg outline-none transition focus:border-fg focus:ring-2 focus:ring-fg/10 disabled:bg-bg'

/** A repeatable text input, used for every String[] column in the schema. */
function ListInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const entry = draft.trim()
    if (!entry) return
    onChange([...value, entry])
    setDraft('')
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return
    const next = [...value]
    const [row] = next.splice(from, 1)
    next.splice(to, 0, row as string)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {value.map((entry, index) => (
        <div key={`${index}-${entry.slice(0, 12)}`} className="flex items-start gap-2">
          <textarea
            value={entry}
            rows={entry.length > 90 ? 3 : 1}
            onChange={(event) => {
              const next = [...value]
              next[index] = event.target.value
              onChange(next)
            }}
            className={`${inputClass} resize-y`}
          />
          <div className="flex shrink-0 gap-1 pt-1">
            <button
              type="button"
              onClick={() => move(index, index - 1)}
              disabled={index === 0}
              className="rounded border border-line p-1.5 text-muted transition hover:text-fg disabled:opacity-30"
              aria-label="Move up"
            >
              <Icon name="arrowUp" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => move(index, index + 1)}
              disabled={index === value.length - 1}
              className="rounded border border-line p-1.5 text-muted transition hover:text-fg disabled:opacity-30"
              aria-label="Move down"
            >
              <Icon name="arrowDown" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              className="rounded border border-line p-1.5 text-red-500 transition hover:bg-red-500/10"
              aria-label="Remove"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <input
          value={draft}
          placeholder={placeholder ?? 'Add an entry'}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            // Enter adds a row; without this it would submit the whole form.
            if (event.key === 'Enter') {
              event.preventDefault()
              add()
            }
          }}
          className={inputClass}
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-fg bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-fg/90"
        >
          <Icon name="plus" className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </div>
  )
}

export function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef
  value: unknown
  error?: string
  onChange: (next: unknown) => void
}) {
  const id = `field-${field.name}`

  const control = () => {
    switch (field.kind) {
      case 'textarea':
        return (
          <textarea
            id={id}
            rows={4}
            value={(value as string) ?? ''}
            onChange={(event) => onChange(event.target.value)}
            className={`${inputClass} resize-y`}
            placeholder={field.placeholder}
          />
        )
      case 'list':
        return (
          <ListInput
            value={(value as string[]) ?? []}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        )
      case 'boolean':
        return (
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-fg">
            <input
              id={id}
              type="checkbox"
              checked={Boolean(value)}
              onChange={(event) => onChange(event.target.checked)}
              className="h-4 w-4 rounded border-line text-fg focus:ring-fg/20"
            />
            <span>{field.label}</span>
          </label>
        )
      case 'select':
        return (
          <select
            id={id}
            value={(value as string) ?? ''}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'image':
        return <MediaPicker value={(value as string) ?? ''} onChange={onChange} />
      case 'number':
        return (
          <input
            id={id}
            type="number"
            value={(value as number) ?? 0}
            onChange={(event) => onChange(Number(event.target.value))}
            className={inputClass}
          />
        )
      default:
        return (
          <input
            id={id}
            type={field.kind === 'email' ? 'email' : field.kind === 'url' ? 'url' : 'text'}
            value={(value as string) ?? ''}
            onChange={(event) => onChange(event.target.value)}
            className={inputClass}
            placeholder={field.placeholder}
          />
        )
    }
  }

  return (
    <div className={field.wide ? 'md:col-span-2' : ''}>
      {/* The checkbox renders its own label, so a second one would be redundant. */}
      {field.kind !== 'boolean' && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
          {field.label}
          {field.required && <span className="ml-1 text-accent">*</span>}
        </label>
      )}
      {control()}
      {field.help && !error && <p className="mt-1.5 text-xs text-muted">{field.help}</p>}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}
