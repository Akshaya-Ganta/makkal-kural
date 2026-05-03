import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './components/Intro'
import UserForm from './components/UserForm'
import Scrapbook from './components/Scrapbook'
import LearningFrames from './components/LearningFrames'
import GuideCharacter from './components/GuideCharacter'

type Screen = 'intro' | 'form' | 'scrapbook' | 'learning'

type UserProfile = {
  name: string
  age: string
}

const screenTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [profile, setProfile] = useState<UserProfile>({ name: '', age: '' })

  const guideMessage = useMemo(() => {
    if (screen === 'intro') return 'Listen closely. Every story starts quietly.'
    if (screen === 'form') return 'A small detail: your voice matters.'
    if (screen === 'scrapbook') return 'One choice can shape many lives.'
    return 'Explore each frame to prepare for voting day.'
  }, [screen])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-soil-50 text-earth-900">
      <AnimatePresence mode="wait">
        <motion.section
          key={screen}
          variants={screenTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          {screen === 'intro' && <Intro onContinue={() => setScreen('form')} />}

          {screen === 'form' && (
            <UserForm
              onContinue={(name, age) => {
                setProfile({ name, age })
                setScreen('scrapbook')
              }}
            />
          )}

          {screen === 'scrapbook' && (
            <Scrapbook
              name={profile.name}
              onContinue={() => setScreen('learning')}
            />
          )}

          {screen === 'learning' && (
            <LearningFrames
              name={profile.name}
              age={profile.age}
              onRestart={() => setScreen('intro')}
            />
          )}
        </motion.section>
      </AnimatePresence>

      <GuideCharacter hint={guideMessage} />
    </main>
  )
}

export default App
