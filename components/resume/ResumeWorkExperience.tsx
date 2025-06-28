import React from "react";
import { WorkExperience } from "@/types/portfolio";

interface ResumeWorkExperienceProps {
  workExperience: WorkExperience[];
}

export function ResumeWorkExperience({ workExperience }: ResumeWorkExperienceProps) {
  return (
    <section className="mb-6">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        工作经历
      </h2>
      {workExperience && workExperience.length > 0 ? (
        workExperience.map((w) => (
          <div key={w.id} className="flex gap-4 bg-white px-4 py-3 justify-between border-b last:border-b-0">
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-[#121416] text-base font-medium leading-normal">{w.company}</p>
              <p className="text-[#6a7681] text-sm font-normal leading-normal">{w.position}</p>
              <p className="text-[#6a7681] text-sm font-normal leading-normal">{w.description}</p>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <p className="text-[#6a7681] text-sm font-normal leading-normal">
                {w.startDate} {w.endDate ? `- ${w.endDate}` : w.current ? '- 至今' : ''}
              </p>
            </div>
          </div>
        ))
      ) : (
        <span className="text-gray-400 px-4">暂无工作经历</span>
      )}
    </section>
  );
} 