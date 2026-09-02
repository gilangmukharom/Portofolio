import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Footer } from '@/components/layout/Footer'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { Navbar } from '@/components/layout/Navbar'
import Home from '@/pages/Home'

// Home ships in the main bundle; the rest load on navigation.
const About = lazy(() => import('@/pages/About'))
const Work = lazy(() => import('@/pages/Work'))
const News = lazy(() => import('@/pages/News'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function RouteFallback() {
  return <div className="min-h-[70vh]" aria-hidden="true" />
}

export default function App() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>

      <Navbar />

      <div id="content">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            {/* The Vue site used /portfolio — keep old links alive. */}
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
