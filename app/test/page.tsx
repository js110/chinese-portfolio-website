'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProjectFilters, { SortOption, ViewMode } from '@/components/ProjectFilters';
import AdvancedProjectCard from '@/components/AdvancedProjectCard';
import { Project, ProjectMedia } from '@/types/portfolio';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { EditModeProvider } from '@/contexts/EditModeContext';

function TestPageContent() {
  const { data } = usePortfolioData();
  const [testMedia, setTestMedia] = useState<ProjectMedia[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState({
    search: '',
    selectedTags: [] as string[],
    sortBy: 'newest' as SortOption,
    viewMode: 'grid' as ViewMode
  });

  const testProject: Project = {
    id: 'test-1',
    title: '测试项目',
    description: '这是一个用于测试高级功能的项目',
    role: '全栈开发者',
    gradient: 'from-blue-100 to-blue-200',
    technologies: ['React', 'TypeScript', 'Next.js'],
    startDate: '2023-01',
    endDate: '2023-12',
    link: 'https://example.com',
    media: testMedia,
    featured: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-12-31T00:00:00.000Z'
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setViewMode(newFilters.viewMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">功能测试页面</h1>
          <p className="text-gray-600">测试所有新实现的高级项目功能</p>
        </div>

        {/* 项目筛选测试 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">项目筛选测试</h2>
          <ProjectFilters
            projects={data.projects}
            onFiltersChange={handleFiltersChange}
          />
        </Card>

        {/* 高级项目卡片测试 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">高级项目卡片测试</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                网格视图
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                列表视图
              </Button>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AdvancedProjectCard
                  project={testProject}
                  viewMode="grid"
                  onEdit={() => alert('编辑项目')}
                  onDelete={() => alert('删除项目')}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <AdvancedProjectCard
                  project={testProject}
                  viewMode="list"
                  onEdit={() => alert('编辑项目')}
                  onDelete={() => alert('删除项目')}
                />
              </div>
            )}
          </div>
        </Card>

        {/* 实际项目展示 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">实际项目展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.projects.slice(0, 3).map((project) => (
              <AdvancedProjectCard
                key={project.id}
                project={project}
                viewMode="grid"
              />
            ))}
          </div>
        </Card>

        {/* 功能说明 */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">功能说明</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ <strong>媒体轮播：</strong>支持图片和视频轮播，全屏查看，缩略图导航</p>
            <p>✅ <strong>项目筛选：</strong>支持搜索、标签筛选、排序、视图模式切换</p>
            <p>✅ <strong>高级卡片：</strong>支持网格和列表两种视图，媒体预览，编辑删除</p>
            <p>✅ <strong>响应式设计：</strong>桌面和移动端自适应布局</p>
            <p>✅ <strong>特色项目：</strong>支持标记特色项目，优先显示</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <EditModeProvider>
      <TestPageContent />
    </EditModeProvider>
  );
} 