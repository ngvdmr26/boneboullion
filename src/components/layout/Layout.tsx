import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomNav } from './MobileBottomNav'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { IntroSplashScreen } from '@/components/ui/IntroSplashScreen'
import { useUI } from '@/context/UIContext'

/** App shell: header, animated routed content, footer, mobile tab bar. */
export function Layout() {
  const { pathname } = useLocation()
  const { toasts } = useUI()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Header />
      {/* extra bottom padding on mobile so content clears the fixed tab bar */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      {!['/favorites', '/cart'].includes(pathname) && <Footer />}
      <MobileBottomNav />
      <InstallPrompt />
      <IntroSplashScreen />

      {/* Global Premium Toasts */}
      <div className="fixed bottom-22 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2.5 w-full max-w-[280px] px-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.92, filter: 'blur(4px)' }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              className="w-full rounded-2xl bg-ink/95 text-white/95 px-4.5 py-3 text-xs font-bold text-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/10 pointer-events-auto"
            >
              {toast.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
