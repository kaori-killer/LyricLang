import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Clock, ExternalLink, X, Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
}

interface VideoResult {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  description: string;
  timestamp: number; // 해당 문장이 나오는 시간 (초)
  timestampLabel: string; // 표시용 시간 레이블
  embedUrl: string;
}

export function VideoModal({ isOpen, onClose, selectedText }: VideoModalProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock video search based on selected text
  useEffect(() => {
    if (isOpen && selectedText) {
      setLoading(true);
      setCurrentVideoIndex(0);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockVideos = getMockVideos(selectedText);
        setVideos(mockVideos);
        setLoading(false);
      }, 500);
    }
  }, [isOpen, selectedText]);

  const getMockVideos = (text: string): VideoResult[] => {
    // Mock videos with timestamps based on selected text
    const baseVideos = [
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
      },
      {
        id: "ghi789jkl",
        title: `Business English: Using "${text}" in Professional Settings`,
        thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=320&h=180&fit=crop",
        channel: "Business English Pro",
        description: `Learn how to use "${text}" appropriately in business and professional contexts.`,
        timestamp: 90,
        timestampLabel: "1:30",
        embedUrl: "https://www.youtube.com/embed/ghi789jkl?start=90&autoplay=1"
      }
    ];

    return baseVideos;
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-red-600" />
              <span>"{selectedText}" 표현 학습 영상</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
            <p className="ml-3">관련 영상을 찾고 있습니다...</p>
          </div>
        ) : currentVideo ? (
          <div className="flex flex-col h-full">
            {/* Video Player */}
            <div className="relative bg-black">
              <div className="aspect-video">
                {/* Mock YouTube embed - 실제로는 YouTube iframe을 사용 */}
                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg mb-2">{currentVideo.title}</p>
                    <p className="text-sm opacity-80">
                      {currentVideo.timestampLabel}에서 "{selectedText}" 부분 재생
                    </p>
                    <Button 
                      onClick={openInYouTube}
                      className="mt-4 bg-red-600 hover:bg-red-700"
                    >
                      YouTube에서 보기
                    </Button>
                  </div>
                  
                  {/* Timestamp indicator */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentVideo.timestampLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    {currentVideoIndex + 1} / {videos.length}
                  </Badge>
                  <Badge variant="secondary">
                    {currentVideo.channel}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={videos.length <= 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={videos.length <= 1}
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openInYouTube}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-lg">{currentVideo.title}</h3>
                <p className="text-sm text-gray-600">{currentVideo.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    해당 부분: {currentVideo.timestampLabel}
                  </span>
                  <span>채널: {currentVideo.channel}</span>
                </div>
              </div>
            </div>

            {/* Related Videos Preview */}
            {videos.length > 1 && (
              <div className="p-4 border-t">
                <h4 className="font-medium mb-3">다른 관련 영상</h4>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {videos.map((video, index) => (
                    <Card
                      key={video.id}
                      className={`flex-shrink-0 w-64 cursor-pointer transition-all hover:shadow-md ${
                        index === currentVideoIndex ? 'ring-2 ring-red-500' : ''
                      }`}
                      onClick={() => setCurrentVideoIndex(index)}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-16 h-12 object-cover rounded flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium line-clamp-2 mb-1">
                              {video.title}
                            </p>
                            <p className="text-xs text-gray-500">{video.channel}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {video.timestampLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">관련 영상을 찾을 수 없습니다.</p>
          </div>
        )}

        {/* Learning Tip */}
        <div className="p-4 bg-blue-50 border-t">
          <p className="text-sm text-blue-800">
            💡 <strong>학습 팁:</strong> 영상에서 "{selectedText}" 표현이 어떤 억양과 상황에서 사용되는지 주의깊게 들어보세요. 
            자막을 켜고 따라 말해보는 것도 좋은 연습이 됩니다!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}