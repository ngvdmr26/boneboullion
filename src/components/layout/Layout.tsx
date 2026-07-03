import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileBottomNav } from './MobileBottomNav'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { IntroSplashScreen } from '@/components/ui/IntroSplashScreen'

/** App shell: header, animated routed content, footer, mobile tab bar. */
export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <Header />
      {/* extra bottom padding on mobile so content clears the fixed tab bar */}
      <main className="flex-1 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname.startsWith('/catalog') ? '/catalog' : pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileBottomNav />
      <InstallPrompt />
      <IntroSplashScreen />
    </div>
  )
}
