import { motion } from 'framer-motion'
import { translations } from './translations'

function Badges({ language, progress = 0 }) {
  const t = translations[language] || translations.en

  const badges = [
    {
      id: 'first',
      icon: '🌱',
      label: t.badges?.firstStep || 'First Step',
      unlocked: progress >= 30,
      color: 'from-green-400 to-emerald-500',
      accentColor: 'bg-green-600',
    },
    {
      id: 'informed',
      icon: '📖',
      label: t.badges?.informedVoter || 'Informed Voter',
      unlocked: progress >= 60,
      color: 'from-blue-400 to-cyan-500',
      accentColor: 'bg-blue-600',
    },
    {
      id: 'ready',
      icon: '🏅',
      label: t.badges?.readyToVote || 'Ready to Vote',
      unlocked: progress >= 100,
      color: 'from-amber-400 to-orange-500',
      accentColor: 'bg-amber-600',
    },
  ]

  return (
    <section className="min-h-screen bg-amber-100 px-5 py-10 text-gray-700 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mx-auto w-full max-w-5xl"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-amber-900">{t.badgesTitle || 'Badges'}</h2>
          <p className="mt-2 text-sm text-amber-800">🎖️ {t.badgesSubtitle || 'Unlock badges as you progress'}</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-block rounded-full bg-white px-4 py-2 shadow-md"
          >
            <p className="text-lg font-bold text-amber-700">{Math.round(progress)}% {t.complete || 'Complete'}</p>
          </motion.div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={badge.unlocked ? { y: -8, scale: 1.05 } : {}}
              className="perspective"
            >
              <div
                className={`relative rounded-3xl p-8 shadow-xl transition-all duration-300 ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.color}`
                    : 'bg-gray-300'
                }`}
              >
                {/* Shine effect (enamel style) */}
                {badge.unlocked && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-transparent to-transparent opacity-40"
                      animate={{ opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 rounded-3xl shadow-inset opacity-20" />
                  </>
                )}

                {/* Badge Icon Container */}
                <motion.div
                  className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
                    badge.unlocked
                      ? `${badge.accentColor} shadow-lg`
                      : 'bg-gray-400 shadow-md'
                  } text-5xl transition-transform`}
                  animate={badge.unlocked ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {badge.icon}

                  {/* Highlight on icon */}
                  {badge.unlocked && (
                    <motion.div
                      className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white opacity-30"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Badge Label */}
                <div className="relative mt-6 text-center">
                  <p className={`text-lg font-bold ${badge.unlocked ? 'text-white drop-shadow-md' : 'text-gray-500'}`}>
                    {badge.label}
                  </p>

                  {/* Lock indicator for locked badges */}
                  {!badge.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="mt-2 text-2xl"
                    >
                      🔒
                    </motion.div>
                  )}

                  {/* Unlock progress for locked badges */}
                  {!badge.unlocked && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.4 }}
                      className="mt-2 text-xs text-gray-600"
                    >
                      {index === 0 && `${Math.round(progress)}% / 30%`}
                      {index === 1 && `${Math.round(progress)}% / 60%`}
                      {index === 2 && `${Math.round(progress)}% / 100%`}
                    </motion.p>
                  )}

                  {/* Unlocked star animation */}
                  {badge.unlocked && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, type: 'spring' }}
                      className="mt-2 text-2xl"
                    >
                      ⭐
                    </motion.div>
                  )}
                </div>

                {/* Border glow for unlocked */}
                {badge.unlocked && (
                  <motion.div
                    className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${badge.color} opacity-30 blur`}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-2xl bg-white border-2 border-amber-200 p-6 text-center shadow-md"
        >
          {progress >= 100 ? (
            <p className="text-lg font-semibold text-green-700">
              🎉 {t.badgeComplete || 'Congratulations! You are ready to vote with confidence!'}
            </p>
          ) : progress >= 60 ? (
            <p className="text-lg font-semibold text-blue-700">
              📚 {t.badgeProgress || 'You are well-informed! One more badge to unlock.'}
            </p>
          ) : (
            <p className="text-lg font-semibold text-amber-700">
              🌱 {t.badgeStart || 'Great start! Keep learning to unlock more badges.'}
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Badges

