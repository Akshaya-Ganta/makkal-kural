import { motion } from 'framer-motion'
import { translations } from './translations'

function LearningModules({ language, onComplete, onBack }) {
  const t = translations[language] || translations.en

  return (
    <section className="min-h-screen bg-amber-100 px-5 py-10 text-gray-700 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto w-full max-w-3xl rounded-2xl border border-amber-200 bg-yellow-50/95 p-6 shadow-lg sm:p-10"
      >
        <h2 className="text-3xl font-semibold">{t.modulesTitle}</h2>
        <p className="mt-3 text-gray-600">{t.modulesSubtitle}</p>

        <div className="mt-6 grid gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-yellow-100 p-3">{t.moduleOne}</div>
          <div className="rounded-lg bg-yellow-100 p-3">{t.moduleTwo}</div>
          <div className="rounded-lg bg-yellow-100 p-3 sm:col-span-2">{t.moduleThree}</div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onComplete}
            className="rounded-xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-medium shadow-md"
          >
            {t.modulesComplete}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-amber-300 bg-yellow-50 px-5 py-3 text-sm font-medium shadow-md"
          >
            {t.continueActions.home}
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default LearningModules
