import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle
} from "lucide-react";
import { Song } from "../services/songService";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MusicPlayerProps {
  song: Song;
  className?: string;
}

export function MusicPlayer({ song, className = "" }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4분 기본값
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 실제 음원 URL 가져오기
  const getAudioUrl = (song: Song) => {
    if (song.previewUrl) {
      return song.previewUrl;
    } else if (song.youtubeId) {
      return null; // YouTube iframe으로 대체
    }
    return `https://www.soundjay.com/misc/sounds/fail-buzzer-02.mp3`; // Mock URL
  };

  const openInSpotify = () => {
    if (song.spotifyId) {
      window.open(`https://open.spotify.com/track/${song.spotifyId}`, '_blank');
    }
  };

  const openInYouTube = () => {
    if (song.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${song.youtubeId}`, '_blank');
    }
  };

  useEffect(() => {
    // 음악 재생 시뮬레이션
    if (isPlaying && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            if (isRepeat) {
              return 0; // 반복 재생
            } else {
              setIsPlaying(false);
              return duration;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, isRepeat]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <Card className={`bg-white/95 backdrop-blur-sm border-purple-200 shadow-lg ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <ImageWithFallback
              src={song.coverImage}
              alt={`${song.title} cover`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{song.title}</h3>
              <p className="text-xs text-gray-600 truncate">{song.artist}</p>
              <div className="flex gap-1 mt-1">
                {song.genre.slice(0, 2).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md space-y-2">
            <div className="relative">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full h-1"
              />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -translate-y-1/2 pointer-events-none"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShuffle(!isShuffle)}
              className={`h-8 w-8 p-0 ${isShuffle ? 'text-purple-600' : 'text-gray-500'}`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={skipBackward}
              className="h-8 w-8 p-0"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={togglePlay}
              size="sm"
              className="h-10 w-10 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={skipForward}
              className="h-8 w-8 p-0"
            >
              <SkipForward className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsRepeat(!isRepeat)}
              className={`h-8 w-8 p-0 ${isRepeat ? 'text-purple-600' : 'text-gray-500'}`}
            >
              <Repeat className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-24">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="h-8 w-8 p-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1 h-1"
            />
          </div>

          {/* Streaming Links */}
          <div className="flex items-center gap-1">
            {song.spotifyId && (
              <Button
                variant="outline"
                size="sm"
                onClick={openInSpotify}
                className="h-7 px-2 text-xs bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
              >
                Spotify
              </Button>
            )}
            {song.youtubeId && (
              <Button
                variant="outline"
                size="sm"
                onClick={openInYouTube}
                className="h-7 px-2 text-xs bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
              >
                YouTube
              </Button>
            )}
          </div>
        </div>

        {/* Audio element for real implementation */}
        {getAudioUrl(song) && (
          <audio
            ref={audioRef}
            preload="metadata"
            className="hidden"
          >
            <source src={getAudioUrl(song) || ""} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* YouTube embed for songs without direct audio URL */}
        {!getAudioUrl(song) && song.youtubeId && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="60"
              src={`https://www.youtube.com/embed/${song.youtubeId}?enablejsapi=1&controls=1&modestbranding=1`}
              title={`${song.title} by ${song.artist}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
}