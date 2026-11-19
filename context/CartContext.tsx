"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductSizeOption } from "@/data/products";
import { STORE_CONFIG } from "@/data/config";

export interface CartItem {
  id: string; // unique item id: `${productId}-${sizeId}`
  productId: string;
  productName: string;
  slug: string;
  image: string;
  sizeId: string;
  sizeName: string;
  unitPrice: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: ProductSizeOption, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
  shippingFee: number;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isLoaded: boolean;
  minOrderQuantity: number;
  isMinOrderMet: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "ranji_textiles_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (product: Product, size: ProductSizeOption, quantity: number = 1) => {
    const itemId = `${product.id}-${size.id}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          productName: product.name,
          slug: product.slug,
          image: product.image,
          sizeId: size.id,
          sizeName: size.name,
          unitPrice: size.price,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const minOrderQuantity = STORE_CONFIG.wholesaleSettings.minOrderQuantity;
  const isMinOrderMet = totalQuantity >= minOrderQuantity || totalQuantity === 0;

  // Configurable shipping: Free above threshold, otherwise flat fee
  const shippingFee =
    items.length === 0
      ? 0
      : subtotal >= STORE_CONFIG.wholesaleSettings.freeShippingThreshold
      ? 0
      : STORE_CONFIG.wholesaleSettings.flatShippingFee;

  const finalTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalQuantity,
        subtotal,
        shippingFee,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isLoaded,
        minOrderQuantity,
        isMinOrderMet,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
