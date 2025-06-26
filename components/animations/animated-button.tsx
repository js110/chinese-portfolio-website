"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
}

export function AnimatedButton({ children, className = "", onClick, variant = "primary" }: AnimatedButtonProps) {
  const baseClasses = "relative overflow-hidden rounded-xl px-4 py-2 font-bold text-sm transition-all duration-300"
  const variantClasses = {
    primary: "bg-[#dce8f3] text-[#121416] hover:bg-blue-200",
    secondary: "bg-[#f1f2f4] text-[#121416] hover:bg-gray-200",
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
