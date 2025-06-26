"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ImageUpload"
import { TagInput } from "@/components/TagInput"
import { PersonalInfo } from "@/types/portfolio"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { Save, X } from "lucide-react"

interface PersonalInfoEditorProps {
  personalInfo: PersonalInfo
  onClose: () => void
}

export function PersonalInfoEditor({ personalInfo, onClose }: PersonalInfoEditorProps) {
  const { updatePersonalInfo, saving } = usePortfolioData()
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo)
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfo> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "姓名不能为空"
    }
    
    if (!formData.title.trim()) {
      newErrors.title = "职位不能为空"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "个人简介不能为空"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    
    const success = await updatePersonalInfo(formData)
    if (success) {
      onClose()
    }
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* 图标已移除 */}
            <h2 className="text-xl font-bold text-gray-900">编辑个人信息</h2>
          </div>
          <Button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-2" />
          </Button>
        </div>

        {/* 表单内容 */}
        <div className="p-6 space-y-6">
          {/* 头像上传 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">头像</Label>
            <div className="flex justify-center">
              <ImageUpload
                currentImage={formData.avatar}
                onImageChange={(imageData) => handleInputChange("avatar", imageData)}
                size="lg"
              />
            </div>
          </div>

          {/* 姓名 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              姓名 *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="请输入您的姓名"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* 职位 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              职位 *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="例如：软件工程师 | 全栈开发者"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* 个人简介 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              个人简介 *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="请描述您的专业背景、技能特长和职业目标..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* 技能标签 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              技能标签
            </Label>
            <TagInput
              tags={formData.skills}
              onTagsChange={(skills) => handleInputChange("skills", skills)}
              placeholder="输入技能标签，按回车或逗号分隔"
              maxTags={15}
            />
          </div>
        </div>

        {/* 底部操作 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4 mr-2" />
            取消
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
} 