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
        <div className="px-2 sm:px-4 lg:px-40 flex flex-1 justify-center py-3 sm:py-5">
          <div className="layout-content-container flex flex-col w-full max-w-full sm:max-w-[1200px] flex-1">
            <FadeIn delay={0.2}>
              <div className="flex p-4">
                <div className="flex w-full flex-col gap-4 items-center">
                  <div className="flex gap-4 flex-col items-center">
                    <FloatingElement delay={0.4}>
                      <div className="relative">
                        <div 
                          className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 shadow-lg ${
                            personalInfo.avatar 
                              ? "bg-cover" 
                              : "bg-gray-300"
                          }`}
                          style={personalInfo.avatar ? { backgroundImage: `url(${personalInfo.avatar})` } : {}}
                        />
                        {isEditMode && (
                          <Button
                            className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => setShowPersonalInfoEditor(true)}
                          >
                            <span className="text-xs sm:text-sm">编辑</span>
                          </Button>
                        )}
                      </div>
                    </FloatingElement>
                    <FadeIn delay={0.6} direction="up">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                          {personalInfo.name}
                        </p>
                        <p className="text-[#6a7681] text-sm sm:text-base font-normal leading-normal mt-1">
                          {personalInfo.title}
                        </p>
                        <p className="text-[#6a7681] text-base font-normal leading-normal text-center max-w-2xl mt-2">
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
              <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                精选项目
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="flex overflow-y-auto">
                <StaggerContainer className="flex items-stretch p-4 gap-3" staggerDelay={0.2}>
                  {projects.slice(0, 3).map((project) => (
                    <StaggerItem key={project.id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 sm:min-w-0 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      <AdvancedProjectCard project={project} viewMode="grid" />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                技能
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <StaggerContainer className="flex gap-3 p-3 flex-wrap pr-4" staggerDelay={0.1}>
                {personalInfo.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <Badge
                      className="bg-[#f1f2f4] text-[#121416] hover:bg-gray-200 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              经验
            </h2>
            <div className="grid grid-cols-1 gap-x-2 px-2 sm:px-4">
              {resume.workExperience.map((workExp) => (
                <React.Fragment key={workExp.id}>
                  <div className="flex flex-col items-center gap-1 pt-3">
                    {/* 图标已移除 */}
                  </div>
                  <div className="flex flex-1 flex-col py-3">
                    <p className="text-[#121416] text-sm sm:text-base font-medium leading-normal">{workExp.company}</p>
                    <p className="text-[#6a7681] text-xs sm:text-base font-normal leading-normal">
                      {workExp.startDate} - {workExp.endDate}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              教育
            </h2>
            <div className="grid grid-cols-1 gap-x-2 px-2 sm:px-4">
              {resume.education.map((edu) => (
                <React.Fragment key={edu.id}>
                  <div className="flex flex-col items-center gap-1 pt-3">
                    {/* 图标已移除 */}
                  </div>
                  <div className="flex flex-1 flex-col py-3">
                    <p className="text-[#121416] text-sm sm:text-base font-medium leading-normal">{edu.institution}</p>
                    <p className="text-[#6a7681] text-xs sm:text-base font-normal leading-normal">
                      {edu.degree} - {edu.field}
                    </p>
                    <p className="text-[#6a7681] text-xs sm:text-base font-normal leading-normal">
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
              <p className="text-[#6a7681] text-sm sm:text-base font-normal leading-normal">@{new Date().getFullYear()} {personalInfo.name}。保留所有权利。</p>
            </footer>
          </div>
        </footer>
      </div>

      {showPersonalInfoEditor && (
        <PersonalInfoEditor
          personalInfo={data.personalInfo}
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
