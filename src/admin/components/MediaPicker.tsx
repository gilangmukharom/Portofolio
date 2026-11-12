import { useEffect, useRef, useState } from 'react'
import { api, ApiError } from '@/admin/lib/api'
import { useToast } from '@/admin/lib/toast'
import { Icon } from './Icon'

export interface MediaItem {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  alt: string | null
  createdAt: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * An image field is either a link to somewhere else (most skill logos are
 * hosted on a CDN) or a file in the library, so the control offers both: type
 * a URL, or pick from - and upload into - the media library.
 */
export function MediaPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (next: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… or /uploads/…"
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg outline-none transition focus:border-fg focus:ring-2 focus:ring-fg/10"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-lg border border-line px-4 py-2 text-sm font-medium text-fg hover:bg-elevated"
        >
          Library
        </button>
      </div>

      {value && (
        <div className="flex items-center gap-3 rounded-lg border border-line bg-bg p-2">
          <img
            src={value}
            alt=""
            className="h-14 w-14 rounded object-cover"
            // A typo in the URL should look broken, not blow up the layout.
            onError={(event) => {
              event.currentTarget.style.visibility = 'hidden'
            }}
          />
          <span className="truncate text-xs text-muted">{value}</span>
        </div>
      )}

      {open && <MediaLibrary onPick={onChange} onClose={() => setOpen(false)} />}
    </div>
  )
}

export function MediaLibrary({
  onPick,
  onClose,
}: {
  onPick: (url: string) => void
  onClose: () => void
}) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const load = async () => {
    setLoading(true)
    try {
      setItems(await api.get<MediaItem[]>('/admin/media'))
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not load the media library')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // Loading once on mount is the intent; `load` is stable enough here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const upload = async (file: File) => {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const created = await api.upload<MediaItem>('/admin/media', form)
      setItems((current) => [created, ...current])
      onPick(created.url)
      toast.success(`Uploaded ${created.originalName}`)
      onClose()
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const remove = async (item: MediaItem) => {
    if (!confirm(`Delete ${item.originalName}? Anything still pointing at it will break.`)) return
    try {
      await api.delete(`/admin/media/${item.id}`)
      setItems((current) => current.filter((row) => row.id !== item.id))
      toast.success('File deleted')
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'Could not delete that file')
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-fg/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Media library"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[80vh] w-full max-w-3xl flex-col rounded-2xl bg-surface shadow-xl">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-base font-semibold text-fg">Media library</h2>
          <div className="flex items-center gap-2">
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp,image/avif,image/svg+xml,application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void upload(file)
                event.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-fg bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-fg/90 disabled:opacity-50"
            >
              <Icon name="upload" className="h-3.5 w-3.5" />
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line px-3 py-2 text-sm text-muted hover:text-fg"
            >
              Close
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {loading && <p className="text-sm text-muted">Loading…</p>}
          {!loading && items.length === 0 && (
            <p className="text-sm text-muted">
              Nothing here yet. Upload a file, or paste an external URL into the field instead.
            </p>
          )}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <li key={item.id} className="group relative">
                <button
                  type="button"
                  onClick={() => {
                    onPick(item.url)
                    onClose()
                  }}
                  className="w-full overflow-hidden rounded-xl border border-line text-left transition hover:border-fg"
                >
                  <span className="flex h-24 items-center justify-center bg-bg">
                    {item.mimeType.startsWith('image/') ? (
                      <img src={item.url} alt={item.alt ?? ''} className="h-24 w-full object-cover" />
                    ) : (
                      <Icon name="file" className="h-7 w-7 text-muted" />
                    )}
                  </span>
                  <span className="block truncate px-2 py-1.5 text-xs text-fg">
                    {item.originalName}
                  </span>
                  <span className="block px-2 pb-2 text-[11px] text-muted">
                    {formatSize(item.size)}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => void remove(item)}
                  className="absolute right-1.5 top-1.5 hidden rounded bg-surface/90 p-1 text-red-500 shadow transition group-hover:block"
                  aria-label={`Delete ${item.originalName}`}
                >
                  <Icon name="trash" className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
