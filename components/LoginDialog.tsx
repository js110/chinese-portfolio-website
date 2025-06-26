"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEditMode } from "@/contexts/EditModeContext"

interface LoginDialogProps {
  open: boolean
  onClose: () => void
}

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { login } = useEditMode()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const ok = login(password)
    setLoading(false)
    if (ok) {
      setPassword("")
      setError("")
      onClose()
    } else {
      setError("密码错误，请重试")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-xs p-6 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-center mb-2">管理员登录</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            disabled={loading}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
} 