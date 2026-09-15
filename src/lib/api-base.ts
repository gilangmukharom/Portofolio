/**
 * Resolves the CMS API's base URL for both the public site and the admin panel.
 *
 * Vite inlines `import.meta.env` at build time, so this value is frozen into
 * the bundle. Changing it on the host does nothing until the site is rebuilt.
 */

const configured = import.meta.env.VITE_API_URL?.trim()

/**
 * Empty is treated as absent. A host that stores an unset variable as `""`
 * would otherwise produce a base of `""` and silently request the wrong paths.
 */
export const API_BASE = configured ? configured.replace(/\/$/, '') : '/api/v1'

/** True when requests go to this origin and rely on the dev server's proxy. */
export const isRelativeBase = !configured

// A relative base in a production build means the API URL never reached the
// build. Requests then hit the site's own origin, where the SPA rewrite answers
// with HTML and the failure looks like a parsing bug rather than a missing
// setting. The build guard in vite.config.ts should have caught this already;
// this is the second line of defence, and it names the real problem.
if (import.meta.env.PROD && isRelativeBase) {
  console.error(
    'VITE_API_URL was not set when this site was built, so API requests are ' +
      'going to this origin instead of the CMS. Set it in the hosting ' +
      'project and redeploy: setting it without rebuilding changes nothing.',
  )
}
