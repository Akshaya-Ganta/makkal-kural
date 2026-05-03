import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'

type UserFormProps = {
  onContinue: (name: string, age: string) => void
}

function UserForm({ onContinue }: UserFormProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !age.trim()) return
    onContinue(name.trim(), age.trim())
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl border border-soil-200 bg-surface/95 p-8 shadow-[0_14px_45px_rgba(76,63,50,0.08)]"
      >
        <h2 className="text-3xl">Before we continue</h2>
        <p className="mt-2 text-sm text-earth-700">Please share a couple of details for your story card.</p>

        <label htmlFor="name" className="mt-8 block text-sm font-semibold text-earth-800">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-xl border border-soil-300 bg-soil-50 px-4 py-3 text-earth-900 outline-none transition focus:border-clay-500"
          placeholder="Enter your name"
          type="text"
        />

        <label htmlFor="age" className="mt-5 block text-sm font-semibold text-earth-800">
          Age
        </label>
        <input
          id="age"
          value={age}
          onChange={(event) => setAge(event.target.value.replace(/[^0-9]/g, ''))}
          className="mt-2 w-full rounded-xl border border-soil-300 bg-soil-50 px-4 py-3 text-earth-900 outline-none transition focus:border-clay-500"
          placeholder="Enter your age"
          type="text"
          inputMode="numeric"
        />

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="mt-8 w-full rounded-full bg-earth-800 px-5 py-3 text-sm font-semibold tracking-wide text-soil-50 transition hover:bg-earth-900"
        >
          Continue
        </motion.button>
      </motion.form>
    </section>
  )
}

export default UserForm
