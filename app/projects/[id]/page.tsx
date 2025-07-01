'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import ProjectDetailView from '@/components/ProjectDetailView';
import { Navbar } from '@/components/Navbar';

interface ProjectDetailPageProps {
  params: { id: string };
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ params }) => {
  const { data, loading } = usePortfolioData();
  if (loading) return null;
  const project = data.projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f7f8fa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <Navbar />
      <div className="layout-container flex h-full grow flex-col items-center justify-center">
        <div className="layout-content-container w-full max-w-full sm:max-w-[1200px] flex-1 flex items-center justify-center py-8">
          <ProjectDetailView project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage; 