import { motion, type Variants } from 'framer-motion'
import { PackageOpen } from 'lucide-react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded-lg bg-surface-2" />
        <div className="h-4 w-1/3 animate-pulse rounded-lg bg-surface-2" />
        <div className="h-6 w-1/2 animate-pulse rounded-lg bg-surface-2" />
      </div>
    </div>
  )
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  skeletonCount?: number
  className?: string
}

export function ProductGrid({
  products = [],
  loading = false,
  skeletonCount = 4,
  className = 'grid grid-cols-2 gap-4 lg:grid-cols-4',
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={className}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0 }}
        className="flex flex-col items-center gap-3 rounded-3xl bg-card p-14 text-center shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.3, delay: 0.1 }}
        >
          <PackageOpen className="size-12 text-ink-muted/50" />
        </motion.span>
        <p className="text-ink-muted">Товары не найдены.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  )
}
