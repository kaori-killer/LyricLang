import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Loader2, Volume2, BookOpen, Globe, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { dictionaryService } from "../services/dictionaryApi";

interface WordDetailsProps {
  word: string;
  onClose: () => void;
}

interface OxfordEntry {
  word: string;
  pronunciation?: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
    }[];
  }[];
  etymology?: string;
}

interface WordData {
  word: string;
  entry: OxfordEntry;
  imageUrl: string;
}

interface PronunciationVariant {
  country: string;
  countryCode: string;
  accent: string;
  ipa: string;
  description: string;
  flag: string;
  voiceLang: string;
}

export function WordDetails({ word, onClose }: WordDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPronunciation, setSelectedPronunciation] = useState("us");

  useEffect(() => {
    if (word) {
      loadWordData();
    }
  }, [word]);

  const loadWordData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await dictionaryService.lookupWord(word);
      setWordData(data);
    } catch (err) {
      setError("단어 정보를 불러올 수 없습니다.");
      console.error("Dictionary API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 단어별 발음 변화 데이터
  const getPronunciationVariants = (word: string): PronunciationVariant[] => {
    const baseWord = word.toLowerCase();
    
    return [
      {
        country: "미국",
        countryCode: "us",
        accent: "General American",
        ipa: generateIPA(baseWord, "us"),
        description: "일반적인 미국식 발음",
        flag: "🇺🇸",
        voiceLang: "en-US"
      },
      {
        country: "영국",
        countryCode: "uk", 
        accent: "Received Pronunciation",
        ipa: generateIPA(baseWord, "uk"),
        description: "표준 영국식 발음 (BBC 영어)",
        flag: "🇬🇧",
        voiceLang: "en-GB"
      },
      {
        country: "호주",
        countryCode: "au",
        accent: "General Australian",
        ipa: generateIPA(baseWord, "au"),
        description: "일반적인 호주식 발음",
        flag: "🇦🇺",
        voiceLang: "en-AU"
      }
    ];
  };

  // 간단한 IPA 생성 함수
  const generateIPA = (word: string, variant: string): string => {
    const base = word.toLowerCase();
    let ipa = base;
    
    // 공통 변환
    ipa = ipa.replace(/th/g, 'θ');
    ipa = ipa.replace(/sh/g, 'ʃ');
    ipa = ipa.replace(/ch/g, 'tʃ');
    ipa = ipa.replace(/ng/g, 'ŋ');
    
    // 국가별 차이
    switch (variant) {
      case "us":
        ipa = ipa.replace(/a/g, 'æ');
        ipa = ipa.replace(/er/g, 'ɚ');
        ipa = ipa.replace(/r/g, 'r');
        break;
      case "uk":
        ipa = ipa.replace(/a/g, 'ɑː');
        ipa = ipa.replace(/er/g, 'ə');
        ipa = ipa.replace(/r$/g, '');
        break;
      case "au":
        ipa = ipa.replace(/a/g, 'æ');
        ipa = ipa.replace(/i/g, 'ɪ');
        ipa = ipa.replace(/er/g, 'ə');
        break;
    }
    
    return `/${ipa}/`;
  };

  const playPronunciation = (voiceLang: string) => {
    if ('speechSynthesis' in window && wordData?.entry.word) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(wordData.entry.word);
      utterance.lang = voiceLang;
      utterance.rate = 0.7;
      utterance.pitch = 1;
      
      const voices = speechSynthesis.getVoices();
      const targetVoice = voices.find(voice => 
        voice.lang.startsWith(voiceLang) || voice.lang === voiceLang
      );
      
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const pronunciationVariants = wordData ? getPronunciationVariants(wordData.entry.word) : [];

  if (!word) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">단어를 클릭하면</p>
            <p className="text-sm">뜻과 발음이 여기에 표시됩니다</p>
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
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="truncate capitalize">{word}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="ml-2 text-sm">Oxford Dictionary에서 검색 중...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadWordData} 
              className="mt-2"
            >
              다시 시도
            </Button>
          </div>
        ) : wordData ? (
          <div className="space-y-4">
            {/* Word Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-purple-700 capitalize">
                  {wordData.entry.word}
                </h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Oxford
                </Badge>
              </div>
            </div>

            {/* Image */}
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={wordData.imageUrl}
                alt={`Image for ${wordData.entry.word}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pronunciation Tabs */}
            <div>
              <Tabs value={selectedPronunciation} onValueChange={setSelectedPronunciation}>
                <TabsList className="grid w-full grid-cols-3">
                  {pronunciationVariants.map((variant) => (
                    <TabsTrigger 
                      key={variant.countryCode} 
                      value={variant.countryCode}
                      className="text-xs"
                    >
                      <span className="mr-1">{variant.flag}</span>
                      {variant.country}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {pronunciationVariants.map((variant) => (
                  <TabsContent key={variant.countryCode} value={variant.countryCode} className="mt-3">
                    <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{variant.flag}</span>
                          <div>
                            <p className="font-medium text-xs">{variant.accent}</p>
                            <p className="text-xs text-gray-600">{variant.description}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => playPronunciation(variant.voiceLang)}
                          className="flex items-center gap-1 h-7 px-2"
                        >
                          <Volume2 className="w-3 h-3" />
                          듣기
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center py-1">
                        <span className="font-mono text-sm text-purple-700 bg-white px-2 py-1 rounded border">
                          {variant.ipa}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <Separator />

            {/* Meanings */}
            <div className="space-y-3">
              {wordData.entry.meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {meaning.partOfSpeech}
                  </Badge>
                  
                  {meaning.definitions.slice(0, 2).map((def, defIndex) => (
                    <div key={defIndex} className="pl-3 border-l-2 border-purple-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-xs text-gray-600 italic mt-1">
                          예: "{def.example}"
                        </p>
                      )}
                      {def.synonyms && def.synonyms.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-xs text-gray-500">유의어:</span>
                          {def.synonyms.slice(0, 2).map((synonym, synIndex) => (
                            <Badge
                              key={synIndex}
                              variant="outline"
                              className="text-xs bg-gray-50"
                            >
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Etymology */}
            {wordData.entry.etymology && (
              <>
                <Separator />
                <div className="text-xs text-gray-500">
                  <strong>어원:</strong> {wordData.entry.etymology}
                </div>
              </>
            )}

            {/* Learning Tip */}
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <p className="text-xs text-blue-800">
                💡 <strong>학습 팁:</strong> 발음을 듣고 따라해보세요. 각 국가별 발음의 차이를 이해하는 것도 중요합니다!
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}