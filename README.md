# Invitación Digital — XV Años Paola Vázquez Tlalapango

Invitación digital para la celebración de XV años de Paola Vázquez Tlalapango. Sitio web estático, mobile-first, desplegado en Cloudflare Workers.

**Sitio en producción:** [misxvpaolatlala.org](https://misxvpaolatlala.org)

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Astro](https://astro.build) | 6.x | Framework principal / generación estática |
| [Preact](https://preactjs.com) | 10.x | Componentes interactivos (countdown, RSVP) |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Estilos utilitarios |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | 4.x | Deploy a Cloudflare Workers |

---

## Características

- **Mobile-first** — diseñada y optimizada prioritariamente para teléfonos
- **Countdown en vivo** — contador regresivo a la fecha del evento
- **Parallax JS** — efecto de profundidad en imágenes, compatible con iOS Safari
- **Animaciones al scroll** — fade + stagger + line-draw mediante Intersection Observer
- **Confirmación por WhatsApp** — formulario RSVP que genera un mensaje pre-llenado
- **Open Graph** — preview de imagen y texto al compartir en WhatsApp y redes sociales
- **Barra de progreso** — indicador de scroll elegante en la parte superior

---

## Estructura del proyecto

```
src/
├── layouts/
│   └── Layout.astro              # Shell HTML, meta OG, barra de progreso
├── styles/
│   └── global.css                # Variables de color, fuentes, sistema de animaciones
├── components/
│   ├── ui/
│   │   ├── ScrollProgress.tsx    # Barra de progreso de scroll (Preact)
│   │   ├── Countdown.tsx         # Contador regresivo al evento (Preact)
│   │   └── ParallaxImage.tsx     # Wrapper de imagen con parallax (Preact)
│   └── sections/
│       ├── Hero.astro            # Sección principal con imagen y countdown
│       ├── Invitation.astro      # Texto de invitación
│       ├── FamilySection.astro   # Padres y padrinos
│       ├── Schedule.astro        # Timeline dónde y cuándo
│       ├── Gallery.astro         # Galería de fotos
│       ├── Confirm.tsx           # Formulario RSVP (Preact)
│       └── ConfirmSection.astro  # Wrapper de la sección de confirmación
└── pages/
    └── index.astro               # Página principal
```

---

## Desarrollo local

### Requisitos

- Node.js `>= 22.12.0`
- pnpm

### Instalación

```bash
pnpm install
```

### Comandos

```bash
pnpm dev        # Servidor de desarrollo en localhost:4321
pnpm build      # Genera el sitio estático en ./dist
pnpm preview    # Previsualiza el build de producción localmente
```

---

## Personalización

### Paleta de colores

Todas las variables de color están centralizadas en `src/styles/global.css` bajo `@theme`. Cambiar una variable actualiza todo el sitio:

```css
@theme {
  --color-primary: #1a1f3c;   /* fondo principal */
  --color-accent:  #e8b4b8;   /* detalles rosa */
  --color-gold:    #d4af87;   /* elementos dorados */
  --color-surface: #242946;   /* fondo de secciones alternas */
}
```

### Número de WhatsApp

En `src/components/sections/Confirm.tsx`:

```ts
const WHATSAPP_NUMBER = "522201298518";
```

### Links de Google Maps

En `src/components/sections/Schedule.astro`:

```ts
const MAPS_MISA      = "https://maps.google.com/?q=...";
const MAPS_RECEPCION = "https://maps.google.com/?q=...";
```

### Dominio (Open Graph)

En `src/layouts/Layout.astro`:

```ts
const SITE_URL = "https://misxvpaolatlala.org";
```

---

## Imágenes requeridas

Colocar en `/public/`:

| Archivo | Uso |
|---|---|
| `hero.jpg` | Imagen principal del hero |
| `salon.jpg` | Imagen de la sección de recepción |
| `parroquia1.png` | Imagen de la sección de misa |
| `1.jpg` — `6.jpg` | Galería de fotos |

---

## Deploy

El proyecto se despliega automáticamente en **Cloudflare Workers** con cada `git push` a `main` mediante Workers Builds.

### Configuración del pipeline (Cloudflare Dashboard)

| Campo | Valor |
|---|---|
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |

La configuración del Worker está en `wrangler.jsonc`.

---

## Evento

| | |
|---|---|
| **Festejada** | Paola Vázquez Tlalapango |
| **Fecha** | 22 de mayo de 2026 |
| **Misa** | 20:00 hrs — Parroquia del Espíritu Santo y Santa María Guadalupe, Ecatepec |
| **Recepción** | 21:00 hrs — Salón Royal Rizzo Kristal, Ecatepec |
| **Padres** | Concepción Tlalapango y Sergio Vázquez |
| **Padrinos** | Isabel Alejandra Cerqueda y Francisco Cruz |
