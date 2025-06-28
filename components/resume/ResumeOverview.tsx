import React from "react";

interface ResumeOverviewProps {
  overview: string;
}

export function ResumeOverview({ overview }: ResumeOverviewProps) {
  return (
    <section className="mb-6">
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        概要
      </h2>
      <p className="text-[#121416] text-base font-normal leading-normal pb-3 pt-1 px-4">
        {overview?.trim() ? overview : <span className="text-gray-400">暂无内容</span>}
      </p>
    </section>
  );
} 