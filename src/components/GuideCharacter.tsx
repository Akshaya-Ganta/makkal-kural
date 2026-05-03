import { motion } from 'framer-motion'

type GuideCharacterProps = {
  hint: string
}

function GuideCharacter({ hint }: GuideCharacterProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="pointer-events-none fixed bottom-4 right-4 z-20 flex max-w-[210px] items-end gap-2 sm:bottom-6 sm:right-6"
    >
      <motion.div
        key={hint}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="rounded-2xl border border-soil-300 bg-surface px-3 py-2 text-xs leading-relaxed text-earth-800 shadow-[0_8px_20px_rgba(76,63,50,0.1)]"
      >
        {hint}
      </motion.div>

      <div className="relative h-20 w-20 shrink-0 rounded-full border border-soil-300 bg-soil-100 shadow-[0_8px_20px_rgba(76,63,50,0.12)]">
        <div className="absolute left-1/2 top-3 h-10 w-10 -translate-x-1/2 rounded-full bg-[#d6a27f]">
          <div className="absolute left-1.5 top-4 h-1.5 w-1.5 rounded-full bg-earth-900" />
          <div className="absolute right-1.5 top-4 h-1.5 w-1.5 rounded-full bg-earth-900" />
          <div className="absolute left-1/2 top-6 h-1 w-2 -translate-x-1/2 rounded-full bg-earth-900/80" />
        </div>
        <div className="absolute left-1/2 top-2 h-4 w-11 -translate-x-1/2 rounded-full bg-earth-900" />
        <div className="absolute bottom-2 left-1/2 h-7 w-12 -translate-x-1/2 rounded-xl bg-leaf-600" />
        <div className="absolute bottom-0 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-clay-500/80" />
      </div>
    </motion.aside>
  )
}

export default GuideCharacter
