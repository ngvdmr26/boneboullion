import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ZoomIn, Minimize2 } from 'lucide-react'

export function IosInstallModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with premium blur */}
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-md" onClick={onClose} aria-hidden />

            {/* Premium glassmorphic modal box */}
            <motion.div
              role="dialog"
              aria-label="Инструкция по установке на iOS"
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
              className="relative w-full max-w-sm rounded-[32px] bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-line/30 overflow-hidden z-10 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-surface-2 text-ink-muted transition-all duration-300 hover:bg-brand-50 hover:text-brand-700 active:scale-90"
              >
                <X className="size-5" />
              </button>

              <h2 className="font-display text-xl font-extrabold text-ink text-center mt-2">
                Установка на iPhone
              </h2>
              <p className="text-xs text-ink-muted/80 text-center mt-1">
                Добавьте BONE BOUILLON на главный экран в 3 простых шага
              </p>

              {/* Clickable Image Container */}
              <div className="relative mt-5 w-full aspect-[9/16] rounded-2xl overflow-hidden bg-surface-2 border border-line/50 group cursor-zoom-in">
                <img
                  src="/images/ios-install-guide.png"
                  alt="Инструкция по установке"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-102"
                  onClick={() => setZoomed(true)}
                />
                
                {/* Overlay zoom indicator */}
                <div
                  onClick={() => setZoomed(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm shadow-md transition-opacity duration-300 opacity-90 group-hover:opacity-100"
                >
                  <ZoomIn className="size-3.5" />
                  Увеличить
                </div>
              </div>

              {/* Hint text */}
              <p className="mt-4 text-[10px] text-ink-muted/60 text-center">
                * Поддерживается в браузере Safari на iOS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full screen lightbox zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            {/* Backdrop click exits zoom */}
            <div className="absolute inset-0" onClick={() => setZoomed(false)} />
            
            {/* Zoomed high-res image container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="relative max-w-full max-h-[92vh] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
            >
              <img
                src="/images/ios-install-guide.png"
                alt="Инструкция по установке (увеличено)"
                className="w-auto h-full max-w-full object-contain"
              />
              
              {/* Floating Close Zoom button */}
              <button
                type="button"
                onClick={() => setZoomed(false)}
                className="absolute top-4 right-4 flex items-center gap-1 px-3 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 text-xs font-bold hover:bg-white/20 active:scale-95 transition-all"
              >
                <Minimize2 className="size-4" />
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
