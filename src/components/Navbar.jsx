import React from 'react'
import BrandLogo from './BrandLogo'

export default function Navbar({ setScreen, language, setLanguage, languageOptions }) {
  return (
    <header className="w-full flex justify-between items-center px-6 py-3 bg-amber-100 shadow-sm sticky top-0 z-40 border-b border-amber-200">
      <div className="flex items-center">
        <BrandLogo />
      </div>

      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setScreen('home')} className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-white/70 transition-colors">Home</button>
        <button type="button" onClick={() => setScreen('frames')} className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-white/70 transition-colors">Story</button>
        <button type="button" onClick={() => setScreen('badges')} className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-white/70 transition-colors">Badges</button>
        <button type="button" onClick={() => setScreen('register')} className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-white/70 transition-colors">Registration</button>
        {languageOptions && setLanguage && (
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {languageOptions.map((lang) => (
              <option key={lang.key} value={lang.key}>{lang.label}</option>
            ))}
          </select>
        )}
      </div>
    </header>
  )
}
