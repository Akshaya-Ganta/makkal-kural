import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookIntro from './BookIntro'
import Badges from './Badges'
import Home from './Home'
import LearningModules from './LearningModules'
import Motivation from './Motivation'
import Registration from './Registration'
import NextScreen from './NextScreen'
import WallFrames from './WallFrames'
import EVMModule from './EVMModule'
import EtiquetteModule from './EtiquetteModule'
import LeaderModule from './LeaderModule'
import QuizScreen from './QuizScreen'
import Navbar from './components/Navbar'

const STORAGE_USER = 'userData'
const STORAGE_SCREEN = 'currentScreen'

const languageOptions = [
  { key: 'en', label: 'English' },
  { key: 'ta', label: 'Tamil' },
  { key: 'hi', label: 'Hindi' },
  { key: 'te', label: 'Telugu' },
]

const emptyUser = {
  name: '',
  age: '',
  dob: '',
  constituency: '',
  district: '',
  city: '',
  pincode: '',
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro')
  const [isRestored, setIsRestored] = useState(false)
  const [language, setLanguage] = useState('en')
  const [userData, setUserData] = useState(emptyUser)
  const [milestones, setMilestones] = useState({
    registrationCompleted: false,
    viewedFrames: false,
    completedModules: false,
    viewedFinalSummary: false,
  })

  const progress =
    (milestones.registrationCompleted ? 30 : 0) +
    (milestones.viewedFrames ? 30 : 0) +
    (milestones.completedModules ? 20 : 0) +
    (milestones.viewedFinalSummary ? 20 : 0)

  const isRegistered = Boolean(userData?.name)

  useEffect(() => {
    const savedUserRaw = localStorage.getItem(STORAGE_USER)
    const savedScreen = localStorage.getItem(STORAGE_SCREEN)

    if (savedUserRaw) {
      try {
        const savedUser = JSON.parse(savedUserRaw)
        setUserData({ ...emptyUser, ...savedUser })
        setMilestones((prev) => ({ ...prev, registrationCompleted: true }))
        setCurrentScreen(savedScreen || 'home')
      } catch {
        setCurrentScreen('intro')
      }
    } else {
      setCurrentScreen('intro')
    }

    setIsRestored(true)
  }, [])

  useEffect(() => {
    if (!isRestored) return
    localStorage.setItem(STORAGE_SCREEN, currentScreen)
  }, [currentScreen, isRestored])

  const setScreen = (screen) => {
    if (!isRegistered && (screen === 'home' || screen === 'badges')) {
      setCurrentScreen('intro')
      return
    }

    setCurrentScreen(screen)

    if (screen === 'frames') {
      setMilestones((prev) => ({ ...prev, viewedFrames: true }))
    }
    if (screen === 'modules') {
      setMilestones((prev) => ({ ...prev, viewedFrames: true }))
    }
    if (screen === 'summary') {
      setMilestones((prev) => ({ ...prev, viewedFinalSummary: true }))
    }
  }

  const handleRegistrationSubmit = () => {
    const persistedUser = { ...userData }
    localStorage.setItem(STORAGE_USER, JSON.stringify(persistedUser))
    setMilestones((prev) => ({ ...prev, registrationCompleted: true }))
    setScreen('home')
  }

  if (!isRestored) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-100 text-gray-700">
      {currentScreen !== 'intro' && (
        <Navbar 
          setScreen={setScreen} 
          language={language} 
          setLanguage={setLanguage} 
          languageOptions={languageOptions} 
        />
      )}

      <main className="flex-1">

      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookIntro
              language={language}
              setLanguage={setLanguage}
              onComplete={() => setScreen('motivation')}
            />
          </motion.div>
        )}

        {currentScreen === 'motivation' && (
          <motion.div
            key="motivation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Motivation
              language={language}
              setLanguage={setLanguage}
              onStart={() => setScreen('register')}
            />
          </motion.div>
        )}

        {currentScreen === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95 }}
          >
            <Registration
              language={language}
              setLanguage={setLanguage}
              userData={userData}
              setUserData={setUserData}
              onSubmit={handleRegistrationSubmit}
            />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Home
              userData={userData}
              progress={progress}
              language={language}
              setScreen={setScreen}
            />
          </motion.div>
        )}

        {currentScreen === 'badges' && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <Badges language={language} progress={progress} />
          </motion.div>
        )}

        {currentScreen === 'frames' && (
          <motion.div
            key="frames"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WallFrames setScreen={setScreen} onBack={() => setScreen('home')} />
          </motion.div>
        )}

        {currentScreen === 'evm-module' && (
          <motion.div
            key="evm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EVMModule language={language} onBack={() => setScreen('frames')} />
          </motion.div>
        )}

        {currentScreen === 'etiquette-module' && (
          <motion.div
            key="etiquette"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EtiquetteModule language={language} onBack={() => setScreen('frames')} />
          </motion.div>
        )}

        {currentScreen === 'leader-module' && (
          <motion.div
            key="leader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LeaderModule language={language} onBack={() => setScreen('frames')} />
          </motion.div>
        )}

        {currentScreen === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <QuizScreen
              language={language}
              onBack={() => setScreen('home')}
              onComplete={() => setScreen('home')}
            />
          </motion.div>
        )}

        {currentScreen === 'modules' && (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LearningModules
              language={language}
              onBack={() => setScreen('home')}
              onComplete={() => {
                setMilestones((prev) => ({ ...prev, completedModules: true }))
                setScreen('summary')
              }}
            />
          </motion.div>
        )}

        {currentScreen === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NextScreen
              language={language}
              userData={userData}
              onRestart={() => setScreen('home')}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </main>
    </div>
  )
}

export default App
