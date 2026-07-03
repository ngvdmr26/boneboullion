import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32 text-center flex flex-col items-center justify-center">
      {/* Floating 404 number */}
      <motion.h1
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        className="text-8xl sm:text-9xl font-display font-black text-brand-500 tracking-tight filter drop-shadow-[0_4px_16px_rgba(242,169,0,0.15)]"
      >
        404
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-6 text-lg sm:text-xl font-medium text-ink-muted"
      >
        Упс! Страница, которую вы ищете, не существует.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8"
      >
        <Link to="/">
          <Button size="lg" className="shadow-[0_4px_16px_rgba(242,169,0,0.3)]">
            Вернуться на главную
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
