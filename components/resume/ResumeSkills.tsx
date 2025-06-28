import React from "react";

interface ResumeSkillsProps {
  skills: string[];
}

export function ResumeSkills({ skills }: ResumeSkillsProps) {
  return (
    <section className="mb-6">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        技能
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill}
              className="flex flex-1 gap-3 rounded-lg border border-[#dde1e3] bg-white p-4 items-center hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <h2 className="text-[#121416] text-base font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300">
                {skill}
              </h2>
            </div>
          ))
        ) : (
          <span className="text-gray-400">暂无技能标签</span>
        )}
      </div>
    </section>
  );
} 