import { useState } from "preact/hooks";

// ─── Actualiza este número cuando el cliente lo confirme ────────────────────
// Formato: código de país + número sin espacios ni guiones (ej. 521XXXXXXXXXX)
const WHATSAPP_NUMBER = "525521524237";
// ─────────────────────────────────────────────────────────────────────────────

type Attendance = "si" | "no" | "";

function buildWhatsAppUrl(
  nombre: string,
  apellido: string,
  asiste: Attendance,
  total: number,
) {
  let respuesta: string;
  if (asiste === "si") {
    const personas =
      total === 1 ? "1 persona (solo yo)" : `${total} personas en total`;
    respuesta = `¡Hola! Soy *${nombre} ${apellido}* y confirmo que *Asistiré* con gusto a los XV años de Paola. Seremos *${personas}*.`;
  } else {
    respuesta = `Hola, soy *${nombre} ${apellido}*. Lamentablemente *No podré asistir* a los XV años de Paola, pero les mando un fuerte abrazo.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(respuesta)}`;
}

interface RadioOptionProps {
  value: Attendance;
  label: string;
  checked: boolean;
  onChange: (v: Attendance) => void;
}

function RadioOption({ value, label, checked, onChange }: RadioOptionProps) {
  return (
    <label
      class="radio-option"
      style={{
        border: `1px solid ${checked ? "var(--color-gold)" : "color-mix(in srgb, var(--color-gold) 25%, transparent)"}`,
        background: checked
          ? "color-mix(in srgb, var(--color-gold) 12%, transparent)"
          : "transparent",
        color: checked ? "var(--color-gold)" : "var(--color-text)",
        opacity: checked ? 1 : 0.65,
      }}
    >
      <input
        type="radio"
        name="asistencia"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        class="sr-only"
      />
      <span
        class="radio-dot"
        style={{
          background: checked ? "var(--color-gold)" : "transparent",
          border: `1px solid ${checked ? "var(--color-gold)" : "var(--color-text)"}`,
        }}
      />
      <span class="font-body text-sm tracking-wide">{label}</span>
    </label>
  );
}

export default function Confirm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [asiste, setAsiste] = useState<Attendance>("");
  const [total, setTotal] = useState(1);
  const [sent, setSent] = useState(false);

  const handleAsiste = (v: Attendance) => {
    setAsiste(v);
    if (v === "no") setTotal(1);
  };

  const isValid = nombre.trim() && apellido.trim() && asiste !== "";

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!isValid) return;
    setSent(true);
    const url = buildWhatsAppUrl(nombre.trim(), apellido.trim(), asiste, total);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sent) {
    return (
      <div class="confirm-sent flex flex-col items-center gap-4 py-8 text-center">
        <div
          class="flex items-center justify-center rounded-full"
          style={{
            width: 56,
            height: 56,
            background:
              "color-mix(in srgb, var(--color-gold) 15%, transparent)",
            border: "1px solid var(--color-gold)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p
          class="font-display text-2xl font-normal"
          style={{ color: "var(--color-text)" }}
        >
          ¡Gracias, {nombre}!
        </p>
        <p
          class="font-body text-sm font-normal"
          style={{ color: "var(--color-accent)", opacity: 0.85 }}
        >
          {asiste === "si"
            ? "¡Te esperamos con mucho cariño!"
            : "Gracias por hacernos saber, te mandamos un abrazo."}
        </p>
        <button
          onClick={() => {
            setSent(false);
            setNombre("");
            setApellido("");
            setAsiste("");
            setTotal(1);
          }}
          class="font-body mt-2 text-xs tracking-widest uppercase underline underline-offset-4"
          style={{ color: "var(--color-gold)", opacity: 0.6 }}
        >
          Modificar respuesta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      class="confirm-form mx-auto flex w-full max-w-sm flex-col gap-5"
    >
      {/* Nombre */}
      <div class="field">
        <label class="field-label">Nombre</label>
        <input
          type="text"
          value={nombre}
          onInput={(e) => setNombre((e.target as HTMLInputElement).value)}
          placeholder="Tu nombre"
          autocomplete="given-name"
          class="field-input"
        />
      </div>

      {/* Apellido */}
      <div class="field">
        <label class="field-label">Apellido</label>
        <input
          type="text"
          value={apellido}
          onInput={(e) => setApellido((e.target as HTMLInputElement).value)}
          placeholder="Tu apellido"
          autocomplete="family-name"
          class="field-input"
        />
      </div>

      {/* Radio asistencia */}
      <div class="flex flex-col gap-2">
        <span class="field-label">¿Podrás acompañarnos?</span>
        <div class="flex gap-3">
          <RadioOption
            value="si"
            label="Asistiré"
            checked={asiste === "si"}
            onChange={handleAsiste}
          />
          <RadioOption
            value="no"
            label="No asistiré"
            checked={asiste === "no"}
            onChange={handleAsiste}
          />
        </div>
      </div>

      {/* Total personas — solo visible si asiste */}
      {asiste === "si" && (
        <div class="field">
          <label class="field-label">¿Cuántos serán en total?</label>
          <input
            type="number"
            min={1}
            max={10}
            value={total}
            onInput={(e) =>
              setTotal(
                Math.min(
                  10,
                  Math.max(1, Number((e.target as HTMLInputElement).value)),
                ),
              )
            }
            class="field-input"
          />
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={!isValid}
        class="confirm-btn font-body mt-2 rounded-full px-8 py-3 text-sm font-normal tracking-[0.2em] uppercase transition-all"
        style={{
          background: isValid ? "var(--color-gold)" : "transparent",
          color: isValid ? "var(--color-primary)" : "var(--color-gold)",
          border: "1px solid var(--color-gold)",
          opacity: isValid ? 1 : 0.45,
          cursor: isValid ? "pointer" : "not-allowed",
        }}
      >
        Confirmar por WhatsApp
      </button>
    </form>
  );
}
