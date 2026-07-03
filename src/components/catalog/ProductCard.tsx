import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/brand/config'
import { ProductBadge } from '@/components/ui/Badge'
import { ProductImage } from './ProductImage'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useUI } from '@/context/UIContext'

export function ProductCard({ product }: { product: Product }) {
  const { add, quantityOf } = useCart()
  const { has, toggle } = useFavorites()
  const { showToast } = useUI()
  const inCart = quantityOf(product.id)
  const isFav = has(product.id)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
    >
      {/* image */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-t-3xl bg-surface-2"
      >
        <ProductImage
          product={product}
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.badges.length > 0 && (
          <div className="absolute left-3 top-3 flex gap-1.5">
            {product.badges.map((b) => (
              <ProductBadge key={b} badge={b} />
            ))}
          </div>
        )}
      </Link>

      {/* favorite */}
      <button
        type="button"
        onClick={() => toggle(product.id)}
        aria-label={isFav ? 'Убрать из избранного' : 'В избранное'}
        aria-pressed={isFav}
        className="absolute right-2 top-2 flex size-8 sm:size-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur-md transition-[transform,color,box-shadow] duration-200 ease-out hover:scale-110 hover:text-brand-600 active:scale-90"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isFav ? 'fav' : 'nofav'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="flex items-center justify-center"
          >
            <Heart
              className={`size-4 sm:size-5 transition-[fill,color] duration-200 ease-out ${isFav ? 'fill-brand-600 text-brand-600' : ''}`}
              strokeWidth={2}
            />
          </motion.span>
        </AnimatePresence>
      </button>

      {/* body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <Link to={`/product/${product.slug}`} className="flex-1">
          <h3 className="font-display text-xs sm:text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-700 line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-1 text-[10px] sm:text-sm text-ink-muted">{product.volume}</p>
        </Link>

        <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-col leading-none">
            {product.oldPrice && (
              <span className="text-[10px] sm:text-sm text-ink-muted/60 line-through tnum">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-sans text-sm sm:text-xl font-extrabold text-ink tnum">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              add(product.id)
              showToast(`${product.name} добавлен в корзину`)
            }}
            aria-label={`Добавить «${product.name}» в корзину`}
            className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[0_4px_16px_rgba(242,169,0,0.3)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:shadow-[0_6px_24px_rgba(242,169,0,0.4)] active:scale-[0.96]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={inCart > 0 ? 'count' : 'add'}
                initial={{ scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                className="flex items-center gap-0.5 text-xs sm:text-sm font-bold tnum"
              >
                {inCart > 0 ? (
                  <>
                    <Check className="size-3 sm:size-4" strokeWidth={3} />
                    {inCart}
                  </>
                ) : (
                  <Plus className="size-4.5 sm:size-5" strokeWidth={2.6} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.article>
  )
}
