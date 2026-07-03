import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'
import { TelegramIcon } from '@/components/ui/TelegramIcon'
import { BRAND, CONTACT } from '@/brand/config'

const columns = [
  {
    title: 'Каталог',
    links: [
      { label: 'Костные бульоны', to: '/catalog/bone' },
      { label: 'Супы', to: '/catalog/soup' },
      { label: 'Бульон для детей', to: '/catalog/kids' },
      { label: 'Наборы', to: '/catalog/set' },
    ],
  },
  {
    title: 'Покупателю',
    links: [
      { label: 'Доставка и оплата', to: '/' },
      { label: 'О бренде', to: '/' },
      { label: 'Контакты', to: '/' },
      { label: 'Профиль', to: '/profile' },
    ],
  },
]

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

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.5, bounce: 0 },
  },
} as const

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="mt-10 bg-surface-2 border-t border-line/60 text-ink"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={columnVariants}>
          <Logo tone="dark" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            Костный бульон, сваренный из фермерских костей и овощей по
            традиционному рецепту. {BRAND.tagline}.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={CONTACT.telegram}
              aria-label="Telegram"
              className="flex size-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 ease-out hover:scale-110 hover:bg-brand-500 hover:text-white hover:shadow-[0_4px_12px_rgba(242,169,0,0.3)]"
            >
              <TelegramIcon className="size-5" />
            </a>
            <a
              href={CONTACT.instagram}
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 ease-out hover:scale-110 hover:bg-brand-500 hover:text-white hover:shadow-[0_4px_12px_rgba(242,169,0,0.3)]"
            >
              <Instagram className="size-5" />
            </a>
          </div>
        </motion.div>

        {columns.map((col) => (
          <motion.nav key={col.title} aria-label={col.title} variants={columnVariants}>
            <h3 className="font-sans text-xs font-black uppercase tracking-wider text-ink/40">
              {col.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-semibold text-ink-muted transition-colors duration-300 hover:text-brand-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        ))}

        <motion.div variants={columnVariants}>
          <h3 className="font-sans text-xs font-black uppercase tracking-wider text-ink/40">
            Контакты
          </h3>
          <ul className="mt-5 space-y-3 text-sm font-semibold">
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-2.5 text-ink-muted transition-colors duration-300 hover:text-brand-500"
              >
                <Phone className="size-4 opacity-75" /> {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 text-ink-muted transition-colors duration-300 hover:text-brand-500"
              >
                <Mail className="size-4 opacity-75" /> {CONTACT.email}
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="border-t border-line/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-ink-muted/70 sm:flex-row">
          <p>© {new Date().getFullYear()} BONE BOUILLON. Все права защищены.</p>
          <p>Сделано с заботой о здоровье всех поколений.</p>
        </div>
      </div>
    </motion.footer>
  )
}
