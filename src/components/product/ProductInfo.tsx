"use client";

import { useState } from "react";
import { type Product } from "@/components/shop/ProductCard";

export default function ProductInfo({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const pills = product.pills ?? product.active.split(" + ");
  const check = () => { const valid = /^[1-9][0-9]{5}$/.test(pin); setOk(valid); setResult(valid ? ("Express delivery available for " + pin + ": arrives in 2-3 business days.") : "Please enter a valid 6-digit Indian PIN code."); };
  return (
    <div className="w-full lg:sticky lg:top-24 flex flex-col gap-space-md">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-label-caps text-[11px] text-text-muted tracking-wider uppercase">
        <a href="/" className="hover:text-primary transition-colors">Home</a><span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <a href="/shop" className="hover:text-primary transition-colors">Shop</a><span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-primary truncate">{product.name}</span>
      </nav>
      <div>
        <div className="flex items-center gap-2 mb-1.5"><span className="w-3 h-0.5 bg-primary-container"></span><span className="font-label-caps text-label-caps tracking-widest uppercase text-primary-container font-semibold">{product.tag}</span></div>
        <h1 className="font-headline-lg text-headline-lg text-text-heading tracking-tight leading-tight">{product.name}</h1>
        {product.tagline ? (<p className="font-body-md text-body-md text-text-muted italic mt-1">{product.tagline}</p>) : null}
      </div>
      <div className="flex items-center gap-space-sm">
        <span className="flex items-center text-primary-container">{[1,2,3,4,5].map((n) => (<span key={n} className="material-symbols-outlined msym-fill text-[18px]">star</span>))}</span>
        <a href="#reviews-section" className="font-body-sm text-body-sm text-text-heading hover:text-primary underline underline-offset-4 decoration-primary-container font-medium">{product.ratingText} <span className="text-text-muted font-normal">{product.reviews} verified reviews</span></a>
      </div>
      <div className="flex flex-wrap gap-space-xs pt-1">{pills.map((p) => (<span key={p} className="font-mono-clinical text-mono-clinical px-3 py-1 rounded-full bg-surface-card text-secondary font-medium shadow-sm">{p}</span>))}</div>
      <div className="p-space-md rounded-xl bg-surface-card shadow-sm space-y-space-xs">
        <div className="flex items-baseline gap-3"><span className="font-label-caps text-[13px] text-text-muted line-through">MRP &#8377;{product.mrpText}</span><span className="font-headline-md text-headline-md text-text-heading font-medium">&#8377;{product.priceText}</span><span className="px-2 py-0.5 text-[11px] font-label-caps font-bold tracking-wider rounded bg-primary-container text-on-primary-container">{product.off}</span></div>
        <p className="font-mono-clinical text-[11px] text-outline">Inclusive of all taxes. Free express shipping applied automatically.</p>
      </div>
      <div className="space-y-space-sm pt-space-xs">
        <div className="flex flex-wrap items-center gap-space-md">
          <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-wider">Quantity</span>
          <div className="flex items-center bg-surface-card rounded-lg shadow-sm px-1">
            <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} type="button" className="w-9 h-9 flex items-center justify-center text-text-heading hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
            <span className="font-mono-clinical text-body-md font-semibold px-3 text-text-heading">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} type="button" className="w-9 h-9 flex items-center justify-center text-text-heading hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
          </div>
          <span className="font-mono-clinical text-[11px] text-primary flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_fire_department</span>Selling fast this week</span>
        </div>
        <div className="space-y-space-xs pt-1">
          <button type="button" className="w-full py-3.5 px-space-md rounded-lg bg-gradient-gold-end text-on-primary font-button-text text-button-text tracking-widest uppercase shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 group"><span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">shopping_bag</span>Add to Cart</button>
          <button type="button" className="w-full py-3.5 px-space-md rounded-lg bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end text-on-primary font-button-text text-button-text tracking-widest uppercase shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[18px]">bolt</span>Buy Now &mdash; Instant Checkout</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs pt-space-xs text-center">
        <div className="p-2 rounded bg-surface-card/60 flex flex-col items-center justify-center gap-1"><span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span><span className="font-label-caps text-[10px] text-text-heading uppercase">Free Delivery &#8377;499+</span></div>
        <div className="p-2 rounded bg-surface-card/60 flex flex-col items-center justify-center gap-1"><span className="material-symbols-outlined text-primary text-[20px]">payments</span><span className="font-label-caps text-[10px] text-text-heading uppercase">COD Available</span></div>
        <div className="p-2 rounded bg-surface-card/60 flex flex-col items-center justify-center gap-1"><span className="material-symbols-outlined text-primary text-[20px]">sync</span><span className="font-label-caps text-[10px] text-text-heading uppercase">15-Day Returns</span></div>
        <div className="p-2 rounded bg-surface-card/60 flex flex-col items-center justify-center gap-1"><span className="material-symbols-outlined text-primary text-[20px]">verified_user</span><span className="font-label-caps text-[10px] text-text-heading uppercase">100% Authentic</span></div>
      </div>
      <div className="p-space-md rounded-xl bg-surface-card/90 shadow-sm space-y-space-xs">
        <label htmlFor="pincode-input" className="block font-label-caps text-[11px] uppercase tracking-wider text-text-heading">Check Express Delivery &amp; COD by PIN Code</label>
        <div className="flex items-center gap-space-xs">
          <input id="pincode-input" value={pin} onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} placeholder="e.g. 560001 or 110001" className="w-full px-space-md py-2.5 rounded bg-background-base text-text-heading font-mono-clinical text-mono-clinical placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-container" />
          <button type="button" onClick={check} className="px-space-lg py-2.5 rounded bg-gradient-gold-end hover:bg-primary-container text-on-primary font-button-text text-[11px] tracking-widest uppercase transition-all">Check</button>
        </div>
        {result ? (<p className={`font-mono-clinical text-[11px] pt-1 flex items-center gap-1.5 ${ok ? "text-primary" : "text-accent-alert"}`}><span className="material-symbols-outlined text-[16px]">{ok ? "local_shipping" : "error"}</span>{result}</p>) : null}
        <p className="font-mono-clinical text-[11px] text-text-muted">Standard dispatch within 24 hours across 27,000+ PIN codes in India.</p>
      </div>
      <div className="relative p-space-md rounded-xl bg-surface-card shadow-sm border-l-4 border-primary-container">
        <div className="flex gap-space-sm items-start"><span className="material-symbols-outlined text-primary-container text-[26px] opacity-80">format_quote</span><div className="space-y-1"><p className="font-body-md text-body-sm text-text-heading italic leading-relaxed">Every Nutraciti formula is developed and clinically tested by dermatologists for Indian skin, climate, and sensitivities.</p><p className="font-label-caps text-[11px] uppercase tracking-widest text-secondary pt-1 font-semibold">&mdash; Dr. Rakhi K., Certified Dermatologist &amp; Clinical Cosmetologist</p></div></div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-background-base border-t border-border-subtle px-margin-mobile py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col leading-none"><span className="font-body-sm text-[11px] text-text-muted line-through">&#8377;{product.mrpText}</span><span className="font-headline-sm text-[20px] font-bold text-text-heading">&#8377;{product.priceText}</span></div>
        <button type="button" className="flex-1 max-w-[220px] h-12 rounded-lg bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-[0.10em] hover:bg-primary-container transition-colors">Add to Cart</button>
      </div>
    </div>
  );
}
