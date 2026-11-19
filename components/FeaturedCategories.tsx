"use client";

import React from "react";
import { Category } from "@/data/products";
import { Sparkles, ArrowRight } from "lucide-react";

interface FeaturedCategoriesProps {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
}

export function FeaturedCategories({
  onSelectCategory,
  selectedCategory,
}: FeaturedCategoriesProps) {
  const categoryCards: {
    name: Category;
    image: string;
    description: string;
    itemCount: string;
    samplePrice: string;
  }[] = [
    {
      name: "Baby Clothing",
      image: "/products/button-jabla.jpg",
      description: "Airy Button Jablas, Knotted Jablas & Summer Frocks",
      itemCount: "4 Products",
      samplePrice: "From ₹35.00",
    },
    {
      name: "Baby Sets",
      image: "/products/button-jabla-set.jpg",
      description: "Coordinated Jabla Sets & Half Sleeve Night Suits",
      itemCount: "2 Products",
      samplePrice: "From ₹99.00",
    },
    {
      name: "Swaddles & Essentials",
      image: "/products/swaddles.jpg",
      description: "Pure Cotton Swaddle Wraps & Traditional Tie Nappies",
      itemCount: "2 Products",
      samplePrice: "From ₹33.00",
    },
    {
      name: "Towels & Wipes",
      image: "/products/hooded-towel.jpg",
      description: "Multi-layer Hooded Bath Towels & 2-Layer Washcloths",
      itemCount: "2 Products",
      samplePrice: "From ₹24.00",
    },
    {
      name: "Accessories",
      image: "/products/cap-mittens-booties.jpg",
      description: "Newborn Knotted Beanie Cap, Scratch Mittens & Booties",
      itemCount: "1 Product",
      samplePrice: "From ₹100.00",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F5EFE6] border-b border-[#E5D9CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63]">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collections
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#573820] font-normal">
              Explore by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7D5B42] mt-2 sm:mt-0 max-w-sm">
            Discover our comprehensive catalogue of pure white combed muslin baby wear designed for wholesale and bulk customization.
          </p>
        </div>

        {/* Categories Grid - Mobile horizontal scroll or responsive 2-3-5 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {categoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`group flex flex-col text-left rounded-2xl p-2.5 sm:p-3 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white shadow-md ring-2 ring-[#B77B63]"
                    : "bg-[#E8DCCF]/50 hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#C7B29B]/20 mb-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-[#573820] px-2 py-0.5 rounded-full shadow-xs">
                    {cat.itemCount}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-semibold text-[#573820] group-hover:text-[#B77B63] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-[#7A5A43] line-clamp-1 mt-0.5 hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5D9CB]/50 text-[11px] font-medium text-[#B77B63]">
                    <span>{cat.samplePrice}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
