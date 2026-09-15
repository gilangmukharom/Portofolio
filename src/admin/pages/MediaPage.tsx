import { useState } from 'react'
import { MediaLibrary } from '@/admin/components/MediaPicker'
import { useToast } from '@/admin/lib/toast'

/**
 * The library itself is the modal used by image fields; this page just opens
 * it permanently so files can be managed without editing a record first.
 */
export default function MediaPage() {
  const [open, setOpen] = useState(true)
  const toast = useToast()

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-bold text-fg">Media</h1>
        <p className="mt-1 text-sm text-muted">
          Images and documents uploaded through the CMS. Selecting one copies its URL.
        </p>
      </header>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border border-fg bg-fg px-5 py-2 text-sm font-medium text-bg hover:bg-fg/90"
        >
          Open library
        </button>
      )}

      {open && (
        <MediaLibrary
          onPick={(url) => {
            void navigator.clipboard?.writeText(url).catch(() => undefined)
            toast.success('URL copied to the clipboard')
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
