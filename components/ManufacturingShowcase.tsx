"use client";

import React from "react";
import { Factory, ShieldCheck, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { STORE_CONFIG } from "@/data/config";

export function ManufacturingShowcase() {
  const highlights = [
    "Located in Tiruppur — the epicenter of Indian textile & knitwear craftsmanship",
    "Specialized exclusively in pure organic double-gauze muslin cotton fabrics",
    "High-speed precision cutting & flat-lock anti-chafing infant stitching lines",
    "Pre-washed fabric processing to eliminate sizing residue and guarantee zero shrinkage",
    "Ethical clean manufacturing with skilled artisans and 100% fair wage compliance",
  ];

  return (
    <section id="manufacturing" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E5D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Factory Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative warm frame */}
              <div className="absolute -inset-3 bg-[#E8DCCF] rounded-3xl rotate-1 transform -z-10 shadow-sm" />
              
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#C7B29B]/20">
                <img
                  src="/brand/actual_factory.png"
                  alt="Ranji Textiles modern garment manufacturing workshop in Tiruppur, India"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Glassmorphism Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/60 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B77B63] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C6B52] block">
                        Manufacturing Hub
                      </span>
                      <span className="text-xs font-semibold text-[#573820]">
                        Tiruppur, Tamil Nadu, India
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#573820] text-[#F5EFE6] px-2.5 py-1 rounded-full">
                    Wholesale Facility
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Information & Craftsmanship */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63]">
                <Factory className="w-4 h-4" /> Ethical Textile Production
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#573820] font-normal tracking-tight">
                Crafted at the Heart of India’s Textile Hub.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#7A5A43] leading-relaxed">
              Ranji Textiles operates an integrated manufacturing workshop in <strong className="text-[#573820]">Tiruppur, Tamil Nadu</strong>, renowned worldwide for premium cotton knitwear and woven textiles. We specialize specifically in wholesale muslin baby products — combining time-tested open-weave fabrics with modern garment engineering.
            </p>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E8DCCF] flex items-center justify-center shrink-0 mt-0.5 text-[#B77B63]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#573820] font-medium leading-snug">
                    {h}
                  </p>
                </div>
              ))}
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5D9CB]">
              <div className="bg-white p-3 rounded-2xl border border-[#E5D9CB] text-center">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#573820] block">100%</span>
                <span className="text-[10px] text-[#8C6B52] uppercase tracking-wider">Organic Muslin</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E5D9CB] text-center">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#573820] block">130+</span>
                <span className="text-[10px] text-[#8C6B52] uppercase tracking-wider">Standard GSM</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E5D9CB] text-center">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#573820] block">Direct</span>
                <span className="text-[10px] text-[#8C6B52] uppercase tracking-wider">Wholesale Rates</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
