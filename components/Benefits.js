import { copy } from "@/lib/copy";
import { CheckCircle } from "lucide-react";

export default function Benefits() {
  const { benefits } = copy;

  return (
    <section className="w-full bg-[#1E6B7A] py-14 md:py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F3D4A] text-center mb-12">
          {benefits.headline}
        </h2>
        <p className="text-white text-xl md:text-2xl font-black italic mb-12">
          {benefits.subheadline}
        </p>

        {/* Benefits Cards */}
        <div className="space-y-5">
          {benefits.items.map((item, index) => (
            <div
              key={index}
              className="bg-[#fffde8] rounded-xl px-6 py-5 flex items-center gap-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <CheckCircle className="w-9 h-9 text-[#E8734A] flex-shrink-0" strokeWidth={2.5} />
              <p className="text-gray-800 text-base md:text-lg text-left leading-relaxed">
                {item.text}
                {item.bold && <strong className="font-bold">{item.bold}</strong>}
                {item.textAfter && item.textAfter}
                {item.bold2 && <strong className="font-bold">{item.bold2}</strong>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
