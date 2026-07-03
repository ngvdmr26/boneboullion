import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function IntroSplashScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only play on mobile viewports (< 1024px)
    if (window.innerWidth >= 1024) return

    // Play only once per session (survives minimize/resume, resets on full app close)
    const played = sessionStorage.getItem('intro_played')
    if (!played) {
      setShow(true)
    }
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('intro_played', 'true')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F2A900] select-none"
        >
          {/* Full Screen Intro Video */}
          <video
            src="/intro/Orange_background_with_avatar_202607040015 (online-video-cutter.com).mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleClose}
            onClick={handleClose}
            className="size-full object-cover"
          />

          {/* Quick Skip Overlay */}
          <button
            onClick={handleClose}
            className="absolute bottom-10 right-6 rounded-full bg-white/25 px-5 py-2 text-xs font-bold text-white backdrop-blur-md border border-white/20 active:scale-95 transition-all shadow-md"
          >
            Пропустить
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
