import { motion } from 'framer-motion'

export default function FlipCard({ image, caption = '', size = 'w-56', index = 0 }) {
  console.log(`[FlipCard] Rendering frame ${index} with image: ${image}`)

  const handleImageError = (e) => {
    console.error(`[FlipCard] Image failed to load: ${image}`)
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22280%22%3E%3Crect fill=%22%23f3e8c5%22 width=%22200%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%2392400e%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage not found%3C/text%3E%3C/svg%3E'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="pointer-events-none h-2 w-2 rounded-full bg-gray-700" />
      <div className="pointer-events-none w-[2px] bg-yellow-800" style={{ height: '24px' }} />
      <motion.img
        src={image}
        alt={caption}
        onError={handleImageError}
        onLoad={() => console.log(`[FlipCard] Image loaded successfully: ${image}`)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: [-2, 2, -2] }}
        whileHover={{ scale: 1.05 }}
        transition={{
          opacity: { duration: 0.6, delay: index * 0.2, ease: 'easeOut' },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.2 },
        }}
        className={`${size} drop-shadow-lg object-contain`}
      />
    </div>
  )
}
