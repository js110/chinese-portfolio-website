"use client";
import React from 'react';
import { Project } from '@/types/portfolio';
import { Badge } from './ui/badge';

interface ProjectDetailViewProps {
  project: Project;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {
  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
      {/* 左侧：媒体轮播和截图区 */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-4">
        {project.coverImage && (
          <div className="w-full flex justify-center items-center mb-4">
            <img src={project.coverImage} alt="项目封面" className="rounded-lg max-h-96 object-contain" />
          </div>
        )}
        {/* 项目截图区 */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-4 w-full">
            <div className="font-semibold text-gray-700 mb-2">项目截图</div>
            <div className="grid grid-cols-2 gap-2">
              {project.screenshots.map((url, idx) => (
                <img key={idx} src={url} alt={`项目截图${idx+1}`} className="rounded shadow object-cover w-full h-32 cursor-pointer" onClick={() => window.open(url, '_blank')} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* 右侧：项目信息 */}
      <div className="md:w-1/2 w-full flex flex-col gap-4 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
        <p className="text-gray-700 mb-2 whitespace-pre-line">{project.description}</p>
        {project.highlights && project.highlights.length > 0 && (
          <div>
            <div className="font-semibold text-gray-700 mb-1">项目亮点</div>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}
        {project.technologies && project.technologies.length > 0 && (
          <div>
            <div className="font-semibold text-gray-700 mb-1">技术栈</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {project.role && <span>角色：{project.role}</span>}
          {project.startDate && <span>开始：{project.startDate}</span>}
          {project.endDate && <span>结束：{project.endDate}</span>}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">项目链接</a>
          )}
        </div>
        {project.team && project.team.length > 0 && (
          <div>
            <div className="font-semibold text-gray-700 mb-1 mt-2">团队成员</div>
            <div className="flex flex-wrap gap-3">
              {project.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                  {member.avatar && <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full" />}
                  <span className="font-medium text-gray-800 text-sm">{member.name}</span>
                  <span className="text-xs text-gray-500">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailView; 