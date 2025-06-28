"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  src?: string
  alt: string
  className?: string
  fallbackSrc?: string
  sizes?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
  aspectRatio?: 'square' | 'video' | 'auto'
  lazy?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder.jpg',
  sizes = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  },
  aspectRatio = 'auto',
  lazy = true,
}: ResponsiveImageProps) {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (src) {
      setImageSrc(src)
      setIsLoading(true)
      setHasError(false)
    }
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc)
    }
  }

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  }

  const loadingClasses = isLoading ? 'animate-pulse bg-gray-200' : ''

  return (
    <div className={cn(
      'relative overflow-hidden',
      aspectRatioClasses[aspectRatio],
      loadingClasses,
      className
    )}>
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        sizes={`(max-width: 640px) ${sizes.mobile}, (max-width: 1024px) ${sizes.tablet}, ${sizes.desktop}`}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-gray-400 text-sm">图片加载失败</div>
        </div>
      )}
    </div>
  )
} 