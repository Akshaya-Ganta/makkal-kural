import { motion } from 'framer-motion'

type LearningFramesProps = {
  name: string
  age: string
  onRestart: () => void
}

type Topic = {
  title: string
  caption: string
}

const topics: Topic[] = [
  {
    title: 'EVM',
    caption: 'Understand the machine and how your vote is recorded.',
  },
  {
    title: 'Booth Etiquette',
    caption: 'Know the do and do not moments inside the polling station.',
  },
  {
    title: 'What to Carry',
    caption: 'Keep your ID and essentials ready before you leave home.',
  },
  {
    title: 'Voting Process',
    caption: 'Follow the full journey from verification to ink mark.',
  },
]

function LearningFrames({ name, age, onRestart }: LearningFramesProps) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-earth-700/80">Learning Frames</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">Voting readiness, one frame at a time</h2>
        <p className="mt-3 max-w-2xl text-sm text-earth-700">
          {name ? `${name}, age ${age || 'not shared'}, this is your calm checklist before polling day.` : 'This is your calm checklist before polling day.'}
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {topics.map((topic, index) => (
          <motion.article
            key={topic.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: index * 0.1 }}
            whileHover={{ scale: 1.04 }}
            className="group relative overflow-hidden rounded-2xl border-[6px] border-soil-200 bg-surface p-7 shadow-[0_10px_24px_rgba(76,63,50,0.1)]"
          >
            <h3 className="text-2xl">{topic.title}</h3>
            <p className="mt-3 max-w-xs text-sm text-earth-700">{topic.caption}</p>

            <div className="pointer-events-none absolute inset-0 bg-earth-900/0 transition duration-300 group-hover:bg-earth-900/18" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-earth-900/75 to-transparent p-4 text-sm text-soil-50 transition duration-300 group-hover:translate-y-0">
              Tap this frame to begin this topic.
            </div>
          </motion.article>
        ))}
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        onClick={onRestart}
        type="button"
        className="mt-10 w-fit rounded-full border border-earth-700/35 bg-soil-100 px-6 py-2.5 text-sm font-semibold text-earth-900 transition hover:bg-soil-200"
      >
        Revisit story
      </motion.button>
    </section>
  )
}

export default LearningFrames
