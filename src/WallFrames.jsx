import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FlipCard from './FlipCard'

export default function WallFrames({ setScreen, onBack }) {
  const [showStory, setShowStory] = useState(true)
  const [showFrames, setShowFrames] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState(null)

  const frames = [
    {
      image: '/vote.png',
      caption: 'Vote for community',
      pos: { top: '6%', left: '6%' },
      size: 'w-52',
      rotate: -3,
      module: 'evm-module',
    },
    {
      image: '/winner.png',
      caption: 'How the system works',
      pos: { top: '18%', left: '48%' },
      size: 'w-48',
      rotate: 2,
      module: 'leader-module',
    },
    {
      image: '/choice.png',
      caption: 'Make a choice',
      pos: { bottom: '8%', left: '10%' },
      size: 'w-60',
      rotate: -6,
      module: null,
    },
    {
      image: '/finger.png',
      caption: 'Mark your vote',
      pos: { top: '8%', right: '8%' },
      size: 'w-44',
      rotate: 3,
      module: 'etiquette-module',
    },
  ]

  const handleFrameClick = (frame) => {
    if (frame.module) {
      setSelectedFrame(frame)
      setScreen(frame.module)
    }
  }

  useEffect(() => {
    const hideStory = window.setTimeout(() => setShowStory(false), 900)
    const revealFrames = window.setTimeout(() => setShowFrames(true), 1200)

    return () => {
      window.clearTimeout(hideStory)
      window.clearTimeout(revealFrames)
    }
  }, [])

  useEffect(() => {
    console.log('[WallFrames] Rendering frames with images:', frames.map(f => f.image))
    const validImages = ['/vote.png', '/system.png', '/choice.png', '/finger.png']
    frames.forEach((frame, idx) => {
      if (!validImages.includes(frame.image)) {
        console.warn(`[WallFrames] Frame ${idx} has unexpected image: ${frame.image}`)
      }
    })
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative min-h-screen overflow-hidden bg-amber-100"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-yellow-50 to-stone-100 opacity-80" />

      <div className="relative mx-auto min-h-screen w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {showStory && (
            <motion.p
              key="story"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute left-1/2 top-8 z-20 -translate-x-1/2 rounded-full border border-amber-200 bg-yellow-50/85 px-5 py-2 text-sm italic text-gray-600 shadow-sm"
            >
              Your story begins here...
            </motion.p>
          )}
        </AnimatePresence>

        {frames.map((frame, index) => (
          <motion.div
            key={frame.image}
            initial={{ opacity: 0 }}
            animate={showFrames ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: showFrames ? index * 0.3 : 0, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              ...frame.pos,
              zIndex: 10 + index,
              rotate: `${frame.rotate}deg`,
            }}
            onClick={() => handleFrameClick(frame)}
            className={frame.module ? 'cursor-pointer' : ''}
            whileHover={frame.module ? { scale: 1.08 } : {}}
            whileTap={frame.module ? { scale: 0.98 } : {}}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FlipCard image={frame.image} caption={frame.caption} size={frame.size} index={index} />
            </motion.div>
            
            {/* Hover Indicator for Clickable Frames */}
            {frame.module && showFrames && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3 + 0.5 }}
                className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-1 text-xs font-semibold text-amber-700 shadow-md whitespace-nowrap"
              >
                Click to explore
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
