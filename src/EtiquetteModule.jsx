import { motion } from 'framer-motion'
import { translations } from './translations'

export default function EtiquetteModule({ language, onBack }) {
  const t = translations[language] || translations.en

  const sections = [
    {
      title: t.etiquette?.preTitle || 'Before Voting',
      icon: '📋',
      items: [
        t.etiquette?.pre1 || 'Carry a valid ID (voter card, passport, or Aadhaar)',
        t.etiquette?.pre2 || 'Arrive at your designated polling booth early',
        t.etiquette?.pre3 || 'Verify your name on the voter roll',
        t.etiquette?.pre4 || 'Check booth location on official website',
      ],
    },
    {
      title: t.etiquette?.duringTitle || 'During Voting',
      icon: '📱❌',
      items: [
        t.etiquette?.during1 || 'No mobile phones or cameras inside the booth',
        t.etiquette?.during2 || 'Maintain the secrecy of your vote',
        t.etiquette?.during3 || 'Follow queue discipline and wait your turn',
        t.etiquette?.during4 || 'Do not ask for help unless you have a disability',
      ],
    },
    {
      title: t.etiquette?.postTitle || 'After Voting',
      icon: '✓',
      items: [
        t.etiquette?.post1 || 'Mark your finger with the provided ink',
        t.etiquette?.post2 || 'Do not share your vote choice with anyone',
        t.etiquette?.post3 || 'Respect others\' right to vote',
        t.etiquette?.post4 || 'Do not take any voting materials out of the booth',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-amber-100 text-gray-700">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 pt-2">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm hover:bg-amber-50"
        >
          ← {t.back || 'Back'}
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-amber-900">{t.etiquette?.title || 'Voting Etiquette & Rules'}</h1>
          <p className="mt-2 text-sm text-amber-800">{t.etiquette?.subtitle || 'Follow these guidelines for a smooth voting experience'}</p>
        </motion.div>

        {/* Finger Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex justify-center"
        >
          <img src="/finger.png" alt="Voting Finger Mark" className="h-48 object-contain drop-shadow-lg" />
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-lg bg-white p-5 shadow-sm"
            >
              <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-amber-900">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h2>

              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <motion.li
                    key={itemIdx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + itemIdx * 0.05 }}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="mt-1 flex-shrink-0 text-amber-600">●</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg bg-amber-50 border-l-4 border-amber-700 p-4"
        >
          <p className="text-sm text-amber-900">
            <strong>{t.etiquette?.noteTitle || 'Remember:'}  </strong>
            {t.etiquette?.noteDesc || 'Your vote is sacred and your choice is confidential. Follow these rules to ensure a fair and peaceful voting process for everyone.'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
