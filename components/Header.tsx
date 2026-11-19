"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronRight,
  MapPin,
} from "lucide-react";

interface HeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export function Header({ activeSection = "home", onNavigate }: HeaderProps) {
  const { totalQuantity, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop Catalogue" },
    { id: "why-us", label: "Why Us" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "customization", label: "Custom Prints" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact & Wholesale" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Wholesale Micro-Banner */}
      <div className="bg-[#573820] text-[#F5EFE6] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-medium bg-[#B77B63]/40 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Direct Wholesale
            </span>
            <span className="hidden sm:inline text-white/90">
              Premium 100% Organic Muslin Manufacturer • Tiruppur, Tamil Nadu
            </span>
            <span className="sm:hidden text-white/90">
              Wholesale Muslin Manufacturer • Tiruppur
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hello%20Ranji%20Textiles,%20I%20am%20interested%20in%20wholesale%20muslin%20catalogue`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline font-medium">WhatsApp Us</span>
            </a>
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="font-medium">+91 {STORE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="glass-header border-b border-[#E5D9CB] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex flex-col text-left group focus:outline-none"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-wider font-semibold text-[#573820] group-hover:text-[#B77B63] transition-colors leading-none">
              RANJI TEXTILES
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6B52] font-medium mt-1">
              Tiruppur • Muslin Babywear
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  activeSection === link.id
                    ? "text-[#573820] font-semibold"
                    : "text-[#75553E] hover:text-[#573820]"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B77B63] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-[#573820] border border-[#B77B63]/60 rounded-full hover:bg-[#E8DCCF] transition-all"
            >
              Bulk Inquiry
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Cart"
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#573820] text-[#F5EFE6] hover:bg-[#3E2412] active:scale-95 transition-all shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#E8DCCF]" />
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">
                Cart
              </span>
              {totalQuantity > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold bg-[#B77B63] text-white rounded-full leading-none">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 text-[#573820] hover:bg-[#E8DCCF] rounded-lg transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-[#F5EFE6] animate-fade-in overflow-y-auto">
          {/* Mobile Header bar */}
          <div className="flex items-center justify-between p-4 border-b border-[#E5D9CB] bg-[#F5EFE6]">
            <div>
              <span className="font-serif text-xl font-semibold text-[#573820] block">
                RANJI TEXTILES
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#8C6B52]">
                Wholesale Muslin Essentials
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-[#E8DCCF] text-[#573820]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-5 py-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-left text-base font-medium text-[#573820] hover:bg-[#E8DCCF] active:bg-[#E8DCCF]/80 transition-all"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#B77B63]" />
              </button>
            ))}

            <div className="pt-6 border-t border-[#E5D9CB] mt-6 space-y-4">
              <div className="bg-[#E8DCCF]/60 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#573820] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#B77B63]" /> Manufacturing Hub
                </div>
                <p className="text-xs text-[#6B4B32] leading-relaxed">
                  Tiruppur, Tamil Nadu — The Knitwear & Textile Capital of India.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={`tel:${STORE_CONFIG.phone}`}
                    className="flex items-center gap-2 text-xs font-semibold text-[#573820] hover:text-[#B77B63]"
                  >
                    <Phone className="w-3.5 h-3.5" /> +91 {STORE_CONFIG.phone}
                  </a>
                  <a
                    href={`mailto:${STORE_CONFIG.email}`}
                    className="text-xs text-[#6B4B32] underline hover:text-[#573820]"
                  >
                    {STORE_CONFIG.email}
                  </a>
                </div>
              </div>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hello%20Ranji%20Textiles,%20I%20am%20interested%20in%20wholesale%20orders`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#25D366] text-white font-semibold rounded-xl text-sm shadow-sm active:scale-98 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Wholesale Enquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
