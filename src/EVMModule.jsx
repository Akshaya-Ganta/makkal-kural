import { useState } from 'react'
import { motion } from 'framer-motion'
import { translations } from './translations'

export default function EVMModule({ language, onBack }) {
  const t = translations[language] || translations.en
  const [step, setStep] = useState(1)

  const steps = [
    {
      title: t.evm?.step1Title || 'What is an EVM?',
      description: t.evm?.step1Desc || 'An Electronic Voting Machine (EVM) is a device that records votes electronically. It ensures accuracy and prevents tampering.',
      highlight: null,
    },
    {
      title: t.evm?.step2Title || 'How to Press the Button',
      description: t.evm?.step2Desc || 'Find the button next to the candidate name you want to vote for. Press it firmly and hold for a moment.',
      highlight: 'button',
    },
    {
      title: t.evm?.step3Title || 'Beep & Light Confirmation',
      description: t.evm?.step3Desc || 'When you press a button, you will hear a beep and see a light. This confirms your vote is being recorded.',
      highlight: 'light',
    },
    {
      title: t.evm?.step4Title || 'Vote Recorded',
      description: t.evm?.step4Desc || 'Your vote has been recorded securely inside the machine. No one can know who you voted for.',
      highlight: 'check',
    },
  ]

  const currentStep = steps[step - 1] || steps[0]
  const canNext = step < steps.length
  const canPrev = step > 1

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
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold text-amber-900">{t.evm?.title || 'What is an EVM?'}</h1>
          <p className="text-sm text-amber-800">{t.evm?.subtitle || 'Learn how electronic voting machines work'}</p>
        </motion.div>

        {/* Step Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex gap-1"
        >
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i + 1 <= step ? 'bg-amber-700' : 'bg-amber-200'
              }`}
            />
          ))}
        </motion.div>

        {/* EVM Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center py-4"
        >
          <div className="relative">
            <img src="/system.png" alt="EVM Machine" className="h-64 object-contain drop-shadow-lg" />
            
            {/* Overlay Highlights */}
            {currentStep.highlight === 'button' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="pointer-events-none absolute bottom-8 left-4 h-12 w-12 rounded-lg border-4 border-red-500"
              />
            )}
            
            {currentStep.highlight === 'light' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="pointer-events-none absolute top-6 right-6 h-8 w-8 rounded-full border-4 border-yellow-400"
              />
            )}
            
            {currentStep.highlight === 'check' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="text-4xl">✓</div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="mb-3 text-xl font-semibold text-amber-900">{currentStep.title}</h2>
          <p className="leading-relaxed text-gray-700">{currentStep.description}</p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-between"
        >
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={!canPrev}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              canPrev
                ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                : 'bg-amber-100 text-amber-400 cursor-not-allowed'
            }`}
          >
            ← {t.previous || 'Previous'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-amber-800">
              {step} / {steps.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setStep(Math.min(steps.length, step + 1))}
            disabled={!canNext}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              canNext
                ? 'bg-amber-700 text-white hover:bg-amber-800'
                : 'bg-amber-600 text-white'
            }`}
          >
            {canNext ? t.next || 'Next' : t.complete || 'Complete'} →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
