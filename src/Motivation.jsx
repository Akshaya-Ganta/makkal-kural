import { motion } from 'framer-motion'
import { translations } from './translations'

function Motivation({ language, onStart }) {
  const t = translations[language]

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100 px-6 text-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl rounded-3xl border border-amber-200/80 bg-yellow-50/95 p-10 text-center shadow-[0_24px_55px_rgba(102,74,45,0.18)]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95 }}
          className="text-3xl font-semibold leading-tight sm:text-4xl"
        >
          {t.question}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 text-lg"
        >
          {t.subtitle}
        </motion.p>

        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="mt-10 rounded-full border border-amber-300 bg-amber-100 px-8 py-3 font-medium text-gray-700 shadow-sm"
        >
          {t.start}
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Motivation
