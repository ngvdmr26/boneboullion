import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const slides = [
  {
    image: '/images/banner1.jpg',
    tagline: 'Куриный бульон',
    title: <>Костный бульон<br />для здоровья<br />и вашей энергии</>,
    desc: 'Сварен из фермерских костей и овощей по традиционному рецепту. 24 часа медленного томления.',
    accent: '#F2A900',
  },
  {
    image: '/images/banner2.jpg',
    tagline: 'Говяжий бульон',
    title: <>Насыщенный вкус<br />и сила природы<br />в каждой ложке</>,
    desc: 'Идеальный источник коллагена и аминокислот. Восстанавливает силы, суставы и связки.',
    accent: '#DA9600',
  },
  {
    image: '/images/banner3.jpg',
    tagline: 'Детская линейка',
    title: <>Здоровый рацион<br />для крепкого роста<br />ваших детей</>,
    desc: 'Натуральный гипоаллергенный бульон без соли и добавок. С заботой о самых маленьких.',
    accent: '#FFBC30',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative flex min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] max-h-[550px] xl:max-h-[650px] items-center overflow-hidden bg-black select-none">
      
      {/* Background Images Cross-Fade */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-right sm:bg-center"
            style={{
              backgroundImage: `url('${slides[current].image}')`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Elegant Left-heavy Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      
      {/* Content Container */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          {/* Eyebrow badge showing tagline of currently active slide */}
          <div className="min-h-[20px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-brand-400"
              >
                100% натурально · {slides[current].tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="min-h-[160px] sm:min-h-[220px] lg:min-h-[260px] mt-4 flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="min-h-[48px] mt-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/80"
              >
                {slides[current].desc}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div variants={item} className="mt-8">
            <Button
              size="lg"
              className="shadow-[0_0_40px_rgba(242,169,0,0.35)] w-full sm:w-auto"
              onClick={() => document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Выбрать бульон
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Custom Slider Indicator Dots */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'bg-brand-400 w-6' : 'bg-white/40 w-1.5 hover:bg-white/70'
            }`}
            aria-label={`Слайд ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  )
}
