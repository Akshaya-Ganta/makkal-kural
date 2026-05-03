import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type ScrapbookProps = {
  name: string
  onContinue: () => void
}

type StoryCard = {
  title: string
  text: string
}

function Scrapbook({ name, onContinue }: ScrapbookProps) {
  const [visibleCards, setVisibleCards] = useState(1)

  const cards: StoryCard[] = useMemo(
    () => [
      {
        title: 'Awareness',
        text: `${name || 'A young voter'} begins by noticing how local choices affect daily life in small ways.`,
      },
      {
        title: 'Voting Participation',
        text: 'On election day, that awareness becomes action through one calm, confident vote.',
      },
      {
        title: 'Community Change',
        text: 'When many people participate, schools, roads, and services improve for everyone.',
      },
    ],
    [name],
  )

  const showNext = () => {
    setVisibleCards((prev) => Math.min(prev + 1, cards.length))
  }

  const allVisible = visibleCards >= cards.length

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-earth-700/80">Scrapbook</p>
        <h2 className="mt-3 text-3xl sm:text-4xl">A gentle timeline of civic change</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.slice(0, visibleCards).map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: index * 0.12 }}
            className="rounded-2xl border border-soil-200 bg-surface p-6 shadow-[0_8px_30px_rgba(76,63,50,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-leaf-600">Step {index + 1}</p>
            <h3 className="mt-2 text-2xl">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-earth-700">{card.text}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {!allVisible && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={showNext}
            className="rounded-full border border-earth-700/30 bg-soil-100 px-6 py-2.5 text-sm font-semibold text-earth-900 transition hover:bg-soil-200"
            type="button"
          >
            Next card
          </motion.button>
        )}

        {allVisible && (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={onContinue}
            className="rounded-full border border-earth-700/30 bg-earth-800 px-6 py-2.5 text-sm font-semibold text-soil-50 transition hover:bg-earth-900"
            type="button"
          >
            Continue to learning frames
          </motion.button>
        )}
      </div>
    </section>
  )
}

export default Scrapbook
