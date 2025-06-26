"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, X, Plus, Trash2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/TagInput"
import { Resume, WorkExperience, Education } from "@/types/portfolio"
import { usePortfolioData } from "@/hooks/usePortfolioData"

interface ResumeEditorProps {
  resume: Resume
  onClose: () => void
}

function emptyWorkExp(): WorkExperience {
  return {
    id: Date.now().toString() + Math.random(),
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false
  }
}

function emptyEducation(): Education {
  return {
    id: Date.now().toString() + Math.random(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: ""
  }
}

export function ResumeEditor({ resume, onClose }: ResumeEditorProps) {
  const { updateResume, saving } = usePortfolioData()
  const [formData, setFormData] = useState<Resume>(resume)
  const [error, setError] = useState("")

  // 概述
  const handleOverviewChange = (v: string) => setFormData(f => ({ ...f, overview: v }))
  // 技能
  const handleSkillsChange = (skills: string[]) => setFormData(f => ({ ...f, skills }))
  // 工作经历
  const handleWorkChange = (idx: number, field: keyof WorkExperience, value: unknown) => {
    setFormData(f => ({
      ...f,
      workExperience: f.workExperience.map((w, i) => i === idx ? { ...w, [field]: value } : w)
    }))
  }
  const addWork = () => setFormData(f => ({ ...f, workExperience: [...f.workExperience, emptyWorkExp()] }))
  const removeWork = (idx: number) => setFormData(f => ({ ...f, workExperience: f.workExperience.filter((_, i) => i !== idx) }))
  // 教育
  const handleEduChange = (idx: number, field: keyof Education, value: unknown) => {
    setFormData(f => ({
      ...f,
      education: f.education.map((e, i) => i === idx ? { ...e, [field]: value } : e)
    }))
  }
  const addEdu = () => setFormData(f => ({ ...f, education: [...f.education, emptyEducation()] }))
  const removeEdu = (idx: number) => setFormData(f => ({ ...f, education: f.education.filter((_, i) => i !== idx) }))

  const handleSave = async () => {
    // 简单校验
    if (!formData.overview.trim()) {
      setError("简历概述不能为空")
      return
    }
    setError("")
    const ok = await updateResume(formData)
    if (ok) onClose()
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
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">编辑简历</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 space-y-6">
          {/* 概述 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">简历概述 *</Label>
            <Textarea
              value={formData.overview}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleOverviewChange(e.target.value)}
              rows={3}
              placeholder="请简要描述你的职业目标、经验和优势..."
            />
          </div>
          {/* 技能 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">技能标签</Label>
            <TagInput tags={formData.skills} onTagsChange={handleSkillsChange} maxTags={15} />
          </div>
          {/* 工作经历 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">工作经历</Label>
              <Button size="sm" variant="outline" onClick={addWork}>
                <Plus className="w-4 h-4 mr-1" /> 添加
              </Button>
            </div>
            {formData.workExperience.map((w, idx) => (
              <div key={w.id} className="border rounded p-3 mb-2 relative">
                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeWork(idx)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="flex gap-2 mb-2">
                  <Input value={w.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkChange(idx, "company", e.target.value)} placeholder="公司名称" className="flex-1" />
                  <Input value={w.position} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkChange(idx, "position", e.target.value)} placeholder="职位" className="flex-1" />
                </div>
                <Textarea value={w.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleWorkChange(idx, "description", e.target.value)} placeholder="工作内容描述..." rows={2} />
                <div className="flex gap-2 mt-2">
                  <Input value={w.startDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkChange(idx, "startDate", e.target.value)} placeholder="开始时间" className="flex-1" />
                  <Input value={w.endDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkChange(idx, "endDate", e.target.value)} placeholder="结束时间" className="flex-1" />
                </div>
              </div>
            ))}
          </div>
          {/* 教育背景 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700">教育背景</Label>
              <Button size="sm" variant="outline" onClick={addEdu}>
                <Plus className="w-4 h-4 mr-1" /> 添加
              </Button>
            </div>
            {formData.education.map((e, idx) => (
              <div key={e.id} className="border rounded p-3 mb-2 relative">
                <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => removeEdu(idx)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
                <div className="flex gap-2 mb-2">
                  <Input value={e.institution} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleEduChange(idx, "institution", ev.target.value)} placeholder="学校名称" className="flex-1" />
                  <Input value={e.degree} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleEduChange(idx, "degree", ev.target.value)} placeholder="学位" className="flex-1" />
                  <Input value={e.field} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleEduChange(idx, "field", ev.target.value)} placeholder="专业" className="flex-1" />
                </div>
                <div className="flex gap-2 mt-2">
                  <Input value={e.startDate} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleEduChange(idx, "startDate", ev.target.value)} placeholder="开始时间" className="flex-1" />
                  <Input value={e.endDate} onChange={(ev: React.ChangeEvent<HTMLInputElement>) => handleEduChange(idx, "endDate", ev.target.value)} placeholder="结束时间" className="flex-1" />
                </div>
              </div>
            ))}
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} disabled={saving}>取消</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
            {saving ? (
              <><Save className="w-4 h-4 mr-2 animate-spin" /> 保存中...</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> 保存</>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
} 