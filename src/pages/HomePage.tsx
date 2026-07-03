import { Hero } from '@/components/home/Hero'
import { BenefitsBar } from '@/components/home/BenefitsBar'
import { PopularSection } from '@/components/home/PopularSection'
import { TelegramSection } from '@/components/home/TelegramSection'
import { Reveal } from '@/components/ui/Reveal'
import { motion, type Variants } from 'framer-motion'

const storyContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const storyItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Mobile Welcome Header */}
      <div className="lg:hidden px-5 pt-8 pb-3 text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600">BONE BOUILLON</span>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink leading-tight">
          Настоящий бульон<br />для вашей энергии
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm text-ink-muted/95 leading-relaxed">
          24 часа медленного томления из фермерских ингредиентов. Доставка в день заказа.
        </p>
      </div>

      <Reveal>
        <BenefitsBar />
      </Reveal>

      {/* Story Section */}
      <motion.section
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24"
        variants={storyContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.p
          variants={storyItem}
          className="text-sm font-bold uppercase tracking-[0.15em] text-brand-500"
        >
          Наша философия
        </motion.p>
        <motion.h2
          variants={storyItem}
          className="mt-4 font-display text-3xl font-bold sm:text-4xl"
        >
          Бульон, сваренный с заботой
        </motion.h2>
        <motion.div
          variants={storyItem}
          className="mx-auto mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
        />
        <motion.p
          variants={storyItem}
          className="mt-6 text-lg leading-relaxed text-ink-muted"
        >
          Мы верим, что настоящая еда — это лучшее лекарство. Каждая банка BONE
          BOUILLON — это 24 часа медленного томления, натуральные фермерские
          ингредиенты и забота о вашем здоровье.
        </motion.p>
      </motion.section>

      <Reveal>
        <PopularSection />
      </Reveal>
      <Reveal>
        <TelegramSection />
      </Reveal>
    </>
  )
}
