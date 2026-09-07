import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  LuHeadphones, 
  LuPlay, 
  LuPause, 
  LuRotateCcw, 
  LuVolume2, 
  LuVolumeX, 
  LuGlobe, 
  LuChevronDown, 
  LuChevronUp
} from "react-icons/lu";
import { getAudioStory } from "../data/audioStoriesData";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧", voiceLang: "en-IN" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳", voiceLang: "hi-IN" },
  { code: "kn", label: "ಕನ್ನಡ", flag: "🇮🇳", voiceLang: "kn-IN" }
];

const SPEEDS = [1, 1.25, 1.5];

// Multi-lingual UI Dictionary for 100% pure language consistency
const UI_TEXT = {
  en: {
    audioTourGuide: "Audio Tour Guide",
    readyToListen: "Ready to listen (approx. 2 mins)",
    loadingNarration: "Loading audio narration...",
    speakingChapter: (num, total) => `Speaking Chapter ${num} of ${total}...`,
    paused: "Paused",
    chapterBadge: (num, tag) => `Chapter ${num}: ${tag}`,
    readAlongSubtitles: "Read Along Subtitles",
    chapterNum: (idx) => `0${idx + 1}`,
  },
  hi: {
    audioTourGuide: "ऑडियो यात्रा गाइड",
    readyToListen: "सुनने के लिए तैयार (लगभग २ मिनट)",
    loadingNarration: "ऑडियो तैयार हो रहा है...",
    speakingChapter: (num, total) => {
      const hiNums = ["१", "२", "३", "४", "५"];
      const n = hiNums[num - 1] || num;
      const t = hiNums[total - 1] || total;
      return `अध्याय ${n} सुना जा रहा है (कुल ${t})...`;
    },
    paused: "विराम",
    chapterBadge: (num, tag) => {
      const hiNums = ["१", "२", "३", "४", "५"];
      const n = hiNums[num - 1] || num;
      return `अध्याय ${n}: ${tag}`;
    },
    readAlongSubtitles: "साथ-साथ उपशीर्षक पढ़ें",
    chapterNum: (idx) => {
      const hiNums = ["०१", "०२", "०३", "०४", "०५"];
      return hiNums[idx] || `०${idx + 1}`;
    },
  },
  kn: {
    audioTourGuide: "ಆಡಿಯೋ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ",
    readyToListen: "ಕೇಳಲು ಸಿದ್ಧವಾಗಿದೆ (ಸುಮಾರು ೨ ನಿಮಿಷ)",
    loadingNarration: "ಆಡಿಯೋ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    speakingChapter: (num, total) => {
      const knNums = ["೧", "೨", "೩", "೪", "೫"];
      const n = knNums[num - 1] || num;
      const t = knNums[total - 1] || total;
      return `ಅಧ್ಯಾಯ ${n} ಕೇಳಲಾಗುತ್ತಿದೆ (ಒಟ್ಟು ${t})...`;
    },
    paused: "ವಿರಾಮಗೊಳಿಸಲಾಗಿದೆ",
    chapterBadge: (num, tag) => {
      const knNums = ["೧", "೨", "೩", "೪", "೫"];
      const n = knNums[num - 1] || num;
      return `ಅಧ್ಯಾಯ ${n}: ${tag}`;
    },
    readAlongSubtitles: "ಉಪಶೀರ್ಷಿಕೆಗಳನ್ನು ಓದಿ",
    chapterNum: (idx) => {
      const knNums = ["೦೧", "೦೨", "೦೩", "೦೪", "೦೫"];
      return knNums[idx] || `೦${idx + 1}`;
    },
  }
};

