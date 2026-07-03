import { Link } from 'react-router-dom'
import { Gift, Package, Sparkles, User, Award, MapPin, Clipboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
  },
} as const

export function ProfilePage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert(`Промокод ${text} скопирован!`)
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto max-w-5xl px-4 py-8 sm:py-12"
    >
      {/* Page Title */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl text-center md:text-left"
      >
        Личный кабинет
      </motion.h1>

      {/* Bento Grid layout forming a perfect rectangle with offset randomness */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* PLATE 1: Profile & Address (Large, span 2) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_2px_24px_rgba(0,0,0,0.03)] border border-line/30 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-4.5">
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 shadow-inner">
                <User className="size-8" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Гость</h3>
                <p className="text-xs text-ink-muted mt-0.5">Войдите, чтобы копить бонусы</p>
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <Button size="sm" variant="secondary" className="w-full sm:w-auto" disabled title="Появится с подключением бэкенда">
                Войти по номеру телефона
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-line/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="size-5 text-brand-500 shrink-0" />
              <div>
                <p className="text-xs text-ink-muted/80 font-bold uppercase tracking-wider">Адрес доставки</p>
                <p className="text-sm font-bold text-ink mt-0.5">Москва, Пресненская наб. 12</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-brand-600 hover:text-brand-700 cursor-not-allowed">
              Изменить
            </span>
          </div>
        </motion.div>

        {/* PLATE 3: My Orders (Small, span 1) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 rounded-3xl bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.03)] border border-line/30 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 min-h-[220px]"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
              <Package className="size-5 text-brand-500" />
              Заказы
            </h3>
            <span className="text-xs font-black uppercase tracking-wider text-ink-muted/40">Пусто</span>
          </div>
          
          <div className="my-auto py-4 text-center">
            <p className="text-sm font-bold text-ink">У вас нет заказов</p>
            <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">История появится после первой покупки</p>
          </div>

          <Link to="/catalog" className="w-full">
            <Button size="sm" variant="secondary" className="w-full">
              В каталог
            </Button>
          </Link>
        </motion.div>

        {/* PLATE 4: Promo Codes & Coupons (Small, span 1) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1 rounded-3xl bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.03)] border border-line/30 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 min-h-[220px]"
        >
          <div className="flex items-center gap-2">
            <Gift className="size-5 text-brand-500" />
            <h3 className="font-display text-lg font-bold text-ink">Купоны</h3>
          </div>
          
          <div className="space-y-3.5 my-4">
            <div className="flex items-center justify-between p-2 rounded-xl bg-brand-50/50 border border-brand-100/50">
              <div className="min-w-0">
                <p className="text-xs font-bold text-ink">WELCOME</p>
                <p className="text-[10px] text-brand-700/80">Скидка 10% на первый заказ</p>
              </div>
              <button
                onClick={() => copyToClipboard('WELCOME')}
                className="p-1.5 rounded-lg bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                title="Копировать"
              >
                <Clipboard className="size-3.5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-xl bg-surface-2/60 border border-line/60">
              <div className="min-w-0">
                <p className="text-xs font-bold text-ink">BONBOOKS</p>
                <p className="text-[10px] text-ink-muted/80">Подарочная книга рецептов</p>
              </div>
              <button
                onClick={() => copyToClipboard('BONBOOKS')}
                className="p-1.5 rounded-lg bg-white border border-line text-ink-muted hover:bg-surface-2 transition-colors"
                title="Копировать"
              >
                <Clipboard className="size-3.5" />
              </button>
            </div>
          </div>

          <p className="text-[9px] text-ink-muted/60 text-center leading-tight">
            Нажмите на иконку, чтобы скопировать промокод
          </p>
        </motion.div>

        {/* PLATE 2: Bonus & Loyalty Program (Large, span 2) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(242,169,0,0.3)] transition-all duration-500 min-h-[220px]"
        >
          {/* Decorative background details */}
          <div className="absolute -right-16 -bottom-16 size-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute right-12 top-0 size-32 rounded-full bg-white/5 -translate-y-12 blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-brand-100" />
              <span className="text-xs font-black uppercase tracking-[0.15em] text-brand-100">
                Бонусная программа
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider border border-white/10">
              <Award className="size-4" />
              <span>Бронза</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <p className="font-display text-4xl sm:text-5xl font-black tnum">0 баллов</p>
            <p className="text-xs sm:text-sm text-brand-100">Доступно для оплаты заказов</p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs font-semibold text-brand-100">
              <span>Кэшбэк: 5%</span>
              <span>До серебряного уровня (7%): потратить 5 000 ₽</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/15 overflow-hidden shadow-inner">
              <div className="h-full rounded-full bg-white w-0" />
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
