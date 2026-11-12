import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, ApiError } from '@/admin/lib/api'
import { useToast } from '@/admin/lib/toast'
import { emptyValues, findSingleton } from '@/admin/config/resources'
import { Field } from '@/admin/components/Field'

/**
 * Profile and site settings are single records, so this is a plain form with
 * no list around it. PATCH is used rather than PUT: a partial payload is
 * enough, and it keeps an unrelated column from being blanked by an older tab.
 */
export default function SingletonPage() {
  const { name = '' } = useParams()
  const singleton = findSingleton(name)

  const [values, setValues] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const load = useCallback(async () => {
    if (!singleton) return
    setLoading(true)
    try {
      const row = await api.get<Record<string, unknown>>(`/admin/${singleton.name}`)
      setValues({ ...emptyValues(singleton.fields), ...row })
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        // Nothing seeded yet - start from a blank form rather than an error.
        setValues(emptyValues(singleton.fields))
      } else {
        toast.error(error instanceof ApiError ? error.message : 'Could not load')
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleton])

  useEffect(() => {
    void load()
  }, [load])

  if (!singleton) return <p className="text-sm text-muted">No such section.</p>

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setErrors({})

    try {
      const payload = Object.fromEntries(
        singleton.fields
          .filter((field) => !(values[field.name] === '' && !field.required))
          .map((field) => [field.name, values[field.name]]),
      )
      await api.patch(`/admin/${singleton.name}`, payload)
      toast.success(`${singleton.title} saved`)
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
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-bold text-fg">{singleton.title}</h1>
        <p className="mt-1 text-sm text-muted">{singleton.description}</p>
      </header>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            {singleton.fields.map((field) => (
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
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg border border-line px-5 py-2 text-sm font-medium text-muted hover:text-fg"
            >
              Discard
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
