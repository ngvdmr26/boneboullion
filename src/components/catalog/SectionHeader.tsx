import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SectionHeader({
  eyebrow,
  title,
  linkTo,
  linkLabel = 'Смотреть все',
}: {
  eyebrow?: string
  title: string
  linkTo?: string
  linkLabel?: string
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.15em] text-brand-500">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" />
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
