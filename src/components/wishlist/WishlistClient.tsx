"use client";

import { useState } from "react";
import ProductCard, { type Product } from "../shop/ProductCard";
import { CATALOG } from "@/lib/products";

const INITIAL: Product[] = CATALOG.slice(0, 4);

export default function WishlistClient() {
  const [items, setItems] = useState<Product[]>(INITIAL);
  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  return (
    <div className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin pt-space-md pb-space-xl">
      <nav aria-label="Breadcrumb" className="font-body-sm text-[13px] text-text-muted flex items-center gap-1.5"><a href="/" className="hover:text-primary transition-colors">Home</a><span className="text-outline-variant">&rsaquo;</span><span className="text-text-heading">Wishlist</span></nav>
      <h1 className="font-display-hero text-[36px] leading-tight text-text-heading mt-space-sm">Your Wishlist ({items.length})</h1>
      {items.length === 0 ? (
        <div className="mt-space-xl text-center py-space-xl bg-surface-card border border-border-subtle rounded-lg"><span className="material-symbols-outlined text-[40px] text-primary-container">favorite</span><p className="font-headline-sm text-headline-sm text-text-heading mt-2">Your wishlist is empty</p><p className="font-body-md text-body-md text-text-muted mt-1">Tap the heart on any product to save it here.</p><a href="/shop" className="inline-block mt-space-md px-space-lg py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors">Continue Shopping</a></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-lg">{items.map((p) => (<ProductCard key={p.id} product={p} saved={true} onToggle={remove} />))}</div>
      )}
    </div>
  );
}
