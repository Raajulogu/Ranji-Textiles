"use client";

import React from "react";
import { STORE_CONFIG } from "@/data/config";
import { Feather, Heart, Sparkles, MapPin, Award } from "lucide-react";

export function AboutUs() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E5D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63] bg-white px-3.5 py-1 rounded-full border border-[#B77B63]/20 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> Our Heritage & Vision
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#573820] font-normal tracking-tight">
            Rooted in Tiruppur. Thoughtfully Crafted for Babies.
          </h2>
          <p className="text-sm sm:text-base text-[#7A5A43] leading-relaxed">
            Born in Tamil Nadu’s historic textile capital, <strong className="text-[#573820]">RANJI TEXTILES</strong> is dedicated to crafting pure, gentle, and breathable muslin baby essentials for retailers and conscious parents worldwide.
          </p>
        </div>

        {/* Storytelling Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5D9CB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DCCF] flex items-center justify-center text-[#B77B63]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#573820]">
              The Tiruppur Legacy
            </h3>
            <p className="text-xs sm:text-sm text-[#7A5A43] leading-relaxed">
              Located in Tiruppur, Tamil Nadu — celebrated globally as India’s textile heartland. We leverage centuries of weaving expertise, access to supreme organic cotton fibres, and skilled artisan tailors.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5D9CB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DCCF] flex items-center justify-center text-[#B77B63]">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#573820]">
              Purity of Double Gauze Muslin
            </h3>
            <p className="text-xs sm:text-sm text-[#7A5A43] leading-relaxed">
              Newborn skin is five times thinner than adult skin. We exclusively use pure combed organic cotton with zero synthetic blends, harsh bleaching agents, or rigid chemical finishes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5D9CB] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8DCCF] flex items-center justify-center text-[#B77B63]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#573820]">
              Wholesale With Integrity
            </h3>
            <p className="text-xs sm:text-sm text-[#7A5A43] leading-relaxed">
              We empower boutique baby shops, hospital baby kits, and e-commerce brands with direct factory pricing, low minimum wholesale order hurdles, and custom brand packaging.
            </p>
          </div>

        </div>

        {/* Editorial Quote Box */}
        <div className="bg-[#573820] text-[#F5EFE6] rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-200">
              Our Manufacturing Pledge
            </span>
            <blockquote className="font-serif text-xl sm:text-3xl font-light italic leading-snug text-white">
              “Every stitch, every fold, and every button on our muslin garments is crafted with the gentleness a newborn deserves and the durability a wholesale buyer trusts.”
            </blockquote>
            <p className="text-xs text-[#E8DCCF] uppercase tracking-wider font-semibold pt-2">
              RANJI TEXTILES • Tiruppur, Tamil Nadu
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
