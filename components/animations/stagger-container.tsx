"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import React from "react"

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  performanceMode?: boolean
  lazy?: boolean
}

export function StaggerContainer({ children, className = "", staggerDelay = 0.1, performanceMode = false, lazy = false }: StaggerContainerProps) {
  const [inView, setInView] = React.useState(!lazy)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
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
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: performanceMode ? 0.05 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "", performanceMode = false }: { children: ReactNode; className?: string; performanceMode?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: performanceMode ? 0.3 : 0.6,
            ease: [0.25, 0.25, 0, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
