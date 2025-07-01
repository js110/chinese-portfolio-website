"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEditMode } from "@/contexts/EditModeContext"
import { useIsMobile } from "@/hooks/use-mobile"

export function EditModeToggle({ className = "" }: { className?: string }) {
  const { isEditMode, toggleEditMode } = useEditMode()
  const isMobile = useIsMobile()
  if (isMobile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Button
        onClick={toggleEditMode}
        className={`transition-all duration-300 ${
          isEditMode 
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" 
            : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
        }`}
      >
        {/* 图标已移除 */}
        {isEditMode ? "预览模式" : "编辑模式"}
      </Button>
    </motion.div>
  )
} 