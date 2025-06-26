"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageData: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
  aspectRatio?: "square" | "video" | "auto"
}

export function ImageUpload({ 
  currentImage, 
  onImageChange, 
  className = "",
  size = "md",
  aspectRatio = "square"
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  }

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "aspect-auto"
  }

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        onImageChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`
          ${sizeClasses[size]} 
          ${aspectClasses[aspectRatio]}
          border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300
          ${isDragging 
            ? "border-blue-500 bg-blue-50" 
            : preview 
              ? "border-gray-300" 
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="预览"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              type="button"
              onClick={handleRemoveImage}
              variant="outline"
              className="flex items-center gap-2 absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ImageIcon className="w-8 h-8 text-gray-300" />
            <p className="text-sm text-center">
              点击上传或拖拽图片
            </p>
            <p className="text-xs text-gray-400 mt-1">
              支持 JPG, PNG, GIF
            </p>
          </div>
        )}
      </motion.div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
} 