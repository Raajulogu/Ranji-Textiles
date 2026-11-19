"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { ShopCatalogue } from "@/components/product/ShopCatalogue";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ManufacturingShowcase } from "@/components/ManufacturingShowcase";
import { CustomizationSection } from "@/components/CustomizationSection";
import { AboutUs } from "@/components/AboutUs";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ProductDetailsModal } from "@/components/product/ProductDetailsModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { Product, Category } from "@/data/products";

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCategoryFromFeatured = (cat: Category) => {
    setSelectedCategory(cat);
    scrollToSection("shop");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F5EFE6]">
      {/* Global Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={(id) => scrollToSection(id)}
      />

      <main className="flex-1">
        {/* Section A: Hero */}
        <section id="home">
          <Hero
            onExploreClick={() => scrollToSection("shop")}
            onContactClick={() => scrollToSection("contact")}
          />
        </section>

        {/* Section A: Featured Categories */}
        <FeaturedCategories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategoryFromFeatured}
        />

        {/* Section B: Shop / Product Listing Catalogue */}
        <ShopCatalogue
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onViewProductDetails={(product) => setActiveProductModal(product)}
        />

        {/* Section A: Why Choose Ranji Textiles */}
        <WhyChooseUs />

        {/* Section A: Manufacturing Facility Showcase */}
        <ManufacturingShowcase />

        {/* Section A: Customization Section ("Your Designs, Our Craftsmanship") */}
        <CustomizationSection
          onEnquireClick={() => scrollToSection("contact")}
        />

        {/* Section G: About Us Page Section */}
        <AboutUs />

        {/* Section H: Contact / Wholesale Enquiry Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={(id) => scrollToSection(id)} />

      {/* Section C: Product Details Modal with Dynamic Size Pricing */}
      <ProductDetailsModal
        product={activeProductModal}
        isOpen={Boolean(activeProductModal)}
        onClose={() => setActiveProductModal(null)}
        onSelectProduct={(product) => setActiveProductModal(product)}
      />

      {/* Section D: Functional Shopping Cart Drawer */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      {/* Section E & F: Checkout & Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
