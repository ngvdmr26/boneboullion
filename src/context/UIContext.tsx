import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface ToastMessage {
  id: string
  text: string
}

interface UIContextValue {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  toasts: ToastMessage[]
  showToast: (text: string) => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (text: string) => {
    const id = Math.random().toString()
    setToasts((prev) => [...prev, { id, text }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }

  const value = useMemo<UIContextValue>(
    () => ({
      isMobileMenuOpen,
      toggleMobileMenu: () => setMobileMenuOpen((v) => !v),
      closeMobileMenu: () => setMobileMenuOpen(false),
      toasts,
      showToast,
    }),
    [isMobileMenuOpen, toasts],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
