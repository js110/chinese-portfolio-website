"use client"

import React, { useState } from "react"
import { FadeIn } from "@/components/animations/fade-in"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { EditModeProvider } from "@/contexts/EditModeContext"
import { useEditMode } from "@/contexts/EditModeContext"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { ResumeEditor } from "@/components/ResumeEditor"
import { ResumeOverview } from "@/components/resume/ResumeOverview"
import { ResumeSkills } from "@/components/resume/ResumeSkills"
import { ResumeWorkExperience } from "@/components/resume/ResumeWorkExperience"
import { ResumeEducation } from "@/components/resume/ResumeEducation"

function ResumePageContent() {
  const { data, loading } = usePortfolioData()
  const { isEditMode, isLoggedIn } = useEditMode()
  const [showEditor, setShowEditor] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const { resume } = data

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <Navbar />
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex justify-end px-10 pt-6">
          {isEditMode && isLoggedIn && (
            <Button onClick={() => setShowEditor(true)}>编辑</Button>
          )}
        </div>
        {showEditor && (
          <ResumeEditor resume={resume} onClose={() => setShowEditor(false)} />
        )}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div id="resume-content" className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <ResumeOverview overview={resume.overview} />
            <ResumeWorkExperience workExperience={resume.workExperience} />
            <ResumeEducation education={resume.education} />
            <ResumeSkills skills={resume.skills} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResumePage() {
  return (
    <EditModeProvider>
      <ResumePageContent />
    </EditModeProvider>
  )
}
