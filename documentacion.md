
CREARIS
Documentación Técnica
Arquitectura de Landing Pages

Guía obligatoria para el desarrollo de todas las landing pages
Versión 1.0 — Marzo 2026
1. Introducción y Propósito
Este documento establece la arquitectura estándar y obligatoria que se debe seguir para construir TODAS las landing pages del proyecto Crearis. No hay excepciones ni interpretaciones alternativas: se hace EXACTAMENTE como se indica aquí.
⚠️ IMPORTANTE: No se aceptarán landings que no sigan esta arquitectura al pie de la letra. Si tienes dudas, consulta este documento antes de escribir una sola línea de código.

1.1 Objetivos de esta arquitectura
Consistencia total entre todas las landings de todos los idiomas
Velocidad de clonación: crear una nueva landing en minutos, no horas
Separación absoluta de contenido (copy.js) y código (componentes)
Tracking confiable con Facebook Pixel y parámetros UTM/fbclid
Despliegue limpio: cada landing en su propio repositorio y subdominio

2. Stack Tecnológico (No Negociable)




2.1 Comando de inicialización
Al crear un nuevo proyecto de Next.js, asegúrate de que TODO sea JavaScript desde el inicio:
npx create-next-app@latest nombre-landing \
  --js \
  --tailwind \
  --app \
  --no-eslint \
  --no-typescript \
  --src-dir false \
  --import-alias "@/*"

⚠️ IMPORTANTE: Si al crear el proyecto te pregunta si quieres TypeScript, responde NO. Si te pregunta por ESLint, responde NO. Esto no es opcional.

3. Estructura de Carpetas
La raíz del proyecto tendrá EXACTAMENTE esta estructura dentro de src/ o directamente en la raíz según cómo se configure Next.js. Las carpetas principales son tres:

proyecto/
├── app/
│   ├── layout.js          ← Layout global (EL EXACTO de abajo)
│   ├── page.js            ← Página principal (importa componentes)
│   ├── globals.css        ← Estilos globales de Tailwind
│   └── favicon.ico
├── components/
│   ├── ui/                ← Componentes de Shadcn
│   ├── Hero.js
│   ├── Story.js
│   ├── Benefits.js
│   ├── Features.js
│   ├── CarouselSection.js
│   ├── Bonuses.js
│   ├── Testimonials.js
│   ├── FinalCta.js
│   ├── FAQ.js
│   ├── Closing.js
│   ├── Footer.js
│   ├── FacebookPixel.js   ← Implementación del Pixel
│   └── HotmartSrcListener.js ← Captura de parámetros
├── lib/
│   └── copy.js            ← TODO el contenido dinámico
└── public/
    ├── hero-mockup.webp
    ├── aderezos.webp
    └── carousel/
        ├── img-1.webp
        ├── img-2.webp
        └── ...

⚠️ IMPORTANTE: CERO texto hardcodeado en componentes. Absolutamente todo el copy sale de lib/copy.js. Si un componente tiene texto que no viene del copy, está MAL.

3.1 Regla de Imágenes: Solo formato WEBP
TODAS las imágenes que se usen en el diseño de la landing deben estar en formato .webp sin excepción. Esto aplica a mockups, fotos del carrusel, imágenes de bonuses, backgrounds y cualquier otro recurso visual.

⚠️ IMPORTANTE: No se aceptan imágenes en .png, .jpg, .jpeg, .gif ni ningún otro formato. Si la imagen original no está en .webp, se debe convertir ANTES de subirla al proyecto. Herramientas como squoosh.app o cwebp sirven para esto.

Convención de nombres de imágenes
Mockup principal del hero: hero-mockup.webp
Imágenes del carrusel: carousel/img-1.webp, img-2.webp, etc.
Imágenes de bonuses: aderezos.webp, bonus-marmitas.webp, etc.
Imágenes de story u otras secciones: nombre-descriptivo.webp

✅ Formato .webp = mejor compresión, menor peso, carga más rápida. No hay razón para usar otro formato.

Ejemplo del page.js
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import CarouselSection from "@/components/CarouselSection";
import Bonuses from "@/components/Bonuses";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta"; 
import FAQ from "@/components/FAQ";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer"; // <--- Nuevo

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <Story />
      <Benefits />
      <Features />
      <CarouselSection />
      <Bonuses />
      <Testimonials />
      <FinalCta />
      <FAQ />
      <Closing />
      <Footer /> 
    </main>
  );
}

