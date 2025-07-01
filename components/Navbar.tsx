"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EditModeToggle } from "@/components/EditModeToggle"
import { useEditMode } from "@/contexts/EditModeContext"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { useState } from "react"
import { LoginDialog } from "@/components/LoginDialog"
import { Globe, Menu, X } from "lucide-react"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const { isLoggedIn, logout } = useEditMode()
  const { data } = usePortfolioData()
  const [showLogin, setShowLogin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const personalInfo = data?.personalInfo || {}
  const isMobile = useIsMobile()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f2f4] px-4 sm:px-6 lg:px-10 py-3 bg-white z-40">
      <div className="flex items-center gap-4 text-[#121416]">
        <div className="size-7">
          {/* 彩色抽象个人品牌Logo */}
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
            <circle cx="16" cy="16" r="16" fill="url(#grad1)" />
            <ellipse cx="16" cy="13" rx="6" ry="6" fill="#fff" fillOpacity="0.9" />
            <ellipse cx="16" cy="22" rx="9" ry="5" fill="#fff" fillOpacity="0.7" />
            <circle cx="16" cy="13" r="3" fill="#4F8CFF" />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F8CFF" />
                <stop offset="1" stopColor="#FFB86B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="hidden sm:inline">我的主页</span>
          <span className="sm:hidden">主页</span>
        </Link>
      </div>

      {/* 桌面端导航 */}
      {!isMobile && (
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
      )}

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

      {/* 移动端Drawer菜单 */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className="fixed right-0 top-0 bottom-0 h-full w-[80vw] max-w-[400px] bg-white shadow-lg z-50 flex flex-col p-0 transition-transform duration-300">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <NavbarMenuContent onNavigate={() => setIsMobileMenuOpen(false)} />
        </DrawerContent>
      </Drawer>

      {!isMobile && <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />}
    </header>
  )
}

function NavbarMenuContent({ onNavigate }: { onNavigate?: () => void }) {
  const { isLoggedIn, logout } = useEditMode()
  const { data } = usePortfolioData()
  const personalInfo = data?.personalInfo || {}
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="flex flex-col p-4 space-y-4 min-w-[200px]">
      <Link className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" href="/" onClick={onNavigate}>
        首页
      </Link>
      <Link className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" href="/projects" onClick={onNavigate}>
        项目
      </Link>
      <Link className="text-[#121416] text-base font-medium leading-normal hover:text-blue-600 py-2" href="/resume" onClick={onNavigate}>
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
      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
} 