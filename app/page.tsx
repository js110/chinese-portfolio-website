"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { FloatingElement } from "@/components/animations/floating-element"
import { EditModeToggle } from "@/components/EditModeToggle"
import { PersonalInfoEditor } from "@/components/PersonalInfoEditor"
import AdvancedProjectCard from "@/components/AdvancedProjectCard"
import { useEditMode } from "@/contexts/EditModeContext"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { EditModeProvider } from "@/contexts/EditModeContext"
import { LoginDialog } from "@/components/LoginDialog"
import { Navbar } from "@/components/Navbar"
import { useRouter } from "next/navigation"

function HomePageContent() {
  const { data, loading } = usePortfolioData()
  const [showPersonalInfoEditor, setShowPersonalInfoEditor] = useState(false)
  const { isEditMode } = useEditMode()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const { personalInfo, projects, resume } = data

  // 获取特色项目
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)
  const otherProjects = projects.filter(project => !project.featured).slice(0, 3 - featuredProjects.length)
  const displayProjects = [...featuredProjects, ...otherProjects].slice(0, 3)

  const handleProjectClick = () => {
    router.push('/projects')
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <Navbar />

      <div className="layout-container flex h-full grow flex-col">
<<<<<<< HEAD
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
=======
        <div className="px-2 sm:px-4 lg:px-40 flex flex-1 justify-center py-3 sm:py-5">
          <div className="layout-content-container flex flex-col w-full max-w-full sm:max-w-[1200px] flex-1">
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
            <FadeIn delay={0.2}>
              <div className="flex p-4">
                <div className="flex w-full flex-col gap-4 items-center">
                  <div className="flex gap-4 flex-col items-center">
                    <FloatingElement delay={0.4}>
                      <div className="relative">
                        <div 
<<<<<<< HEAD
                          className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 shadow-lg ${
=======
                          className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-20 w-20 xs:min-h-24 xs:w-24 sm:min-h-28 sm:w-28 md:min-h-32 md:w-32 shadow-lg ${
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
                            personalInfo.avatar 
                              ? "bg-cover" 
                              : "bg-gray-300"
                          }`}
                          style={personalInfo.avatar ? { backgroundImage: `url(${personalInfo.avatar})` } : {}}
                        />
                        {isEditMode && (
                          <Button
<<<<<<< HEAD
                            className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
=======
                            className="absolute -bottom-2 -right-2 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
                            onClick={() => setShowPersonalInfoEditor(true)}
                          >
                            编辑
                          </Button>
                        )}
                      </div>
                    </FloatingElement>
                    <FadeIn delay={0.6} direction="up">
<<<<<<< HEAD
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                          {personalInfo.name}
                        </p>
                        <p className="text-[#6a7681] text-base font-normal leading-normal text-center">
                          {personalInfo.title}
                        </p>
                        <p className="text-[#6a7681] text-base font-normal leading-normal text-center max-w-2xl mt-2">
=======
                      <div className="flex flex-col items-center justify-center text-center px-4">
                        <p className="text-[#121416] text-base xs:text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em]">
                          {personalInfo.name}
                        </p>
                        <p className="text-[#6a7681] text-xs xs:text-sm sm:text-base font-normal leading-normal mt-1">
                          {personalInfo.title}
                        </p>
                        <p className="text-[#6a7681] text-xs xs:text-sm sm:text-base font-normal leading-normal max-w-2xl mt-2">
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
                          {personalInfo.description}
                        </p>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex justify-center">
                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                  <Button 
                    onClick={handleProjectClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    查看所有项目
                  </Button>
                </div>
              </div>
            </FadeIn>

            <ScrollReveal delay={0.2}>
<<<<<<< HEAD
              <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                精选项目
              </h2>
=======
              <div className="flex items-center justify-between px-2 sm:px-4 pb-2 sm:pb-3 pt-3 sm:pt-5">
                <h2 className="text-[#121416] text-base xs:text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  精选项目
                </h2>
                {projects.length > 3 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleProjectClick}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    查看全部 ({projects.length})
                  </Button>
                )}
              </div>
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
<<<<<<< HEAD
              <div className="flex overflow-y-auto">
                <StaggerContainer className="flex items-stretch p-4 gap-3" staggerDelay={0.2}>
                  {projects.slice(0, 3).map((project) => (
                    <StaggerItem key={project.id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div 
                        className={`w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 ${
                          project.image 
                            ? "bg-cover" 
                            : `bg-gradient-to-br ${project.gradient}`
                        }`}
                        style={project.image ? { backgroundImage: `url(${project.image})` } : {}}
                        onClick={handleProjectClick}
                      />
                      <div onClick={handleProjectClick}>
                        <p className="text-[#121416] text-base font-medium leading-normal">{project.title}</p>
                        <p className="text-[#6a7681] text-sm font-normal leading-normal">
                          {project.description}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
=======
              <div className="p-2 sm:p-4">
                {displayProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayProjects.map((project) => (
                      <AdvancedProjectCard
                        key={project.id}
                        project={project}
                        viewMode="grid"
                        onEdit={isEditMode ? () => router.push('/projects') : undefined}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>暂无项目</p>
                    {isEditMode && (
                      <Button 
                        onClick={() => router.push('/projects')}
                        className="mt-4"
                      >
                        添加第一个项目
                      </Button>
                    )}
                  </div>
                )}
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
<<<<<<< HEAD
              <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
=======
              <h2 className="text-[#121416] text-base xs:text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-2 sm:pb-3 pt-3 sm:pt-5">
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
                技能
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
<<<<<<< HEAD
              <StaggerContainer className="flex gap-3 p-3 flex-wrap pr-4" staggerDelay={0.1}>
                {personalInfo.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <Badge
                      className="bg-[#f1f2f4] text-[#121416] hover:bg-gray-200 hover:scale-105 transition-all duration-300 cursor-pointer"
=======
              <StaggerContainer className="flex gap-1 xs:gap-2 sm:gap-3 p-2 sm:p-3 flex-wrap pr-2 sm:pr-4" staggerDelay={0.1}>
                {personalInfo.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <Badge
                      className="bg-[#f1f2f4] text-[#121416] hover:bg-gray-200 hover:scale-105 transition-all duration-300 cursor-pointer text-xs xs:text-sm"
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
                    >
                      {skill}
                    </Badge>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

<<<<<<< HEAD
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
=======
            <h2 className="text-[#121416] text-base xs:text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-2 sm:pb-3 pt-3 sm:pt-5">
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
              经验
            </h2>
            <div className="grid grid-cols-1 gap-x-2 px-2 sm:px-4">
              {resume.workExperience.map((workExp) => (
                <React.Fragment key={workExp.id}>
                  <div className="flex flex-col items-center gap-1 pt-3">
                    {/* 图标已移除 */}
                  </div>
                  <div className="flex flex-1 flex-col py-3">
                    <p className="text-[#121416] text-base font-medium leading-normal">{workExp.company}</p>
                    <p className="text-[#6a7681] text-base font-normal leading-normal">
                      {workExp.startDate} - {workExp.endDate}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>

<<<<<<< HEAD
            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
=======
            <h2 className="text-[#121416] text-base xs:text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-2 sm:px-4 pb-2 sm:pb-3 pt-3 sm:pt-5">
>>>>>>> 904a281 (chore: 补交未暂存更改，确保工作区干净以便 rebase/push)
              教育
            </h2>
            <div className="grid grid-cols-1 gap-x-2 px-2 sm:px-4">
              {resume.education.map((edu) => (
                <React.Fragment key={edu.id}>
                  <div className="flex flex-col items-center gap-1 pt-3">
                    {/* 图标已移除 */}
                  </div>
                  <div className="flex flex-1 flex-col py-3">
                    <p className="text-[#121416] text-base font-medium leading-normal">{edu.institution}</p>
                    <p className="text-[#6a7681] text-base font-normal leading-normal">
                      {edu.degree} - {edu.field}
                    </p>
                    <p className="text-[#6a7681] text-base font-normal leading-normal">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex justify-center w-full">
          <div className="flex w-full max-w-full sm:max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-4 sm:gap-6 px-2 sm:px-5 py-6 sm:py-10 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                {/* 图标已移除 */}
              </div>
              <p className="text-[#6a7681] text-base font-normal leading-normal">@{new Date().getFullYear()} {personalInfo.name}。保留所有权利。</p>
            </footer>
          </div>
        </footer>
      </div>

      {/* 个人信息编辑器 */}
      {showPersonalInfoEditor && (
        <PersonalInfoEditor
          personalInfo={personalInfo}
          onClose={() => setShowPersonalInfoEditor(false)}
        />
      )}

      <LoginDialog open={false} onClose={() => {}} />
    </div>
  )
}

export default function HomePage() {
  return (
    <EditModeProvider>
      <HomePageContent />
      <EditModeToggle />
    </EditModeProvider>
  )
}
