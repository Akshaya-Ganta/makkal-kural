import { motion } from 'framer-motion'
import { translations } from './translations'

export default function LeaderModule({ language, onBack }) {
  const t = translations[language] || translations.en

  const tips = [
    {
      icon: '🔍',
      title: t.leader?.tip1Title || 'Research Candidates',
      desc: t.leader?.tip1Desc || 'Know the background, education, and previous work of candidates.',
    },
    {
      icon: '📜',
      title: t.leader?.tip2Title || 'Check Track Record',
      desc: t.leader?.tip2Desc || 'Look at what they have done for the community in the past.',
    },
    {
      icon: '💬',
      title: t.leader?.tip3Title || 'Focus on Policies',
      desc: t.leader?.tip3Desc || 'Understand their plans for education, healthcare, and development.',
    },
    {
      icon: '⚠️',
      title: t.leader?.tip4Title || 'Avoid False Promises',
      desc: t.leader?.tip4Desc || 'Be skeptical of unrealistic promises. Ask for evidence and proof.',
    },
    {
      icon: '🤔',
      title: t.leader?.tip5Title || 'Think Independently',
      desc: t.leader?.tip5Desc || 'Do not vote based on caste, religion, or family pressure.',
    },
    {
      icon: '🗳️',
      title: t.leader?.tip6Title || 'Your Choice Matters',
      desc: t.leader?.tip6Desc || 'Vote for someone who can bring positive change to your area.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const tipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
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
          <h1 className="text-3xl font-bold text-amber-900">{t.leader?.title || 'Choosing the Right Leader'}</h1>
          <p className="mt-2 text-sm text-amber-800">
            {t.leader?.subtitle || 'Make an informed choice that shapes your community'}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex justify-center"
        >
          <img src="/winner.png" alt="Leader Selection" className="h-56 object-contain drop-shadow-lg" />
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              variants={tipVariants}
              whileHover="hover"
              className="rounded-lg bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3 text-3xl">{tip.icon}</div>
              <h3 className="mb-2 font-semibold text-amber-900">{tip.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{tip.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Takeaway */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 p-6 border border-amber-300"
        >
          <h3 className="mb-3 font-bold text-amber-900">{t.leader?.keyTakeaway || 'Remember'}</h3>
          <p className="text-sm leading-relaxed text-amber-900">
            {t.leader?.takeawayDesc || 'A good leader listens to people, works for the community\'s welfare, and is accountable for their promises. Take your time, gather information, and vote with confidence.'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
