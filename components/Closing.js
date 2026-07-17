"use client";
import { useState, useEffect } from "react";
import { copy } from "@/lib/copy";
import { ShoppingCart, Star, Eye } from "lucide-react";

const BASE_CHECKOUT_URL = "https://www.oriopay.app/p/protivupalni-recepti-v2";

export default function Closing() {
  const [checkoutUrl, setCheckoutUrl] = useState(BASE_CHECKOUT_URL);
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  const { closing, finalCta, recap } = copy;

  useEffect(() => {
    setIsMounted(true);

    function calculateTime() {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59
      );
      const diff = endOfDay - now;
      if (diff <= 0) return { h: 0, m: 0, s: 0 };
      return {
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      };
    }
    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        let src = params.get("src");
        let fbclid = params.get("fbclid");
        if (!src) src = localStorage.getItem("hotmart_src");
        if (!fbclid) fbclid = localStorage.getItem("hotmart_fbclid");
        if (src || fbclid) {
          const urlObj = new URL(BASE_CHECKOUT_URL);
          if (src) urlObj.searchParams.set("src", src);
          if (fbclid) urlObj.searchParams.set("fbclid", fbclid);
          setCheckoutUrl(urlObj.toString());
        }
      }
    } catch (error) {
      console.error("Error construyendo URL:", error);
    }

    return () => clearInterval(interval);
  }, []);

  const handleBeginCheckout = () => {
    try {
      let priceNum = 0;
      if (finalCta.offerPrice) {
        const cleaned = String(finalCta.offerPrice)
          .replace(/[^\d.,]/g, "")
          .replace(",", ".");
        const parsed = parseFloat(cleaned);
        if (Number.isFinite(parsed)) priceNum = parsed;
      }
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "begin_checkout",
          value: priceNum,
          currency: "EUR",
          items: [
            {
              item_id: "receitas_anti_inflamatorias_closing",
              item_name: copy.metadata.title,
              price: priceNum,
            },
          ],
        });
      }
    } catch (err) {
      console.error("[Closing] Error en analytics:", err);
    }
  };

  return (
    <>
      {/* Motivational Closing */}
      <section className="w-full bg-gradient-to-r from-[#b8a43a] via-[#c5b358] to-[#d4c26a] py-14 md:py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22%20fill%3D%22white%22%20opacity%3D%220.1%22/%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-white text-2xl md:text-4xl font-black uppercase italic leading-tight mb-6 drop-shadow-md">
            {closing.headline}
          </h2>
          <p className="text-white/90 text-xl md:text-2xl font-semibold italic">
            {closing.subheadline}
          </p>
        </div>
      </section>

      {/* Second CTA */}
      <section className="w-full bg-[#fffdf7] py-14 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center border border-gray-100">
            <h2 className="text-[#0F3D4A] text-2xl md:text-3xl font-black mb-4 leading-tight">
              {finalCta.opportunityHeadline}
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-sm">
              {finalCta.opportunityText}
            </p>

            {/* Product Mockup */}
            <div className="w-full max-w-sm mx-auto mb-6">
              <img
                src="/mockup/Serbia-cta.webp"
                alt={finalCta.imageAlt}
                className="w-full h-auto object-contain drop-shadow-xl"
                width={732}
                height={1379}
                loading="lazy"
                decoding="async"
              />
            </div>

            <h3 className="text-[#dc2626] text-xl md:text-2xl font-black uppercase tracking-wide mb-4">
              {finalCta.headline}
            </h3>

            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{finalCta.reviews}</span>
            </div>

            <p className="text-gray-500 text-base mb-1">
              {finalCta.regularPriceLabel}{" "}
              <span className="line-through">{finalCta.regularPrice}</span>
            </p>
            <p className="text-gray-600 text-lg font-bold uppercase mb-2">
              {finalCta.offerLabel}
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-4">
              <span className="text-[#0F3D4A] text-6xl md:text-7xl font-black tracking-tighter whitespace-nowrap">
                {finalCta.offerPrice}
              </span>
            </div>

            {/* Banner Timer */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 animate-gradient rounded-xl py-3 px-4 mb-4 flex items-center justify-between">
              <div className="text-white text-left">
                <p className="font-bold text-sm uppercase">{closing.banner}</p>
                <p className="text-xs opacity-90">{closing.bannerSub}</p>
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white font-bold text-sm px-3 py-1.5 rounded-full animate-pulse-glow">
                ⏳{" "}
                {isMounted
                  ? `${String(timeLeft.h).padStart(2, "0")}h ${String(timeLeft.m).padStart(2, "0")}m ${String(timeLeft.s).padStart(2, "0")}s`
                  : "00h 00m 00s"}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-4 flex items-center justify-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full inline-block animate-pulse"></span>
              <Eye className="w-4 h-4 text-gray-400" />
              {finalCta.viewers}
            </p>

            <a
              href={checkoutUrl}
              onClick={handleBeginCheckout}
              className="inline-flex items-center justify-center gap-2 bg-[#E8734A] hover:bg-[#D9622F] text-white font-bold py-5 md:py-6 px-8 md:px-12 rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.6)] text-lg md:text-xl w-full border-b-4 border-[#B94E22] transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingCart className="w-6 h-6" />
              {closing.button}
            </a>

            <p className="text-gray-400 text-sm mt-3">{finalCta.afterButton}</p>

            {/* Guarantee Logo */}
            <div className="mt-6">
              <img
                src="/Logos-garantia-sin-fondo/Serbia-garantia.webp"
                alt={finalCta.guaranteeAlt}
                className="w-40 md:w-48 mx-auto opacity-90"
                width={2200}
                height={1920}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recap Section */}
      <section className="w-full bg-[#fffdf7] py-14 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[#0F3D4A] text-2xl md:text-3xl font-black text-center mb-10">
            {recap.headline}
          </h2>
          <div className="space-y-4">
            {recap.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4 border border-gray-50"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  {item.text}
                  {item.bold && <strong className="font-bold">{item.bold}</strong>}
                  {item.textAfter && item.textAfter}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
