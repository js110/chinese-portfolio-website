import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const variantClasses = {
  default: 'bg-white shadow-sm',
  elevated: 'bg-white shadow-lg',
  outlined: 'bg-white border border-gray-200',
}

const paddingClasses = {
  none: '',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
}

export function ResponsiveCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = true,
}: ResponsiveCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-300',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:shadow-md hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  )
} 