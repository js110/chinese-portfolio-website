'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image, Video, File, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { ProjectMedia } from '@/types/portfolio';

interface MediaUploadProps {
  onMediaChange: (media: ProjectMedia[]) => void;
  currentMedia: ProjectMedia[];
  maxFiles?: number;
  maxFileSize?: number; // 字节
  className?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onMediaChange,
  currentMedia = [],
  maxFiles = 10,
  maxFileSize = 500 * 1024 * 1024, // 500MB
  className
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (currentMedia.length + acceptedFiles.length > maxFiles) {
      alert(`最多只能上传 ${maxFiles} 个文件`);
      return;
    }

    setUploading(true);
    const newMedia: ProjectMedia[] = [];

    for (const file of acceptedFiles) {
      const fileId = `${Date.now()}-${Math.random()}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      try {
        // 创建 FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', 'temp'); // 临时项目ID，实际使用时应该传入真实项目ID

        // 上传文件
        const response = await fetch('/api/upload-media', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '上传失败');
        }

        const result = await response.json();
        
        if (result.success && result.file) {
          const mediaItem: ProjectMedia = {
            ...result.file,
            order: currentMedia.length + newMedia.length
          };

          // 如果是图片，获取尺寸
          if (mediaItem.type === 'image') {
            const img = document.createElement('img');
            img.onload = () => {
              mediaItem.width = img.width;
              mediaItem.height = img.height;
            };
            img.src = mediaItem.url;
          }

          // 如果是视频，获取时长和缩略图
          if (mediaItem.type === 'video') {
            const video = document.createElement('video');
            video.onloadedmetadata = () => {
              mediaItem.duration = video.duration;
              // 创建缩略图
              const canvas = document.createElement('canvas');
              canvas.width = 320;
              canvas.height = 180;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(video, 0, 0, 320, 180);
                mediaItem.thumbnail = canvas.toDataURL();
              }
            };
            video.src = mediaItem.url;
          }

          newMedia.push(mediaItem);
        } else {
          throw new Error('上传响应格式错误');
        }

        // 更新进度
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

      } catch (error) {
        console.error('文件上传失败:', error);
        alert(`文件 ${file.name} 上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    }

    setUploading(false);
    setUploadProgress({});
    onMediaChange([...currentMedia, ...newMedia]);
  }, [currentMedia, maxFiles, onMediaChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.ogg', '.mov']
    },
    maxSize: maxFileSize,
    disabled: uploading
  });

  const removeMedia = (mediaId: string) => {
    const updatedMedia = currentMedia.filter(m => m.id !== mediaId);
    onMediaChange(updatedMedia);
  };

  const reorderMedia = (fromIndex: number, toIndex: number) => {
    const updatedMedia = [...currentMedia];
    const [movedItem] = updatedMedia.splice(fromIndex, 1);
    updatedMedia.splice(toIndex, 0, movedItem);
    
    // 更新order字段
    updatedMedia.forEach((item, index) => {
      item.order = index;
    });
    
    onMediaChange(updatedMedia);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* 上传区域 */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          {isDragActive ? '释放文件以上传' : '拖拽文件到此处或点击上传'}
        </p>
        <p className="text-sm text-gray-500">
          支持图片 (JPEG, PNG, GIF, WebP) 和视频 (MP4, WebM, OGG, MOV)
        </p>
        <p className="text-xs text-gray-400 mt-1">
          最大文件大小: {formatFileSize(maxFileSize)} | 最多 {maxFiles} 个文件
        </p>
      </div>

      {/* 上传进度 */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="flex items-center space-x-2">
              <Progress value={progress} className="flex-1" />
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
          ))}
        </div>
      )}

      {/* 媒体文件列表 */}
      {currentMedia.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">已上传的媒体文件</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentMedia.map((media, index) => (
              <Card key={media.id} className="relative group overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={media.filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      {media.thumbnail ? (
                        <img
                          src={media.thumbnail}
                          alt={media.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Video className="h-12 w-12 text-white" />
                      )}
                      {media.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {formatDuration(media.duration)}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 删除按钮 */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(media.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* 文件信息 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center space-x-2 text-white text-sm">
                      {media.type === 'image' ? (
                        <Image className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                      <span className="truncate">{media.filename}</span>
                    </div>
                    <div className="text-white/70 text-xs">
                      {formatFileSize(media.size)}
                      {media.width && media.height && (
                        <span> • {media.width}×{media.height}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 排序指示器 */}
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 文件统计 */}
      {currentMedia.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            已上传 {currentMedia.length}/{maxFiles} 个文件
          </span>
          <span>
            总大小: {formatFileSize(currentMedia.reduce((sum, m) => sum + m.size, 0))}
          </span>
        </div>
      )}
    </div>
  );
};

export default MediaUpload; 