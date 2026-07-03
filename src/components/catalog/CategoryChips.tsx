import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Category } from '@/types'

export function CategoryChips({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full flex justify-center py-2 px-1">
      <div className="flex flex-wrap justify-center gap-1.5 bg-surface-2/80 p-1.5 rounded-2xl border border-line/30 w-full max-w-md">
        {categories.map((cat) => {
          const to = cat.id === 'all' ? '/catalog' : `/catalog/${cat.id}`
          return (
            <NavLink
              key={cat.id}
              to={to}
              end={cat.id === 'all'}
              className="relative"
            >
              {({ isActive }) => (
                <div
                  className={`relative z-10 flex items-center gap-1.5 rounded-[12px] px-3 py-1.5 text-[11px] font-bold tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? 'text-brand-600' : 'text-ink-muted/80 hover:text-ink'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tnum ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'bg-ink/5 text-ink-muted/60'
                  }`}>
                    {cat.count}
                  </span>
                  
                  {/* Sliding active background */}
                  {isActive && (
                    <motion.span
                      layoutId="active-segment-pill"
                      className="absolute inset-0 -z-10 bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-line/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
