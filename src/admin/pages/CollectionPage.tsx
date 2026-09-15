import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, ApiError } from '@/admin/lib/api'
import { useToast } from '@/admin/lib/toast'
import { emptyValues, findCollection, type CollectionDef, type FieldDef } from '@/admin/config/resources'
import { Field } from '@/admin/components/Field'
import { Icon } from '@/admin/components/Icon'

type Row = Record<string, unknown> & { id: string }

/** Admin rows already arrive in the storage shape, so this only fills gaps. */
function toFormValues(row: Row, fields: FieldDef[]): Record<string, unknown> {
  const values = { ...emptyValues(fields) }

  for (const field of fields) {
    const value = row[field.name]
    if (value !== undefined && value !== null) values[field.name] = value
  }

  return values
}

/** Strips blanks so optional fields are omitted rather than sent as "". */
function toPayload(values: Record<string, unknown>, fields: FieldDef[]) {
  const payload: Record<string, unknown> = {}

  for (const field of fields) {
    const value = values[field.name]
    if (value === '' && !field.required) continue
    payload[field.name] = value
  }

  return payload
}

function RowForm({
  collection,
  initial,
  onCancel,
  onSaved,
}: {
  collection: CollectionDef
  initial: Row | null
  onCancel: () => void
  onSaved: () => void
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    initial ? toFormValues(initial, collection.fields) : emptyValues(collection.fields),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setErrors({})

    try {
      const payload = toPayload(values, collection.fields)
      if (initial) {
        await api.patch(`/admin/${collection.name}/${initial.id}`, payload)
        toast.success(`${collection.singular} updated`)
      } else {
        await api.post(`/admin/${collection.name}`, payload)
        toast.success(`${collection.singular} created`)
      }
      onSaved()
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(error.fieldErrors)
        toast.error(error.message)
      } else {
        toast.error('Could not save')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="mb-8 rounded-2xl border border-line bg-surface p-6 shadow-sm"
    >
      <h2 className="mb-5 text-base font-semibold text-fg">
        {initial ? `Edit ${collection.singular}` : `New ${collection.singular}`}
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {collection.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(next) => setValues((current) => ({ ...current, [field.name]: next }))}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg border border-fg bg-fg px-5 py-2 text-sm font-medium text-bg hover:bg-fg/90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-line px-5 py-2 text-sm font-medium text-muted hover:text-fg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default function CollectionPage() {
  const { name = '' } = useParams()
  const collection = findCollection(name)

  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Row | null>(null)
  const [creating, setCreating] = useState(false)
  const [search, setSearch] = useState('')
  const toast = useToast()

  const load = useCallback(async () => {
    if (!collection) return
    setLoading(true)
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : ''
      setRows(await api.get<Row[]>(`/admin/${collection.name}${query}`))
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not load this list')
    } finally {
      setLoading(false)
    }
    // `toast` is stable for the life of the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, search])

  useEffect(() => {
    setEditing(null)
    setCreating(false)
    void load()
  }, [load])

  const columns = useMemo(
    () => collection?.fields.filter((field) => field.column) ?? [],
    [collection],
  )

  if (!collection) {
    return <p className="text-sm text-muted">No such content type.</p>
  }

  const remove = async (row: Row) => {
    const label = String(row[collection.titleField] ?? 'this entry')
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return
    try {
      await api.delete(`/admin/${collection.name}/${row.id}`)
      setRows((current) => current.filter((item) => item.id !== row.id))
      toast.success(`${collection.singular} deleted`)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not delete')
    }
  }

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= rows.length) return

    const next = [...rows]
    const [row] = next.splice(index, 1)
    next.splice(target, 0, row as Row)
    // Optimistic: the list reorders immediately, then the server confirms.
    setRows(next)

    try {
      await api.post(`/admin/${collection.name}/reorder`, { ids: next.map((item) => item.id) })
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not save the new order')
      void load()
    }
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-fg">{collection.title}</h1>
          <p className="mt-1 text-sm text-muted">{collection.description}</p>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-fg"
          />
          <button
            type="button"
            onClick={() => {
              setCreating(true)
              setEditing(null)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-fg bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-fg/90"
          >
            <Icon name="plus" className="h-3.5 w-3.5" />
            New {collection.singular}
          </button>
        </div>
      </header>

      {creating && (
        <RowForm
          collection={collection}
          initial={null}
          onCancel={() => setCreating(false)}
          onSaved={() => {
            setCreating(false)
            void load()
          }}
        />
      )}

      {editing && (
        <RowForm
          key={editing.id}
          collection={collection}
          initial={editing}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null)
            void load()
          }}
        />
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">
          Nothing here yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-bg text-xs uppercase tracking-wide text-muted">
              <tr>
                {collection.ordered && <th className="w-20 px-4 py-3">Order</th>}
                {columns.map((column) => (
                  <th key={column.name} className="px-4 py-3 font-medium">
                    {column.label}
                  </th>
                ))}
                <th className="w-32 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id} className="border-b border-line/70 last:border-0">
                  {collection.ordered && (
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => void move(index, -1)}
                          disabled={index === 0}
                          className="rounded border border-line p-1 text-muted transition hover:text-fg disabled:opacity-30"
                          aria-label="Move up"
                        >
                          <Icon name="arrowUp" className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void move(index, 1)}
                          disabled={index === rows.length - 1}
                          className="rounded border border-line p-1 text-muted transition hover:text-fg disabled:opacity-30"
                          aria-label="Move down"
                        >
                          <Icon name="arrowDown" className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = row[column.name]
                    return (
                      <td key={column.name} className="max-w-xs truncate px-4 py-3 text-fg">
                        {typeof value === 'boolean' ? (
                          <span className={value ? 'text-emerald-500' : 'text-muted'}>
                            {value ? 'Yes' : 'No'}
                          </span>
                        ) : (
                          String(value ?? '—')
                        )}
                      </td>
                    )
                  })}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(row)
                          setCreating(false)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="rounded border border-line px-2.5 py-1 text-xs font-medium text-fg hover:bg-elevated"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(row)}
                        className="rounded border border-line px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
