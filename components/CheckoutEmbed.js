"use client";
import { useEffect, useRef } from "react";

// Checkout embebido de OrioPay (React) con LAZY LOAD.
//
// - Solo inyecta embed.js (que trae el iframe pesado + Stripe, ~110 req / ~3.6MB)
//   cuando `show` es true → no carga en cada visita ni dispara InitiateCheckout antes
//   de abrir. Se inyecta con async=false para que document.currentScript funcione en
//   embed.js (si fuera async sería null y abortaría).
// - Se carga desde www.oriopay.app (NO el apex oriopay.app: el apex hace 307→www y
//   embed.js rechazaría los mensajes de altura por mismatch de origen → se cortaría).
// - La altura la ajusta OrioPay solo (postMessage oriopay:height). No fijar altura.
// - data-color = color primario de marca; data-font = Poppins (fuente de la landing).
export default function CheckoutEmbed({
  slug,
  show,
  color = "#E8734A",
  font = "Poppins",
  radius = "12",
}) {
  const ref = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!show || loaded.current || !ref.current || !slug) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = "https://www.oriopay.app/embed.js";
    s.async = false; // necesario para document.currentScript en embed.js
    s.setAttribute("data-slug", slug);
    s.setAttribute("data-color", color);
    s.setAttribute("data-font", font);
    s.setAttribute("data-radius", radius);
    ref.current.appendChild(s);
  }, [show, slug, color, font, radius]);

  return (
    <div
      ref={ref}
      className={
        "oriopay-embed w-full max-w-xl mx-auto" + (show ? " mt-8" : " hidden")
      }
    />
  );
}
