import { NavLink } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import type { Category } from '@/types'

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', duration: 0.4, bounce: 0 },
  },
}

/** Category sidebar (desktop) — matches the mockup's left rail with counts. */
export function CategoryList({
  categories,
  loading,
}: {
  categories?: Category[]
  loading?: boolean
}) {
  if (loading || !categories) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-11 animate-pulse rounded-xl bg-surface-2" />
        ))}
      </div>
    )
  }

  return (
    <motion.nav
      aria-label="Категории"
      className="rounded-3xl bg-card p-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
    >
      <h2 className="px-3 pb-2 pt-1 font-display text-lg font-bold">Категории</h2>
      <motion.ul
        className="space-y-1"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((cat) => {
          const to = cat.id === 'all' ? '/catalog' : `/catalog/${cat.id}`
          return (
            <motion.li key={cat.id} variants={itemVariants}>
              <NavLink
                to={to}
                end={cat.id === 'all'}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-l-3 border-brand-500 bg-brand-50 font-semibold text-brand-700'
                      : 'text-ink hover:bg-surface-2/80'
                  }`
                }
              >
                <span>{cat.name}</span>
                <span className="text-sm text-ink-muted tnum">{cat.count}</span>
              </NavLink>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.nav>
  )
}
