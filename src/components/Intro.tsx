import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type IntroProps = {
  onContinue: () => void
}

type Scene = {
  title: string
  text: string
}

const scenes: Scene[] = [
  {
    title: 'Scene 1',
    text: 'At dawn, the village wakes quietly under tamarind shade and soft light.',
  },
  {
    title: 'Scene 2',
    text: 'At the tea stall, people talk about roads, water, and decisions made for everyone.',
  },
  {
    title: 'Scene 3',
    text: 'One young voice listens, reflects, and decides to cast a vote this year.',
  },
]

function Intro({ onContinue }: IntroProps) {
  const [step, setStep] = useState(0)

  const current = useMemo(() => scenes[step], [step])

  useEffect(() => {
    if (step === scenes.length - 1) return

    const id = window.setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, scenes.length - 1))
    }, 2400)

    return () => window.clearTimeout(id)
  }, [step])

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
      <div className="absolute inset-0 bg-gradient-to-b from-soil-100/80 via-surface/80 to-leaf-100/60" />
      <div className="absolute left-[10%] top-[18%] h-28 w-28 rounded-full bg-clay-200/35 blur-3xl" />
      <div className="absolute bottom-[12%] right-[12%] h-36 w-36 rounded-full bg-leaf-200/35 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl rounded-3xl border border-soil-200/80 bg-surface/90 p-8 shadow-[0_16px_50px_rgba(76,63,50,0.08)] backdrop-blur-sm sm:p-12"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-earth-700/80">A village morning</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="mt-6"
          >
            <h1 className="text-3xl leading-tight sm:text-4xl">{current.text}</h1>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mt-12 text-lg text-earth-700"
        >
          Sometimes, change begins with one step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {scenes.map((scene, index) => (
            <button
              key={scene.title}
              onClick={() => setStep(index)}
              className={`h-2.5 w-12 rounded-full transition ${
                step === index ? 'bg-clay-500' : 'bg-soil-200 hover:bg-soil-300'
              }`}
              aria-label={`Go to ${scene.title}`}
              type="button"
            />
          ))}
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          onClick={onContinue}
          className="mt-10 rounded-full border border-earth-700/30 bg-earth-800 px-7 py-3 text-sm font-semibold tracking-wide text-soil-50 transition hover:bg-earth-900"
        >
          Continue
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Intro
