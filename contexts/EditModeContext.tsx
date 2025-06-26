"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (mode: boolean) => void
  subscribe: (cb: (isEdit: boolean) => void) => void
  isLoggedIn: boolean
  login: (password: string) => boolean
  logout: () => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

let subscribers: ((isEdit: boolean) => void)[] = []
const LOCAL_KEY = "portfolio_admin_logged_in"
const ADMIN_PASSWORD = "admin123" // 可自定义

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" && localStorage.getItem(LOCAL_KEY) === "1"
  )

  const toggleEditMode = () => {
    if (!isLoggedIn) return
    setIsEditMode(prev => {
      const next = !prev
      subscribers.forEach(cb => cb(next))
      return next
    })
  }

  const setEditMode = (mode: boolean) => {
    if (!isLoggedIn) return
    setIsEditMode(mode)
    subscribers.forEach(cb => cb(mode))
  }

  const subscribe = (cb: (isEdit: boolean) => void) => {
    subscribers.push(cb)
  }

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
      localStorage.setItem(LOCAL_KEY, "1")
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setIsEditMode(false)
    localStorage.removeItem(LOCAL_KEY)
  }

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, setEditMode, subscribe, isLoggedIn, login, logout }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const context = useContext(EditModeContext)
  if (context === undefined) {
    throw new Error("useEditMode must be used within an EditModeProvider")
  }
  return context
} 