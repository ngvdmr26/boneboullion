import { Link } from 'react-router-dom'
import { ShoppingBag, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useCartLines } from '@/hooks/useCartLines'
import { useProducts } from '@/hooks/useCatalog'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { FreeDeliveryBar } from '@/components/cart/FreeDeliveryBar'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/brand/config'

export function CartPage() {
  const { add } = useCart()
  const { lines, itemsTotal, deliveryCost, total, remainingForFree } = useCartLines()
  const { data: allProducts = [] } = useProducts()

  // Find products that are NOT in the cart for cross-selling
  const cartProductIds = lines.map((l) => l.product.id)
  const recommendations = allProducts
    .filter((p) => !cartProductIds.includes(p.id) && p.inStock)
    .slice(0, 3)

  if (lines.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
          className="flex size-24 items-center justify-center rounded-full bg-brand-50 text-brand-500 shadow-md shadow-brand-100"
        >
          <ShoppingBag className="size-11" />
        </motion.span>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Корзина пуста
        </h1>
        <p className="max-w-md text-ink-muted/90 text-sm sm:text-base leading-relaxed">
          Добавьте полезные бульоны из каталога — и мы быстро доставим их к вашей двери.
        </p>
        <Link to="/catalog">
          <Button size="lg" className="shadow-[0_4px_16px_rgba(242,169,0,0.25)]">
            Перейти в каталог
          </Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:py-12"
    >
      <motion.h1
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl"
      >
        Корзина
      </motion.h1>

      {/* grid with items-start to prevent awkward vertical stretching of the left column */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10 items-start">
        
        {/* Left Column: Items List & Recommendations */}
        <div className="space-y-6 w-full">
          <motion.div
            layout
            className="divide-y divide-line/50 rounded-3xl bg-white p-5 sm:p-7 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30"
          >
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <CartLineItem key={line.product.id} line={line} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Recommendations Block (Cross-sell) to fill the empty space beautifully */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30"
            >
              <h3 className="font-display text-lg font-bold text-ink">Рекомендуем добавить</h3>
              <p className="text-xs text-ink-muted/80 mt-1">Дополните заказ полезными продуктами</p>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="group relative flex flex-col p-3 rounded-2xl bg-surface-2/40 hover:bg-surface-2/80 transition-colors duration-300 border border-line/10"
                  >
                    <Link
                      to={`/product/${prod.slug}`}
                      className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center border border-line/20"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    
                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${prod.slug}`}
                          className="text-xs sm:text-sm font-bold text-ink hover:text-brand-500 transition-colors line-clamp-2"
                        >
                          {prod.name}
                        </Link>
                        <p className="text-[10px] text-ink-muted mt-0.5">{prod.volume}</p>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-sm font-extrabold text-ink tnum">
                          {formatPrice(prod.price)}
                        </span>
                        
                        <button
                          onClick={() => add(prod.id)}
                          className="flex size-7 items-center justify-center rounded-full bg-brand-500 text-white shadow-md hover:bg-brand-600 transition-colors active:scale-95"
                          title="Добавить в корзину"
                        >
                          <Plus className="size-4" strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Checkout Summary sticky panel */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', duration: 0.5 }}
          className="lg:sticky lg:top-28 lg:self-start w-full"
        >
          <div className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30">
            <FreeDeliveryBar itemsTotal={itemsTotal} remainingForFree={remainingForFree} />
            <CartSummary itemsTotal={itemsTotal} deliveryCost={deliveryCost} total={total} />
            <Link to="/checkout" className="block pt-2">
              <Button size="lg" className="w-full shadow-[0_4px_16px_rgba(242,169,0,0.3)]">
                Оформить заказ
              </Button>
            </Link>
          </div>
        </motion.aside>

      </div>
    </motion.div>
  )
}
