import { useEffect, useState } from "preact/hooks";

const EVENT_DATE = new Date("2026-05-22T20:00:00");

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface UnitProps {
  value: number;
  label: string;
}

function Unit({ value, label }: UnitProps) {
  return (
    <div class="flex flex-col items-center gap-1">
      <span
        class="text-4xl md:text-5xl font-display font-normal tabular-nums"
        style={{ color: "#e8c870", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
      >
        {pad(value)}
      </span>
      <span
        class="text-xs uppercase tracking-widest font-body"
        style={{ color: "rgba(255,255,255,0.78)", textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      class="text-3xl font-normal pb-4 select-none"
      style={{ color: "#e8c870", opacity: 0.5 }}
    >
      :
    </span>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div class="flex items-end gap-3 md:gap-5">
      <Unit value={time.dias} label="días" />
      <Separator />
      <Unit value={time.horas} label="horas" />
      <Separator />
      <Unit value={time.minutos} label="min" />
      <Separator />
      <Unit value={time.segundos} label="seg" />
    </div>
  );
}
