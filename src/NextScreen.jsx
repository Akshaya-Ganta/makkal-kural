import { motion } from 'framer-motion'
import { translations } from './translations'

function NextScreen({ language, userData, onRestart }) {
  const t = translations[language]

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-100 px-6 text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl rounded-3xl border border-amber-200/80 bg-yellow-50/95 p-8 text-center shadow-[0_24px_55px_rgba(102,74,45,0.18)] sm:p-10"
      >
        <h2 className="text-3xl font-semibold sm:text-4xl">{t.nextTitle}</h2>
        <p className="mt-4 text-lg">{t.nextSubtitle}</p>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-left">
          <p className="text-sm"><span className="font-medium">{t.name}: </span>{userData.name || '-'}</p>
          <p className="mt-2 text-sm"><span className="font-medium">{t.age}: </span>{userData.age || '-'}</p>
          <p className="mt-2 text-sm"><span className="font-medium">{t.city}: </span>{userData.city || '-'}</p>
          <p className="mt-2 text-sm"><span className="font-medium">{t.constituency}: </span>{userData.constituency || '-'}</p>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-8 rounded-full border border-amber-300 bg-amber-100 px-8 py-3 text-sm font-medium"
        >
          {t.start}
        </button>
      </motion.div>
    </section>
  )
}

export default NextScreen
