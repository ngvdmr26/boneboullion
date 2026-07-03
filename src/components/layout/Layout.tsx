import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      {!['/favorites', '/cart'].includes(pathname) && <Footer />}
      <MobileBottomNav />
      <InstallPrompt />
      <IntroSplashScreen />
    </div>
  )
}
