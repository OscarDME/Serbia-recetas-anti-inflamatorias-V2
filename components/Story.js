import { copy } from "@/lib/copy";
import { SquareCheckBig } from "lucide-react";

export default function Story() {
  const { story } = copy;

  return (
    <section className="w-full bg-[#1E6B7A] py-14 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Headline */}
        <div className="bg-[#fffde8] rounded-2xl px-6 py-5 mb-10 text-center shadow-lg">
          <h2 className="text-[#0F3D4A] text-2xl md:text-4xl font-black italic">
            {story.headline}
          </h2>
        </div>

        {/* Checklist Items */}
        <div className="space-y-6">
          {story.items.map((item, index) => (
            <div key={index} className="flex items-start gap-4 group">
              <SquareCheckBig className="w-10 h-10 text-white/80 flex-shrink-0 mt-1 group-hover:text-[#AEE6D8] transition-colors" strokeWidth={1.5} />
              <p className="text-white text-lg md:text-xl leading-relaxed">
                {item.text}
                {item.bold && (
                  <strong className="font-bold text-[#fffde8]">{item.bold}</strong>
                )}
                {item.textAfter && item.textAfter}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
