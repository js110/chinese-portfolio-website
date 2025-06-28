import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
    large?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  autoFit?: boolean
}

const gapClasses = {
  sm: 'gap-2 sm:gap-3 lg:gap-4',
  md: 'gap-4 sm:gap-6 lg:gap-8',
  lg: 'gap-6 sm:gap-8 lg:gap-12',
  xl: 'gap-8 sm:gap-12 lg:gap-16',
}

export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3, large: 4 },
  gap = 'md',
  autoFit = false,
}: ResponsiveGridProps) {
  const gridCols = autoFit
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : `grid-cols-${cols.mobile || 1} sm:grid-cols-${cols.tablet || 2} lg:grid-cols-${cols.desktop || 3} xl:grid-cols-${cols.large || 4}`

  return (
    <div
      className={cn(
        'grid',
        gridCols,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
} 