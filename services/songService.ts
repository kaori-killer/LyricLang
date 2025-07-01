// Song search and lyrics service
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  genre: string[];
  language: string;
  lyrics: string;
  coverImage: string;
  audioUrl?: string; // 실제 음악 파일 URL (미래 사용)
  previewUrl?: string; // 미리듣기 URL (30초 정도)
  spotifyId?: string; // Spotify 연동용
  youtubeId?: string; // YouTube Music 연동용
  popularity: number;
}

export interface SearchFilters {
  query: string;
  artist?: string;
  genre?: string;
  language?: string;
}

class SongService {
  private songs: Song[] = [
    {
      id: "bts-dynamite",
      title: "Dynamite",
      artist: "BTS",
      album: "BE",
      year: 2020,
      genre: ["Pop", "Disco"],
      language: "English",
      popularity: 95,
      coverImage: "https://images.unsplash.com/photo-1516981442399-5e617b6b9f64?w=300&h=300&fit=crop&q=80", // 화려한 무대 조명
      spotifyId: "0t1kP63rueHleOhQkYSXFY", // 실제 Spotify ID (예시)
      youtubeId: "gdZLi9oWNZg", // 실제 YouTube ID
      previewUrl: "https://p.scdn.co/mp3-preview/example", // Spotify 미리듣기 URL (예시)
      lyrics: `'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight
Shoes on, get up in the morn'
Cup of milk, let's rock and roll
King Kong, kick the drum
Rolling on like a Rolling Stone
Sing song when I'm walking home
Jump up to the top, LeBron
Ding-dong, call me on my phone
Ice tea and a game of ping pong

This is getting heavy, can you hear the bass boom? I'm ready
Life is sweet as honey, yeah, this beat cha-ching like money
Disco overload, I'm into that, I'm good to go
I'm diamond, you know I glow up
Hey, so let's go

'Cause I, I, I'm in the stars tonight
So watch me bring the fire and set the night alight
Shining through the city with a little funk and soul
So I'ma light it up like dynamite, woah`
    },
    {
      id: "ed-sheeran-shape-of-you",
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      year: 2017,
      genre: ["Pop", "R&B"],
      language: "English",
      popularity: 92,
      coverImage: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=300&h=300&fit=crop&q=80", // 어쿠스틱 기타
      spotifyId: "7qiZfU4dY1lWllzX7mPBI3", // 실제 Spotify ID (예시)
      youtubeId: "JGwWNGJdvx8", // 실제 YouTube ID
      previewUrl: "https://p.scdn.co/mp3-preview/example2", // Spotify 미리듣기 URL (예시)
      lyrics: `The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow
Come over and start up a conversation with just me
And trust me I'll give it a chance now
Take my hand, stop, put Van the Man on the jukebox
And then we start to dance, and now I'm singing like

Girl, you know I want your love
Your love was handmade for somebody like me
Come on now, follow my lead
I may be crazy, don't mind me
Say, boy, let's not talk too much
Grab on my waist and put that body on me
Come on now, follow my lead
Come, come on now, follow my lead

I'm in love with the shape of you
We push and pull like a magnet do
Although my heart is falling too
I'm in love with your body`
    },
    {
      id: "billie-eilish-bad-guy",
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      year: 2019,
      genre: ["Pop", "Alternative"],
      language: "English",
      popularity: 90,
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&q=80", // 어두운 분위기의 네온 조명
      spotifyId: "2Fxmhks0bxGSBdJ92vM42m", // 실제 Spotify ID (예시)
      youtubeId: "DyDfgMOUjCI", // 실제 YouTube ID
      previewUrl: "https://p.scdn.co/mp3-preview/example3", // Spotify 미리듣기 URL (예시)
      lyrics: `White shirt now red, my bloody nose
Sleeping, you're on your tippy toes
Creeping around like no one knows
Think you're so criminal
Bruises on both my knees for you
Don't say thank you or please
I do what I want when I'm wanting to
My soul? So cynical

So you're a tough guy
Like it really rough guy
Just can't get enough guy
Chest always so puffed guy
I'm that bad type
Make your mama sad type
Make your girlfriend mad tight
Might seduce your dad type
I'm the bad guy, duh

I'm the bad guy`
    },
    {
      id: "dua-lipa-levitating",
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      year: 2020,
      genre: ["Pop", "Disco"],
      language: "English",
      popularity: 88,
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&q=80", // 반짝이는 디스코 볼
      lyrics: `If you wanna run away with me, I know a galaxy
And I can take you for a ride
I had a premonition that we fell into a rhythm
Where the music don't stop for life
Glitter in the sky, glitter in my eyes
Shining just the way I like
If you're feeling like you need a little bit of company
You met me at the perfect time

You want me, I want you, baby
My sugarboo, I'm levitating
The Milky Way, we're renegading
Yeah, yeah, yeah, yeah, yeah
I got you, moonlight, you're my starlight
I need you all night, come on, dance with me
I'm levitating

You, moonlight, you're my starlight
I need you all night, come on, dance with me
I'm levitating`
    },
    {
      id: "the-weeknd-blinding-lights",
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      year: 2019,
      genre: ["Pop", "Synthwave"],
      language: "English",
      popularity: 94,
      coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop&q=80", // 도시의 네온사인과 밤 풍경
      lyrics: `Yeah, I've been trying to call
I've been on my own for long enough
Maybe you can show me how to love, maybe
I feel like I'm just missing something when you're gone
But nothing's wrong when you're here with me
And I can see it in your eyes
You can feel it when we're dancing on the floor
Nothing like this feeling, baby

I feel it in my blood
You're my addiction, I can't get enough
Keep running for the thrill of it, all night, all night
I'm running on empty, try to go the distance
I'm covered in the night
Started in the perfect place, ending at the finish line

I can't sleep until I feel your touch
I said, ooh, I'm blinding lights
I can't sleep until I feel your touch`
    },
    {
      id: "harry-styles-watermelon-sugar",
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      year: 2019,
      genre: ["Pop Rock", "Indie Pop"],
      language: "English",
      popularity: 85,
      coverImage: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=300&h=300&fit=crop&q=80", // 신선한 수박과 여름 과일들
      lyrics: `Tastes like strawberries on a summer evenin'
And it sounds just like a song
I want more berries and that summer feelin'
It's so wonderful and warm

Breathe me in, breathe me out
I don't know if I could ever go without
I'm just thinking out loud
I don't know if I could ever go without

Watermelon sugar high
Watermelon sugar high
Watermelon sugar high
Watermelon sugar

Strawberries on a summer evenin'
Baby, you're the end of June
I want your belly and that summer feelin'
Getting washed away in you

Breathe me in, breathe me out
I don't know if I could ever go without

Watermelon sugar high`
    },
    {
      id: "ariana-grande-thank-u-next",
      title: "Thank U, Next",
      artist: "Ariana Grande",
      album: "Thank U, Next",
      year: 2018,
      genre: ["Pop", "R&B"],
      language: "English",
      popularity: 89,
      coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop&q=80", // 밝은 미소의 여성
      lyrics: `Thought I'd end up with Sean
But he wasn't a match
Wrote some songs about Ricky
Now I listen and laugh
Even almost got married
And for Pete, I'm so thankful
Wish I could say thank you to Malcolm
'Cause he was an angel

One taught me love
One taught me patience
And one taught me pain
Now, I'm so amazing
Say I've loved and I've lost
But that's not what I see
So, look what I got
Look what you taught me
And for that, I say

Thank you, next (next)
Thank you, next (next)
Thank you, next
I'm so fuckin' grateful for my ex
Thank you, next (next)
Thank you, next (next)
Thank you, next (next)
I'm so fuckin' grateful for my ex`
    },
    {
      id: "taylor-swift-shake-it-off",
      title: "Shake It Off",
      artist: "Taylor Swift",
      album: "1989",
      year: 2014,
      genre: ["Pop"],
      language: "English",
      popularity: 91,
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&q=80", // 노래하는 여성 실루엣
      lyrics: `I stay out too late
Got nothing in my brain
That's what people say, mmm-mmm
That's what people say, mmm-mmm

I go on too many dates
But I can't make them stay
At least that's what people say, mmm-mmm
That's what people say, mmm-mmm

But I keep cruising
Can't stop, won't stop moving
It's like I got this music
In my mind saying, "It's gonna be alright"

'Cause the players gonna play, play, play, play, play
And the haters gonna hate, hate, hate, hate, hate
Baby, I'm just gonna shake, shake, shake, shake, shake
I shake it off, I shake it off
Heartbreakers gonna break, break, break, break, break
And the fakers gonna fake, fake, fake, fake, fake
Baby, I'm just gonna shake, shake, shake, shake, shake
I shake it off, I shake it off`
    },
    {
      id: "coldplay-yellow",
      title: "Yellow",
      artist: "Coldplay",
      album: "Parachutes",
      year: 2000,
      genre: ["Alternative Rock", "Pop Rock"],
      language: "English",
      popularity: 87,
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&q=80", // 노란 해바라기나 노을
      lyrics: `Look at the stars
Look how they shine for you
And everything you do
Yeah, they were all yellow

I came along
I wrote a song for you
And all the things you do
And it was called "Yellow"

So then I took my turn
Oh, what a thing to have done
And it was all yellow

Your skin, oh yeah, your skin and bones
Turn into something beautiful
And you know, you know I love you so
You know I love you so

I swam across
I jumped across for you
Oh, what a thing to do
'Cause you were all yellow

I drew a line
I drew a line for you
Oh, what a thing to do
And it was all yellow`
    },
    {
      id: "adele-someone-like-you",
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      year: 2011,
      genre: ["Pop", "Soul"],
      language: "English",
      popularity: 93,
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop&q=80", // 피아노 건반 클로즈업
      lyrics: `I heard that you're settled down
That you found a girl and you're married now
I heard that your dreams came true
Guess she gave you things I didn't give to you

Old friend, why are you so shy?
Ain't like you to hold back or hide from the light

I hate to turn up out of the blue, uninvited
But I couldn't stay away, I couldn't fight it
I had hoped you'd see my face
And that you'd be reminded that for me, it isn't over

Never mind, I'll find someone like you
I wish nothing but the best for you, too
Don't forget me, I beg, I remember you said
Sometimes it lasts in love, but sometimes it hurts instead
Sometimes it lasts in love, but sometimes it hurts instead

You know how the time flies
Only yesterday was the time of our lives
We were born and raised in a summer haze
Bound by the surprise of our glory days`
    }
  ];