function AudioGuidePlayer({ place }) {
  const [language, setLanguage] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  const [voices, setVoices] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const activeChapterRef = useRef(0);
  const isPlayingRef = useRef(false);
  const storyRef = useRef(null);

  const currentSpeed = SPEEDS[speedIndex];
  const story = getAudioStory(place, language);
  storyRef.current = story;
  const ui = UI_TEXT[language] || UI_TEXT.en;

  // Cleanup active audio element and listeners
  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.onplay = null;
      audioRef.current.onplaying = null;
      audioRef.current.onpause = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Load available system synthesis voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      }
    };

    updateVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Stop audio when component unmounts or place changes
  useEffect(() => {
    return () => {
      cleanupAudio();
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoadingAudio(false);
      isPlayingRef.current = false;
    };
  }, [place, cleanupAudio]);

  const findBestVoice = useCallback((langCode) => {
    if (!voices || voices.length === 0) return null;
    const target = LANGUAGES.find(l => l.code === langCode)?.voiceLang || "en-IN";

    // 1. Exact match
    const exact = voices.find(v => v.lang.toLowerCase() === target.toLowerCase());
    if (exact) return exact;

    // 2. Language prefix match (e.g. 'hi' for 'hi-IN' or 'kn' for 'kn-IN')
    const prefix = target.split("-")[0].toLowerCase();
    const prefixMatch = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (prefixMatch) return prefixMatch;

    // 3. Fallback to any Indian English or general English
    if (langCode === "en") {
      const enInd = voices.find(v => v.lang.includes("en-IN") || v.lang.includes("en_IN"));
      if (enInd) return enInd;
    }

    return null;
  }, [voices]);

  const stopAudio = useCallback(() => {
    cleanupAudio();
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoadingAudio(false);
    isPlayingRef.current = false;
    setActiveChapter(0);
    activeChapterRef.current = 0;
  }, [cleanupAudio]);

  const speakChapter = useCallback((chapterIndex, speedToUse = currentSpeed) => {
    const currentStory = storyRef.current;
    if (!currentStory || !currentStory.chapters || !currentStory.chapters[chapterIndex]) {
      stopAudio();
      return;
    }

    // Completely reset any previous playback instance
    cleanupAudio();

    setActiveChapter(chapterIndex);
    activeChapterRef.current = chapterIndex;
    setIsLoadingAudio(true);
    setIsPlaying(false);
    setIsPaused(false);
    isPlayingRef.current = true;

    const chapter = currentStory.chapters[chapterIndex];
    const fullText = `${chapter.heading}. ${chapter.text}`;

    const matchedVoice = findBestVoice(language);
    const useServerTTS = language === "kn" || !matchedVoice;

    if (useServerTTS) {
      const audioUrl = `${API_BASE_URL}/api/tts?tl=${encodeURIComponent(language)}&text=${encodeURIComponent(fullText)}`;
      const audio = new Audio();
      audioRef.current = audio;
      audio.preload = "auto";
      audio.playbackRate = speedToUse;
      audio.muted = isMuted;

      const onPlaybackStarted = () => {
        setIsLoadingAudio(false);
        setIsPlaying(true);
        setIsPaused(false);
      };

      audio.onplay = onPlaybackStarted;
      audio.onplaying = onPlaybackStarted;

      audio.onpause = () => {
        if (isPlayingRef.current && !audio.ended) {
          setIsPaused(true);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setIsLoadingAudio(false);
        isPlayingRef.current = false;
        const nextIndex = chapterIndex + 1;
        if (nextIndex < currentStory.chapters.length) {
          speakChapter(nextIndex, speedToUse);
        } else {
          setActiveChapter(0);
          activeChapterRef.current = 0;
        }
      };

      audio.onerror = (e) => {
        console.warn("Audio stream error:", e);
        setIsLoadingAudio(false);
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
      };

      audio.src = audioUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            onPlaybackStarted();
          })
          .catch((err) => {
            console.log("Audio play deferred or interrupted:", err.message);
            setIsLoadingAudio(false);
          });
      }
      return;
    }

    // Browser SpeechSynthesis fallback (e.g. English with installed voice)
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio synthesis is not supported on this browser.");
      setIsLoadingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = speedToUse;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1;

    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      const langConfig = LANGUAGES.find(l => l.code === language);
      utterance.lang = langConfig ? langConfig.voiceLang : "en-US";
    }

    utterance.onstart = () => {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      setIsPaused(false);
      isPlayingRef.current = true;
    };

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      const nextIndex = chapterIndex + 1;
      if (nextIndex < currentStory.chapters.length) {
        speakChapter(nextIndex, speedToUse);
      } else {
        stopAudio();
      }
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      setIsLoadingAudio(false);
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, [cleanupAudio, currentSpeed, findBestVoice, isMuted, language, stopAudio]);

  const handlePlayPause = () => {
    const matchedVoice = findBestVoice(language);
    const useServerTTS = language === "kn" || !matchedVoice;

    if (useServerTTS) {
      if (audioRef.current) {
        if (isPlaying && !isPaused) {
          audioRef.current.pause();
          setIsPaused(true);
        } else if (isPaused) {
          const p = audioRef.current.play();
          if (p !== undefined) {
            p.then(() => {
              setIsPaused(false);
              setIsPlaying(true);
            }).catch(console.warn);
          } else {
            setIsPaused(false);
            setIsPlaying(true);
          }
        } else {
          speakChapter(activeChapter);
        }
      } else {
        speakChapter(activeChapter);
      }
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isPlaying && !isPaused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else if (isPlaying && isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speakChapter(activeChapter);
      }
      return;
    }

    speakChapter(activeChapter);
  };

  const handleReplay = () => {
    stopAudio();
    setTimeout(() => {
      speakChapter(0);
    }, 60);
  };

  const handleSpeedToggle = () => {
    const nextIndex = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(nextIndex);
    const newSpeed = SPEEDS[nextIndex];

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    } else if (isPlaying && !isPaused) {
      speakChapter(activeChapterRef.current, newSpeed);
    }
  };

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const handleLanguageChange = (newLang) => {
    if (newLang === language) return;
    const wasPlaying = isPlaying && !isPaused;
    stopAudio();
    setLanguage(newLang);

    if (wasPlaying) {
      setTimeout(() => {
        speakChapter(0);
      }, 150);
    }
  };

  const handleChapterClick = (index) => {
    if (index === activeChapter) {
      handlePlayPause();
      return;
    }

    // Seamless chapter switching:
    // If audio is currently playing, immediately play the new chapter.
    // If audio is stopped or paused, switch to the new chapter and keep the Play button ready to play!
    if (isPlaying && !isPaused) {
      speakChapter(index);
    } else {
      cleanupAudio();
      setActiveChapter(index);
      activeChapterRef.current = index;
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoadingAudio(false);
      isPlayingRef.current = false;
    }
  };

  if (!story) return null;

  return (
    <div className="audio-guide-card animate-fade-in">
      {/* Card Header */}
      <div className="audio-guide-header">
        <div className="audio-header-left">
          <div>
            <h3 className="card-header-title">
              <LuHeadphones className="card-header-icon" />
              {ui.audioTourGuide}
            </h3>
            <p className="audio-guide-subtitle">{story.title}</p>
          </div>
        </div>

        {/* Multi-Lingual Language Selector */}
        <div className="audio-lang-selector" aria-label="Audio Language">
          <div className="lang-pill-group">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`audio-lang-btn ${language === lang.code ? "active" : ""}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-text">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Player Center Console */}
      <div className="audio-player-console">
        {/* Equalizer Sound Waves (animate when speaking) */}
        <div className="audio-visualizer-box">
          <div className={`sound-wave-bars ${isPlaying && !isPaused ? "active" : ""}`}>
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
            <span className="bar bar-5"></span>
            <span className="bar bar-6"></span>
            <span className="bar bar-7"></span>
            <span className="bar bar-8"></span>
          </div>
          <span className="audio-status-caption">
            {isLoadingAudio
              ? ui.loadingNarration
              : isPlaying 
                ? (isPaused ? ui.paused : ui.speakingChapter(activeChapter + 1, story.chapters.length)) 
                : ui.readyToListen}
          </span>
        </div>

        {/* Primary Controls */}
        <div className="audio-controls-row">
          <button 
            type="button"
            className="audio-circle-btn replay-btn"
            onClick={handleReplay}
            title="Replay Story"
            aria-label="Replay from start"
          >
            <LuRotateCcw />
          </button>

          <button
            type="button"
            className={`audio-main-play-btn ${isPlaying && !isPaused ? "is-playing" : ""} ${isLoadingAudio ? "is-buffering" : ""}`}
            onClick={handlePlayPause}
            disabled={isLoadingAudio}
            aria-label={isPlaying && !isPaused ? "Pause Audio Guide" : "Play Audio Guide"}
            title={isPlaying && !isPaused ? "Pause" : "Play"}
          >
            {isLoadingAudio ? (
              <span className="audio-btn-spinner" />
            ) : isPlaying && !isPaused ? (
              <LuPause />
            ) : (
              <LuPlay style={{ marginLeft: "3px" }} />
            )}
          </button>

          <button
            type="button"
            className="audio-speed-badge-btn"
            onClick={handleSpeedToggle}
            title="Toggle Narration Speed"
          >
            {currentSpeed}x
          </button>

          <button 
            type="button"
            className={`audio-circle-btn mute-btn ${isMuted ? "muted" : ""}`}
            onClick={handleMuteToggle}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <LuVolumeX /> : <LuVolume2 />}
          </button>
        </div>
      </div>

      {/* Story Chapters Quick Navigation */}
      <div className="audio-chapters-pills">
        {story.chapters.map((chap, idx) => (
          <button
            key={idx}
            type="button"
            className={`chapter-pill-btn ${activeChapter === idx ? "active" : ""}`}
            onClick={() => handleChapterClick(idx)}
          >
            <span className="chap-num">{ui.chapterNum(idx)}</span>
            <span className="chap-tag">{chap.tag}</span>
          </button>
        ))}
      </div>

      {/* Read-Along Subtitles & Story Transcript Accordion */}
      <div className="audio-transcript-section">
        <button
          type="button"
          className="transcript-toggle-header"
          onClick={() => setShowTranscript(!showTranscript)}
        >
          <span className="transcript-toggle-left">
            <LuGlobe style={{ marginRight: "6px" }} />
            {ui.readAlongSubtitles} ({LANGUAGES.find(l => l.code === language)?.label})
          </span>
          {showTranscript ? <LuChevronUp /> : <LuChevronDown />}
        </button>

        {showTranscript && (
          <div className="transcript-content-pane animate-fade-in">
            {story.chapters.map((chap, idx) => (
              <div 
                key={idx} 
                className={`transcript-chapter-block ${activeChapter === idx ? "active-reading" : ""}`}
                onClick={() => handleChapterClick(idx)}
                style={{ cursor: "pointer" }}
              >
                <div className="transcript-chapter-header">
                  <span className="transcript-chap-badge">{ui.chapterBadge(idx + 1, chap.tag)}</span>
                  <h4>{chap.heading}</h4>
                </div>
                <p className="transcript-chapter-text">{chap.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioGuidePlayer;
