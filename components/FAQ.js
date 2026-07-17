"use client";
import { useState } from "react";
import { copy } from "@/lib/copy";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { faq } = copy;
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#fffdf7] py-14 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-10">
          <HelpCircle className="w-8 h-8 text-[#0F3D4A]" />
          <h2 className="text-[#0F3D4A] text-2xl md:text-4xl font-black">
            {faq.headline}
          </h2>
        </div>

        <div className="space-y-3">
          {faq.items.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? "bg-white shadow-lg border border-[#0F3D4A]/10" 
                  : "bg-white shadow-sm border border-gray-100 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors cursor-pointer"
              >
                <span className={`text-sm md:text-base font-medium pr-4 transition-colors ${
                  openIndex === index ? "text-[#0F3D4A] font-semibold" : "text-gray-800"
                }`}>
                  {item.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openIndex === index 
                    ? "bg-[#0F3D4A] text-white rotate-180" 
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="px-5 pb-5 bg-[#f8faf5]">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
