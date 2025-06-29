'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { ProjectMedia } from '@/types/portfolio';

interface MediaCarouselProps {
  media: ProjectMedia[];
  className?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  media,
  className,
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [videoRefs, setVideoRefs] = useState<Record<string, HTMLVideoElement | null>>({});

  const currentMedia = media[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  }, [media.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  }, [media.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePlay = () => {
    if (currentMedia?.type === 'video') {
      const video = videoRefs[currentMedia.id];
      if (video) {
        if (isPlaying) {
          video.pause();
        } else {
          video.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleVideoRef = (video: HTMLVideoElement | null, mediaId: string) => {
    setVideoRefs(prev => ({ ...prev, [mediaId]: video }));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 自动播放逻辑
  React.useEffect(() => {
    if (!autoPlay || !isPlaying || media.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPlaying, autoPlayInterval, nextSlide, media.length]);

  // 视频事件处理
  React.useEffect(() => {
    if (currentMedia?.type === 'video') {
      const video = videoRefs[currentMedia.id];
      if (video) {
        const handleEnded = () => {
          setIsPlaying(false);
          if (autoPlay) {
            nextSlide();
          }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('ended', handleEnded);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
          video.removeEventListener('ended', handleEnded);
          video.removeEventListener('play', handlePlay);
          video.removeEventListener('pause', handlePause);
        };
      }
    }
  }, [currentMedia, videoRefs, autoPlay, nextSlide]);

  if (!media.length) {
    return (
      <div className={cn('flex items-center justify-center h-64 bg-gray-100 rounded-lg', className)}>
        <p className="text-gray-500">暂无媒体文件</p>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* 主显示区域 */}
      <Card className={cn(
        'relative overflow-hidden',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video'
      )}>
        {/* 媒体内容 */}
        <div className="w-full h-full relative">
          {currentMedia?.type === 'image' ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.filename}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={(video) => handleVideoRef(video, currentMedia.id)}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              controls={false}
              loop={autoPlay}
              muted={autoPlay}
            />
          )}

          {/* 视频时长显示 */}
          {currentMedia?.type === 'video' && currentMedia.duration && (
            <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
              {formatDuration(currentMedia.duration)}
            </div>
          )}

          {/* 媒体信息 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="font-medium">{currentMedia.filename}</p>
                <p className="text-sm opacity-80">
                  {currentMedia.type === 'image' ? '图片' : '视频'} • 
                  {Math.round(currentMedia.size / 1024)} KB
                  {currentMedia.width && currentMedia.height && (
                    <span> • {currentMedia.width}×{currentMedia.height}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {currentMedia.type === 'video' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* 全屏关闭按钮 */}
        {isFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
            onClick={toggleFullscreen}
          >
            <X className="h-6 w-6" />
          </Button>
        )}

        {/* 指示器 */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </Card>

      {/* 缩略图 */}
      {showThumbnails && media.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={item.id}
              className={cn(
                'flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all',
                index === currentIndex ? 'border-primary' : 'border-transparent hover:border-gray-300'
              )}
              onClick={() => goToSlide(index)}
            >
              <div className="w-20 h-12 bg-gray-100">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.filename}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-xs">视频</div>
                    )}
                  </div>
                )}
              </div>
              <Badge
                variant="secondary"
                className="absolute top-1 right-1 text-xs px-1 py-0"
              >
                {index + 1}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* 计数器 */}
      {media.length > 1 && (
        <div className="mt-2 text-center text-sm text-gray-500">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel; 