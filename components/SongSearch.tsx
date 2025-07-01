import { useState, useEffect } from "react";
import { Search, Music, Clock, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { songService, Song } from "../services/songService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SongSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSongSelect: (song: Song) => void;
  currentSong?: Song;
}

export function SongSearch({ isOpen, onClose, onSongSelect, currentSong }: SongSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [popularSongs, setPopularSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load popular songs when modal opens
      const popular = songService.getPopularSongs(8); // 조금 더 많이 표시
      setPopularSongs(popular);
      setSearchQuery("");
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);
    
    try {
      const results = await songService.searchSongs({
        query: searchQuery
      });
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSongClick = (song: Song) => {
    onSongSelect(song);
    onClose();
  };

  const songsToShow = hasSearched ? searchResults : popularSongs;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-purple-600" />
            노래 검색
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="노래 제목, 아티스트, 가사로 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
              {loading ? "검색 중..." : "검색"}
            </Button>
          </div>

          {/* Current Song Display */}
          {currentSong && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 mb-3 font-medium">현재 선택된 노래:</p>
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={currentSong.coverImage}
                  alt={currentSong.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="font-medium text-lg">{currentSong.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {currentSong.artist}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentSong.genre.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results or Popular Songs */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 text-lg">
              {hasSearched ? (
                <>검색 결과 ({searchResults.length}개)</>
              ) : (
                <>인기 노래</>
              )}
            </h3>

            <div className="max-h-96 overflow-y-auto">
              {songsToShow.length === 0 ? (
                <div className="text-center py-12">
                  <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {hasSearched ? "검색 결과가 없습니다." : "인기 노래를 불러오는 중..."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {songsToShow.map((song, index) => (
                    <Card 
                      key={song.id} 
                      className={`cursor-pointer transition-all hover:shadow-md hover:bg-gray-50 ${
                        currentSong?.id === song.id ? 'bg-purple-50 border-purple-200 ring-2 ring-purple-200' : ''
                      }`}
                      onClick={() => handleSongClick(song)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* 순위 번호 (인기 노래에만 표시) */}
                          {!hasSearched && (
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                          )}
                          
                          <ImageWithFallback
                            src={song.coverImage}
                            alt={`${song.title} cover`}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-lg mb-1">{song.title}</h4>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                  <Users className="w-3 h-3 flex-shrink-0" />
                                  <span>{song.artist}</span>
                                </p>
                              </div>
                              {currentSong?.id === song.id && (
                                <Badge className="bg-purple-100 text-purple-700 ml-2 flex-shrink-0">
                                  선택됨
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                              {song.year && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {song.year}
                                </span>
                              )}
                              {song.album && (
                                <span>• {song.album}</span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {song.genre.slice(0, 3).map((genre) => (
                                <Badge
                                  key={genre}
                                  variant="secondary"
                                  className="text-xs bg-gray-100"
                                >
                                  {genre}
                                </Badge>
                              ))}
                              {song.genre.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gray-100 text-gray-500"
                                >
                                  +{song.genre.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}