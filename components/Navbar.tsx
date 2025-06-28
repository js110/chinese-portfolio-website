"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditModeToggle } from "@/components/EditModeToggle"
import { useEditMode } from "@/contexts/EditModeContext"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { useState } from "react"
import { LoginDialog } from "@/components/LoginDialog"
import { Globe, Menu, X } from "lucide-react"

export function Navbar() {
  const { isLoggedIn, logout } = useEditMode()
  const { data } = usePortfolioData()
  const [showLogin, setShowLogin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const personalInfo = data?.personalInfo || {}

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-4 sm:px-6 lg:px-10 py-3 bg-white z-40">
      <div className="flex items-center gap-4 text-[#121416]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Globe className="w-6 h-6" />
          <span className="hidden sm:inline">我的主页</span>
          <span className="sm:hidden">主页</span>
        </Link>
      </div>

      {/* 桌面端导航 */}
      <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <div className="flex items-center gap-9">
          <Link className="text-[#121416] text-sm font-medium leading-normal hover:text-blue-600" href="/">
            首页
          </Link>
          <Link className="text-[#121416] text-sm font-medium leading-normal hover:text-blue-600" href="/projects">
            项目
          </Link>
          <Link className="text-[#121416] text-sm font-medium leading-normal hover:text-blue-600" href="/resume">
            简历
          </Link>
        </div>
        {personalInfo.avatar ? (
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shadow"
            style={{ backgroundImage: `url(${personalInfo.avatar})` }}
          />
        ) : (
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-300" />
        )}
        {isLoggedIn ? (
          <>
            <EditModeToggle className="ml-2" />
            <Button className="bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200 ml-2" onClick={logout}>退出登录</Button>
          </>
        ) : (
          <Button className="bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200 ml-2" onClick={() => setShowLogin(true)}>登录</Button>
        )}
      </div>

      {/* 移动端汉堡菜单按钮 */}
      <div className="md:hidden flex items-center gap-2">
        {personalInfo.avatar ? (
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shadow"
            style={{ backgroundImage: `url(${personalInfo.avatar})` }}
          />
        ) : (
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 bg-gray-300" />
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link 
              className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" 
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" 
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              项目
            </Link>
            <Link 
              className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" 
              href="/resume"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              简历
            </Link>
            <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <EditModeToggle />
                  <Button className="bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200" onClick={logout}>退出登录</Button>
                </>
              ) : (
                <Button className="bg-[#f1f2f4] text-[#121416] border-none hover:bg-gray-200" onClick={() => setShowLogin(true)}>登录</Button>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  )
} 