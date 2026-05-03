import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Page from './Page'
import { translations } from './translations'

function BookIntro({ language, onComplete }) {
  const t = translations[language]
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!isClosing) return
    const timer = window.setTimeout(() => {
      onComplete?.()
    }, 1100)

    return () => window.clearTimeout(timer)
  }, [isClosing, onComplete])

  const handleVideoEnd = () => {
    setIsClosing(true)
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-amber-100 text-gray-700">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={
          isClosing
            ? { scale: 1.2, opacity: 0, x: 80 }
            : { scale: 1, opacity: 1, x: 0 }
        }
        transition={{ duration: 1.05, ease: 'easeInOut' }}
        className="relative z-10 h-[420px] w-[min(92vw,860px)] rounded-2xl bg-gradient-to-b from-amber-50 to-yellow-50 p-3 shadow-[0_28px_65px_rgba(92,63,34,0.22)]"
      >
        <div className="relative flex h-full w-full rounded-2xl border border-amber-200/80 bg-yellow-50 shadow-[inset_0_0_30px_rgba(130,95,60,0.12)] [perspective:1700px]">
          <Page side="left" className="relative">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-xs rounded-xl border border-amber-300/60 bg-amber-100/70 p-5 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-600">{t.bookTitle}</p>
                <p className="mt-3 text-lg font-semibold text-gray-700">{t.bookSubtitle}</p>
              </div>
            </div>
          </Page>

          <Page side="right" className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: [0.96, 1.02, 1] }}
              transition={{ duration: 1.05, delay: 2.05, ease: 'easeInOut' }}
              className="h-full w-full p-5"
            >
              <div className="h-full w-full rounded-lg border border-amber-200/80 bg-black/5 p-2 shadow-inner">
                <video
                  src="/intro.mp4"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </motion.div>
          </Page>

          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -170 }}
            transition={{ duration: 1.05, delay: 1.0, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
            className="absolute left-1/2 top-0 z-20 h-full w-1/2 rounded-r-2xl border border-amber-200/80 bg-yellow-50 shadow-[0_10px_28px_rgba(0,0,0,0.18)]"
          >
            <div
              className="h-full w-full rounded-r-2xl"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(120,86,54,0.2), rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.25) 65%, rgba(130,92,58,0.2))',
              }}
            />
          </motion.div>

          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-amber-300/60" />
        </div>
      </motion.div>
    </section>
  )
}

export default BookIntro