  async searchSongs(filters: SearchFilters): Promise<Song[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...this.songs];

    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      results = results.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.lyrics.toLowerCase().includes(query)
      );
    }

    if (filters.artist) {
      results = results.filter(song => 
        song.artist.toLowerCase().includes(filters.artist!.toLowerCase())
      );
    }

    if (filters.genre) {
      results = results.filter(song => 
        song.genre.some(g => g.toLowerCase().includes(filters.genre!.toLowerCase()))
      );
    }

    if (filters.language) {
      results = results.filter(song => 
        song.language.toLowerCase() === filters.language!.toLowerCase()
      );
    }

    // Sort by popularity
    results.sort((a, b) => b.popularity - a.popularity);

    return results;
  }

  async getSongById(id: string): Promise<Song | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.songs.find(song => song.id === id) || null;
  }

  getPopularSongs(limit: number = 6): Song[] {
    return [...this.songs]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  getGenres(): string[] {
    const genres = new Set<string>();
    this.songs.forEach(song => {
      song.genre.forEach(g => genres.add(g));
    });
    return Array.from(genres).sort();
  }

  getArtists(): string[] {
    const artists = new Set<string>();
    this.songs.forEach(song => artists.add(song.artist));
    return Array.from(artists).sort();
  }
}

export const songService = new SongService();