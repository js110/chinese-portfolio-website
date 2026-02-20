"use client"

import React, { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react"

interface EditModeContextType {
  isEditMode: boolean
  toggleEditMode: () => void
  setEditMode: (mode: boolean) => void
  subscribe: (cb: (isEdit: boolean) => void) => () => void
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)
const LOCAL_KEY = "portfolio_admin_logged_in"

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const subscribersRef = useRef(new Set<(isEdit: boolean) => void>())

  useEffect(() => {
    const checkSession = async () => {
      const hadLocalLogin = typeof window !== "undefined" && localStorage.getItem(LOCAL_KEY) === "1"
      if (!hadLocalLogin) return

      try {
        const res = await fetch("/api/login", { method: "GET", cache: "no-store" })
        const data = await res.json()
        if (data?.authenticated) {
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem(LOCAL_KEY)
        }
      } catch {
        localStorage.removeItem(LOCAL_KEY)
      }
    }

    checkSession()
  }, [])

  const notifySubscribers = useCallback((mode: boolean) => {
    subscribersRef.current.forEach((cb) => cb(mode))
  }, [])

  const toggleEditMode = useCallback(() => {
    if (!isLoggedIn) return

    setIsEditMode((prev) => {
      const next = !prev
      notifySubscribers(next)
      return next
    })
  }, [isLoggedIn, notifySubscribers])

  const setEditMode = useCallback(
    (mode: boolean) => {
      if (!isLoggedIn) return
      setIsEditMode(mode)
      notifySubscribers(mode)
    },
    [isLoggedIn, notifySubscribers],
  )

  const subscribe = useCallback((cb: (isEdit: boolean) => void) => {
    subscribersRef.current.add(cb)
    return () => subscribersRef.current.delete(cb)
  }, [])

  const login = useCallback(() => {
    setIsLoggedIn(true)
    localStorage.setItem(LOCAL_KEY, "1")
  }, [])

  const logout = useCallback(() => {
    void fetch("/api/login", { method: "DELETE" })
    setIsLoggedIn(false)
    setIsEditMode(false)
    localStorage.removeItem(LOCAL_KEY)
  }, [])

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

