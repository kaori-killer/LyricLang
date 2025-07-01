import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronLeft, ChevronRight, Clock, ExternalLink, Play, Video, X } from "lucide-react";

interface VideoPlayerProps {
  selectedText: string;
  onClose: () => void;
}

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  description: string;
  timestamp: number;
  timestampLabel: string;
  embedUrl: string;
}

export function VideoPlayer({ selectedText, onClose }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedText) {
      setLoading(true);
      setCurrentVideoIndex(0);
      
      setTimeout(() => {
        const mockVideos = getMockVideos(selectedText);
        setVideos(mockVideos);
        setLoading(false);
      }, 500);
    }
  }, [selectedText]);

  const getMockVideos = (text: string): VideoResult[] => {
    return [
      {
        id: "dQw4w9WgXcQ",
        title: `English Expressions: "${text}" in Real Conversations`,
        thumbnail: "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=320&h=180&fit=crop",
        channel: "English Learning Hub",
        description: `Learn how to use "${text}" in everyday English conversations with native speakers.`,
        timestamp: 45,
        timestampLabel: "0:45",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?start=45&autoplay=1"
      },
      {
        id: "abc123def",
        title: `Grammar Masterclass: Understanding "${text}"`,
        thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=320&h=180&fit=crop",
        channel: "Grammar Master",
        description: `Deep dive into the grammatical structure and usage of "${text}" with examples.`,
        timestamp: 120,
        timestampLabel: "2:00",
        embedUrl: "https://www.youtube.com/embed/abc123def?start=120&autoplay=1"
      },
      {
        id: "xyz789ghi",
        title: `Pop Songs English: "${text}" Analysis`,
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320&h=180&fit=crop",
        channel: "K-Pop English",
        description: `Analyzing the phrase "${text}" as it appears in popular music and culture.`,
        timestamp: 30,
        timestampLabel: "0:30",
        embedUrl: "https://www.youtube.com/embed/xyz789ghi?start=30&autoplay=1"
      },
      {
        id: "def456abc",
        title: `Pronunciation Guide: How to Say "${text}" Perfectly`,
        thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=320&h=180&fit=crop",
        channel: "Pronunciation Pro",
        description: `Perfect your pronunciation of "${text}" with phonetic breakdown and practice.`,
        timestamp: 15,
        timestampLabel: "0:15",
        embedUrl: "https://www.youtube.com/embed/def456abc?start=15&autoplay=1"
      }
    ];
  };

  const currentVideo = videos[currentVideoIndex];

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const openInYouTube = () => {
    if (currentVideo) {
      window.open(`https://www.youtube.com/watch?v=${currentVideo.id}&t=${currentVideo.timestamp}s`, '_blank');
    }
  };

  if (!selectedText) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">문장을 드래그하면</p>
            <p className="text-sm">관련 영상이 여기에 표시됩니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600">관련 영상을 찾고 있습니다...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentVideo) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">관련 영상을 찾을 수 없습니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      {/* Header */}
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-red-600" />
            <span className="truncate">"{selectedText}"</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="aspect-video">
            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
              <div className="text-center text-white p-4">
                <Play className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <p className="text-sm mb-2 line-clamp-2">{currentVideo.title}</p>
                <p className="text-xs opacity-80 mb-3">
                  {currentVideo.timestampLabel}에서 "{selectedText}" 부분 재생
                </p>
                <Button 
                  onClick={openInYouTube}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  YouTube에서 보기
                </Button>
              </div>
              
              <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentVideo.timestampLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700 text-xs">
                {currentVideoIndex + 1} / {videos.length}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {currentVideo.channel}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={videos.length <= 1}
                className="h-7 px-2"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={videos.length <= 1}
                className="h-7 px-2"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openInYouTube}
                className="h-7 px-2"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm line-clamp-2 mb-1">{currentVideo.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{currentVideo.description}</p>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              해당 부분: {currentVideo.timestampLabel}
            </span>
          </div>
        </div>

        {/* Related Videos */}
        {videos.length > 1 && (
          <div className="border-t pt-3">
            <p className="text-xs font-medium mb-2 text-gray-700">다른 관련 영상</p>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {videos.slice(0, 3).map((video, index) => (
                <div
                  key={video.id}
                  className={`flex gap-2 p-2 rounded cursor-pointer transition-colors hover:bg-gray-50 ${
                    index === currentVideoIndex ? 'bg-red-50 border border-red-200' : ''
                  }`}
                  onClick={() => setCurrentVideoIndex(index)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-12 h-8 object-cover rounded flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium line-clamp-1">{video.title}</p>
                    <p className="text-xs text-gray-500">{video.channel}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-2 h-2 text-gray-400" />
                      <span className="text-xs text-gray-500">{video.timestampLabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Tip */}
        <div className="bg-blue-50 p-3 rounded-lg border-t">
          <p className="text-xs text-blue-800">
            💡 <strong>학습 팁:</strong> 영상에서 "{selectedText}" 표현의 억양과 상황을 주의깊게 들어보세요!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}