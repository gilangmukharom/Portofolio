import { API_BASE } from './api-base'

/**
 * Read-only client for the CMS's public API.
 *
 * In development Vite proxies /api to the CMS, so the base URL stays relative.
 * In production VITE_API_URL must point at the deployed API.
 */
const BASE = API_BASE

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  })

  if (!response.ok) {
    // The API wraps failures in { error: { message } }; fall back to the status.
    const payload = await response.json().catch(() => null)
    throw new ApiError(
      response.status,
      payload?.error?.message ?? `Request failed with ${response.status}`,
    )
  }

  const payload = await response.json()
  return (payload?.data ?? payload) as T
}
