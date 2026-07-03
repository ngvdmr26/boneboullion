import { formatPrice } from '@/brand/config'

export function CartSummary({
  itemsTotal,
  deliveryCost,
  total,
}: {
  itemsTotal: number
  deliveryCost: number
  total: number
}) {
  return (
    <dl className="space-y-3.5 text-sm font-medium text-ink-muted">
      <div className="flex justify-between">
        <dt className="text-ink-muted/80">Товары</dt>
        <dd className="font-semibold text-ink tnum">{formatPrice(itemsTotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-ink-muted/80">Доставка</dt>
        <dd className={`font-semibold tnum ${deliveryCost === 0 ? 'text-success' : 'text-ink'}`}>
          {deliveryCost === 0 ? 'Бесплатно' : formatPrice(deliveryCost)}
        </dd>
      </div>
      <div className="flex justify-between border-t border-line/60 pt-4 text-base">
        <dt className="font-display font-bold text-ink">Итого</dt>
        <dd className="font-sans text-xl font-extrabold text-brand-500 tnum">
          {formatPrice(total)}
        </dd>
      </div>
    </dl>
  )
}
