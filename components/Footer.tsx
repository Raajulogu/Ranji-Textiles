"use client";

import React from "react";
import { STORE_CONFIG } from "@/data/config";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Heart,
  ArrowUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#3E2412] text-[#F5EFE6] pt-16 pb-12 border-t border-[#573820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-white block">
                RANJI TEXTILES
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B77B63] font-semibold">
                Tiruppur • Muslin Babywear Manufacturer
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed max-w-sm">
              Thoughtfully crafted muslin essentials for little ones. Direct wholesale manufacturing of pure organic double gauze baby clothing, sets, swaddles, and custom printed fabrics.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hello%20Ranji%20Textiles,%20I%20am%20interested%20in%20wholesale%20catalogue`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Explore Catalogue
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C7B5]">
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Baby Clothing (Jablas & Frocks)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Baby Sets & Night Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Muslin Swaddles & Nappies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hooded Towels & 2-Layer Wipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Newborn Cap, Mittens & Booties
                </button>
              </li>
            </ul>
          </div>

          {/* Manufacturing & Company */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase">
              Tiruppur Factory Desk
            </h4>
            
            <ul className="space-y-2.5 text-xs text-[#D8C7B5]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B77B63] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B77B63] shrink-0" />
                <a
                  href={`tel:${STORE_CONFIG.phone}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  +91 {STORE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B77B63] shrink-0" />
                <a
                  href={`mailto:${STORE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {STORE_CONFIG.email}
                </a>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-[#A89280]">
              Wholesale inquiries dispatched directly to our Tiruppur production floor.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89280]">
          <div className="flex items-center gap-1">
            <span>© 2026 RANJI TEXTILES. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[11px]">
              Made with <Heart className="w-3 h-3 text-[#B77B63] fill-current" /> in Tiruppur, India
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
