import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { X, Maximize2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import ProjectDetailView from './ProjectDetailView';

interface ProjectDetailDialogProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({ project, onClose }) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${fullscreen ? 'overflow-y-auto' : ''}`}>
      <div className={`relative w-full max-w-5xl ${fullscreen ? 'h-full' : ''}`} style={fullscreen ? {maxWidth: '100vw', maxHeight: '100vh'} : {}}>
        {/* 关闭/全屏/详情页按钮 */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button variant="ghost" size="sm" onClick={() => setFullscreen(f => !f)} title={fullscreen ? '退出全屏' : '全屏'}>
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" asChild title="在新页面中打开">
            <a href={`/projects/${project.id}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} title="关闭">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ProjectDetailView project={project} />
      </div>
    </div>
  );
};

export default ProjectDetailDialog; 