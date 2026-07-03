import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Check, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/services/api'
import { formatPrice, CONTACT } from '@/brand/config'
import { Button } from '@/components/ui/Button'
import { CartSummary } from '@/components/cart/CartSummary'
import { useCart } from '@/context/CartContext'
import { useCartLines } from '@/hooks/useCartLines'
import type { DeliveryMethod, OrderDraft, OrderResult } from '@/types'

const inputClass =
  'h-12 w-full rounded-2xl border-0 bg-surface-2 px-4 text-[15px] text-ink placeholder:text-ink-muted/60 transition-all duration-300 focus:bg-white focus:shadow-md focus:ring-1 focus:ring-brand-200 focus:outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]'
const labelClass = 'mb-2 block text-xs font-black uppercase tracking-wider text-ink-muted'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { clear } = useCart()
  const { lines, itemsTotal, deliveryCost, total } = useCartLines()

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [method, setMethod] = useState<DeliveryMethod>('courier')
  const [city, setCity] = useState('Москва')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')

  const order = useMutation<OrderResult, Error, OrderDraft>({
    mutationFn: (draft) => api.createOrder(draft),
    onSuccess: () => {
      clear()
      setStep(2)
    },
  })

  if (lines.length === 0 && step < 2) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl px-4 py-24 text-center"
      >
        <h1 className="font-display text-3xl font-bold">Корзина пуста</h1>
        <Link to="/catalog" className="mt-6 inline-block text-brand-500 hover:text-brand-600 font-semibold underline">
          Перейти в каталог
        </Link>
      </motion.div>
    )
  }

  const contactsValid = name.trim().length > 1 && phone.replace(/\D/g, '').length >= 10
  const deliveryValid = city.trim().length > 0 && (method === 'pickup' || address.trim().length > 3)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!contactsValid || !deliveryValid) return
    order.mutate({
      customer: { name, phone, email: email || undefined },
      delivery: { method, city, address: method === 'courier' ? address : undefined, comment },
      items: lines.map((l) => ({
        productId: l.product.id,
        title: l.product.name,
        quantity: l.quantity,
        price: l.product.price,
      })),
      itemsTotal,
      deliveryCost,
      total,
    })
  }

  // ── Confirmation ──────────────────────────────────────────────
  if (step === 2 && order.data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="mx-auto max-w-xl px-4 py-20 text-center"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
          className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/10 text-success shadow-sm"
        >
          <Check className="size-10" strokeWidth={2.4} />
        </motion.span>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Заявка №{order.data.orderNumber} принята!
        </h1>
        <p className="mt-3 text-ink-muted/90 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          {order.data.message}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a href={CONTACT.telegram}>
            <Button size="lg" className="w-full sm:w-auto shadow-[0_4px_16px_rgba(242,169,0,0.3)]">
              Написать в Telegram
            </Button>
          </a>
          <Link to="/">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              На главную
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  const steps = ['Контакты', 'Доставка', 'Готово']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:py-12"
    >
      <button
        type="button"
        onClick={() => (step === 0 ? navigate('/cart') : setStep(step - 1))}
        className="flex items-center gap-1.5 text-sm font-semibold text-ink-muted/80 hover:text-brand-500 transition-colors duration-200"
      >
        <ChevronLeft className="size-4" /> Назад
      </button>

      <h1 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
        Оформление заказа
      </h1>

      {/* step indicator */}
      <ol className="mt-8 flex items-center gap-3 text-xs sm:text-sm">
        {steps.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                i <= step
                  ? 'bg-brand-500 text-white shadow-[0_2px_8px_rgba(242,169,0,0.35)] scale-105'
                  : 'bg-surface-2 text-ink-muted/70'
              }`}
            >
              {i + 1}
            </span>
            <span className={`font-semibold transition-colors duration-300 ${i <= step ? 'text-ink' : 'text-ink-muted/60'}`}>
              {label}
            </span>
            {i < steps.length - 1 && <span className="h-px w-6 sm:w-10 bg-line/60" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="contacts-step"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30"
              >
                <div>
                  <label className={labelClass} htmlFor="name">Имя*</label>
                  <input id="name" className={inputClass} value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">Телефон*</label>
                  <input id="phone" className={inputClass} value={phone} inputMode="tel"
                    onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">E-mail</label>
                  <input id="email" type="email" className={inputClass} value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Для чека и статуса заказа" />
                </div>
                <Button type="button" size="lg" className="w-full shadow-[0_4px_16px_rgba(242,169,0,0.3)] pt-2" disabled={!contactsValid}
                  onClick={() => setStep(1)}>
                  Продолжить
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="delivery-step"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 rounded-3xl bg-white p-6 sm:p-8 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30"
              >
                <div className="grid grid-cols-2 gap-4">
                  {(['courier', 'pickup'] as DeliveryMethod[]).map((m) => (
                    <button key={m} type="button" onClick={() => setMethod(m)}
                      className={`rounded-2xl border px-4 py-3.5 text-sm font-bold transition-all duration-300 ${
                        method === m
                          ? 'border-brand-500 bg-brand-50/60 text-brand-700 shadow-[0_2px_12px_rgba(242,169,0,0.1)]'
                          : 'border-line/60 bg-white text-ink-muted hover:border-brand-200'
                      }`}>
                      {m === 'courier' ? 'Курьер' : 'Самовывоз'}
                    </button>
                  ))}
                </div>
                <div>
                  <label className={labelClass} htmlFor="city">Город*</label>
                  <input id="city" className={inputClass} value={city}
                    onChange={(e) => setCity(e.target.value)} />
                </div>
                {method === 'courier' && (
                  <div>
                    <label className={labelClass} htmlFor="address">Адрес доставки*</label>
                    <input id="address" className={inputClass} value={address}
                      onChange={(e) => setAddress(e.target.value)} placeholder="Улица, дом, квартира" />
                  </div>
                )}
                <div>
                  <label className={labelClass} htmlFor="comment">Комментарий</label>
                  <textarea id="comment" rows={3}
                    className={`${inputClass} h-auto py-3.5`} value={comment}
                    onChange={(e) => setComment(e.target.value)} placeholder="Пожелания к заказу" />
                </div>
                <Button type="submit" size="lg" className="w-full shadow-[0_4px_16px_rgba(242,169,0,0.3)]"
                  disabled={!deliveryValid || order.isPending} onClick={submit}>
                  {order.isPending ? 'Отправляем…' : 'Оформить заказ'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-line/30"
          >
            <h2 className="font-display text-xl font-bold text-ink">Ваш заказ</h2>
            <ul className="space-y-3.5 text-sm font-medium">
              {lines.map((l) => (
                <li key={l.product.id} className="flex justify-between gap-3">
                  <span className="text-ink-muted/95 min-w-0 truncate">
                    {l.product.name} <span className="text-xs text-ink-muted/50 font-bold">× {l.quantity}</span>
                  </span>
                  <span className="tnum font-semibold text-ink shrink-0">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line/60 pt-4.5">
              <CartSummary itemsTotal={itemsTotal} deliveryCost={deliveryCost} total={total} />
            </div>
          </motion.div>
        </aside>
      </div>
    </motion.div>
  )
}
