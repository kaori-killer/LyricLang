import { Music, Search, Play, Volume2, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface HeaderProps {
  onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Left - Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                  <Music className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Play className="w-2 h-2 text-white fill-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LyricLang
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  팝송으로 배우는 영어
                </p>
              </div>
            </div>

            {/* Center - Search Button */}
            <div className="flex justify-center">
              <Button 
                onClick={onSearchClick}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Search className="w-5 h-5 mr-3" />
                <span className="hidden sm:inline">노래 검색하기</span>
                <span className="sm:hidden">검색</span>
              </Button>
            </div>

            {/* Right - Feature Badges */}
            <div className="hidden xl:flex items-center justify-end gap-2">
              <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                <Volume2 className="w-3 h-3 mr-1" />
                발음 학습
              </Badge>
              <Badge variant="secondary" className="bg-pink-50 text-pink-700 border-pink-200">
                <Play className="w-3 h-3 mr-1" />
                영상 학습
              </Badge>
            </div>
          </div>
        </div>

        <div className="hidden lg:block border-t border-gray-100 bg-gray-50/50">
          <div className="px-6 py-2">
            <div className="flex items-center justify-center gap-8 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                단어 클릭으로 사전 검색
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                문장 드래그로 영상 학습
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                미국/영국/호주 발음 지원
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Oxford Dictionary × YouTube
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}