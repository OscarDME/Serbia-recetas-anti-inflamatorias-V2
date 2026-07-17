"use client";
import { copy } from "@/lib/copy";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CarouselSection() {
  const { carouselSection } = copy;

  const handleScrollToCta = () => {
    const el = document.getElementById("final-cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-[#1E6B7A] py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1.3}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 3.3 },
          }}
          className="pb-12"
        >
          {carouselSection.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={img}
                  alt={`${carouselSection.imageAlt} ${index + 1}`}
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleScrollToCta}
            className="inline-block bg-[#E8734A] hover:bg-[#D9622F] text-white font-bold py-5 px-10 rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.6)] text-lg md:text-xl border-b-4 border-[#B94E22] transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            🛒 {carouselSection.button}
          </button>
        </div>
      </div>
    </section>
  );
}
