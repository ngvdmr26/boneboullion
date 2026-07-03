import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Search field with a rolling icon:
 *  - empty  → magnifier sits on the left, no button
 *  - typing → the icon "rolls" to the right and becomes a golden submit button
 *  - hover/focus on that button → reveals a white "Найти" label
 * The roll is a framer shared-layout animation (layoutId); reduced-motion just swaps.
 */
export function SearchBar({ className = '' }: { className?: string }) {
  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const has = value.trim().length > 0
  const layoutId = reduce ? undefined : 'search-glyph'

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog')
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`} role="search">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск по товарам"
        aria-label="Поиск по товарам"
        className={`h-12 w-full rounded-2xl border-0 bg-surface-2/80 shadow-inner text-[15px] text-ink ring-0 transition-all duration-300 ease-out placeholder:text-ink-muted focus:bg-white focus:shadow-md focus:ring-1 focus:ring-brand-200 focus:outline-none ${
          has ? 'pl-5 pr-16' : 'pl-12 pr-5'
        }`}
      />

      {/* Left magnifier (empty state) */}
      {!has && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <motion.span layoutId={layoutId} className="text-ink-muted">
            <Search className="size-5" strokeWidth={2} />
          </motion.span>
        </span>
      )}

      {/* Submit button (typing state) */}
      <AnimatePresence>
        {has && (
          <motion.button
            type="submit"
            aria-label="Найти"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="absolute right-1.5 top-1/2 flex h-9 -translate-y-1/2 items-center gap-1.5 rounded-xl bg-gradient-to-b from-brand-500 to-brand-600 px-3 text-white shadow-[0_4px_16px_rgba(242,169,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(242,169,0,0.45)]"
          >
            <motion.span layoutId={layoutId} className="flex">
              <Search className="size-4" strokeWidth={2.6} />
            </motion.span>
            <AnimatePresence>
              {active && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                  className="overflow-hidden whitespace-nowrap pr-1 text-sm font-semibold"
                >
                  Найти
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  )
}
