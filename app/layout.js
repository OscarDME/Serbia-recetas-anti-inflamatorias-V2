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
  weight: ["400","500","600","700","900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: copy.metadata.title,
  description: copy.metadata.description,
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2322c55e'/></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr" className={poppins.variable}>
      <head>
        <link rel="preload" as="image" href="/mockup/Serbia-hero.webp" fetchPriority="high" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>`}
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
                stripHash();
                window.addEventListener("hashchange",
                  function () { stripHash(); });
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
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        <FacebookPixel />
        <Suspense fallback={null}>
          <HotmartSrcListener />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
