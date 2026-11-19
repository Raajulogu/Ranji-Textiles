"use client";

import React, { useState, useMemo } from "react";
import { Product, PRODUCTS, CATEGORIES, Category } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";

interface ShopCatalogueProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onViewProductDetails: (product: Product) => void;
}

export function ShopCatalogue({
  selectedCategory,
  onSelectCategory,
  onViewProductDetails,
}: ShopCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.startingPrice - b.startingPrice;
      if (sortBy === "price-desc") return b.startingPrice - a.startingPrice;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-14 sm:py-20 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B77B63] bg-white px-3.5 py-1 rounded-full border border-[#B77B63]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" /> Full Product Catalogue
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#573820] font-normal tracking-tight">
            Wholesale Muslin Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5A43] leading-relaxed">
            All sizes, cuts, and prices directly derived from our manufacturing line. Select sizes dynamically to view wholesale pricing tiers.
          </p>
        </div>

        {/* Filter & Search Bar - Mobile first layout */}
        <div className="space-y-4 mb-8">
          
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6B52]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or fabric..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#E5D9CB] text-xs sm:text-sm text-[#573820] placeholder-[#8C6B52] focus:outline-none focus:ring-2 focus:ring-[#B77B63] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8C6B52] hover:text-[#573820]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-[#8C6B52] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-white border border-[#E5D9CB] text-xs font-semibold text-[#573820] focus:outline-none focus:ring-2 focus:ring-[#B77B63]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills - Horizontally scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === "All"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#573820] text-[#F5EFE6] shadow-sm"
                      : "bg-white text-[#573820] border border-[#E5D9CB] hover:bg-[#E8DCCF]/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#E8DCCF] text-[#573820]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count text */}
          <div className="flex items-center justify-between text-xs text-[#8C6B52] px-1">
            <span>
              Showing <strong className="text-[#573820]">{filteredProducts.length}</strong> wholesale products
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </span>

            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  onSelectCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[#B77B63] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

        </div>

        {/* Responsive Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#E5D9CB] p-8 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#573820]">
              No products found
            </h3>
            <p className="text-xs text-[#8C6B52]">
              Try searching for different keywords or select "All" categories.
            </p>
            <button
              onClick={() => {
                onSelectCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-[#573820] text-[#F5EFE6] text-xs font-semibold"
            >
              View Full Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProductDetails}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
