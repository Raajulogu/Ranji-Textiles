"use client";

import React, { useState } from "react";
import { STORE_CONFIG } from "@/data/config";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    expectedQty: "50-100 pieces",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitted(true);
    setTimeout(() => {
      // Create WhatsApp message link with form details
      const text = `Hello Ranji Textiles, Wholesale Enquiry from Website:%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email || "N/A"}%0A*Expected Qty:* ${formData.expectedQty}%0A*Requirements:* ${formData.message || "General wholesale inquiry"}`;
      window.open(
        `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${text}`,
        "_blank"
      );
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#E8DCCF]/40 border-b border-[#E5D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B77B63] block">
                Wholesale Desk
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#573820] font-normal tracking-tight">
                Let’s Talk Wholesale.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#7A5A43] leading-relaxed">
              Have questions about sample kits, export orders, custom fabric printing, or bulk volume tiers? Contact our production hub directly.
            </p>

            {/* Contact details cards */}
            <div className="space-y-3 pt-2">
              
              {/* Phone */}
              <a
                href={`tel:${STORE_CONFIG.phone}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D9CB] hover:border-[#B77B63] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] flex items-center justify-center text-[#B77B63] group-hover:bg-[#573820] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C6B52] block">
                    Call Factory Direct
                  </span>
                  <span className="text-sm font-bold text-[#573820]">
                    +91 {STORE_CONFIG.phone}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${STORE_CONFIG.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D9CB] hover:border-[#B77B63] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] flex items-center justify-center text-[#B77B63] group-hover:bg-[#573820] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C6B52] block">
                    Email Wholesale Desk
                  </span>
                  <span className="text-sm font-semibold text-[#573820]">
                    {STORE_CONFIG.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5D9CB]">
                <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] flex items-center justify-center text-[#B77B63]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C6B52] block">
                    Manufacturing Facility
                  </span>
                  <span className="text-sm font-semibold text-[#573820]">
                    {STORE_CONFIG.location}
                  </span>
                  <p className="text-[11px] text-[#8C6B52]">
                    Tamil Nadu, India (Knitwear Capital)
                  </p>
                </div>
              </div>

            </div>

            {/* Quick WhatsApp Button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hello%20Ranji%20Textiles,%20I%20would%20like%20to%20enquire%20about%20wholesale%20muslin%20products`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-[#20ba59] active:scale-98 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Instant WhatsApp Enquiry (+91 {STORE_CONFIG.phone})</span>
              </a>
            </div>

          </div>

          {/* Right Column: Wholesale Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5D9CB] shadow-sm">
            
            <div className="space-y-1 mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#573820]">
                Send Wholesale Enquiry
              </h3>
              <p className="text-xs text-[#8C6B52]">
                Fill out your details below and our team will get in touch with product swatches and customized quotations.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-[#573820]">
                    Thank You for Your Enquiry!
                  </h4>
                  <p className="text-xs text-[#8C6B52] max-w-sm">
                    Opening WhatsApp to connect you directly with our production manager in Tiruppur.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#B77B63] underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9626888375"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@business.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    />
                  </div>

                  {/* Expected Order Qty */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#573820]">
                      Expected Wholesale Quantity
                    </label>
                    <select
                      value={formData.expectedQty}
                      onChange={(e) => setFormData({ ...formData, expectedQty: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                    >
                      <option>Sample Trial (10-25 pcs)</option>
                      <option>50-100 pieces</option>
                      <option>100-500 pieces</option>
                      <option>500-2,000 pieces</option>
                      <option>Bulk Container / Export (2,000+ pcs)</option>
                    </select>
                  </div>
                </div>

                {/* Enquiry Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#573820]">
                    Enquiry Message / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us which products, sizes, custom prints, or delivery timelines you need..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D9CB] text-sm focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#573820] text-[#F5EFE6] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#3E2412] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Enquiry</span>
                </button>

                <p className="text-[11px] text-center text-[#8C6B52]">
                  Direct inquiries dispatched via WhatsApp to Ranji Textiles Tiruppur desk.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
