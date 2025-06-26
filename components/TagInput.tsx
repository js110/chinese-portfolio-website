"use client"

import { useState, KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  className?: string
}

export function TagInput({ 
  tags, 
  onTagsChange, 
  placeholder = "输入标签...",
  maxTags = 20,
  className = ""
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onTagsChange([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const handleInputChange = (value: string) => {
    // 移除逗号并添加标签
    if (value.includes(",")) {
      const parts = value.split(",")
      const lastPart = parts.pop() || ""
      parts.forEach(part => addTag(part))
      setInputValue(lastPart)
    } else {
      setInputValue(value)
    }
  }

  const handleAddTag = () => {
    if (inputValue.trim()) {
      addTag(inputValue)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-300 rounded-md bg-white">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-2 py-1 text-sm"
          >
            {tag}
            <Button
              type="button"
              className="ml-1 h-auto p-0 hover:bg-blue-300"
              onClick={() => removeTag(tag)}
            >
              {/* 图标已移除 */}
            </Button>
          </Badge>
        ))}
        
        {tags.length < maxTags && (
          <Input
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] border-none focus:ring-0 p-0 text-sm"
          />
        )}
      </div>
      
      {tags.length >= maxTags && (
        <p className="text-sm text-gray-500">
          已达到最大标签数量 ({maxTags})
        </p>
      )}
      
      {tags.length === 0 && !isFocused && (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          {/* 图标已移除 */}
        </div>
      )}
      
      <Button type="button" onClick={handleAddTag} disabled={!inputValue.trim()}>
        {/* 图标已移除 */}
      </Button>
    </div>
  )
} 