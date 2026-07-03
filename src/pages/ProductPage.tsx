import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProduct } from '@/hooks/useCatalog'
import { formatPrice } from '@/brand/config'
import { Button } from '@/components/ui/Button'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { ProductBadge } from '@/components/ui/Badge'
import { ProductImage } from '@/components/catalog/ProductImage'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.6, bounce: 0 },
  },
} as const

export function ProductPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(slug)
  const { add } = useCart()
  const { has, toggle } = useFavorites()
  const [qty, setQty] = useState(1)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-surface-2" />
          <div className="space-y-5 py-2">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-surface-2" />
            <div className="h-6 w-1/4 animate-pulse rounded-lg bg-surface-2" />
            <div className="space-y-3 pt-4">
              <div className="h-5 w-full animate-pulse rounded-lg bg-surface-2" />
              <div className="h-5 w-5/6 animate-pulse rounded-lg bg-surface-2" />
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-surface-2" />
            </div>
            <div className="h-14 w-1/2 animate-pulse rounded-full bg-surface-2 pt-6" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl px-4 py-24 text-center"
      >
        <h1 className="font-display text-3xl font-bold">Товар не найден</h1>
        <Link to="/catalog" className="mt-6 inline-block text-brand-500 hover:text-brand-600 font-semibold underline">
          Вернуться в каталог
        </Link>
      </motion.div>
    )
  }

  const isFav = has(product.id)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl px-4 py-8 sm:py-12"
    >
      {/* Breadcrumbs */}
      <motion.nav
        variants={itemVariants}
        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-muted/70"
        aria-label="Хлебные крошки"
      >
        <Link to="/" className="hover:text-brand-500 transition-colors">Главная</Link>
        <ChevronRight className="size-4 opacity-50" />
        <Link to="/catalog" className="hover:text-brand-500 transition-colors">Каталог</Link>
        <ChevronRight className="size-4 opacity-50" />
        <span className="text-ink font-bold">{product.name}</span>
      </motion.nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* gallery */}
        <motion.div
          variants={itemVariants}
          className={`relative aspect-square overflow-hidden rounded-3xl shadow-lg transition-shadow duration-500 hover:shadow-xl ${
            product.image
              ? 'ring-1 ring-line/30 bg-white'
              : 'bg-gradient-to-br from-brand-50 to-brand-100/50 p-10 sm:p-14'
          }`}
        >
          {product.badges.length > 0 && (
            <div className="absolute left-5 top-5 z-10 flex gap-2">
              {product.badges.map((b) => (
                <ProductBadge key={b} badge={b} />
              ))}
            </div>
          )}
          <ProductImage product={product} jarClassName="p-10" />
        </motion.div>

        {/* details */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink leading-tight">
            {product.name}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-ink-muted font-semibold">{product.volume}</p>

          <div className="mt-6 flex items-baseline gap-3">
            {product.oldPrice && (
              <span className="text-lg text-ink-muted/60 line-through tnum font-semibold">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-sans text-3xl font-black text-ink tnum">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-ink-muted/90 text-sm sm:text-base">
            {product.description}
          </p>

          {/* actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} />
            <Button
              size="lg"
              className="shadow-[0_4px_20px_rgba(242,169,0,0.3)] flex-1 sm:flex-initial"
              onClick={() => {
                add(product.id, qty)
                navigate('/cart')
              }}
              disabled={!product.inStock}
            >
              <ShoppingBag className="size-5" />
              В корзину · {formatPrice(product.price * qty)}
            </Button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              aria-label={isFav ? 'Убрать из избранного' : 'В избранное'}
              aria-pressed={isFav}
              className="flex size-14 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line/60 transition-all duration-300 hover:scale-105 hover:text-brand-500 hover:shadow-md active:scale-95"
            >
              <Heart className={`size-6 transition-all duration-300 ${isFav ? 'fill-brand-500 text-brand-500 scale-110' : ''}`} />
            </button>
          </div>

          {/* composition */}
          {product.composition && (
            <motion.div
              variants={itemVariants}
              className="mt-8 rounded-3xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300 border border-line/30"
            >
              <h2 className="font-display text-lg font-bold text-ink">Состав</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted/95">
                {product.composition}
              </p>
            </motion.div>
          )}

          {/* nutrition */}
          {product.nutrition && (
            <motion.div
              variants={itemVariants}
              className="mt-5 rounded-3xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300 border border-line/30"
            >
              <h2 className="font-display text-lg font-bold text-ink">
                Пищевая ценность на 100 мл
              </h2>
              <dl className="mt-4.5 grid grid-cols-4 gap-3 text-center">
                {[
                  { label: 'Ккал', value: product.nutrition.calories },
                  { label: 'Белки', value: `${product.nutrition.protein} г` },
                  { label: 'Жиры', value: `${product.nutrition.fat} г` },
                  { label: 'Углеводы', value: `${product.nutrition.carbs} г` },
                ].map((n) => (
                  <div key={n.label} className="rounded-2xl bg-surface-2 py-3.5 px-1 hover:bg-brand-50 transition-colors duration-300">
                    <dt className="text-[11px] uppercase tracking-wider font-bold text-ink-muted/80">{n.label}</dt>
                    <dd className="mt-1.5 font-extrabold text-ink text-sm sm:text-base tnum">{n.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
