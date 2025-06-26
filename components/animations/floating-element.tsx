"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FloatingElement({ children, className = "", delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
