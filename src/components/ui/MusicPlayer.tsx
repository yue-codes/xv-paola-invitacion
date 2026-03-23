import { useEffect, useRef, useState } from "preact/hooks";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(1);

  // Intenta autoplay; si el navegador lo bloquea, espera el primer toque
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1;

    const tryPlay = () => {
      if (!audio.paused) return;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    // Intento directo al montar
    tryPlay();

    // Fallback: primer gesto del usuario
    const onFirstInteraction = () => {
      tryPlay();
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      document.removeEventListener("scroll", onFirstInteraction, { capture: true });
    };

    document.addEventListener("click", onFirstInteraction);
    document.addEventListener("touchstart", onFirstInteraction);
    document.addEventListener("scroll", onFirstInteraction, { capture: true });

    return () => {
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      document.removeEventListener("scroll", onFirstInteraction, { capture: true });
    };
  }, []);

  const changeVolume = (delta: number) => {
    const val = Math.min(1, Math.max(0, Math.round((volume + delta) * 10) / 10));
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <div class="flex flex-col items-center gap-2 mt-1">
      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        onCanPlayThrough={() => setReady(true)}
      />

      <button
        onClick={toggle}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        class="flex items-center gap-2 px-4 py-1.5 rounded-full transition-opacity hover:opacity-80 active:opacity-60"
        style={{
          border: "1px solid rgba(255,255,255,0.35)",
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(4px)",
          color: "rgba(255,255,255,0.80)",
        }}
      >
        {/* Icono play/pause */}
        <span style={{ fontSize: "0.7rem", lineHeight: 1 }}>
          {playing ? "❚❚" : "▶"}
        </span>
        <span
          class="font-body text-[10px] uppercase tracking-widest"
        >
          {playing ? "pausar" : "reproducir"}
        </span>
      </button>

      {/* Control de volumen */}
      <div class="flex items-center gap-3 mt-1">
        <button
          onClick={(e) => { e.stopPropagation(); changeVolume(-0.1); }}
          aria-label="Bajar volumen"
          class="vol-btn"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          –
        </button>
        <span
          class="font-body tabular-nums"
          style={{ color: "rgba(232,200,112,0.9)", fontSize: "0.7rem", letterSpacing: "0.05em", minWidth: "2.5rem", textAlign: "center" }}
        >
          {volume === 0 ? "🔇" : `${Math.round(volume * 100)}%`}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); changeVolume(0.1); }}
          aria-label="Subir volumen"
          class="vol-btn"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          +
        </button>
      </div>

      {/* Indicador de onda animada cuando suena */}
      {playing && (
        <div class="music-bars" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      )}

      <style>{`
        .vol-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          line-height: 1;
          cursor: pointer;
          transition: opacity 0.15s;
          padding: 0;
        }
        .vol-btn:hover { opacity: 0.7; }
        .vol-btn:active { opacity: 0.5; }
        .music-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }
        .music-bars span {
          display: block;
          width: 3px;
          border-radius: 2px;
          background: rgba(232, 200, 112, 0.8);
          animation: bar 0.9s ease-in-out infinite;
        }
        .music-bars span:nth-child(1) { animation-delay: 0s;    animation-duration: 0.8s; }
        .music-bars span:nth-child(2) { animation-delay: 0.15s; animation-duration: 1.0s; }
        .music-bars span:nth-child(3) { animation-delay: 0.3s;  animation-duration: 0.75s; }
        .music-bars span:nth-child(4) { animation-delay: 0.1s;  animation-duration: 0.95s; }
        @keyframes bar {
          0%, 100% { height: 3px; }
          50%       { height: 12px; }
        }
      `}</style>
    </div>
  );
}
