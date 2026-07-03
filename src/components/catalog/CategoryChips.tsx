import { NavLink } from 'react-router-dom'
import type { Category } from '@/types'

const getShortName = (id: string, fullName: string) => {
  if (id === 'all') return 'Все'
  if (id === 'bone') return 'Бульоны'
  if (id === 'soup') return 'Супы'
  if (id === 'kids') return 'Детям'
  if (id === 'sets') return 'Наборы'
  return fullName
}

export function CategoryChips({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full flex justify-center py-1">
      {/* Sleek, borderless, wrapping capsule layout with primary brand styling */}
      <div className="flex flex-wrap justify-center gap-2 px-4 max-w-md w-full">
        {categories.map((cat) => {
          const to = cat.id === 'all' ? '/catalog' : `/catalog/${cat.id}`
          const displayName = getShortName(cat.id, cat.name)
          
          return (
            <NavLink
              key={cat.id}
              to={to}
              end={cat.id === 'all'}
              className="relative"
            >
              {({ isActive }) => (
                <div
                  className={`relative z-10 flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all duration-300 border ${
                    isActive
                      ? 'text-white border-transparent bg-gradient-to-b from-brand-400 to-brand-600 shadow-[0_3px_10px_rgba(242,169,0,0.35)]'
                      : 'text-ink-muted/80 border-line/75 bg-white hover:border-brand-200 hover:text-ink shadow-sm'
                  }`}
                >
                  <span>{displayName}</span>
                  <span className={`text-[8.5px] px-1.25 py-0.25 rounded-full font-black tnum ${
                    isActive ? 'bg-white/20 text-white' : 'bg-ink/5 text-ink-muted/50'
                  }`}>
                    {cat.count}
                  </span>
                </div>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
