"use client";

import React from "react";
import { Sparkles, MessageCircle, ArrowRight, Palette, Sliders, Check } from "lucide-react";
import { STORE_CONFIG } from "@/data/config";

interface CustomizationSectionProps {
  onEnquireClick: () => void;
}

export function CustomizationSection({ onEnquireClick }: CustomizationSectionProps) {
  const customFeatures = [
    {
      title: "Custom Printed Fabrics",
      desc: "Rotary and screen printing using certified non-toxic, baby-safe water-based inks for your signature motifs.",
    },
    {
      title: "Bespoke Sizing & Cuts",
      desc: "Tailored patterns from preemie & newborn sizes up to 36 months, customized to your region's retail fit.",
    },
    {
      title: "Private Labeling & Tags",
      desc: "Organic cotton washcare labels, woven brand necktags, FSC paper hangtags, and custom retail polybags.",
    },
    {
      title: "Flexible Batch Quantities",
      desc: "Low minimum order quantity test runs designed to support budding boutique brands and scaling hospital networks.",
    },
  ];

  return (
    <section id="customization" className="py-16 sm:py-24 bg-[#E8DCCF]/40 border-b border-[#E5D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63] bg-white px-3 py-1 rounded-full border border-[#B77B63]/20 shadow-2xs">
                <Palette className="w-3.5 h-3.5" /> Bespoke OEM & ODM Manufacturing
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#573820] font-normal tracking-tight">
                Your Designs, Our Craftsmanship.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#7A5A43] leading-relaxed">
              We specialize in custom manufacturing of muslin baby products and printed fabrics based entirely on our customers’ designs, color swatches, and technical specifications. Whether you are launching a private baby collection or curating pediatric hospitality essentials, we turn your creative concepts into production-ready reality.
            </p>

            {/* Custom Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {customFeatures.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#E5D9CB] shadow-xs space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#573820]">
                    <Check className="w-4 h-4 text-[#B77B63]" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-[#7A5A43] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="button"
                onClick={onEnquireClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#573820] text-[#F5EFE6] font-medium text-sm hover:bg-[#3E2412] active:scale-98 transition-all shadow-md cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hello%20Ranji%20Textiles,%20I%20am%20interested%20in%20customized%20printed%20muslin%20fabrics%20and%20products`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium text-sm hover:bg-[#20ba59] active:scale-98 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Design Brief</span>
              </a>
            </div>

          </div>

          {/* Right Column: Imagery of Custom Printed Fabric Swatches */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer shadow card */}
              <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#C7B29B]/30">
                <img
                  src="/brand/custom-printing.jpg"
                  alt="Custom printed organic white muslin fabric swatches by Ranji Textiles"
                  className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Floating Overlay Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/60 shadow-lg">
                  <span className="text-[10px] font-bold text-[#B77B63] uppercase tracking-wider block">
                    Fabric Service
                  </span>
                  <span className="font-serif text-xs font-semibold text-[#573820]">
                    Baby-Safe Organic Printing
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
