"use client";

import React from "react";
import {
  Package,
  Sliders,
  Printer,
  Sparkles,
  TrendingDown,
  ShieldCheck,
} from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Package,
      title: "Wholesale Muslin Products",
      description:
        "Specialized in bulk production of baby clothing, swaddles, jablas, and sets crafted exclusively from double-gauze combed organic muslin cotton.",
    },
    {
      icon: Sliders,
      title: "Customized Products & Fabrics",
      description:
        "Tailored GSM, customized sizes, private label necktags, and bespoke packaging according to your brand's unique retail specifications.",
    },
    {
      icon: Printer,
      title: "Customized Printed Fabrics",
      description:
        "Eco-friendly rotary screen and digital baby-safe printing using GOTS-compliant organic dyes for custom motifs, florals, and minimal patterns.",
    },
    {
      icon: Sparkles,
      title: "Premium Quality Guarantee",
      description:
        "Hypoallergenic, ultra-breathable weaves with flat-lock anti-chafing seams and pre-washed softness that gets softer after every home wash.",
    },
    {
      icon: TrendingDown,
      title: "Competitive Pricing",
      description:
        "True direct-from-manufacturer wholesale pricing straight out of Tiruppur, eliminating middleman distributor markups.",
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#E8DCCF]/50 border-b border-[#E5D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63] bg-white px-3 py-1 rounded-full border border-[#B77B63]/20 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Tiruppur Manufacturing Advantage
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#573820] font-normal tracking-tight">
            Why Choose Ranji Textiles
          </h2>
          <p className="text-sm sm:text-base text-[#7A5A43] leading-relaxed">
            We partner with boutique baby stores, maternity hospitals, and independent babywear labels to manufacture premium muslin essentials with unmatched care.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5D9CB] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] flex items-center justify-center text-[#B77B63] group-hover:bg-[#573820] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#573820]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A5A43] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5D9CB]/50 flex items-center gap-1.5 text-[11px] font-semibold text-[#B77B63]">
                  <span>Wholesale Advantage 0{idx + 1}</span>
                </div>
              </div>
            );
          })}

          {/* Quick Wholesale Card */}
          <div className="bg-[#573820] text-[#F5EFE6] rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 bg-white/10 px-2.5 py-1 rounded-full inline-block">
                Direct Inquiry
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Looking for Custom Bulk Orders?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCCF]/90 leading-relaxed">
                Connect directly with our production manager for custom sample development, bulk fabric swatches, or large retail distribution orders.
              </p>
            </div>

            <a
              href="https://wa.me/919626888375?text=Hello%20Ranji%20Textiles,%20I%20would%20like%20to%20discuss%20a%20wholesale%20bulk%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center py-3 px-5 rounded-full bg-[#B77B63] text-white text-xs font-semibold hover:bg-[#a26852] transition-colors"
            >
              WhatsApp Production Manager
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
