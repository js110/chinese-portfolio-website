// 响应式断点常量
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// 设备类型枚举
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const

// 响应式工具类组合
export const RESPONSIVE_CLASSES = {
  // 容器类
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  
  // 网格类
  grid: {
    mobile: 'grid grid-cols-1 gap-4',
    tablet: 'grid grid-cols-2 gap-6',
    desktop: 'grid grid-cols-3 gap-8',
    large: 'grid grid-cols-4 gap-8',
  },
  
  // 文本类
  text: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
    h2: 'text-xl sm:text-2xl lg:text-3xl font-semibold',
    h3: 'text-lg sm:text-xl lg:text-2xl font-medium',
    body: 'text-sm sm:text-base lg:text-lg',
    small: 'text-xs sm:text-sm',
  },
  
  // 间距类
  spacing: {
    section: 'py-8 sm:py-12 lg:py-16',
    container: 'px-4 sm:px-6 lg:px-8',
  },
  
  // 导航类
  nav: {
    mobile: 'flex flex-col space-y-4',
    tablet: 'flex space-x-6',
    desktop: 'flex space-x-8',
  },
} as const

// 响应式工具函数
export const getResponsiveClasses = (baseClass: string, variants: Record<string, string>) => {
  return Object.entries(variants).reduce((acc, [breakpoint, className]) => {
    if (breakpoint === 'base') {
      return `${baseClass} ${className}`
    }
    return `${acc} ${breakpoint}:${className}`
  }, baseClass)
}

// 设备检测工具
export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
export const isTablet = () => typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024
export const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024

// 获取当前设备类型
export const getDeviceType = (): string => {
  if (typeof window === 'undefined') return DEVICE_TYPES.DESKTOP
  
  const width = window.innerWidth
  if (width < 768) return DEVICE_TYPES.MOBILE
  if (width < 1024) return DEVICE_TYPES.TABLET
  return DEVICE_TYPES.DESKTOP
} 