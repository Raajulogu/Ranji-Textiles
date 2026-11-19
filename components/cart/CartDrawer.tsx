"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { STORE_CONFIG } from "@/data/config";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Truck,
} from "lucide-react";

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalQuantity,
    subtotal,
    shippingFee,
    finalTotal,
    minOrderQuantity,
    isMinOrderMet,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = STORE_CONFIG.wholesaleSettings.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F5EFE6] shadow-2xl flex flex-col border-l border-[#E5D9CB] animate-slide-up sm:animate-none">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-[#E5D9CB] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B77B63]" />
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#573820]">
                Wholesale Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8DCCF] text-[#573820]">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#8C6B52] hover:text-red-700 transition-colors mr-2 cursor-pointer"
                  title="Clear Cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-1.5 rounded-full hover:bg-[#E8DCCF] text-[#573820] transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-[#E8DCCF]/70 px-4 py-2.5 border-b border-[#E5D9CB] text-xs">
              <div className="flex items-center justify-between text-[#573820] mb-1">
                <span className="flex items-center gap-1 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#B77B63]" />
                  {remainingForFreeShipping > 0
                    ? `Add ${STORE_CONFIG.currency.symbol}${remainingForFreeShipping.toFixed(2)} more for Free Shipping`
                    : "🎉 You unlocked Free Delivery!"}
                </span>
                <span className="font-bold text-[11px]">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full bg-white/70 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#B77B63] h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8DCCF] flex items-center justify-center text-[#B77B63]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#573820]">
                    Your Cart is Empty
                  </h3>
                  <p className="text-xs text-[#8C6B52] max-w-xs">
                    Explore our wholesale muslin baby collection to add products with your required sizes.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#573820] text-[#F5EFE6] text-xs font-semibold hover:bg-[#3E2412] active:scale-95 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 border border-[#E5D9CB] shadow-2xs flex gap-3 items-center"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E5D9CB]"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-sm font-semibold text-[#573820] truncate">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#8C6B52] hover:text-red-700 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="inline-block bg-[#F5EFE6] px-2 py-0.5 rounded text-[10px] font-semibold text-[#B77B63] my-1">
                      Size: {item.sizeName}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#573820]">
                        {STORE_CONFIG.currency.symbol}
                        {(item.unitPrice * item.quantity).toFixed(2)}
                        <span className="text-[10px] font-normal text-[#8C6B52] ml-1">
                          (@ {STORE_CONFIG.currency.symbol}{item.unitPrice.toFixed(2)})
                        </span>
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#F5EFE6] rounded-lg border border-[#E5D9CB] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E8DCCF] text-[#573820] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#573820]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#E8DCCF] text-[#573820] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E5D9CB] space-y-3">
              
              {/* Wholesale Minimum Order Notice */}
              {!isMinOrderMet && (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    Wholesale suggested minimum is <span className="font-bold">{minOrderQuantity} units</span> (current: {totalQuantity} units). You can still proceed to sample checkout.
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8C6B52]">
                  <span>Subtotal ({totalQuantity} pieces):</span>
                  <span className="font-semibold text-[#573820]">
                    {STORE_CONFIG.currency.symbol}{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[#8C6B52]">
                  <span>Shipping Charges:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `${STORE_CONFIG.currency.symbol}${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-[#573820] pt-2 border-t border-[#E5D9CB]">
                  <span>Final Total:</span>
                  <span className="font-serif text-base text-[#573820]">
                    {STORE_CONFIG.currency.symbol}{finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCart();
                    onCheckout();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#573820] text-[#F5EFE6] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#3E2412] active:scale-98 transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#8C6B52] hover:text-[#573820] text-center transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
