import { copy } from "@/lib/copy";
import { Sparkles } from "lucide-react";

export default function Bonuses() {
  const { bonuses } = copy;

  return (
    <section className="w-full bg-gradient-to-b from-[#0F3D4A] to-[#1E6B7A] py-14 md:py-20 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-400 text-[#0F3D4A] font-black uppercase text-sm px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {bonuses.badge}
            <Sparkles className="w-4 h-4" />
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-center text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-snug max-w-3xl mx-auto">
          {bonuses.headline}
        </h2>

        {/* Bonuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {bonuses.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-white/20"
            >
              {item.image && (
                <div className="mb-5 w-full overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <h3 className="text-[#0F3D4A] text-lg font-bold mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
