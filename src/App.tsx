import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { useContent } from '@/content/ContentProvider'
import { Footer } from '@/components/layout/Footer'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { Navbar } from '@/components/layout/Navbar'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Work = lazy(() => import('@/pages/Work'))
const News = lazy(() => import('@/pages/News'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const AdminApp = lazy(() => import('@/admin/AdminApp'))

function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />
}

export default function App() {
  const { pathname } = useLocation()
  const { settings } = useContent()

  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>

      {/* Flipped from the CMS, so the notice needs no redeploy. */}
      {settings?.maintenanceMode && (
        <p
          role="status"
          className="bg-accent px-5 py-2 text-center text-sm font-medium text-accent-contrast"
        >
          This site is being updated - some content may be out of date.
        </p>
      )}

      <Navbar />

      <div id="content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            {/* The Vue site used /portfolio - keep old links alive. */}
            <Route path="/portfolio" element={<Navigate to="/work" replace />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <MobileTabBar />
      <Analytics />
    </>
  )
}
