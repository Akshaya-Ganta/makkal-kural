import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { translations } from './translations'

const languages = [
  { key: 'en', label: 'English' },
  { key: 'ta', label: 'தமிழ்' },
  { key: 'hi', label: 'हिंदी' },
  { key: 'te', label: 'తెలుగు' },
]

function Registration({
  language,
  setLanguage,
  userData,
  setUserData,
  onSubmit,
}) {
  const [isLeaving, setIsLeaving] = useState(false)
  const t = translations[language]
  const ageValue = Number(userData.age)
  const hasAge = userData.age !== '' && !Number.isNaN(ageValue)

  const ageMessage = hasAge
    ? ageValue < 18
      ? t.ageUnder18
      : t.ageEligible
    : ''

  const updateField = (field) => (event) => {
    const value = field === 'age' ? event.target.value.replace(/[^0-9]/g, '') : event.target.value
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isLeaving) return
    setIsLeaving(true)
  }

  useEffect(() => {
    if (!isLeaving) return undefined

    const timer = window.setTimeout(() => {
      onSubmit?.()
    }, 600)

    return () => window.clearTimeout(timer)
  }, [isLeaving, onSubmit])

  return (
    <section className="relative min-h-screen overflow-hidden bg-amber-100 px-5 py-10 text-gray-700 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ originX: 0.5, originY: 0.5 }}
        animate={isLeaving ? { opacity: 0, scale: 0.95, y: 10 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: isLeaving ? 0.6 : 1, ease: 'easeInOut' }}
        className="mx-auto w-full max-w-3xl rounded-3xl border border-amber-200 bg-yellow-50/95 p-6 shadow-[0_24px_55px_rgba(102,74,45,0.16)] sm:p-10"
      >
        <h2 className="text-center text-3xl font-semibold">{t.registrationTitle}</h2>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium">{t.language}</p>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.key}
                type="button"
                onClick={() => setLanguage(lang.key)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  language === lang.key
                    ? 'border-amber-400 bg-amber-100'
                    : 'border-amber-200 bg-yellow-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.name}</span>
            <input
              value={userData.name}
              onChange={updateField('name')}
              placeholder={t.namePlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>{t.age}</span>
            <input
              value={userData.age}
              onChange={updateField('age')}
              placeholder={t.agePlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
              inputMode="numeric"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>{t.dob}</span>
            <input
              value={userData.dob}
              onChange={updateField('dob')}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="date"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>{t.constituency}</span>
            <input
              value={userData.constituency}
              onChange={updateField('constituency')}
              placeholder={t.constituencyPlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>{t.district}</span>
            <input
              value={userData.district}
              onChange={updateField('district')}
              placeholder={t.districtPlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span>{t.city}</span>
            <input
              value={userData.city}
              onChange={updateField('city')}
              placeholder={t.cityPlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm sm:col-span-2">
            <span>{t.pincode}</span>
            <input
              value={userData.pincode}
              onChange={updateField('pincode')}
              placeholder={t.pincodePlaceholder}
              className="rounded-xl border border-amber-200 bg-yellow-50 px-4 py-3 outline-none focus:border-amber-300"
              type="text"
              inputMode="numeric"
            />
          </label>
        
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: ageMessage ? 1 : 0 }}
            transition={{ duration: 0.9 }}
            className="sm:col-span-2 mt-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm"
          >
            {ageMessage}
          </motion.p>

          <button
            type="submit"
            className="sm:col-span-2 mt-2 w-fit rounded-full border border-amber-300 bg-amber-100 px-7 py-3 text-sm font-medium"
          >
            {t.continue}
          </button>
        </form>
      </motion.div>
    </section>
  )
}

export default Registration