4. Layout Global (app/layout.js)
El archivo layout.js debe ser EXACTAMENTE este código. No se modifica, no se simplifica, no se "mejora". Se copia tal cual. A continuación el archivo COMPLETO:

// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import { copy } from "@/lib/copy";
import FacebookPixel from "@/components/FacebookPixel";
import HotmartSrcListener from "@/components/HotmartSrcListener";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'
       viewBox='0 0 100 100'><circle cx='50' cy='50' r='50'
       fill='%2322c55e'/></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={poppins.variable}>
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg
            xmlns=%22http://www.w3.org/2000/svg%22
            viewBox=%220 0 100 100%22>
            <text y=%22.9em%22 font-size=%2290%22>
            </text></svg>`}
        />
        <Script
          id="kill-all-hashes"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function stripHash() {
                  if (location.hash) {
                    history.replaceState(null, "",
                      location.pathname + location.search);
                  }
                }
                // 1) Limpia inmediatamente
                stripHash();
                // 2) Limpia en cualquier hashchange
                window.addEventListener("hashchange",
                  function () { stripHash(); });
                // 3) Intercepta pushState / replaceState
                var _replaceState = history.replaceState;
                history.replaceState = function (state, title, url) {
                  try {
                    if (typeof url === "string"
                        && url.indexOf("#") !== -1) {
                      url = url.split("#")[0];
                    }
                  } catch (e) {}
                  return _replaceState.call(
                    history, state, title, url);
                };
                var _pushState = history.pushState;
                history.pushState = function (state, title, url) {
                  try {
                    if (typeof url === "string"
                        && url.indexOf("#") !== -1) {
                      url = url.split("#")[0];
                    }
                  } catch (e) {}
                  return _pushState.call(
                    history, state, title, url);
                };
                // 4) Kill loop por si un script insiste
                var tries = 0;
                var t = setInterval(function () {
                  stripHash();
                  tries++;
                  if (tries > 200) clearInterval(t);
                }, 50);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white
        text-gray-900 antialiased font-sans">
        {/* Pixel */}
        <FacebookPixel />
        {/* Hotmart params con Suspense */}
        <Suspense fallback={null}>
          <HotmartSrcListener />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

Elementos clave del Layout
Fuente Poppins: Se carga con todos los pesos (100-900) como variable CSS --font-sans.
Script kill-all-hashes: Elimina hashes de la URL para evitar problemas con el tracking y scroll.
FacebookPixel: Se monta directamente en el body, fuera del Suspense.
HotmartSrcListener: Envuelto en Suspense porque usa useSearchParams / window.location.
Lang del HTML: Se cambia según el idioma de la landing ("es", "ro", "sr", "tr", etc.).

⚠️ IMPORTANTE: El layout incluye un Script con strategy="beforeInteractive" que limpia hashes de la URL. NO lo quites. Sin él, el Pixel de Facebook y los analytics se rompen.

5. Página Principal (app/page.js)
El page.js es simplemente un archivo que importa y renderiza todos los componentes en orden. Cada sección visible de la landing es un componente separado:

// app/page.js
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import CarouselSection from "@/components/CarouselSection";
import Bonuses from "@/components/Bonuses";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import FAQ from "@/components/FAQ";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans">
      <Hero />
      <Story />
      <Benefits />
      <Features />
      <CarouselSection />
      <Bonuses />
      <Testimonials />
      <FinalCta />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  );
}

Reglas del page.js
No hay lógica en el page.js. Solo importaciones y renderizado.
El orden de los componentes define el orden visual de la landing.
Si una landing no necesita una sección (ej: Story), simplemente no se importa.
NUNCA se pone copy ni estilos directamente en page.js.

6. Sistema de Copy Dinámico (lib/copy.js)
Este es el corazón de la arquitectura de contenido. ABSOLUTAMENTE TODO el texto visible de la landing sale de este archivo. Los componentes solo leen de aquí, nunca tienen texto propio.

6.1 Estructura del copy.js
El archivo exporta un objeto llamado "copy" con secciones que corresponden a cada componente:

// lib/copy.js
export const copy = {
  hero: {
    banner: "...",
    timerLabels: { days: "...", hours: "...", ... },
    headline: { line1: "...", green1: "...", ... },
    subheadline: "...",
    cta: "...",
    imageAlt: "..."
  },
  story: { ... },
  benefits: { headline: "...", items: [...] },
  features: { headline: "...", items: [...] },
  carouselSection: { images: [...], button: "..." },
  bonuses: { badge: "...", items: [...] },
  testimonials: { headline: "...", items: [...] },
  finalCta: { headline: "...", offerPrice: "...", ... },
  faq: { headline: "...", items: [...] },
  closing: { ... },
  footer: { brand: "Crearis", ... },
  metadata: { title: "...", description: "..." }
};

6.2 Regla de Oro del Copy
✅ Si puedes ver texto en la landing, DEBE existir en copy.js. Si no está en copy.js, está mal implementado.

Qué va en copy.js
Todos los títulos, subtítulos y textos de cada sección
Labels de botones y CTAs
Textos de garantía, urgencia y precios
Alt texts de imágenes
Preguntas y respuestas del FAQ
Testimonios (nombre, rol, quote)
Metadata (title y description del SEO)
Labels del timer (días, horas, minutos, segundos)

Qué NO va en copy.js
URLs de checkout (van como constante en el componente FinalCta/Closing)
Pixel IDs (van como constante en FacebookPixel.js)
Rutas de imágenes locales del carrusel (van en copy.js como array)
Lógica de componentes o estilos

7. Componentes (Secciones de la Landing)
Cada sección visible de la landing es un componente separado dentro de la carpeta components/. Todos siguen el mismo patrón:

7.1 Patrón de Componente Estándar
"use client";  // Solo si usa hooks o interactividad

import { copy } from "@/lib/copy";

export default function NombreSeccion() {
  const { nombreSeccion } = copy;
  return (
    <section className="...">
      <h2>{nombreSeccion.headline}</h2>
      <p>{nombreSeccion.subheadline}</p>
      {/* Todo el texto viene de copy */}
    </section>
  );
}

7.2 Lista de Componentes



7.3 Componente FinalCta — Referencia
El FinalCta es el componente de conversión principal. Aquí está el botón que lleva al checkout real.
"use client";

import { useState, useEffect } from "react";
import { copy } from "@/lib/copy";
import { ShieldCheck } from "lucide-react";

// 👇 URL base del checkout (OrioPay)
const BASE_CHECKOUT_URL = "https://www.oriopay.app/p/1001zdravreceptzaairfryer";

export default function FinalCta() {
  const [checkoutUrl, setCheckoutUrl] = useState(BASE_CHECKOUT_URL);
  
  const { finalCta } = copy;

  // 👇 LÓGICA MANUAL: Prioridad URL > luego LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // 1. Prioridad: Leer de la URL actual del navegador
        const params = new URLSearchParams(window.location.search);
        let src = params.get("src");
        let fbclid = params.get("fbclid");

        // 2. Respaldo: Leer de LocalStorage si no están en la URL
        if (!src) src = localStorage.getItem("hotmart_src");
        if (!fbclid) fbclid = localStorage.getItem("hotmart_fbclid");

        // 3. Construir URL final
        if (src || fbclid) {
          const urlObj = new URL(BASE_CHECKOUT_URL);
          
          if (src) {
            urlObj.searchParams.set("src", src);
            console.log("🔗 FinalCTA: src agregado ->", src);
          }
          
          if (fbclid) {
            urlObj.searchParams.set("fbclid", fbclid);
            console.log("🔗 FinalCTA: fbclid agregado ->", fbclid);
          }

          setCheckoutUrl(urlObj.toString());
        }
      }
    } catch (error) {
      console.error("Error construyendo URL:", error);
    }
  }, []);

  // 👇 LÓGICA DE ANALYTICS
  const handleBeginCheckout = (e) => {
    try {
      let priceNum = 0;

      if (finalCta.offerPrice) {
        // Limpiar formato de precio (ej: "$9.90" -> 9.90)
        const cleaned = String(finalCta.offerPrice)
          .replace(/[^\d.,]/g, "")
          .replace(",", "."); // Si usa coma decimal, cambiar a punto
        const parsed = parseFloat(cleaned);
        if (Number.isFinite(parsed)) priceNum = parsed;
      }
      
      // Analytics DataLayer Push
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "begin_checkout",
          value: priceNum,
          currency: "USD", // ⚠️ Ajusta esto a tu moneda real si es necesario
          items: [
            {
              item_id: "recetario_airfryer_cta", // ID interno actualizado
              item_name: "Paquete 1001 Recetas Airfryer", // Nombre del producto actualizado
              price: priceNum,
            },
          ],
        });
      }

      console.log("[FinalCTA] begin_checkout disparado ✅");
      console.log("[FinalCTA] Navegando a:", checkoutUrl);

    } catch (err) {
      console.error("[FinalCTA] Error en analytics:", err);
    }
  };

  return (
    // 👇 AQUÍ ESTÁ EL ID QUE HACE QUE EL BOTÓN DEL HERO FUNCIONE 👇
    <section id="final-cta-section" className="w-full bg-[#f4fafb] py-16 md:py-24 px-4 md:px-6 font-sans text-center flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        
        {/* Ícono de Escudo de Garantía */}
        <div className="bg-[#e0f4eb] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-[#22c55e]" strokeWidth={2} />
        </div>

        {/* Título y Texto de Garantía */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#444444] mb-4">
          {finalCta.headline}
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#666666] mb-10 max-w-2xl">
          {finalCta.guaranteeText}
        </p>

        {/* --- LA LISTA APILADA QUE QUERÍAS --- */}
        <div className="mb-10 flex flex-col items-center text-center font-black text-xl md:text-3xl tracking-tight leading-relaxed">
          {finalCta.bundleList.map((item, index) => (
            <span 
              key={index} 
              className={index === 0 ? "text-[#ff7a3d] mb-3" : "text-[#444444]"}
            >
              {item}
            </span>
          ))}
        </div>
        {/* ----------------------------------- */}

        {/* Bloque de Precios */}
        <div className="mb-6">
          <p className="text-[#777777] text-[16px] md:text-lg mb-2 font-medium">
            {finalCta.regularPriceLabel} <span className="line-through">{finalCta.regularPrice}</span>
          </p>
          <p className="text-6xl md:text-7xl font-black text-[#22c55e] mb-3 tracking-tighter drop-shadow-sm">
            {finalCta.offerPrice}
          </p>
          <p className="text-[14px] md:text-[15px] font-medium text-[#777777]">
            {finalCta.urgencyText}
          </p>
        </div>

        {/* Imagen del Bundle (Mockups) - 100% estática */}
        <div className="w-full max-w-[500px] mt-6 mb-10">
          <img 
            src="/hero-mockup.webp" 
            alt={finalCta.imageAlt} 
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Botón de Compra Final - Convertido a <a> y conectado con la lógica */}
        <a 
          href={checkoutUrl}
          onClick={handleBeginCheckout}
          className="inline-block bg-[#28a745] hover:bg-[#218838] text-white font-bold py-6 md:py-8 px-6 md:px-12 rounded-xl shadow-xl text-[18px] md:text-[22px] w-full md:w-auto mx-auto h-auto whitespace-normal leading-snug border-b-4 border-[#1e7e34] transition-colors cursor-pointer"
        >
          {finalCta.button}
        </a>

      </div>
    </section>
  );
}
Funcionalidades clave del FinalCta
URL del checkout: Se define como constante BASE_CHECKOUT_URL al inicio del componente. Es la única cosa que se cambia por landing.
Construcción dinámica de URL: En el useEffect, se lee src y fbclid primero de la URL actual del navegador, y como respaldo del localStorage.
Analytics: Al hacer click, dispara un evento begin_checkout al dataLayer de GTM con el precio parseado del copy.
id="final-cta-section": OBLIGATORIO. Sin este ID, el botón del Hero no funciona. No cambiar el nombre.

8. Facebook Pixel (Implementación Exacta)
El componente FacebookPixel.js tiene una implementación específica con deduplicación de PageView. NO se usa una implementación genérica ni un paquete npm. Se usa EXACTAMENTE esta:

"use client";

import Script from "next/script";

const PIXEL_ID = "1840877619911958";

export default function FacebookPixel() {
  return (
    <>
      {/* 1. Snippet oficial de Meta */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('set','autoConfig', false, '${PIXEL_ID}');
            fbq('init', '${PIXEL_ID}', {}, { disablePushState: true });
          `,
        }}
      />

      {/* 2. Filtro Dedupe Corregido */}
      <Script
        id="meta-pv-dedupe"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (location.pathname === "/brd") return;

              var lastPV = null;

              function installPatch() {
                if (!window.fbq || !window.fbq.callMethod) return false;
                if (window.__pvDedupeInstalled) return true;
                window.__pvDedupeInstalled = true;

                // Guardamos la función original de Meta
                var orig = window.fbq.callMethod;
                
                // Interceptamos para revisar duplicados
                window.fbq.callMethod = function() {
                  try {
                    if (arguments[0] === 'track' && arguments[1] === 'PageView') {
                      var currentUrl = location.origin + location.pathname + location.search;
                      
                      if (lastPV === currentUrl) {
                        console.log("🛡️ [FB] PageView duplicado bloqueado:", currentUrl);
                        return; // Detiene el duplicado
                      }
                      
                      lastPV = currentUrl; // Guarda la URL para futuros chequeos
                      console.log("✅ [FB] PageView ENVIADO a Meta:", currentUrl);
                    }
                  } catch (e) {}

                  // Continúa con el disparo normal
                  return orig.apply(this, arguments);
                };

                return true;
              }

              // Esperamos a que la librería cargue y disparamos el evento
              var timer = setInterval(function() {
                if (installPatch()) {
                  clearInterval(timer);
                  // Ahora sí, disparamos el evento a través de nuestro parche seguro
                  window.fbq('track', 'PageView');
                }
              }, 50);
            })();
          `,
        }}
      />

      {/* Fallback para navegadores sin JS */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}



8.1 Estructura del FacebookPixel.js
Es un "use client" component
Usa next/script con strategy="afterInteractive"
Tiene DOS bloques de Script:

Bloque 1: Snippet oficial de Meta
Carga la librería fbevents.js e inicializa el Pixel con el ID correspondiente. Incluye dos configuraciones críticas:
fbq('set','autoConfig', false, PIXEL_ID): Desactiva la auto-configuración para tener control total.
disablePushState: true: Evita que el Pixel dispare PageViews automáticos en cambios de ruta de Next.js.

Bloque 2: Filtro Dedupe
Intercepta la función fbq.callMethod para evitar PageViews duplicados. Compara la URL actual con la última URL donde se disparó un PageView y bloquea duplicados.

⚠️ IMPORTANTE: El PIXEL_ID se cambia directamente en el archivo. Cada landing puede tener su propio Pixel o compartir uno. Se define como constante al inicio: const PIXEL_ID = "TU_ID_AQUI";

9. Sistema de Tracking de Parámetros
El sistema captura los parámetros src (fuente de tráfico) y fbclid (click ID de Facebook) para pasarlos al checkout y mantener la atribución.

9.1 HotmartSrcListener.js
Este componente se ejecuta una sola vez al cargar la página. Lee los parámetros de la URL y los guarda en localStorage:

"use client";
import { useEffect } from "react";

export default function HotmartSrcListener() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const src = params.get("src");
    const fbclid = params.get("fbclid");

    if (src) {
      localStorage.setItem("hotmart_src", src);
      console.log("✅ src guardado:", src);
    }

    if (fbclid) {
      localStorage.setItem("hotmart_fbclid", fbclid);
      console.log("✅ fbclid guardado:", fbclid);
    }
  }, []);

  return null;
}


9.2 Flujo de Parámetros
El flujo completo de los parámetros es el siguiente:
Usuario llega con ?src=facebook&fbclid=abc123
HotmartSrcListener guarda ambos en localStorage
FinalCta y Closing leen los parámetros (prioridad URL > localStorage)
Se construye la URL del checkout: checkout.com?src=facebook&fbclid=abc123
El usuario hace click y llega al checkout con atribución completa

9.3 Lógica de Construcción de URL en CTAs
TODOS los componentes que tienen botón de compra (FinalCta, Closing, y cualquier otro CTA) deben seguir EXACTAMENTE esta lógica:

const BASE_CHECKOUT_URL = "https://www.oriopay.app/p/tu-producto";

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  let src = params.get("src");
  let fbclid = params.get("fbclid");

  // Respaldo de localStorage
  if (!src) src = localStorage.getItem("hotmart_src");
  if (!fbclid) fbclid = localStorage.getItem("hotmart_fbclid");

  if (src || fbclid) {
    const urlObj = new URL(BASE_CHECKOUT_URL);
    if (src) urlObj.searchParams.set("src", src);
    if (fbclid) urlObj.searchParams.set("fbclid", fbclid);
    setCheckoutUrl(urlObj.toString());
  }
}, []);

⚠️ IMPORTANTE: La prioridad SIEMPRE es: primero URL del navegador, luego localStorage. Nunca al revés.

10. Flujo de Trabajo para Nuevas Landings

10.1 Crear la Landing Base
La primera landing que se construya (en cualquier idioma) será la BASE de todas las demás. Esta landing base se construye completa con todo el diseño, componentes y funcionalidad.

Crear el proyecto con Next.js (ver comando de la sección 2.1)
Configurar la estructura de carpetas exacta (sección 3)
Implementar el layout.js exacto (sección 4)
Crear todos los componentes con el diseño final
Crear el copy.js en el idioma base
Implementar FacebookPixel.js y HotmartSrcListener.js
Subir a GitHub en su propio repositorio
Deploy en Vercel con su subdominio

10.2 Clonar para Nuevos Idiomas
Una vez que la landing base esté funcionando, para cada nuevo idioma:

Clonar el repositorio de la landing base a un nuevo repo
Cambiar SOLAMENTE estos cuatro elementos:



Cambiar el lang del HTML en layout.js según el idioma
Actualizar el Pixel ID si es diferente por país
Deploy en Vercel con su propio subdominio de crearis.online

✅ Resultado: 15 landings en 15 idiomas con el mismo diseño, mismo código, solo diferente contenido.

11. Despliegue y Subdominios

11.1 Estructura de Repositorios
Cada landing tiene su propio repositorio en GitHub. La convención de nombres es:

landing-airfryer-sr    ← Landing en serbio (base)
landing-airfryer-ro    ← Landing en rumano (clon)
landing-airfryer-tr    ← Landing en turco (clon)
landing-airfryer-pl    ← Landing en polaco (clon)
landing-airfryer-hu    ← Landing en húngaro (clon)
...

11.2 Subdominios en Vercel
Cada landing se despliega como un subdominio de crearis.online:

airfryer-sr.crearis.online
airfryer-ro.crearis.online
airfryer-tr.crearis.online
...

11.3 Proceso de Deploy
Crear repositorio en GitHub
Conectar el repo a Vercel
En Vercel, agregar el dominio personalizado (subdominio de crearis.online)
Configurar DNS en el proveedor de dominio apuntando a Vercel
Verificar que el deploy funcione correctamente
Probar el flujo completo: landing → parámetros → checkout

12. Checklist de Revisión (QA)
Antes de considerar una landing como terminada, verificar TODOS estos puntos:

Estructura
Proyecto creado en JavaScript (cero .ts/.tsx)
Sin ESLint ni TypeScript configurado
Tres carpetas principales: app/, components/, lib/
layout.js es EXACTO al de la documentación
page.js solo importa y renderiza componentes

Contenido
CERO texto hardcodeado en componentes
Todo el copy sale de lib/copy.js
copy.js tiene todas las secciones: hero, story, benefits, features, etc.
Metadata (title + description) está en copy.js

Imágenes
TODAS las imágenes están en formato .webp (cero .png, .jpg, .jpeg, .gif)
Imágenes del mockup, carrusel, bonuses y demás están en public/
Nombres de archivo descriptivos y en minúsculas

Tracking
FacebookPixel.js implementado con deduplicación exacta
PIXEL_ID actualizado al número correcto del país/landing
HotmartSrcListener.js captura src y fbclid
FinalCta construye URL con parámetros (prioridad URL > localStorage)
Closing construye URL con la misma lógica
Botón del Hero hace scroll al FinalCta (no al checkout)
begin_checkout se dispara al dataLayer al hacer click en comprar

Funcionalidad
Timer cuenta regresiva funciona y se resetea a medianoche
Timer no causa errores de hidratación (usa isMounted)
Script kill-all-hashes está en el layout
Lang del HTML corresponde al idioma de la landing

Deploy
Repositorio propio en GitHub
Desplegado en Vercel
Subdominio de crearis.online configurado
HTTPS funcionando correctamente
Flujo completo probado: landing → parámetros → checkout

13. Lo Que NO Se Debe Hacer (Errores Comunes)




Este documento es la única referencia válida.
Si no está aquí, no se hace. Si está aquí, se hace exactamente así.