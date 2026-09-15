/**
 * Thin fetch wrapper for the CMS API.
 *
 * The access token is deliberately kept in memory only: the refresh token
 * lives in an httpOnly cookie, so a reload re-authenticates through
 * `/auth/refresh` rather than reading a token out of localStorage.
 */

const BASE = import.meta.env.VITE_API_URL ?? '/api/v1'

let accessToken: string | null = null
let onUnauthorised: (() => void) | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export function setUnauthorisedHandler(handler: () => void) {
  onUnauthorised = handler
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: { field: string; message: string }[]

  constructor(
    status: number,
    code: string,
    message: string,
    details?: { field: string; message: string }[],
  ) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }

  /** Field-keyed messages, ready to drop next to the matching input. */
  get fieldErrors(): Record<string, string> {
    return Object.fromEntries((this.details ?? []).map((d) => [d.field, d.message]))
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  /** Set for the refresh call itself, to stop an infinite retry loop. */
  skipRefresh?: boolean
}

async function parse(response: Response) {
  if (response.status === 204) return null
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}

let refreshInFlight: Promise<boolean> | null = null

/** Concurrent 401s share one refresh call rather than racing each other. */
async function refreshSession(): Promise<boolean> {
  refreshInFlight ??= (async () => {
    try {
      const response = await fetch(`${BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) return false
      const payload = await response.json()
      accessToken = payload?.data?.accessToken ?? null
      return Boolean(accessToken)
    } catch {
      return false
    } finally {
      // Cleared on the next tick so callers awaiting this promise still see it.
      setTimeout(() => {
        refreshInFlight = null
      }, 0)
    }
  })()

  return refreshInFlight
}

export async function request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, skipRefresh, headers, ...rest } = options

  const isFormData = body instanceof FormData
  const response = await fetch(`${BASE}${path}`, {
    ...rest,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 401 && !skipRefresh) {
    const refreshed = await refreshSession()
    if (refreshed) return request<T>(path, { ...options, skipRefresh: true })
    accessToken = null
    onUnauthorised?.()
  }

  const payload = await parse(response)

  if (!response.ok) {
    const error = payload?.error ?? {}
    throw new ApiError(
      response.status,
      error.code ?? 'REQUEST_FAILED',
      error.message ?? `Request failed with ${response.status}`,
      error.details,
    )
  }

  return (payload?.data ?? payload) as T
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  upload: <T>(path: string, form: FormData) => request<T>(path, { method: 'POST', body: form }),
  refresh: refreshSession,
}
