import { CookingPot, Leaf, Package, Snowflake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

const benefits: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Leaf, title: '100% натурально', text: 'Только фермерские ингредиенты и ничего лишнего' },
  { icon: CookingPot, title: '24 часа томления', text: 'Медленное приготовление сохраняет пользу' },
  { icon: Snowflake, title: 'Шоковая заморозка', text: 'Сохраняем вкус и пользу без консервантов' },
  { icon: Package, title: 'Удобная доставка', text: 'Бережно упакуем и доставим к вашей двери' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
}

export function BenefitsBar() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-5 sm:mt-14 overflow-hidden">
      <motion.div
        className="flex overflow-x-auto no-scrollbar scroll-smooth gap-4 pb-4 snap-x lg:grid lg:grid-cols-4 lg:gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {benefits.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={card}
            className="flex flex-col items-start gap-3 rounded-2xl bg-white/80 p-4.5 shadow-sm ring-1 ring-line/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shrink-0 w-[215px] snap-center lg:w-auto lg:shrink"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_4px_12px_rgba(242,169,0,0.3)]">
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold leading-tight">{title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-ink-muted leading-relaxed">{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
