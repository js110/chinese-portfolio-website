// 响应式动画配置
export const RESPONSIVE_ANIMATIONS = {
  // 根据设备性能调整动画
  fadeIn: {
    mobile: { duration: 0.3, delay: 0.1 },
    tablet: { duration: 0.4, delay: 0.2 },
    desktop: { duration: 0.5, delay: 0.3 },
  },
  
  stagger: {
    mobile: { delay: 0.1 },
    tablet: { delay: 0.15 },
    desktop: { delay: 0.2 },
  },
  
  scrollReveal: {
    mobile: { threshold: 0.1, distance: '20px' },
    tablet: { threshold: 0.2, distance: '30px' },
    desktop: { threshold: 0.3, distance: '50px' },
  },
  
  floating: {
    mobile: { amplitude: 5, duration: 2 },
    tablet: { amplitude: 8, duration: 2.5 },
    desktop: { amplitude: 10, duration: 3 },
  },
} as const

// 检测设备性能
export const getDevicePerformance = () => {
  if (typeof window === 'undefined') return 'desktop'
  
  // 简单的性能检测
  const connection = (navigator as any).connection
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'mobile'
    }
    if (connection.effectiveType === '3g') {
      return 'tablet'
    }
  }
  
  // 根据屏幕大小推测
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// 获取响应式动画配置
export const getResponsiveAnimation = (type: keyof typeof RESPONSIVE_ANIMATIONS) => {
  const performance = getDevicePerformance()
  return RESPONSIVE_ANIMATIONS[type][performance as keyof typeof RESPONSIVE_ANIMATIONS[typeof type]]
}

// 动画类名生成器
export const getAnimationClasses = (baseClass: string, performance: string) => {
  const classes = {
    mobile: `${baseClass} animate-simple`,
    tablet: `${baseClass} animate-medium`,
    desktop: `${baseClass} animate-full`,
  }
  return classes[performance as keyof typeof classes] || classes.desktop
}

// 简化动画的CSS类
export const SIMPLIFIED_ANIMATIONS = {
  'animate-simple': 'transition-all duration-200',
  'animate-medium': 'transition-all duration-300',
  'animate-full': 'transition-all duration-500',
} as const 