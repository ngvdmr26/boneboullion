import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '@/context/FavoritesContext'
import { useProducts } from '@/hooks/useCatalog'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { Button } from '@/components/ui/Button'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const { data: products, isLoading } = useProducts()

  const favorites = (products ?? []).filter((p) => ids.includes(p.id))

  if (!isLoading && favorites.length === 0) {
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
          <Heart className="size-11" />
        </motion.span>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          В избранном пусто
        </h1>
        <p className="max-w-md text-ink-muted/90 text-sm sm:text-base leading-relaxed">
          Нажимайте на сердечко у понравившихся бульонов и супов в каталоге — они появятся здесь.
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
        Избранное
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-8"
      >
        <ProductGrid
          products={favorites}
          loading={isLoading}
          skeletonCount={4}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        />
      </motion.div>
    </motion.div>
  )
}
