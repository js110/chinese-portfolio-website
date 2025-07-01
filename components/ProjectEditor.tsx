"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/TagInput"
import { Project } from "@/types/portfolio"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { Save, X } from "lucide-react"
import { ImageUpload } from "@/components/ImageUpload"
import { useIsMobile } from "@/hooks/use-mobile"

interface ProjectEditorProps {
  project?: Project
  onClose: () => void
  isEditing?: boolean
}

const gradientOptions = [
  { value: "from-blue-100 to-blue-200", label: "蓝色渐变" },
  { value: "from-green-100 to-green-200", label: "绿色渐变" },
  { value: "from-purple-100 to-purple-200", label: "紫色渐变" },
  { value: "from-orange-100 to-orange-200", label: "橙色渐变" },
  { value: "from-pink-100 to-pink-200", label: "粉色渐变" },
  { value: "from-indigo-100 to-indigo-200", label: "靛蓝渐变" },
]

export function ProjectEditor({ project, onClose, isEditing = false }: ProjectEditorProps) {
  const { addProject, updateProject, saving } = usePortfolioData()
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Date.now().toString(),
      title: "",
      description: "",
      role: "",
      gradient: "from-blue-100 to-blue-200",
      image: "",
      link: "",
      technologies: [],
      startDate: "",
      endDate: "",
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  )
  const [errors, setErrors] = useState<Partial<Project>>({})
  const isMobile = useIsMobile()
  if (isMobile) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Project> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "项目标题不能为空"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "项目描述不能为空"
    }
    
    if (!formData.role.trim()) {
      newErrors.role = "角色不能为空"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return
    
    // 更新项目数据
    const updatedData = {
      ...formData,
      updatedAt: new Date().toISOString()
    }
    
    let success = false
    if (isEditing) {
      success = await updateProject(formData.id, updatedData)
    } else {
      success = await addProject(updatedData)
    }
    
    if (success) {
      onClose()
    }
  }

  const handleInputChange = (field: keyof Project, value: string | string[] | boolean) => {
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
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "编辑项目" : "添加新项目"}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 表单内容 */}
        <div className="p-6 space-y-6">
          {/* 项目标题 */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              项目标题 *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="请输入项目标题"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* 项目描述 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              项目描述 *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="请描述项目的主要功能、技术栈和成果..."
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* 角色 */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              担任角色 *
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="例如：全栈开发者、前端工程师、项目经理"
              className={errors.role ? "border-red-500" : ""}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role}</p>
            )}
          </div>

          {/* 项目链接 */}
          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm font-medium text-gray-700">
              项目链接
            </Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => handleInputChange("link", e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>

          {/* 技术栈 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              技术栈
            </Label>
            <TagInput
              tags={formData.technologies || []}
              onTagsChange={(technologies) => handleInputChange("technologies", technologies)}
              placeholder="输入使用的技术，按回车或逗号分隔"
              maxTags={10}
            />
          </div>

          {/* 项目时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                开始时间
              </Label>
              <Input
                id="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                placeholder="2023-01"
                type="month"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                结束时间
              </Label>
              <Input
                id="endDate"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                placeholder="2023-12"
                type="month"
              />
            </div>
          </div>

          {/* 特色项目 */}
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleInputChange("featured", e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">设为特色项目</span>
            </Label>
            <p className="text-xs text-gray-500">特色项目将在首页突出显示</p>
          </div>

          {/* 背景渐变 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              背景渐变
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {gradientOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={formData.gradient === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange("gradient", option.value)}
                  className={`h-12 ${formData.gradient === option.value ? "bg-blue-600" : ""}`}
                >
                  <div className={`w-full h-6 rounded bg-gradient-to-br ${option.value}`}></div>
                </Button>
              ))}
            </div>
          </div>

          {/* 项目封面图 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">项目封面图</Label>
            <ImageUpload
              currentImage={formData.coverImage || ""}
              onImageChange={(img) => handleInputChange("coverImage", img)}
              size="md"
              aspectRatio="auto"
              className="mb-2"
            />
            <p className="text-xs text-gray-400">支持 JPG/PNG，建议尺寸 800x600 及以上，移动端可拍照上传，允许为空</p>
          </div>
        </div>

        {/* 底部操作 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            取消
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> 保存
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
} 