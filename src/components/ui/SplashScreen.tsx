import { useState } from "preact/hooks";

export default function SplashScreen() {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    const audio = document.querySelector("audio");
    if (audio) {
      audio.volume = 1;
      audio.play().catch(() => {});
    }
    setOpening(true);
    setTimeout(() => setHidden(true), 1200);
  };

  if (hidden) return null;

  return (
    <div class="splash-wrap" aria-modal="true" role="dialog">

      {/* Panel izquierdo */}
      <div class={`panel panel-left ${opening ? "panel-left--open" : ""}`}>
        <div class="panel-inner">
          <div class="panel-border" />
          <div class="panel-content">
            <div class="panel-ornament">✦</div>
            <p class="panel-script">Paola</p>
            <div class="panel-line" />
            <p class="panel-date">22 · Mayo · 2026</p>
          </div>
          <div class="panel-border" />
        </div>
        {/* Borde central con bisagra */}
        <div class="panel-edge" />
      </div>

      {/* Panel derecho */}
      <div class={`panel panel-right ${opening ? "panel-right--open" : ""}`}>
        <div class="panel-inner panel-inner--right">
          <div class="panel-border" />
          <div class="panel-content">
            <div class="panel-ornament">✦</div>
            <p class="panel-label">te invita a celebrar</p>
            <p class="panel-label">sus</p>
            <p class="panel-xv">XV Años</p>
          </div>
          <div class="panel-border" />
        </div>
        {/* Borde central */}
        <div class="panel-edge panel-edge--right" />
      </div>

      {/* Botón central — encima de ambos paneles */}
      <button
        onClick={handleOpen}
        class={`center-btn ${opening ? "center-btn--hide" : ""}`}
      >
        <span>Abrir invitación</span>
        <span class="center-btn-icon">✦</span>
      </button>

      <style>{`
        .splash-wrap {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          pointer-events: all;
        }

        /* ── Paneles ── */
        .panel {
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 1.1s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .panel-left  { transform-origin: left center; }
        .panel-right { transform-origin: right center; }

        .panel-left--open  { transform: translateX(-100%); }
        .panel-right--open { transform: translateX(100%); }

        /* Fondo con imagen del hero */
        .panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('/hero.webp');
          background-size: 200%;
          background-position: center;
          filter: brightness(0.55);
        }
        .panel-left::before  { background-position: left center; }
        .panel-right::before { background-position: right center; }

        /* ── Interior ── */
        .panel-inner {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          padding: 3rem 2.5rem 3rem 2rem;
          gap: 0;
        }
        .panel-inner--right {
          align-items: flex-start;
          padding: 3rem 2rem 3rem 2.5rem;
        }

        /* Borde dorado decorativo */
        .panel-border {
          position: absolute;
          top: 1.5rem;
          bottom: 1.5rem;
          right: 2.2rem;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--color-gold), transparent);
          opacity: 0.5;
        }
        .panel-inner--right .panel-border {
          right: auto;
          left: 2.2rem;
        }

        /* ── Contenido ── */
        .panel-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.9rem;
          text-align: right;
        }
        .panel-inner--right .panel-content {
          align-items: flex-start;
          text-align: left;
        }

        .panel-ornament {
          color: var(--color-gold);
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .panel-script {
          font-family: var(--font-paola);
          font-size: clamp(3.5rem, 8vw, 5.5rem);
          line-height: 1;
          color: #e8c870;
          text-shadow: 0 2px 20px rgba(0,0,0,0.6);
          margin: 0;
        }
        .panel-label {
          font-family: var(--font-body);
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          margin: 0;
        }
        .panel-xv {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          color: #e8c870;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
          margin: 0;
          line-height: 1;
        }
        .panel-date {
          font-family: var(--font-body);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }
        .panel-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
          opacity: 0.7;
        }

        /* ── Botón central ── */
        .center-btn {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 2rem;
          border-radius: 9999px;
          border: 1px solid var(--color-gold);
          background: rgba(0,0,0,0.35);
          backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.95);
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, opacity 0.3s;
          box-shadow: 0 0 24px rgba(201,168,76,0.3);
          animation: btnPulse 2s ease-in-out infinite;
        }
        .center-btn:hover  { background: rgba(0,0,0,0.5); transform: translate(-50%, -50%) scale(1.05); }
        .center-btn:active { transform: translate(-50%, -50%) scale(0.97); }
        .center-btn--hide  { opacity: 0; pointer-events: none; }
        .center-btn-icon {
          color: var(--color-gold);
          font-size: 0.55rem;
        }
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 16px rgba(201,168,76,0.3); }
          50%       { box-shadow: 0 0 28px rgba(201,168,76,0.6); }
        }

        /* ── Borde central (línea de unión) ── */
        .panel-edge {
          position: absolute;
          top: 0; bottom: 0;
          right: 0;
          width: 3px;
          background: linear-gradient(to bottom,
            transparent 0%,
            rgba(201,168,76,0.6) 20%,
            rgba(232,200,112,0.9) 50%,
            rgba(201,168,76,0.6) 80%,
            transparent 100%
          );
          box-shadow: 0 0 8px rgba(201,168,76,0.4);
          z-index: 2;
        }
        .panel-edge--right {
          right: auto;
          left: 0;
        }
      `}</style>
    </div>
  );
}
