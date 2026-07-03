import type { Badge as BadgeType } from '@/types'

const LABELS: Record<BadgeType, { text: string; className: string }> = {
  hit: { text: 'Хит', className: 'bg-brand-400/90 text-ink backdrop-blur-sm' },
  new: { text: 'Новинка', className: 'bg-brand-500 text-white' },
  sale: { text: 'Скидка', className: 'bg-danger text-white' },
}

export function ProductBadge({ badge }: { badge: BadgeType }) {
  const { text, className } = LABELS[badge]
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${className}`}
    >
      {text}
    </span>
  )
}
