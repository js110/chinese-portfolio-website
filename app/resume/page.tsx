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

function ResumePageContent() {
  const { data, loading } = usePortfolioData()
  const { isEditMode, isLoggedIn } = useEditMode()
  const [showEditor, setShowEditor] = useState(false)
  const skills = ["Java", "Spring", "React", "JavaScript", "HTML", "CSS", "SQL", "敏捷开发方法"]

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
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">简历</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              {/* 简历介绍文案已删除 */}
              <></>
            </FadeIn>

            <FadeIn delay={0.6}>
              {/* 下载简历功能已移除 */}
              <></>
            </FadeIn>

            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              概述
            </h2>
            <p className="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4">
              一位充满动力并以结果为导向的专业人士，拥有超过 8
              年的软件开发经验。在领导团队、管理项目以及提供满足并超过客户期望的高质量解决方案方面表现出色。正在寻找一个充满挑战的角色，在这里我可以充分发挥我的技能和经验，为一个充满活力的组织的成功贡献力量。
            </p>

            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              工作经历
            </h2>
            <div className="flex gap-4 bg-white px-4 py-3 justify-between">
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[#121416] text-base font-medium leading-normal">科技解决方案公司</p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  领导一个由 10
                  名开发人员组成的团队，负责网络和移动应用的设计、开发和部署。管理项目时间表、预算和资源，以确保项目的成功完成。指导初级开发人员并提供技术指导。
                </p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal">软件开发领导</p>
              </div>
              <div className="shrink-0">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">2018 年 - 至今</p>
              </div>
            </div>

            <div className="flex gap-4 bg-white px-4 py-3 justify-between">
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-[#121416] text-base font-medium leading-normal">创新系统公司</p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  使用 Java、Spring 和 React
                  开发和维护网络应用。与跨职能团队协作，以收集需求并实现解决方案。为改进开发过程和最佳实践做出贡献。
                </p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal">高级软件工程师</p>
              </div>
              <div className="shrink-0">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">2016 年 - 2018 年</p>
              </div>
            </div>

            <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              教育背景
            </h2>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">斯坦福大学</p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal line-clamp-2">计算机科学硕士</p>
              </div>
              <div className="shrink-0">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">2014 年 - 2016 年</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
              <div className="flex flex-col justify-center">
                <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">
                  加利福尼亚大学，伯克利分校
                </p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal line-clamp-2">计算机工程学士</p>
              </div>
              <div className="shrink-0">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">2010 年 - 2014 年</p>
              </div>
            </div>

            <ScrollReveal delay={0.2}>
              <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                技能
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <StaggerContainer
                className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4"
                staggerDelay={0.1}
              >
                {skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <div className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 items-center hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group">
                      <h2 className="text-[#121416] text-base font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {skill}
                      </h2>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>
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
