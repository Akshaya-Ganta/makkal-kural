import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { translations } from './translations'

export default function QuizScreen({ language, onComplete, onBack }) {
  const t = translations[language] || translations.en
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [showScore, setShowScore] = useState(false)

  const questions = [
    {
      question: t.quiz?.q1 || 'Can you use your mobile phone inside the voting booth?',
      options: [
        { text: t.quiz?.q1o1 || 'Yes, it is allowed', correct: false },
        { text: t.quiz?.q1o2 || 'No, it is strictly prohibited', correct: true },
        { text: t.quiz?.q1o3 || 'Only for emergencies', correct: false },
      ],
      explanation: t.quiz?.q1exp || 'Mobile phones are not allowed inside the voting booth to maintain secrecy and prevent unauthorized recording.',
    },
    {
      question: t.quiz?.q2 || 'Is your vote private and confidential?',
      options: [
        { text: t.quiz?.q2o1 || 'No, everyone knows who you voted for', correct: false },
        { text: t.quiz?.q2o2 || 'Yes, your vote is completely private', correct: true },
        { text: t.quiz?.q2o3 || 'Only if you are 18 years old', correct: false },
      ],
      explanation: t.quiz?.q2exp || 'Your vote is sacred and confidential. No one can know who you voted for. This is a fundamental right.',
    },
    {
      question: t.quiz?.q3 || 'Do you need to carry a valid ID to vote?',
      options: [
        { text: t.quiz?.q3o1 || 'No, your name is enough', correct: false },
        { text: t.quiz?.q3o2 || 'Yes, a valid ID is required', correct: true },
        { text: t.quiz?.q3o3 || 'Only for first-time voters', correct: false },
      ],
      explanation: t.quiz?.q3exp || 'You must carry a valid ID like a voter card, passport, Aadhaar, or driver\'s license to vote.',
    },
  ]

  const score = useMemo(() => {
    return selectedAnswers.reduce((acc, idx, qIdx) => {
      const q = questions[qIdx]
      if (q && q.options[idx]?.correct) {
        return acc + 1
      }
      return acc
    }, 0)
  }, [selectedAnswers, questions])

  const handleAnswerSelect = (optionIdx) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIdx
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (showScore) {
    return (
      <div className="min-h-screen bg-amber-100 text-gray-700">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6 pt-2">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm hover:bg-amber-50"
          >
            ← {t.back || 'Back'}
          </motion.button>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 p-8 text-center shadow-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-4 text-5xl font-bold text-amber-900"
            >
              {score} / {questions.length}
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-amber-900">
              {score === questions.length
                ? t.quiz?.perfect || 'Perfect Score! 🎉'
                : score >= 2
                  ? t.quiz?.good || 'Great Job! 👍'
                  : t.quiz?.tryAgain || 'Good Effort! 📚'}
            </h2>

            <p className="text-amber-800">
              {score === questions.length
                ? t.quiz?.perfectMsg || 'You are fully prepared for voting!'
                : score >= 2
                  ? t.quiz?.goodMsg || 'You understand the voting process well!'
                  : t.quiz?.tryAgainMsg || 'Review the learning modules to strengthen your knowledge.'}
            </p>
          </motion.div>

          {/* Answer Review */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-amber-900">{t.quiz?.review || 'Answer Review'}</h3>

            {questions.map((q, idx) => {
              const selectedOption = selectedAnswers[idx]
              const isCorrect = q.options[selectedOption]?.correct

              return (
                <div key={idx} className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-start gap-3">
                    <span className={`mt-0.5 inline-block h-6 w-6 rounded-full text-center text-sm font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{q.question}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {t.quiz?.youSelected || 'You selected:'} <strong>{q.options[selectedOption]?.text}</strong>
                      </p>
                      {!isCorrect && (
                        <p className="mt-1 text-sm text-green-700">
                          {t.quiz?.correct || 'Correct answer:'} <strong>{q.options.find((o) => o.correct)?.text}</strong>
                        </p>
                      )}
                      <p className="mt-2 text-sm italic text-amber-800">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <button
              type="button"
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswers([])
                setShowScore(false)
              }}
              className="flex-1 rounded-lg bg-amber-600 px-4 py-3 font-medium text-white hover:bg-amber-700 transition"
            >
              {t.quiz?.retake || 'Retake Quiz'}
            </button>

            <button
              type="button"
              onClick={onComplete}
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 transition"
            >
              {t.quiz?.done || 'Done'}
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  const q = questions[currentQuestion]
  const selectedIdx = selectedAnswers[currentQuestion] ?? -1

  return (
    <div className="min-h-screen bg-amber-100 text-gray-700">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6 pt-2">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm hover:bg-amber-50"
        >
          ← {t.back || 'Back'}
        </motion.button>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-1"
        >
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < currentQuestion
                  ? 'bg-green-500'
                  : i === currentQuestion
                    ? 'bg-amber-700'
                    : 'bg-amber-200'
              }`}
            />
          ))}
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-amber-900">{q.question}</h2>
              <p className="mt-2 text-sm text-amber-800">
                {t.quiz?.question || 'Question'} {currentQuestion + 1} {t.quiz?.of || 'of'} {questions.length}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`w-full rounded-lg p-4 text-left transition ${
                    selectedIdx === idx
                      ? 'bg-amber-700 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-amber-50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        selectedIdx === idx
                          ? 'border-white bg-white'
                          : 'border-amber-300 bg-white'
                      }`}
                    >
                      {selectedIdx === idx && <div className="h-2 w-2 rounded-full bg-amber-700" />}
                    </div>
                    <span className="font-medium">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 justify-between"
        >
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              currentQuestion === 0
                ? 'bg-amber-100 text-amber-400 cursor-not-allowed'
                : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
            }`}
          >
            ← {t.previous || 'Previous'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={selectedIdx === -1}
            className={`rounded-lg px-4 py-2 font-medium transition ${
              selectedIdx === -1
                ? 'bg-amber-100 text-amber-400 cursor-not-allowed'
                : 'bg-amber-700 text-white hover:bg-amber-800'
            }`}
          >
            {currentQuestion === questions.length - 1 ? t.quiz?.submit || 'Submit' : t.next || 'Next'} →
          </button>
        </motion.div>
      </div>
    </div>
  )
}
