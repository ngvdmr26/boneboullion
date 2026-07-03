import { NavLink } from 'react-router-dom'
import { Heart, Home, LayoutGrid, ShoppingBag, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

const items = [
  { to: '/', label: 'Главная', icon: Home, end: true },
  { to: '/catalog', label: 'Каталог', icon: LayoutGrid, end: false },
  { to: '/favorites', label: 'Избранное', icon: Heart, end: false },
  { to: '/profile', label: 'Профиль', icon: User, end: false },
  { to: '/cart', label: 'Корзина', icon: ShoppingBag, end: false },
] as const

export function MobileBottomNav() {
  const { itemCount } = useCart()
  const { count: favCount } = useFavorites()

  const countFor = (to: string) =>
    to === '/cart' ? itemCount : to === '/favorites' ? favCount : 0

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/50 bg-white/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.04)]"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-3">
        {items.map(({ to, label, icon: Icon, end }) => {
          const count = countFor(to)
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `relative flex flex-col items-center gap-1 py-3 text-[10px] font-bold tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? 'text-brand-500' : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative flex items-center justify-center">
                      <Icon className="size-5.5 transition-transform duration-300" strokeWidth={isActive ? 2.4 : 2} />
                      {count > 0 && (
                        <span className="absolute -right-2.5 -top-1.5 flex min-w-4.5 h-4.5 items-center justify-center rounded-full bg-brand-500 px-1 text-[9px] font-black text-white tnum shadow-[0_2px_8px_rgba(242,169,0,0.4)]">
                          {count}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5">{label}</span>
                    
                    {/* Active Underline Dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1.5 size-1 rounded-full bg-brand-500"
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
