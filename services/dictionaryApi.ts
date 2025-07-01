// Oxford Dictionary API service
// 실제 환경에서는 process.env.OXFORD_API_KEY를 사용

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

interface DictionaryResponse {
  word: string;
  entry: OxfordEntry;
  imageUrl: string;
}

export class DictionaryService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // 실제 환경에서는 환경변수에서 가져옴
    this.apiKey = "YOUR_OXFORD_API_KEY_HERE";
    this.baseUrl = "https://od-api.oxforddictionaries.com/api/v2";
  }

  async lookupWord(word: string): Promise<DictionaryResponse> {
    // 실제 API 호출 코드 (현재는 mock)
    /*
    const response = await fetch(`${this.baseUrl}/entries/en-gb/${word}`, {
      headers: {
        'app_id': 'YOUR_APP_ID',
        'app_key': this.apiKey,
      },
    });
    const data = await response.json();
    */

    // Mock 응답 - 실제 Oxford API 구조를 모방
    await new Promise(resolve => setTimeout(resolve, 300)); // API 지연 시뮬레이션
    
    const mockData = this.getMockOxfordData(word.toLowerCase());
    return mockData;
  }

  private getWordSpecificImage(word: string): string {
    // 단어별 특화된 이미지 매핑
    const imageMap: Record<string, string> = {
      // BTS Dynamite 가사 관련 단어들
      "stars": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop", // 별이 가득한 밤하늘
      "tonight": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 아름다운 밤 풍경
      "fire": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop", // 모닥불
      "light": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop", // 따뜻한 조명
      "bring": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 선물을 주는 손
      "night": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop", // 도시의 밤
      "shoes": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop", // 운동화
      "morning": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 아침 햇살
      "milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop", // 우유 한 잔
      "rock": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 록 콘서트
      "roll": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=200&fit=crop", // 롤링 스톤
      "king": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 왕관
      "kong": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop", // 고릴라/킹콩
      "kick": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 축구공 차기
      "drum": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 드럼셋
      "rolling": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 굴러가는 돌
      "stone": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 돌멩이
      "sing": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 마이크로 노래하는 모습
      "song": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 음악 노트
      "walking": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 걷는 발
      "home": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop", // 따뜻한 집
      "jump": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 점프하는 사람
      "top": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 산 정상
      "phone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", // 스마트폰
      "ice": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 얼음
      "tea": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop", // 차 한 잔
      "game": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop", // 게임 컨트롤러
      "ping": "https://images.unsplash.com/photo-1578662015703-4fa99bd5ff18?w=300&h=200&fit=crop", // 탁구 라켓
      "pong": "https://images.unsplash.com/photo-1578662015703-4fa99bd5ff18?w=300&h=200&fit=crop", // 탁구공
      "heavy": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 무거운 덤벨
      "bass": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 베이스 기타
      "boom": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop", // 폭발
      "ready": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop", // 준비된 선수
      "life": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 생명력 넘치는 꽃
      "sweet": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop", // 달콤한 꿀
      "honey": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300&h=200&fit=crop", // 꿀벌과 꿀
      "beat": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 음악 비트
      "money": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 돈
      "disco": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 디스코 볼
      "overload": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 전기 과부하
      "diamond": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop", // 다이아몬드
      "glow": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop", // 빛나는 조명
      "shining": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=200&fit=crop", // 반짝이는 별
      "city": "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=200&fit=crop", // 도시 야경
      "funk": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 펑크 음악
      "soul": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 소울 음악
      "dynamite": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 다이너마이트
      
      // Ed Sheeran 관련
      "club": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 클럽
      "bar": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop", // 바
      "lover": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 연인
      "friends": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 친구들
      "shots": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop", // 술잔
      "drinking": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=200&fit=crop", // 음주
      "conversation": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 대화
      "hand": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 손
      "jukebox": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", // 주크박스
      "dance": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 춤
      "love": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 사랑
      "heart": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 하트
      "magnet": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 자석
      "body": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 몸
      "shape": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 실루엣
      
      // Billie Eilish 관련
      "white": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 흰색
      "shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop", // 셔츠
      "red": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 빨간색
      "blood": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 피
      "nose": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 코
      "sleeping": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop", // 잠자는 모습
      "toes": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 발가락
      "criminal": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 범죄자
      "bruises": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 멍
      "knees": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 무릎
      "tough": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 터프한 사람
      "guy": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 남자
      "rough": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 거친
      "chest": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 가슴
      "bad": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 나쁜
      "type": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 타입
      "mama": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 엄마
      "sad": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 슬픈
      "girlfriend": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 여자친구
      "mad": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 화난
      "seduce": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 유혹
      "dad": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 아빠
      
      // 공통 단어들
      "watch": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=200&fit=crop", // 시계
      "make": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 만들기
      "feel": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 감정
      "know": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 지식
      "time": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=200&fit=crop", // 시간
      "want": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 원하는
      "come": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 오다
      "go": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 가다
      "get": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 얻다
      "see": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 보다
      "look": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 보다
      "like": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 좋아하다
      "take": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 가져가다
      "give": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 주다
      "think": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 생각하다
      "say": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 말하다
      "tell": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 말하다
      "call": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", // 전화하다
      "work": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 일하다
      "try": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 시도하다
      "ask": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 묻다
      "turn": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 돌리다
      "move": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 움직이다
      "play": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop", // 놀다
      "run": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 달리다
      "walk": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 걷다
      "sit": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 앉다
      "stand": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 서다
      "open": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 열다
      "close": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 닫다
      "find": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 찾다
      "keep": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 유지하다
      "let": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 허락하다
      "put": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 놓다
      "show": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 보여주다
      "hear": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 듣다
      "listen": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 듣다
      "help": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 도움
      "stop": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 멈추다
      "start": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 시작하다
      "leave": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 떠나다
      "follow": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 따라가다
      "lead": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 이끌다
      "meet": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 만나다
      "speak": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop", // 말하다
      "read": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop", // 읽다
      "write": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop", // 쓰다
      "learn": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop", // 배우다
      "teach": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 가르치다
      "study": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop", // 공부하다
      "understand": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 이해하다
      "remember": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 기억하다
      "forget": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 잊다
      "believe": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 믿다
      "hope": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 희망
      "wish": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 바라다
      "dream": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop", // 꿈
      "sleep": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop", // 잠
      "wake": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&h=200&fit=crop", // 깨다
      "live": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 살다
      "die": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 죽다
      "born": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 태어나다
      "grow": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 자라다
      "change": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 변화
      "happen": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 일어나다
      "seem": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 보이다
      "become": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 되다
      "turn": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 돌다
      "stay": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop", // 머물다
      "remain": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop", // 남다
      
      // 감정 관련
      "happy": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 행복한
      "smile": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 웃음
      "laugh": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 웃다
      "cry": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 울다
      "angry": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 화난
      "afraid": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 무서운
      "scared": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 무서운
      "worried": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 걱정하는
      "excited": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 흥분한
      "surprised": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 놀란
      "confused": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", // 혼란스러운
      "lonely": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 외로운
      "nervous": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 긴장하는
      "proud": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 자랑스러운
      "embarrassed": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 부끄러운
      "jealous": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 질투하는
      
      // 자연 관련
      "sun": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 태양
      "moon": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=200&fit=crop", // 달
      "sky": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 하늘
      "cloud": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 구름
      "rain": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=200&fit=crop", // 비
      "snow": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 눈
      "wind": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 바람
      "storm": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=200&fit=crop", // 폭풍
      "lightning": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=200&fit=crop", // 번개
      "thunder": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=300&h=200&fit=crop", // 천둥
      "flower": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 꽃
      "tree": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 나무
      "grass": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 잔디
      "leaf": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 잎
      "mountain": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 산
      "ocean": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 바다
      "sea": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 바다
      "water": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 물
      "river": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 강
      "lake": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 호수
      "beach": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 해변
      "sand": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 모래
      "wave": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 파도
      "earth": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 지구
      "world": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 세계
      
      // 색깔
      "black": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 검은색
      "blue": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop", // 파란색
      "green": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 초록색
      "yellow": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 노란색
      "orange": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", // 주황색
      "purple": "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=200&fit=crop", // 보라색
      "pink": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 분홍색
      "brown": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 갈색
      "gray": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 회색
      "grey": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", // 회색
      
      // 숫자
      "one": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 1
      "two": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 2
      "three": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 3
      "four": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 4
      "five": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 5
      "six": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 6
      "seven": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 7
      "eight": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 8
      "nine": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 9
      "ten": "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=300&h=200&fit=crop", // 10
      
      // 기본 이미지들
      "hello": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 인사
      "goodbye": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=300&h=200&fit=crop", // 작별
      "yes": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 네
      "no": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", // 아니오
      "please": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop", // 부탁
      "thank": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop", // 감사
      "sorry": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 미안
      "excuse": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop", // 실례
    };

    return imageMap[word] || `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&q=80&auto=format&s=${word}`;
  }

  private getMockOxfordData(word: string): DictionaryResponse {
    // 확장된 사전 데이터베이스
    const mockDatabase: Record<string, Omit<DictionaryResponse, 'imageUrl'>> = {
      "light": {
        word: "light",
        entry: {
          word: "light",
          pronunciation: "/laɪt/",
          phonetic: "laɪt",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "the natural agent that stimulates sight and makes things visible",
                  example: "the light of the sun",
                  synonyms: ["illumination", "brightness", "luminosity"]
                },
                {
                  definition: "an expression in someone's eyes indicating a particular emotion or mood",
                  example: "a light of triumph in his eyes"
                }
              ]
            },
            {
              partOfSpeech: "verb",
              definitions: [
                {
                  definition: "provide with light or lighting; illuminate",
                  example: "the room was lit by a number of small lamps",
                  synonyms: ["illuminate", "brighten", "lighten"]
                }
              ]
            }
          ],
          etymology: "Old English lēoht (noun and adjective), līhtan (verb), of Germanic origin"
        }
      },
      "fire": {
        word: "fire",
        entry: {
          word: "fire",
          pronunciation: "/ˈfaɪər/",
          phonetic: "ˈfaɪər",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "combustion or burning, in which substances combine chemically with oxygen from the air",
                  example: "his house was destroyed by fire",
                  synonyms: ["flames", "blaze", "conflagration"]
                }
              ]
            }
          ]
        }
      },
      "stars": {
        word: "stars",
        entry: {
          word: "stars",
          pronunciation: "/stɑːrz/",
          phonetic: "stɑːrz",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "a fixed luminous point in the night sky that is a large, remote incandescent body like the sun",
                  example: "we could see the stars twinkling in the clear night sky",
                  synonyms: ["celestial body", "heavenly body"]
                }
              ]
            }
          ]
        }
      },
      "dynamite": {
        word: "dynamite",
        entry: {
          word: "dynamite",
          pronunciation: "/ˈdaɪnəmaɪt/",
          phonetic: "ˈdaɪnəmaɪt",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "a high explosive consisting of nitroglycerin mixed with an absorbent material",
                  example: "sticks of dynamite",
                  synonyms: ["explosive", "TNT"]
                },
                {
                  definition: "(informal) something likely to cause trouble or controversy",
                  example: "the story was political dynamite"
                }
              ]
            }
          ]
        }
      },
      "diamond": {
        word: "diamond",
        entry: {
          word: "diamond",
          pronunciation: "/ˈdaɪəmənd/",
          phonetic: "ˈdaɪəmənd",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "a precious stone consisting of a clear and colorless crystalline form of pure carbon",
                  example: "a diamond ring",
                  synonyms: ["gem", "jewel", "precious stone"]
                }
              ]
            }
          ]
        }
      },
      "shining": {
        word: "shining",
        entry: {
          word: "shining",
          pronunciation: "/ˈʃaɪnɪŋ/",
          phonetic: "ˈʃaɪnɪŋ",
          meanings: [
            {
              partOfSpeech: "adjective",
              definitions: [
                {
                  definition: "giving out or reflecting bright light",
                  example: "a shining white surface",
                  synonyms: ["bright", "brilliant", "gleaming"]
                }
              ]
            }
          ]
        }
      },
      "love": {
        word: "love",
        entry: {
          word: "love",
          pronunciation: "/lʌv/",
          phonetic: "lʌv",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "an intense feeling of deep affection",
                  example: "a deep love for music",
                  synonyms: ["affection", "adoration", "devotion"]
                }
              ]
            },
            {
              partOfSpeech: "verb",
              definitions: [
                {
                  definition: "feel deep affection for someone or something",
                  example: "I love you more than words can say",
                  synonyms: ["adore", "care for", "cherish"]
                }
              ]
            }
          ]
        }
      },
      "heart": {
        word: "heart",
        entry: {
          word: "heart",
          pronunciation: "/hɑːrt/",
          phonetic: "hɑːrt",
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "a hollow muscular organ that pumps the blood through the circulatory system",
                  example: "the doctor listened to his heart",
                  synonyms: ["cardiac muscle"]
                },
                {
                  definition: "the center of a person's thoughts and emotions, especially love",
                  example: "she poured her heart into the song",
                  synonyms: ["emotions", "feelings", "soul"]
                }
              ]
            }
          ]
        }
      },
      "dance": {
        word: "dance",
        entry: {
          word: "dance",
          pronunciation: "/dæns/",
          phonetic: "dæns",
          meanings: [
            {
              partOfSpeech: "verb",
              definitions: [
                {
                  definition: "move rhythmically to music, typically following a set sequence of steps",
                  example: "they danced to the rhythm of the music",
                  synonyms: ["move to music", "sway", "boogie"]
                }
              ]
            },
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "a series of movements that match the speed and rhythm of a piece of music",
                  example: "everyone was doing the same dance",
                  synonyms: ["choreography", "routine"]
                }
              ]
            }
          ]
        }
      }
    };

    const baseData = mockDatabase[word] || {
      word: word,
      entry: {
        word: word,
        pronunciation: `/${word}/`,
        phonetic: word,
        meanings: [
          {
            partOfSpeech: "unknown",
            definitions: [
              {
                definition: "Definition not found in dictionary",
                example: `Sorry, we couldn't find the definition for "${word}"`
              }
            ]
          }
        ]
      }
    };

    return {
      ...baseData,
      imageUrl: this.getWordSpecificImage(word)
    };
  }
}

export const dictionaryService = new DictionaryService();