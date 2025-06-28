import React from "react";
import { Education } from "@/types/portfolio";

interface ResumeEducationProps {
  education: Education[];
}

export function ResumeEducation({ education }: ResumeEducationProps) {
  return (
    <section className="mb-6">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        教育背景
      </h2>
      {education && education.length > 0 ? (
        education.map((e) => (
          <div key={e.id} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between border-b last:border-b-0">
            <div className="flex flex-col justify-center">
              <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">{e.institution}</p>
              <p className="text-[#6a7681] text-sm font-normal leading-normal line-clamp-2">{e.degree} {e.field}</p>
            </div>
            <div className="shrink-0">
              <p className="text-[#6a7681] text-sm font-normal leading-normal">{e.startDate} - {e.endDate}</p>
            </div>
          </div>
        ))
      ) : (
        <span className="text-gray-400 px-4">暂无教育经历</span>
      )}
    </section>
  );
} 