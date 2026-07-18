"use client";
import Script from "next/script";

const PIXEL_ID = "1434636928356376";

export default function FacebookPixel() {
  return (
    <>
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
      <Script
        id="meta-pv-dedupe"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (location.pathname === "/brd") return;
              var lastPV = null;
              // Pixels ya inicializados (sembramos el de la landing): el embed.js hace
              // fbq('init', <mismo pixel>) al abrir el checkout -> reactiva autoConfig y
              // dispara un PageView automático fantasma. Lo bloqueamos.
              var seenPixels = {};
              seenPixels['${PIXEL_ID}'] = true;
              function installPatch() {
                if (!window.fbq || !window.fbq.callMethod) return false;
                if (window.__pvDedupeInstalled) return true;
                window.__pvDedupeInstalled = true;
                var orig = window.fbq.callMethod;
                window.fbq.callMethod = function() {
                  try {
                    var a0 = arguments[0];
                    // Dedupe de PageView por URL (cubre 'track' y 'trackSingle').
                    var isPV = (a0 === 'track' && arguments[1] === 'PageView') ||
                               (a0 === 'trackSingle' && arguments[2] === 'PageView');
                    if (isPV) {
                      var currentUrl = location.origin + location.pathname + location.search;
                      if (lastPV === currentUrl) {
                        console.log("🛡️ [FB] PageView duplicado bloqueado:", currentUrl);
                        return;
                      }
                      lastPV = currentUrl;
                      console.log("✅ [FB] PageView ENVIADO a Meta:", currentUrl);
                    }
                    // Evita el PageView automático de re-inicializar un pixel.
                    if (a0 === 'init') {
                      var pid = String(arguments[1] || '');
                      if (seenPixels[pid]) {
                        console.log("🛡️ [FB] init duplicado de pixel ignorado:", pid);
                        return;
                      }
                      seenPixels[pid] = true;
                      try { orig.call(this, 'set', 'autoConfig', false, pid); } catch (e) {}
                    }
                  } catch (e) {}
                  return orig.apply(this, arguments);
                };
                return true;
              }
              var timer = setInterval(function() {
                if (installPatch()) {
                  clearInterval(timer);
                  window.fbq('track', 'PageView');
                }
              }, 50);
            })();
          `,
        }}
      />
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
