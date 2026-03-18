import { useEffect, useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface Props {
  src: string;
  alt?: string;
  height?: string;
  children?: ComponentChildren;
  speed?: number; // 0 = sin parallax, 0.3 = suave (default), 0.5 = más pronunciado
}

export default function ParallaxImage({
  src,
  alt = "",
  height = "420px",
  children,
  speed = 0.3,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Solo calcular cuando el elemento es visible
      if (rect.bottom < 0 || rect.top > viewH) return;

      // Progreso: -1 (arriba del viewport) → 0 (centrado) → 1 (abajo)
      const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      const offset = progress * speed * 100;

      img.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [speed]);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", height, overflow: "hidden" }}
    >
      {/* Imagen con escala extra para que el parallax no deje bordes vacíos */}
      <div
        ref={imgRef}
        aria-label={alt}
        role={alt ? "img" : undefined}
        style={{
          position: "absolute",
          inset: "-15% 0",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      {/* Overlay + contenido */}
      {children && (
        <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
          {children}
        </div>
      )}
    </div>
  );
}
