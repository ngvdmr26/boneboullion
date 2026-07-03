import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CategoryChips } from '@/components/catalog/CategoryChips'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { useCategories, useProducts } from '@/hooks/useCatalog'

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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.5, bounce: 0 },
  },
} as const

export function CatalogPage() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim().toLowerCase() ?? ''

  const { data: categories } = useCategories()
  const { data: products, isLoading: prodLoading } = useProducts(categoryId)

  const activeCategory = categories?.find((c) => c.id === categoryId)
  const title = query
    ? `Поиск: «${query}»`
    : (activeCategory?.name ?? 'Весь ассортимент')

  const filtered = (products ?? []).filter((p) =>
    query
      ? p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      : true,
  )

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-7xl px-4 py-8 sm:py-12 flex flex-col items-center"
    >
      {/* breadcrumb */}
      <motion.nav
        variants={itemVariants}
        className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-ink-muted/70 w-full"
        aria-label="Хлебные крошки"
      >
        <Link to="/" className="hover:text-brand-500 transition-colors">Главная</Link>
        <ChevronRight className="size-4 opacity-50" />
        <Link to="/catalog" className="hover:text-brand-500 transition-colors">Каталог</Link>
        {activeCategory && (
          <>
            <ChevronRight className="size-4 opacity-50" />
            <span className="text-ink font-bold">{activeCategory.name}</span>
          </>
        )}
      </motion.nav>

      <div className="h-16 flex items-center justify-center mt-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl text-ink leading-none text-center"
          >
            {title}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Center aligned segment bar for categories on both desktop and mobile */}
      {categories && (
        <motion.div variants={itemVariants} className="mt-8 w-full">
          <CategoryChips categories={categories} />
        </motion.div>
      )}

      {/* Full width product grid without clunky sidebar */}
      <motion.div
        variants={itemVariants}
        className="mt-8 w-full"
      >
        <ProductGrid
          products={filtered}
          loading={prodLoading}
          skeletonCount={8}
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
        />
      </motion.div>
    </motion.div>
  )
}
