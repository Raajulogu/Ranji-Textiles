"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, Factory, Feather } from "lucide-react";
import { STORE_CONFIG } from "@/data/config";

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export function Hero({ onExploreClick, onContactClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#F0E6D8] to-[#F5EFE6] pt-6 pb-12 sm:pt-10 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-5 sm:space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start bg-[#E8DCCF] border border-[#B77B63]/30 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#B77B63]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#573820]">
                Tiruppur Wholesale Manufacturer
              </span>
            </div>

            {/* Brand Title Subtitle */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#B77B63] uppercase block">
                RANJI TEXTILES
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#573820] font-normal tracking-tight leading-[1.15]">
                Thoughtfully Crafted <span className="italic font-light text-[#B77B63]">Muslin Essentials</span> for Little Ones.
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#6E4E36] leading-relaxed max-w-xl">
              Premium wholesale muslin products, thoughtfully crafted for little ones. Direct from our Tiruppur manufacturing facility to baby boutiques, pediatric retailers, and conscious brands worldwide.
            </p>

            {/* CTAs - Mobile-first stacked on small screens, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#573820] text-[#F5EFE6] font-medium text-sm sm:text-base hover:bg-[#3E2412] active:scale-98 transition-all shadow-md group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/80 border border-[#B77B63]/60 text-[#573820] font-medium text-sm sm:text-base hover:bg-white hover:border-[#B77B63] active:scale-98 transition-all shadow-xs cursor-pointer"
              >
                <span>Contact for Wholesale</span>
              </button>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 sm:pt-6 border-t border-[#E5D9CB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DCCF] flex items-center justify-center shrink-0">
                  <Feather className="w-4 h-4 text-[#B77B63]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#573820]">100% Muslin</h4>
                  <p className="text-[10px] text-[#8C6B52]">Pure Combed Cotton</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E8DCCF] flex items-center justify-center shrink-0">
                  <Factory className="w-4 h-4 text-[#B77B63]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#573820]">Direct Factory</h4>
                  <p className="text-[10px] text-[#8C6B52]">Tiruppur Hub Pricing</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-full bg-[#E8DCCF] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#B77B63]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#573820]">Custom Prints</h4>
                  <p className="text-[10px] text-[#8C6B52]">Bespoke Production</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image Column - Editorial Baby Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative background framing */}
              <div className="absolute -inset-3 bg-[#E8DCCF] rounded-3xl -rotate-1 transform -z-10 shadow-inner" />
              <div className="absolute -inset-1 bg-[#C7B29B]/30 rounded-3xl rotate-2 transform -z-10" />

              {/* Main Image Container */}
              <div className="relative aspect-4/5 sm:aspect-5/6 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/brand/hero-baby.jpg"
                  alt="Newborn baby sleeping peacefully in pure white organic muslin swaddle by Ranji Textiles"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />

                {/* Floating Glassmorphism Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B77B63] block">
                      Featured Essential
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#573820]">
                      Double Gauze Muslin Swaddle
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8C6B52] block">Wholesale from</span>
                    <span className="text-sm font-bold text-[#573820]">₹115.00</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
