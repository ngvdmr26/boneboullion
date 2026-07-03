import { NavLink } from 'react-router-dom'
import { Home, LayoutGrid, User } from 'lucide-react'
import { motion } from 'framer-motion'

const items = [
  { to: '/', label: 'Главная', icon: Home, end: true },
  { to: '/catalog', label: 'Каталог', icon: LayoutGrid, end: false },
  { to: '/profile', label: 'Профиль', icon: User, end: false },
] as const

export function MobileBottomNav() {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/50 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.04)]"
    >
      <ul className="mx-auto flex max-w-sm items-stretch justify-around px-4">
        {items.map(({ to, label, icon: Icon, end }) => {
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative flex flex-col items-center gap-0.5 py-2.5 text-[9px] font-bold tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? 'text-brand-500' : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative flex items-center justify-center">
                      <Icon className="size-5 transition-transform duration-300" strokeWidth={isActive ? 2.4 : 2} />
                    </span>
                    <span className="mt-0.5">{label}</span>
                    
                    {/* Active Underline Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 size-0.75 rounded-full bg-brand-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
