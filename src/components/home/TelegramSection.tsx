import { ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TelegramIcon } from '@/components/ui/TelegramIcon'
import { CONTACT } from '@/brand/config'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
}

export function TelegramSection() {
  return (
    <section className="mx-auto mt-16 max-w-5xl px-4 sm:mt-24">
      <motion.div
        className="relative overflow-hidden rounded-[32px] bg-white p-8 sm:p-12 border border-line/30 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Soft blur accent spots */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-100/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full bg-brand-200/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start gap-5 max-w-xl">
          <motion.span
            variants={item}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 shadow-[0_8px_24px_rgba(242,169,0,0.15)] border border-brand-100/30"
          >
            <TelegramIcon className="size-8" />
          </motion.span>
          
          <motion.div variants={item}>
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-600">Сообщество здоровья</span>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Мы в Telegram
            </h2>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-ink-muted/90">
              Полезные рецепты, новинки и специальные предложения от BONE BOUILLON —
              публикуем первыми в нашем канале. Присоединяйтесь!
            </p>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative shrink-0 w-full md:w-auto">
          <a href={CONTACT.telegramChannel} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button
              size="lg"
              className="w-full shadow-[0_8px_30px_rgba(242,169,0,0.25)]"
            >
              Подписаться
              <ArrowRight className="size-5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
