"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditModeToggle } from "@/components/EditModeToggle"
import { useEditMode } from "@/contexts/EditModeContext"
import { X } from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { isLoggedIn, logout } = useEditMode()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 导航菜单 */}
      <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">菜单</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* 导航链接 */}
          <nav className="flex-1 p-4 space-y-4">
            <Link 
              className="block text-base font-medium text-gray-900 hover:text-blue-600 py-2 transition-colors" 
              href="/"
              onClick={onClose}
            >
              首页
            </Link>
            <Link 
              className="block text-base font-medium text-gray-900 hover:text-blue-600 py-2 transition-colors" 
              href="/projects"
              onClick={onClose}
            >
              项目
            </Link>
            <Link 
              className="block text-base font-medium text-gray-900 hover:text-blue-600 py-2 transition-colors" 
              href="/resume"
              onClick={onClose}
            >
              简历
            </Link>
          </nav>

          {/* 底部操作 */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {isLoggedIn ? (
              <>
                <EditModeToggle />
                <Button 
                  className="w-full bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200" 
                  onClick={() => {
                    logout()
                    onClose()
                  }}
                >
                  退出登录
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200"
                onClick={onClose}
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 