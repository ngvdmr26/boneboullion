import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingBag, User } from 'lucide-react'
import { Logo } from './Logo'
import { SearchBar } from '@/components/ui/SearchBar'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.25, bounce: 0.2 }}
          className="absolute -right-1.5 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-500 px-1 text-[9px] font-black text-white tnum shadow-[0_2px_8px_rgba(242,169,0,0.4)]"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

function ActionLink({
  to,
  label,
  icon,
  count = 0,
}: {
  to: string
  label: string
  icon: React.ReactNode
  count?: number
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ease-out hover:bg-brand-50/80 hover:text-brand-700 ${
          isActive ? 'text-brand-700' : 'text-ink'
        }`
      }
    >
      <span className="relative">
        {icon}
        <CountBadge count={count} />
      </span>
      <span className="hidden xl:inline">{label}</span>
    </NavLink>
  )
}


export function Header() {
  const { itemCount } = useCart()
  const { count: favCount } = useFavorites()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
      className="sticky top-0 z-40 border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-2xl"
    >
      {/* Desktop */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-8 px-6 py-3.5 lg:flex">
        <Logo className="shrink-0" />
        
        {/* Apple-style Category Nav Links */}
        <nav className="flex items-center gap-6 text-sm font-bold tracking-wide text-ink-muted/80">
          <NavLink to="/catalog" end className={({ isActive }) => `transition-colors duration-300 hover:text-brand-500 ${isActive ? 'text-brand-500 font-extrabold' : 'text-ink/70'}`}>
            Всё
          </NavLink>
          <NavLink to="/catalog/bone" className={({ isActive }) => `transition-colors duration-300 hover:text-brand-500 ${isActive ? 'text-brand-500 font-extrabold' : 'text-ink/70'}`}>
            Бульоны
          </NavLink>
          <NavLink to="/catalog/soup" className={({ isActive }) => `transition-colors duration-300 hover:text-brand-500 ${isActive ? 'text-brand-500 font-extrabold' : 'text-ink/70'}`}>
            Супы
          </NavLink>
          <NavLink to="/catalog/kids" className={({ isActive }) => `transition-colors duration-300 hover:text-brand-500 ${isActive ? 'text-brand-500 font-extrabold' : 'text-ink/70'}`}>
            Детям
          </NavLink>
          <NavLink to="/catalog/set" className={({ isActive }) => `transition-colors duration-300 hover:text-brand-500 ${isActive ? 'text-brand-500 font-extrabold' : 'text-ink/70'}`}>
            Наборы
          </NavLink>
        </nav>

        <SearchBar className="w-64" />
        
        <nav className="flex shrink-0 items-center gap-2">
          <ActionLink
            to="/favorites"
            label="Избранное"
            count={favCount}
            icon={<Heart className="size-5" strokeWidth={2} />}
          />
          <ActionLink
            to="/profile"
            label="Профиль"
            icon={<User className="size-5" strokeWidth={2} />}
          />
          <ActionLink
            to="/cart"
            label="Корзина"
            count={itemCount}
            icon={<ShoppingBag className="size-5" strokeWidth={2} />}
          />
        </nav>
      </div>

      {/* Mobile */}
      <div className="lg:hidden bg-white/80 backdrop-blur-2xl border-b border-line/45">
        <div className="flex items-center justify-between px-5 py-3">
          <Logo />
          
          <div className="flex items-center gap-3">
            <Link
              to="/favorites"
              aria-label="Избранное"
              className="relative flex size-10 items-center justify-center rounded-xl text-ink transition-all duration-300 ease-out hover:bg-brand-50/80 active:scale-90"
            >
              <Heart className="size-5.5" strokeWidth={2} />
              {favCount > 0 && <CountBadge count={favCount} />}
            </Link>
            
            <Link
              to="/cart"
              aria-label="Корзина"
              className="relative flex size-10 items-center justify-center rounded-xl text-ink transition-all duration-300 ease-out hover:bg-brand-50/80 active:scale-90"
            >
              <ShoppingBag className="size-5.5" strokeWidth={2} />
              {itemCount > 0 && <CountBadge count={itemCount} />}
            </Link>
          </div>
        </div>
        <div className="px-5 pb-3">
          <SearchBar />
        </div>
      </div>
    </motion.header>
  )
}
