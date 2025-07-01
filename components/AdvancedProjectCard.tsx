'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize2, Minimize2, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Project, ProjectMedia } from '@/types/portfolio';
import ProjectDetailDialog from './ProjectDetailDialog';
import { useRouter } from 'next/navigation';

export type ViewMode = 'grid' | 'list';

interface AdvancedProjectCardProps {
  project: Project;
  viewMode: ViewMode;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const AdvancedProjectCard: React.FC<AdvancedProjectCardProps> = ({
  project,
  viewMode,
  onEdit,
  onDelete,
  className
}) => {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这个项目吗？')) {
      onDelete?.();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (viewMode === 'list') {
    return (
      <Card className={cn('p-4 hover:shadow-lg transition-all duration-300 cursor-pointer', className)} onClick={() => router.push(`/projects/${project.id}`)}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 媒体区域 */}
          <div className="lg:w-1/3">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover aspect-video rounded-lg"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">暂无媒体</span>
              </div>
            )}
          </div>

          {/* 内容区域 */}
          <div className="lg:flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                  {project.featured && (
                    <Badge variant="default" className="text-xs">特色</Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-sm text-gray-500">角色：{project.role}</p>
              </div>
              {/* 操作按钮 */}
              <div className="flex items-center gap-2">
                {project.link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="outline" size="sm" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {/* 技术栈 */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            {/* 项目信息 */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {project.startDate && (
                <span>开始：{project.startDate}</span>
              )}
              {project.endDate && (
                <span>结束：{project.endDate}</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // 网格视图
  return (
    <Card className={cn('group hover:shadow-lg transition-all duration-300 overflow-hidden', className)}>
      {/* 媒体区域 */}
      <div className="relative">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover aspect-video rounded-lg cursor-pointer"
            onClick={() => router.push(`/projects/${project.id}`)}
          />
        ) : (
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400">暂无媒体</span>
          </div>
        )}

        {/* 特色标识 */}
        {project.featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="text-xs">特色</Badge>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {project.link && (
            <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {onEdit && (
            <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" className="bg-black/50 text-white hover:bg-black/70" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>
          <p className="text-sm text-gray-500">角色：{project.role}</p>
        </div>

        {/* 技术栈 */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* 项目信息 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            {project.startDate && <span>{project.startDate}</span>}
            {project.endDate && <span>- {project.endDate}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdvancedProjectCard; 