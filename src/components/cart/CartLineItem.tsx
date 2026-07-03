import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { CartLine } from '@/hooks/useCartLines'
import { formatPrice } from '@/brand/config'
import { ProductImage } from '@/components/catalog/ProductImage'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { useCart } from '@/context/CartContext'

export function CartLineItem({
  line,
  onNavigate,
}: {
  line: CartLine
  onNavigate?: () => void
}) {
  const { setQuantity, remove } = useCart()
  const { product, quantity, lineTotal } = line

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
      className="group flex gap-4 py-5 hover:bg-surface-2/20 px-2 rounded-2xl transition-colors duration-300"
    >
      <Link
        to={`/product/${product.slug}`}
        onClick={onNavigate}
        className="flex size-20 sm:size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line/40 transition-transform duration-300 group-hover:scale-98"
      >
        <ProductImage product={product} className="rounded-2xl" jarClassName="p-3" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${product.slug}`}
            onClick={onNavigate}
            className="font-display text-[15px] sm:text-base font-bold leading-tight text-ink transition-colors duration-300 hover:text-brand-500"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={`Удалить «${product.name}» из корзины`}
            className="shrink-0 rounded-full p-1.5 text-ink-muted/50 transition-all duration-300 hover:bg-danger/10 hover:text-danger active:scale-90"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted font-medium mt-0.5">{product.volume}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <QuantityStepper
            value={quantity}
            onChange={(n) => setQuantity(product.id, n)}
            size="sm"
          />
          <span className="font-sans text-base sm:text-lg font-extrabold text-ink tnum">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
