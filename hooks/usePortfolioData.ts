"use client"

import { useState, useEffect, useCallback } from "react"
import { PortfolioData, defaultPortfolioData } from "@/types/portfolio"
import { portfolioStorage } from "@/lib/storage"
import { useEditMode } from "@/contexts/EditModeContext"

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const { subscribe } = useEditMode()

  // 初始化加载数据
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = portfolioStorage.load()
        setData(savedData)
        setLastSaved(portfolioStorage.getLastUpdated() ? new Date(portfolioStorage.getLastUpdated()!) : null)
      } catch (error) {
        console.error("加载数据失败:", error)
        setData(defaultPortfolioData)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // 订阅编辑模式切换事件，切换时强制 reload 最新数据
    subscribe(() => {
      loadData()
    })
  }, [subscribe])

  // 保存数据
  const saveData = useCallback(async (newData: PortfolioData) => {
    setSaving(true)
    try {
      const success = portfolioStorage.save(newData)
      if (success) {
        setData(newData)
        setLastSaved(new Date())
        return true
      }
      return false
    } catch (error) {
      console.error("保存数据失败:", error)
      return false
    } finally {
      setSaving(false)
    }
  }, [])

  // 更新个人信息
  const updatePersonalInfo = useCallback(async (personalInfo: PortfolioData["personalInfo"]) => {
    const newData = { ...data, personalInfo }
    return await saveData(newData)
  }, [data, saveData])

  // 更新项目列表
  const updateProjects = useCallback(async (projects: PortfolioData["projects"]) => {
    const newData = { ...data, projects }
    return await saveData(newData)
  }, [data, saveData])

  // 添加项目
  const addProject = useCallback(async (project: PortfolioData["projects"][0]) => {
    const newProjects = [...data.projects, project]
    return await updateProjects(newProjects)
  }, [data.projects, updateProjects])

  // 更新项目
  const updateProject = useCallback(async (id: string, updatedProject: PortfolioData["projects"][0]) => {
    const newProjects = data.projects.map(project => 
      project.id === id ? updatedProject : project
    )
    return await updateProjects(newProjects)
  }, [data.projects, updateProjects])

  // 删除项目
  const deleteProject = useCallback(async (id: string) => {
    const newProjects = data.projects.filter(project => project.id !== id)
    return await updateProjects(newProjects)
  }, [data.projects, updateProjects])

  // 更新简历
  const updateResume = useCallback(async (resume: PortfolioData["resume"]) => {
    const newData = { ...data, resume }
    return await saveData(newData)
  }, [data, saveData])

  // 更新工作经验
  const updateWorkExperience = useCallback(async (workExperience: PortfolioData["resume"]["workExperience"]) => {
    const newResume = { ...data.resume, workExperience }
    return await updateResume(newResume)
  }, [data.resume, updateResume])

  // 添加工作经验
  const addWorkExperience = useCallback(async (workExp: PortfolioData["resume"]["workExperience"][0]) => {
    const newWorkExperience = [...data.resume.workExperience, workExp]
    return await updateWorkExperience(newWorkExperience)
  }, [data.resume.workExperience, updateWorkExperience])

  // 更新工作经验
  const updateWorkExp = useCallback(async (id: string, updatedWorkExp: PortfolioData["resume"]["workExperience"][0]) => {
    const newWorkExperience = data.resume.workExperience.map(workExp => 
      workExp.id === id ? updatedWorkExp : workExp
    )
    return await updateWorkExperience(newWorkExperience)
  }, [data.resume.workExperience, updateWorkExperience])

  // 删除工作经验
  const deleteWorkExperience = useCallback(async (id: string) => {
    const newWorkExperience = data.resume.workExperience.filter(workExp => workExp.id !== id)
    return await updateWorkExperience(newWorkExperience)
  }, [data.resume.workExperience, updateWorkExperience])

  // 更新教育背景
  const updateEducation = useCallback(async (education: PortfolioData["resume"]["education"]) => {
    const newResume = { ...data.resume, education }
    return await updateResume(newResume)
  }, [data.resume, updateResume])

  // 添加教育背景
  const addEducation = useCallback(async (edu: PortfolioData["resume"]["education"][0]) => {
    const newEducation = [...data.resume.education, edu]
    return await updateEducation(newEducation)
  }, [data.resume.education, updateEducation])

  // 更新教育背景
  const updateEdu = useCallback(async (id: string, updatedEdu: PortfolioData["resume"]["education"][0]) => {
    const newEducation = data.resume.education.map(edu => 
      edu.id === id ? updatedEdu : edu
    )
    return await updateEducation(newEducation)
  }, [data.resume.education, updateEducation])

  // 删除教育背景
  const deleteEducation = useCallback(async (id: string) => {
    const newEducation = data.resume.education.filter(edu => edu.id !== id)
    return await updateEducation(newEducation)
  }, [data.resume.education, updateEducation])

  // 重置为默认数据
  const resetToDefault = useCallback(async () => {
    return await saveData(defaultPortfolioData)
  }, [saveData])

  // 清除所有数据
  const clearData = useCallback(async () => {
    try {
      const success = portfolioStorage.clear()
      if (success) {
        setData(defaultPortfolioData)
        setLastSaved(null)
        return true
      }
      return false
    } catch (error) {
      console.error("清除数据失败:", error)
      return false
    }
  }, [])

  // 导出数据
  const exportData = useCallback(() => {
    return portfolioStorage.export()
  }, [])

  // 导入数据
  const importData = useCallback(async (jsonData: string) => {
    try {
      const success = portfolioStorage.import(jsonData)
      if (success) {
        const importedData = portfolioStorage.load()
        setData(importedData)
        setLastSaved(new Date())
        return true
      }
      return false
    } catch (error) {
      console.error("导入数据失败:", error)
      return false
    }
  }, [])

  return {
    data,
    loading,
    saving,
    lastSaved,
    saveData,
    updatePersonalInfo,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    updateResume,
    updateWorkExperience,
    addWorkExperience,
    updateWorkExp,
    deleteWorkExperience,
    updateEducation,
    addEducation,
    updateEdu,
    deleteEducation,
    resetToDefault,
    clearData,
    exportData,
    importData
  }
} 