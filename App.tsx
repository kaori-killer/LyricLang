import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { LyricsDisplay } from "./components/LyricsDisplay";
import { MusicPlayer } from "./components/MusicPlayer";
import { SongSearch } from "./components/SongSearch";
import { songService, Song } from "./services/songService";

export default function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load default song on app start
  useEffect(() => {
    songService.getSongById("bts-dynamite").then(song => {
      if (song) setCurrentSong(song);
    });
  }, []);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  if (!currentSong) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-600">LyricLang를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header onSearchClick={handleSearchClick} />
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <MusicPlayer song={currentSong} className="mb-6" />
      </div>
      
      <main className="max-w-7xl mx-auto">
        <LyricsDisplay song={currentSong} />
      </main>
      
      <SongSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSongSelect={handleSongSelect}
        currentSong={currentSong}
      />
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-2">
          <p className="text-gray-600 text-sm">
            LyricLang - 팝송으로 배우는 재미있는 영어 학습
          </p>
          <p className="text-gray-500 text-xs">
            단어 데이터: Oxford Dictionary API | 동영상: YouTube API
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <span>🔊 음성 발음 지원</span>
            <span>📚 어원 정보 제공</span>
            <span>🎯 예문 및 유의어</span>
            <span>🎵 다양한 팝송 지원</span>
          </div>
        </div>
      </footer>
    </div>
  );
}