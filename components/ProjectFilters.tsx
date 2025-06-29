'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Project } from '@/types/portfolio';
import { cn } from '@/lib/utils';

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'featured';
export type ViewMode = 'grid' | 'list';

interface ProjectFiltersProps {
  projects: Project[];
  onFiltersChange: (filters: {
    search: string;
    selectedTags: string[];
    sortBy: SortOption;
    viewMode: ViewMode;
  }) => void;
  className?: string;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  projects,
  onFiltersChange,
  className
}) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 获取所有可用的标签
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.technologies?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // 处理搜索变化
  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateFilters(value, selectedTags, sortBy, viewMode);
  };

  // 处理标签选择
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    updateFilters(search, newTags, sortBy, viewMode);
  };

  // 处理排序变化
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    updateFilters(search, selectedTags, value, viewMode);
  };

  // 处理视图模式变化
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    updateFilters(search, selectedTags, sortBy, mode);
  };

  // 更新过滤器
  const updateFilters = (searchValue: string, tags: string[], sort: SortOption, view: ViewMode) => {
    onFiltersChange({
      search: searchValue,
      selectedTags: tags,
      sortBy: sort,
      viewMode: view
    });
  };

  // 清除所有过滤器
  const clearFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setSortBy('newest');
    setViewMode('grid');
    updateFilters('', [], 'newest', 'grid');
  };

  const hasActiveFilters = search || selectedTags.length > 0 || sortBy !== 'newest';

  return (
    <div className={cn('space-y-4', className)}>
      {/* 搜索和视图控制 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* 搜索框 */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索项目..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 视图模式切换 */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 排序和过滤器 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* 排序选择 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">排序:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">最新创建</SelectItem>
                <SelectItem value="oldest">最早创建</SelectItem>
                <SelectItem value="name-asc">名称 A-Z</SelectItem>
                <SelectItem value="name-desc">名称 Z-A</SelectItem>
                <SelectItem value="featured">特色项目优先</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 清除过滤器 */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600"
            >
              清除过滤器
            </Button>
          )}
        </div>

        {/* 项目统计 */}
        <div className="text-sm text-gray-500">
          共 {projects.length} 个项目
        </div>
      </div>

      {/* 标签过滤器 */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">按技术栈筛选:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-colors',
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'hover:bg-gray-100'
                )}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && (
                  <span className="ml-1 text-xs">✓</span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 活跃过滤器显示 */}
      {(search || selectedTags.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">活跃过滤器:</span>
          {search && (
            <Badge variant="secondary" className="text-sm">
              搜索: "{search}"
            </Badge>
          )}
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectFilters; 