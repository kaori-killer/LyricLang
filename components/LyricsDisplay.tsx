import { useState, useCallback, useRef } from "react";
import { WordTooltip } from "./WordTooltip";
import { VideoPlayer } from "./VideoPlayer";
import { WordDetails } from "./WordDetails";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, Calendar, Video, BookOpen } from "lucide-react";
import { Song } from "../services/songService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LyricsDisplayProps {
  song: Song;
}

export function LyricsDisplay({ song }: LyricsDisplayProps) {
  const [selectedText, setSelectedText] = useState("");
  const [draggedText, setDraggedText] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showWordDetails, setShowWordDetails] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState<"video" | "word">("video");
  const selectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTextSelection = useCallback(() => {
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }

    selectionTimeoutRef.current = setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (text && text.length > 3) {
        // 텍스트 길이 제한으로 화면 밖으로 나가는 것 방지
        const maxLength = 50;
        const truncatedText = text.length > maxLength 
          ? text.substring(0, maxLength) + "..." 
          : text;
        
        setSelectedText(truncatedText);
        setDraggedText(truncatedText);
        setShowVideoPlayer(true);
        setRightPanelTab("video");
        
        const range = selection?.getRangeAt(0);
        if (range) {
          setTimeout(() => {
            selection?.removeAllRanges();
          }, 100);
        }
      }
    }, 100);
  }, []);

  const handleMouseDown = () => {
    setDraggedText("");
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    setShowWordDetails(true);
    setRightPanelTab("word");
  };

  const handleCloseVideo = () => {
    setShowVideoPlayer(false);
    setSelectedText("");
    setDraggedText("");
  };

  const handleCloseWord = () => {
    setShowWordDetails(false);
    setSelectedWord("");
  };

  const renderLyricsWithTooltips = (text: string) => {
    const words = text.split(/(\s+|[.,!?;:])/);
    
    return words.map((segment, index) => {
      if (/^\s+$/.test(segment) || /^[.,!?;:]$/.test(segment)) {
        return segment;
      }
      
      if (/^[a-zA-Z']+$/.test(segment)) {
        return (
          <WordTooltip key={index} word={segment} onWordClick={handleWordClick}>
            {segment}
          </WordTooltip>
        );
      }
      
      return segment;
    });
  };

  const showRightPanel = showVideoPlayer || showWordDetails;

  return (
    <div className="px-6 space-y-4 pb-8">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Song Info & Lyrics */}
        <div className={`${showRightPanel ? 'lg:col-span-1' : 'lg:col-span-2 max-w-4xl mx-auto'} transition-all duration-300`}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <ImageWithFallback
                  src={song.coverImage}
                  alt={`${song.title} cover`}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{song.title}</CardTitle>
                      <p className="text-lg text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  
                  {(song.album || song.year) && (
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      {song.album && (
                        <span>📀 {song.album}</span>
                      )}
                      {song.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {song.year}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {song.genre.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        {genre}
                      </Badge>
                    ))}
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                      영어 학습
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800 mb-1">
                      <strong>사용법:</strong>
                    </p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• 단어를 <strong>클릭</strong>하면 오른쪽에 뜻과 발음이 나타납니다</li>
                      <li>• 문장을 <strong>드래그</strong>하면 오른쪽에 관련 영상이 나타납니다</li>
                      <li>• 위의 <strong>음악 플레이어</strong>로 노래를 들으며 가사를 학습하세요</li>
                      <li>• 영상에서 해당 문장 부분으로 자동 이동해요</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div 
                className="select-text whitespace-pre-line font-medium cursor-text"
                onMouseUp={handleTextSelection}
                onMouseDown={handleMouseDown}
                style={{ 
                  userSelect: 'text',
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  letterSpacing: '0.025em',
                  wordSpacing: '0.125em',
                  color: '#1f2937'
                }}
              >
                {song.lyrics.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className="mb-2 min-h-[1.8rem] hover:bg-blue-50/30 rounded px-1 transition-colors">
                    {line.trim() ? renderLyricsWithTooltips(line) : <br />}
                  </div>
                ))}
              </div>

              {(draggedText || selectedWord) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  {draggedText && (
                    <p className="text-sm text-blue-700 mb-2">
                      <Video className="w-4 h-4 inline mr-1" />
                      선택된 텍스트: <strong className="break-words">{draggedText}</strong>
                      {showVideoPlayer && (
                        <span className="ml-2 block sm:inline">
                          → 오른쪽에서 관련 영상을 확인하세요!
                        </span>
                      )}
                    </p>
                  )}
                  {selectedWord && (
                    <p className="text-sm text-green-700">
                      <BookOpen className="w-4 h-4 inline mr-1" />
                      선택된 단어: <strong>{selectedWord}</strong>
                      {showWordDetails && (
                        <span className="ml-2 block sm:inline">
                          → 오른쪽에서 단어 뜻과 발음을 확인하세요!
                        </span>
                      )}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Video Player & Word Details */}
        {showRightPanel && (
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {(showVideoPlayer && showWordDetails) ? (
                /* Tabs when both are active */
                <Card className="shadow-lg">
                  <CardHeader className="pb-2">
                    <Tabs value={rightPanelTab} onValueChange={(value) => setRightPanelTab(value as "video" | "word")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="video" className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          영상
                        </TabsTrigger>
                        <TabsTrigger value="word" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          단어
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs value={rightPanelTab}>
                      <TabsContent value="video" className="m-0">
                        <div className="p-4">
                          <VideoPlayer
                            selectedText={selectedText}
                            onClose={handleCloseVideo}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent value="word" className="m-0">
                        <div className="p-4">
                          <WordDetails
                            word={selectedWord}
                            onClose={handleCloseWord}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : showVideoPlayer ? (
                /* Only video */
                <VideoPlayer
                  selectedText={selectedText}
                  onClose={handleCloseVideo}
                />
              ) : (
                /* Only word details */
                <WordDetails
                  word={selectedWord}
                  onClose={handleCloseWord}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}