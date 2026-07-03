import { forwardRef, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.97]'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[0_4px_16px_rgba(242,169,0,0.35)] hover:shadow-[0_8px_30px_rgba(242,169,0,0.45)] hover:-translate-y-0.5',
  secondary:
    'bg-white text-ink ring-1 ring-line hover:ring-brand-300 hover:bg-brand-50/50 hover:shadow-md',
  ghost: 'bg-transparent text-ink hover:bg-brand-50/60',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm rounded-full',
  md: 'h-12 px-7 text-[15px] rounded-2xl',
  lg: 'h-14 px-9 text-[15px] rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
