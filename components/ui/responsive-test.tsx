"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Smartphone, Tablet, Monitor } from 'lucide-react'

interface ResponsiveTestProps {
  children: React.ReactNode
}

const deviceConfigs = {
  mobile: {
    name: '手机',
    icon: Smartphone,
    width: '375px',
    maxWidth: '375px',
  },
  tablet: {
    name: '平板',
    icon: Tablet,
    width: '768px',
    maxWidth: '768px',
  },
  desktop: {
    name: '桌面',
    icon: Monitor,
    width: '100%',
    maxWidth: 'none',
  },
}

export function ResponsiveTest({ children }: ResponsiveTestProps) {
  const [currentDevice, setCurrentDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isTestMode, setIsTestMode] = useState(false)

  if (!isTestMode) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsTestMode(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          响应式测试
        </Button>
      </div>
    )
  }

  const currentConfig = deviceConfigs[currentDevice]
  const IconComponent = currentConfig.icon

  return (
    <div className="fixed inset-0 z-50 bg-gray-100">
      {/* 测试工具栏 */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">响应式测试模式</h2>
          <div className="flex gap-2">
            {Object.entries(deviceConfigs).map(([device, config]) => {
              const DeviceIcon = config.icon
              return (
                <Button
                  key={device}
                  variant={currentDevice === device ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentDevice(device as any)}
                  className="flex items-center gap-2"
                >
                  <DeviceIcon className="w-4 h-4" />
                  {config.name}
                </Button>
              )
            })}
          </div>
        </div>
        <Button
          onClick={() => setIsTestMode(false)}
          variant="outline"
          size="sm"
        >
          退出测试
        </Button>
      </div>

      {/* 设备预览区域 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{
              width: currentConfig.width,
              maxWidth: currentConfig.maxWidth,
              minHeight: '600px',
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* 设备信息 */}
      <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium">{currentConfig.name}</p>
            <p className="text-xs text-gray-500">
              {currentConfig.width === '100%' ? '全宽' : currentConfig.width}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 