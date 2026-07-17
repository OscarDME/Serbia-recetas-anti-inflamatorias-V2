import { copy } from "@/lib/copy";

const featureEmojis = ["🥣", "🥗", "🍎", "🍽️", "🍰"];
const featureColors = [
  "from-[#0F3D4A] to-[#1E6B7A]",
  "from-[#1E6B7A] to-[#0F3D4A]",
  "from-[#0F3D4A] to-[#1E6B7A]",
  "from-[#1E6B7A] to-[#0F3D4A]",
  "from-[#0F3D4A] to-[#1E6B7A]",
];

export default function Features() {
  const { features } = copy;

  return (
    <section className="w-full py-14 md:py-20 px-4 bg-[#fffdf7]">
      <div className="max-w-4xl mx-auto">
        {/* Headline */}
        <div className="bg-[#fffde8] rounded-2xl px-6 py-5 mb-12 text-center shadow-md border border-[#e8e2c8]">
          <h2 className="text-[#0F3D4A] text-2xl md:text-4xl font-black italic">
            {features.headline}
          </h2>
        </div>

        {/* Feature Items */}
        <div className="space-y-8">
          {features.items.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${featureColors[index]} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex flex-col md:flex items-stretch group`}
            >
              {/* Emoji Icon */}
              <div className="flex items-center justify-center py-6 md:py-0 md:px-8 md:min-w-[120px]">
                <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-500">{featureEmojis[index]}</span>
              </div>

              {/* Text Content */}
              <div className="flex-1 p-6 md:p-8">
                <h3 className="text-[#AEE6D8] text-2xl md:text-3xl font-black mb-2">
                  {item.title}
                </h3>
                <div className="w-20 h-1 bg-[#AEE6D8]/50 rounded mb-4"></div>
                <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
