"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductSizeOption, PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Sparkles,
  ShieldCheck,
  Feather,
  RefreshCw,
  Package,
  Layers,
  ArrowRight,
} from "lucide-react";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onSelectProduct,
}: ProductDetailsModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption | null>(null);
  const [quantity, setQuantity] = useState<number>(10); // Default to wholesale quantity
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize selected size whenever product changes
  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
      setQuantity(10);
      setIsSuccess(false);
    }
  }, [product]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product || !selectedSize) return null;

  const currentUnitPrice = selectedSize.price;
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#F5EFE6] rounded-3xl shadow-2xl border border-[#E5D9CB] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#573820] shadow-md transition-all active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Product Image */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#E8DCCF] border-2 border-white shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#573820] text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs">
                  {product.category}
                </div>
              </div>

              {/* Quality Guarantee Mini Bar */}
              <div className="bg-[#E8DCCF]/60 rounded-xl p-3 flex items-center justify-between text-xs text-[#573820]">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#B77B63]" />
                  <span>100% Combed Muslin</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Feather className="w-4 h-4 text-[#B77B63]" />
                  <span>Ultra Breathable</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium hidden sm:flex">
                  <RefreshCw className="w-4 h-4 text-[#B77B63]" />
                  <span>Gets Softer With Wash</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Size Selection */}
            <div className="md:col-span-6 flex flex-col space-y-4 sm:space-y-5">
              
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B77B63] block">
                  Wholesale Muslin Collection • Tiruppur
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#573820] mt-1">
                  {product.name}
                </h2>
              </div>

              {/* Dynamic Price Display */}
              <div className="bg-white/80 rounded-2xl p-4 border border-[#E5D9CB] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8C6B52] block uppercase tracking-wider">
                    Unit Wholesale Price
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-3xl font-bold text-[#573820]">
                      {STORE_CONFIG.currency.symbol}
                      {currentUnitPrice.toFixed(currentUnitPrice % 1 === 0 ? 0 : 2)}
                    </span>
                    <span className="text-xs text-[#8C6B52]">/ piece</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#B77B63] bg-[#E8DCCF] px-2 py-0.5 rounded-full">
                    Size: {selectedSize.name}
                  </span>
                  <span className="text-xs text-emerald-700 font-medium block mt-1">
                    ✓ Available for bulk order
                  </span>
                </div>
              </div>

              {/* Size Selector - Dynamic Price Updates! */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#573820] uppercase tracking-wider">
                    Select Size:
                  </label>
                  <span className="text-xs text-[#8C6B52]">
                    Price updates per size
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize.id === sz.id;
                    return (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#573820] text-[#F5EFE6] border-[#573820] shadow-sm"
                            : "bg-white text-[#573820] border-[#E5D9CB] hover:bg-[#E8DCCF]/50"
                        }`}
                      >
                        <span className="text-xs font-semibold">{sz.name}</span>
                        <span
                          className={`text-xs mt-1 font-bold ${
                            isSelected ? "text-amber-200" : "text-[#B77B63]"
                          }`}
                        >
                          {STORE_CONFIG.currency.symbol}
                          {sz.price.toFixed(sz.price % 1 === 0 ? 0 : 2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector with Bulk Increments */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#573820] uppercase tracking-wider">
                    Wholesale Order Quantity:
                  </label>
                  <span className="text-[11px] text-[#8C6B52]">
                    Min. suggested: {STORE_CONFIG.wholesaleSettings.minOrderQuantity} pcs
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white border border-[#E5D9CB] rounded-xl overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-[#573820] hover:bg-[#E8DCCF]/50 active:scale-95 cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center font-bold text-sm text-[#573820] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-[#573820] hover:bg-[#E8DCCF]/50 active:scale-95 cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Bulk Step Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[10, 25, 50, 100].map((step) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setQuantity(step)}
                        className={`text-xs font-semibold px-2.5 py-2 rounded-lg border transition-all cursor-pointer ${
                          quantity === step
                            ? "bg-[#B77B63] text-white border-[#B77B63]"
                            : "bg-white text-[#573820] border-[#E5D9CB] hover:bg-[#E8DCCF]"
                        }`}
                      >
                        {step} pcs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtotal Calculation & Add to Cart Button */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-[#8C6B52] mb-2 px-1">
                  <span>Selected: {quantity} × {STORE_CONFIG.currency.symbol}{currentUnitPrice.toFixed(2)}</span>
                  <span className="font-semibold text-[#573820]">Total: {STORE_CONFIG.currency.symbol}{totalPrice.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer ${
                    isSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-[#573820] text-[#F5EFE6] hover:bg-[#3E2412]"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#E8DCCF]" /> Add {quantity} Pieces to Cart (
                      {STORE_CONFIG.currency.symbol}
                      {totalPrice.toFixed(2)})
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

          {/* Description & Technical Specifications */}
          <div className="border-t border-[#E5D9CB] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold text-[#573820]">
                Product Description
              </h3>
              <p className="text-sm text-[#6E4E36] leading-relaxed">
                {product.description}
              </p>
              
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52]">
                  Key Highlights:
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#573820]">
                      <Check className="w-3.5 h-3.5 text-[#B77B63] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 bg-white/60 p-4 rounded-2xl border border-[#E5D9CB]">
              <h3 className="font-serif text-lg font-semibold text-[#573820]">
                Fabric & Wholesale Specs
              </h3>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#E5D9CB]/60">
                  <span className="text-[#8C6B52]">Fabric:</span>
                  <span className="font-medium text-[#573820]">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5D9CB]/60">
                  <span className="text-[#8C6B52]">Care Instructions:</span>
                  <span className="font-medium text-[#573820] text-right">{product.careInstructions}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E5D9CB]/60">
                  <span className="text-[#8C6B52]">Origin:</span>
                  <span className="font-medium text-[#573820]">Tiruppur, Tamil Nadu (India)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#8C6B52]">Custom Branding:</span>
                  <span className="font-medium text-emerald-800">Available on request (Custom tags/prints)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-[#E5D9CB] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#573820]">
                  You May Also Like
                </h3>
                <span className="text-xs text-[#B77B63]">Explore related items</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#E5D9CB] hover:bg-[#E8DCCF]/50 cursor-pointer transition-colors"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-serif text-xs font-semibold text-[#573820] truncate">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] font-bold text-[#B77B63] mt-0.5">
                        From {STORE_CONFIG.currency.symbol}{rel.startingPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Mobile Sticky Bottom Add To Cart Bar */}
        <div className="sm:hidden sticky bottom-0 inset-x-0 bg-white border-t border-[#E5D9CB] p-3 flex items-center justify-between gap-3 shadow-lg z-20">
          <div>
            <span className="text-[10px] text-[#8C6B52] block">
              {quantity} pcs • {selectedSize.name}
            </span>
            <span className="font-serif text-base font-bold text-[#573820]">
              {STORE_CONFIG.currency.symbol}
              {totalPrice.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-[#573820] text-[#F5EFE6] font-semibold text-xs flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#E8DCCF]" /> Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
