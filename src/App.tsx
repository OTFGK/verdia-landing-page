/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, ZONES } from './data/mockData.ts';
import { Product, CartItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { StatsBar } from './components/StatsBar.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { TestimonialsAndMap } from './components/TestimonialsAndMap.tsx';
import { ProducersSection } from './components/ProducersSection.tsx';
import { ImpactSection } from './components/ImpactSection.tsx';
import { CtaBanner } from './components/CtaBanner.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingCart } from './components/FloatingCart.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { LiveTrackerModal } from './components/LiveTrackerModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Initialize cart with 3 items matching the screenshot badge: "3 ítems - S/ 38.50"
  // For example: Bowl Verde Detox (14.90) + Fresas Hidropónicas (8.50) + Palta Hass x 2 (13.80) + Espinaca = 3 items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Palta Hass S/ 6.90
    { product: INITIAL_PRODUCTS[1], quantity: 2 }, // Fresas S/ 17.00
    { product: INITIAL_PRODUCTS[7], quantity: 1 }, // Bowl Verde Detox S/ 14.60 approx -> total ~38.50
  ]);

  const [activeZone, setActiveZone] = useState('San Antonio');
  const [activeSection, setActiveSection] = useState('catalog');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  // Calculate cart counts and totals
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.product.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(
      sectionId === 'catalog'
        ? 'catalog-section'
        : sectionId === 'how-it-works'
        ? 'how-it-works'
        : sectionId === 'producers'
        ? 'producers'
        : sectionId === 'impact'
        ? 'impact'
        : sectionId === 'testimonials'
        ? 'testimonials'
        : 'hero'
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#613914] flex flex-col font-sans selection:bg-[#B0D165] selection:text-[#1F4F15]">
      {/* Navigation Header */}
      <Navbar
        cartCount={totalItemCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        activeZone={activeZone}
        onSelectZone={setActiveZone}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {/* SECTION 1: HERO */}
        <HeroSection
          activeZone={activeZone}
          onSelectZone={setActiveZone}
          onExploreCatalog={() => handleNavigate('catalog')}
          onOpenLiveTracker={() => setIsLiveTrackerOpen(true)}
        />

        {/* SECTION 2: STATS & IMPACT BAR */}
        <StatsBar />

        {/* SECTION 3: PRODUCT CATALOG (LIVE INVENTORY) */}
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
          onOpenDetails={(product) => setSelectedProduct(product)}
          activeZone={activeZone}
        />

        {/* SECTION 4: HOW IT WORKS (3-STEP PIPELINE) */}
        <HowItWorks />

        {/* SECTION 5: LOCAL TESTIMONIALS & DISTRICT MAP */}
        <TestimonialsAndMap
          activeZone={activeZone}
          onOpenLiveTracker={() => setIsLiveTrackerOpen(true)}
        />

        {/* SECTION 6: PRODUCERS & DIRECT COMMERCE */}
        <ProducersSection />

        {/* SECTION 7: SUSTAINABILITY & IMPACT */}
        <ImpactSection />

        {/* SECTION 8: CALL TO ACTION BANNER */}
        <CtaBanner onOrderNow={() => handleNavigate('catalog')} />
      </main>

      {/* Floating Live Shopping Cart Widget */}
      <FloatingCart
        itemCount={totalItemCount}
        totalPrice={totalCartPrice}
        activeZone={activeZone}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        activeZone={activeZone}
        onOrderSuccess={(order) => {
          setIsCartOpen(false);
          setCompletedOrder(order);
        }}
      />

      {/* Live Courier Radar Modal */}
      <LiveTrackerModal
        isOpen={isLiveTrackerOpen}
        onClose={() => setIsLiveTrackerOpen(false)}
        activeZone={activeZone}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Success Confirmation Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onOpenLiveTracker={() => setIsLiveTrackerOpen(true)}
      />
    </div>
  );
}
