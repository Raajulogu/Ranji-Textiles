"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import { Eye, Plus, Check, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, currentSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-[#E5D9CB] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-[#EFE8DD] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.catalogue === "White Muslin" ? (
            <span className="inline-flex items-center gap-1 bg-[#573820] text-[#F5EFE6] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Muslin White
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-[#B77B63] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Fancy Print
            </span>
          )}
          {product.moq && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
              MOQ: 50 pcs
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-xs text-[#573820] text-[10px] font-medium px-2 py-0.5 rounded-full shadow-2xs">
            {product.category}
          </span>
        </div>

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#573820] text-xs font-medium shadow-md hover:bg-[#F5EFE6] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View Details
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col p-3.5 sm:p-5 justify-between">
        <div className="space-y-2">
          
          {/* Title & Starting Price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-[#573820] group-hover:text-[#B77B63] transition-colors leading-snug">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase tracking-wider text-[#8C6B52] block">
                Wholesale
              </span>
              <span className="text-sm sm:text-base font-bold text-[#573820]">
                {STORE_CONFIG.currency.symbol}
                {currentSize.price.toFixed(currentSize.price % 1 === 0 ? 0 : 2)}
              </span>
            </div>
          </div>

          {/* Size Pills */}
          <div className="pt-1">
            <div className="text-[10px] uppercase tracking-wider text-[#8C6B52] mb-1 font-medium">
              Available Sizes ({product.sizes.length}):
            </div>
            <div
              className="flex flex-wrap gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {product.sizes.map((sz, idx) => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedSizeIndex === idx
                      ? "bg-[#573820] text-[#F5EFE6]"
                      : "bg-[#E8DCCF]/60 text-[#573820] hover:bg-[#E8DCCF]"
                  }`}
                >
                  {sz.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-[#E5D9CB]/60 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-1 py-2 px-3 text-xs font-semibold text-[#573820] border border-[#B77B63]/40 rounded-xl hover:bg-[#E8DCCF]/40 active:scale-98 transition-all text-center"
          >
            View Details
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex items-center justify-center p-2 rounded-xl transition-all active:scale-95 cursor-pointer ${
              isAddedRecently
                ? "bg-emerald-600 text-white"
                : "bg-[#573820] text-[#F5EFE6] hover:bg-[#3E2412]"
            }`}
            title="Quick Add to Cart"
          >
            {isAddedRecently ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
