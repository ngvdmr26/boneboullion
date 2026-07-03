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
  // Duplicate benefits for seamless loop in mobile marquee
  const duplicatedBenefits = [...benefits, ...benefits]

  return (
    <section className="mx-auto mt-6 max-w-7xl px-5 sm:mt-14 overflow-hidden select-none">
      
      {/* Stylesheet injection for self-contained marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .benefits-marquee-container {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .benefits-marquee-container:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Mobile View: Endless seamless marquee scrolling horizontally */}
      <div className="lg:hidden w-full overflow-hidden relative">
        {/* Soft fading edges for premium look */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="benefits-marquee-container gap-4 py-2">
          {duplicatedBenefits.map(({ icon: Icon, title, text }, index) => (
            <div
              key={`${title}-${index}`}
              className="flex flex-col items-start gap-3 rounded-2xl bg-white/80 p-4.5 shadow-sm ring-1 ring-line/40 backdrop-blur-sm transition-all duration-300 shrink-0 w-[215px]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_4px_12px_rgba(242,169,0,0.3)]">
                <Icon className="size-5" strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="font-display text-[13px] font-bold leading-tight">{title}</h3>
                <p className="mt-1 text-[11px] text-ink-muted leading-normal">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View: Standard static grid */}
      <motion.div
        className="hidden lg:grid grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {benefits.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={card}
            className="flex flex-col items-start gap-4 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-line/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_4px_12px_rgba(242,169,0,0.3)]">
              <Icon className="size-6" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="font-display text-base font-bold leading-tight">{title}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  )
}
