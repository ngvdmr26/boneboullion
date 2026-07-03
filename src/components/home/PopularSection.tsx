import { ProductGrid } from '@/components/catalog/ProductGrid'
import { SectionHeader } from '@/components/catalog/SectionHeader'
import { useProducts } from '@/hooks/useCatalog'
import { motion } from 'framer-motion'

export function PopularSection() {
  const { data: products, isLoading: prodLoading } = useProducts()

  // "Популярное": hits/new first, capped to the grid
  const popular = (products ?? [])
    .slice()
    .sort((a, b) => Number(b.badges.length > 0) - Number(a.badges.length > 0))
    .slice(0, 8)

  return (
    <motion.section
      id="popular"
      className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <SectionHeader
        eyebrow="Выбор покупателей"
        title="Популярное"
        linkTo="/catalog"
      />
      <div className="mt-6">
        <ProductGrid
          products={popular}
          loading={prodLoading}
          skeletonCount={4}
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </motion.section>
  )
}
