"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { EditModeToggle } from "@/components/EditModeToggle"
import { ProjectEditor } from "@/components/ProjectEditor"
import AdvancedProjectCard from "@/components/AdvancedProjectCard"
import ProjectFilters, { SortOption, ViewMode } from "@/components/ProjectFilters"
import { useEditMode } from "@/contexts/EditModeContext"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { Project } from "@/types/portfolio"
import { EditModeProvider } from "@/contexts/EditModeContext"
import { Navbar } from "@/components/Navbar"
import { Plus } from "lucide-react"
import ProjectDetailDialog from "@/components/ProjectDetailDialog"

function ProjectsPageContent() {
  const { data, loading, deleteProject } = usePortfolioData()
  const [showProjectEditor, setShowProjectEditor] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const { isEditMode } = useEditMode()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 过滤器状态
  const [filters, setFilters] = useState({
    search: '',
    selectedTags: [] as string[],
    sortBy: 'newest' as SortOption,
    viewMode: 'grid' as ViewMode
  })

  const { projects } = data

  // 过滤和排序项目
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // 搜索过滤
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.role.toLowerCase().includes(searchLower) ||
          project.technologies?.some(tech => tech.toLowerCase().includes(searchLower))
        if (!matchesSearch) return false
      }
      // 标签过滤
      if (filters.selectedTags.length > 0) {
        const hasSelectedTags = filters.selectedTags.some(tag =>
          project.technologies?.includes(tag)
        )
        if (!hasSelectedTags) return false
      }
      return true
    })
    // 排序
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name-asc':
          return a.title.localeCompare(b.title)
        case 'name-desc':
          return b.title.localeCompare(a.title)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })
    return filtered
  }, [projects, filters])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setShowProjectEditor(true)
  }

  const handleDeleteProject = async (projectId: string) => {
    await deleteProject(projectId)
  }

  const handleCloseEditor = () => {
    setShowProjectEditor(false)
    setEditingProject(null)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <Navbar />

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-2 sm:px-4 lg:px-40 flex flex-1 justify-center py-3 sm:py-5">
          <div className="layout-content-container flex flex-col w-full max-w-full sm:max-w-[1200px] flex-1">
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-0 sm:min-w-72 flex-col gap-3">
                  <p className="text-[#121416] tracking-light text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight">项目</p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    我参与过的一些项目，展示我的技能和经验。
                  </p>
                </div>
                {isEditMode && (
                  <Button onClick={() => setShowProjectEditor(true)} className="flex items-center gap-2 w-full sm:w-auto text-xs xs:text-sm sm:text-base">
                    <Plus className="w-4 h-4 mr-2" /> 新增项目
                  </Button>
                )}
              </div>
            </FadeIn>

            {/* 过滤器 */}
            <FadeIn delay={0.3}>
              <div className="p-2 sm:p-4">
                <ProjectFilters
                  projects={projects}
                  onFiltersChange={handleFiltersChange}
                />
              </div>
            </FadeIn>

            {/* 项目列表 */}
            <FadeIn delay={0.4}>
              <div className="p-2 sm:p-4">
                {filteredAndSortedProjects.length > 0 ? (
                  filters.viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredAndSortedProjects.map((project) => (
                        <AdvancedProjectCard
                          key={project.id}
                          project={project}
                          viewMode="grid"
                          onEdit={isEditMode ? () => handleEditProject(project) : undefined}
                          onDelete={isEditMode ? () => handleDeleteProject(project.id) : undefined}
                          onShowDetail={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAndSortedProjects.map((project) => (
                        <AdvancedProjectCard
                          key={project.id}
                          project={project}
                          viewMode="list"
                          onEdit={isEditMode ? () => handleEditProject(project) : undefined}
                          onDelete={isEditMode ? () => handleDeleteProject(project.id) : undefined}
                          onShowDetail={() => setSelectedProject(project)}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 sm:py-20 text-gray-500">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <p className="text-lg font-medium mb-2">暂无项目</p>
                    <p className="text-sm text-gray-400 text-center">
                      {filters.search || filters.selectedTags.length > 0 
                        ? '没有找到匹配的项目，请尝试调整搜索条件'
                        : '还没有添加任何项目'
                      }
                    </p>
                    {isEditMode && !filters.search && filters.selectedTags.length === 0 && (
                      <Button 
                        onClick={() => setShowProjectEditor(true)} 
                        className="mt-4"
                      >
                        <Plus className="w-4 h-4 mr-2" /> 添加第一个项目
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* 项目编辑器 */}
      {showProjectEditor && (
        <ProjectEditor
          project={editingProject || undefined}
          onClose={handleCloseEditor}
          isEditing={!!editingProject}
        />
      )}

      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <EditModeProvider>
      <ProjectsPageContent />
      <EditModeToggle />
    </EditModeProvider>
  )
}
