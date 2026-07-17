"use client";
import { useState, useEffect } from "react";
import { copy } from "@/lib/copy";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  const { hero } = copy;
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [isMounted, setIsMounted] = useState(false);

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
    return () => clearInterval(interval);
  }, []);

  const handleScrollToCta = () => {
    const el = document.getElementById("final-cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full">
      {/* Banner Timer */}
      <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 animate-gradient py-3 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="text-white">
            <p className="font-bold text-sm md:text-base uppercase tracking-wide">
              {hero.bannerEmoji} {hero.banner}
            </p>
            <p className="text-xs md:text-sm opacity-90">{hero.bannerSub}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-sm text-white font-bold text-sm md:text-base px-4 py-2 rounded-full animate-pulse-glow">
              ⏳{" "}
              {isMounted
                ? `${String(timeLeft.h).padStart(2, "0")}${hero.timerLabels.hours} ${String(timeLeft.m).padStart(2, "0")}${hero.timerLabels.minutes} ${String(timeLeft.s).padStart(2, "0")}${hero.timerLabels.seconds}`
                : "00h 00m 00s"}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-gradient-to-b from-[#0F3D4A] via-[#1E6B7A] to-[#1E6B7A] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 left-[-80px] w-60 h-60 rounded-full bg-white/5 blur-xl"></div>
        <div className="absolute bottom-10 right-[-60px] w-80 h-80 rounded-full bg-white/5 blur-xl"></div>

        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20 relative z-10">
          {/* Title */}
          <h1 className="text-center mb-8">
            <span className="block text-[#AEE6D8] text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight drop-shadow-lg">
              {hero.headline.line1}
            </span>
            <span className="block text-[#AEE6D8] text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight drop-shadow-lg">
              {hero.headline.green1}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white text-center text-xl md:text-2xl lg:text-3xl font-bold italic max-w-3xl mx-auto mb-10 leading-snug opacity-95">
            {hero.subheadline}
          </p>

          {/* Product Mockup */}
          <div className="w-full max-w-lg mx-auto mb-10">
            <img
              src="/mockup/Serbia-hero.webp"
              alt={hero.headline.line1 + " " + hero.headline.green1}
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              width={732}
              height={1379}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Solution Title */}
          <p className="text-[#AEE6D8] text-center text-lg md:text-xl font-semibold italic mb-6">
            {hero.solutionTitle}
          </p>

          {/* Conditions List */}
          <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-10 border border-white/10 shadow-2xl">
            <ul className="space-y-3.5">
              {hero.conditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-white text-base md:text-lg font-semibold"
                >
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={handleScrollToCta}
              className="inline-block bg-[#E8734A] hover:bg-[#D9622F] text-white font-bold py-5 px-10 rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.6)] text-lg md:text-xl border-b-4 border-[#B94E22] transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              🛒 {hero.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
