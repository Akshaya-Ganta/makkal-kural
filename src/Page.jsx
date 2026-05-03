import { motion } from 'framer-motion'

function Page({ side = 'left', children, className = '' }) {
  const sideClasses =
    side === 'left'
      ? 'rounded-l-2xl border-r border-amber-200/70'
      : 'rounded-r-2xl border-l border-amber-200/70'

  return (
    <motion.div
      className={`relative h-full w-1/2 overflow-hidden border border-amber-200/80 bg-yellow-50 shadow-[inset_0_0_24px_rgba(180,140,90,0.12)] ${sideClasses} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.08)), repeating-linear-gradient(to bottom, rgba(210,170,120,0.05), rgba(210,170,120,0.05) 1px, transparent 1px, transparent 26px)',
      }}
    >
      {children}
    </motion.div>
  )
}

export default Page
