import { motion } from 'framer-motion'
import { formatPrice } from '@/brand/config'
import { BRAND } from '@/brand/config'

export function FreeDeliveryBar({
  itemsTotal,
  remainingForFree,
}: {
  itemsTotal: number
  remainingForFree: number
}) {
  const pct = Math.min(100, (itemsTotal / BRAND.freeDeliveryThreshold) * 100)
  const done = remainingForFree <= 0

  return (
    <div className="rounded-2xl bg-surface-2 p-4 border border-line/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
      <p className="text-sm font-semibold text-ink">
        {done ? (
          <span className="flex items-center gap-1.5">
            🎉 <span className="font-bold text-success">Доставка бесплатно!</span>
          </span>
        ) : (
          <span className="text-ink-muted">
            До бесплатной доставки{' '}
            <span className="font-extrabold text-brand-500 tnum">{formatPrice(remainingForFree)}</span>
          </span>
        )}
      </p>
      <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-white shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500 shadow-[0_1px_4px_rgba(242,169,0,0.2)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        />
      </div>
    </div>
  )
}
