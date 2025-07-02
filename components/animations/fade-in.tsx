"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useRef, useEffect, useState } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  performanceMode?: boolean
  lazy?: boolean
}

export function FadeIn({ children, delay = 0, direction = "up", className = "", performanceMode = false, lazy = false }: FadeInProps) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
  }

  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(!lazy)

  useEffect(() => {
    if (!lazy || !ref.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [lazy])

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={inView ? {
        opacity: 1,
        x: 0,
        y: 0,
      } : {
        opacity: 0,
        ...directions[direction],
      }}
      transition={{
        duration: performanceMode ? 0.3 : 0.6,
        delay,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
