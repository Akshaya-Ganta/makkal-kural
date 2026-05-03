import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { translations } from './translations'

function Home({ userData, progress = 0, language, setScreen }) {
  const t = translations[language] || translations.en
  const [shareState, setShareState] = useState('')
  const [checklist, setChecklist] = useState([])

  // Load checklist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('voterChecklist')
    if (saved) {
      setChecklist(JSON.parse(saved))
    } else {
      setChecklist([
        { id: 1, label: t.checklist?.item1 || 'Carry valid ID', completed: false },
        { id: 2, label: t.checklist?.item2 || 'Check polling booth location', completed: false },
        { id: 3, label: t.checklist?.item3 || 'Follow queue discipline', completed: false },
        { id: 4, label: t.checklist?.item4 || 'No mobile inside booth', completed: false },
      ])
    }
  }, [t])

  const toggleChecklistItem = (id) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    setChecklist(updated)
    localStorage.setItem('voterChecklist', JSON.stringify(updated))
  }

  const badges = useMemo(
    () => [
      { id: 'first', icon: '🌱', label: t.badges.firstStep, unlocked: progress >= 30 },
      { id: 'informed', icon: '📖', label: t.badges.informedVoter, unlocked: progress >= 60 },
      { id: 'ready', icon: '🏅', label: t.badges.readyToVote, unlocked: progress >= 100 },
    ],
    [progress, t.badges.firstStep, t.badges.informedVoter, t.badges.readyToVote]
  )

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Voting Journey',
          text: "I'm getting ready to vote responsibly!",
          url: window.location.href,
        })
        setShareState(t.shareSuccess)
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
        setShareState(t.shareCopied)
        return
      }

      setShareState(t.shareUnavailable)
    } catch {
      setShareState(t.shareUnavailable)
    }
  }

  return (
    <div className="min-h-screen bg-amber-100 text-gray-700">
      <main className="pt-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6"
        >
          {/* Welcome & Progress */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-amber-200 bg-yellow-50/90 p-6 shadow-md"
          >
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {t.welcome}, {userData?.name || t.guestName}
            </h1>
            <p className="mt-2 text-base text-gray-600 sm:text-lg">{t.subtitle}</p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"
            >
              <p className="text-sm font-medium text-gray-700">{t.progressTitle}</p>
              <div className="mt-3 h-3 w-full rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-green-500 transition-all duration-700"
                  style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">{Math.round(progress)}%</p>
            </motion.div>
          </motion.section>

          {/* Booth Information */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-amber-200 bg-yellow-50/90 p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-amber-900">{t.booth?.title || 'Your Booth Information'}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-medium text-gray-700">{t.booth?.constituency || 'Constituency'}</p>
                  <p className="text-gray-600">{userData?.constituency || t.notProvided || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🗺️</span>
                <div>
                  <p className="font-medium text-gray-700">{t.booth?.district || 'District'}</p>
                  <p className="text-gray-600">{userData?.district || t.notProvided || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🏘️</span>
                <div>
                  <p className="font-medium text-gray-700">{t.booth?.city || 'City'}</p>
                  <p className="text-gray-600">{userData?.city || t.notProvided || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3"
            >
              <p className="text-xs font-medium text-blue-900">
                <span className="inline-block mr-2">ℹ️</span>
                {t.booth?.hours || 'Voting Hours:'} <strong>7 AM – 6 PM</strong>
              </p>
              <p className="text-xs text-blue-800 mt-2">
                {t.booth?.required || 'Carry:'} <strong>{t.booth?.id || 'Valid ID'}</strong>
              </p>
              <p className="text-xs text-blue-700 mt-3 italic">
                {t.booth?.note || '📌 Verify booth location on the official election website before voting day.'}
              </p>
            </motion.div>
          </motion.section>

          {/* Voter Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-amber-200 bg-yellow-50/90 p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-amber-900">{t.checklist?.title || 'Voter Checklist'}</h2>
            <p className="mt-1 text-sm text-gray-600">{t.checklist?.subtitle || 'Click items to mark as complete'}</p>

            <div className="mt-4 space-y-3">
              {checklist.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`w-full flex items-center gap-3 rounded-lg border-2 p-3 transition-all ${
                    item.completed
                      ? 'border-green-300 bg-green-50'
                      : 'border-amber-200 bg-white hover:bg-amber-50'
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded border-2 font-bold transition-colors ${
                      item.completed
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {item.completed && '✓'}
                  </div>
                  <span className={`text-sm font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-xs text-amber-800 flex items-center gap-2"
            >
              <span>✓</span>
              {checklist.filter(i => i.completed).length} / {checklist.length} {t.checklist?.completed || 'completed'}
            </motion.p>
          </motion.section>

          {/* Badges */}
          <section className="rounded-2xl border border-amber-200 bg-yellow-50/90 p-6 shadow-md">
            <h2 className="text-lg font-semibold">{t.badgesTitle}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: badge.unlocked ? 1 : 0.97 }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.2 }}
                  className={`rounded-2xl border border-amber-200 bg-yellow-100 p-4 text-center shadow-md ${
                    badge.unlocked ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'
                  }`}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-200 text-2xl shadow-sm">
                    {badge.icon}
                  </div>
                  <p className="mt-3 text-sm font-medium">{badge.label}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="rounded-2xl border border-amber-200 bg-yellow-50/90 p-6 shadow-md">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-medium shadow-md hover:bg-amber-200 transition"
              >
                {t.share}
              </button>
              <button
                type="button"
                onClick={() => setScreen('frames')}
                className="rounded-xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-medium shadow-md hover:bg-amber-200 transition"
              >
                {t.continueActions.story}
              </button>
              <button
                type="button"
                onClick={() => setScreen('modules')}
                className="rounded-xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-medium shadow-md hover:bg-amber-200 transition"
              >
                {t.continueActions.learning}
              </button>
              <button
                type="button"
                onClick={() => setScreen('quiz')}
                className="rounded-xl border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-medium shadow-md hover:bg-amber-200 transition"
              >
                {t.quiz?.title || 'Take Quiz'}
              </button>
              <button
                type="button"
                onClick={() => setScreen('register')}
                className="rounded-xl border border-amber-300 bg-yellow-50 px-5 py-3 text-sm font-medium shadow-md hover:bg-yellow-100 transition"
              >
                {t.continueActions.edit}
              </button>
            </div>
            {shareState ? <p className="mt-3 text-xs text-gray-600">{shareState}</p> : null}
          </section>
        </motion.div>
      </main>
    </div>
  )
}

export default Home

