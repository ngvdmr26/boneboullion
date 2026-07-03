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
            src="/intro/Orange_background_with_avatar_202607040015_online_video_cutter-nS3lblnn87HuiJ_seg1_0ecf172d-9bd5-4a3e-91a4-67cc13a09b5f.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleClose}
            onClick={handleClose}
            className="size-full object-cover"
          />

          {/* Premium Skip Pill at Top-Right (iOS-style glassmorphic design) */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-5 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/90 active:scale-95 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
          >
            Пропустить
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
