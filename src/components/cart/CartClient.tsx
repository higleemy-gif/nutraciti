"use client";

import { useMemo, useState } from "react";

type Item = { id: string; name: string; variant: string; active: string; price: number; mrp: number; qty: number; img: string };

const INITIAL: Item[] = [
  { id: "c1", name: "Luxury Ayurvedic Dark Spot Serum", variant: "30ml", active: "SAFFRON + LICORICE", price: 1099, mrp: 1499, qty: 1, img: "/products/luxury-ayurvedic-dark-spot-serum.jpeg" },
  { id: "c2", name: "Luxury FluidShield Sunscreen", variant: "50ml", active: "SPF 50+ PA++++", price: 599, mrp: 799, qty: 1, img: "/products/luxury-fluidshield-sunscreen.png" },
  { id: "c3", name: "Professional Face Serum", variant: "30ml", active: "VITAMIN C 15%", price: 799, mrp: 1099, qty: 1, img: "/products/professional-face-serum.jpeg" },
];

export default function CartClient() {
  const [items, setItems] = useState<Item[]>(INITIAL);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [promoErr, setPromoErr] = useState(false);
  const f = (n: number) => n.toLocaleString("en-IN");
  const setQty = (id: string, delta: number) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(10, it.qty + delta)) } : it)));
  const remove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const savings = useMemo(() => items.reduce((s, it) => s + (it.mrp - it.price) * it.qty, 0), [items]);
  const discount = applied ? Math.floor(subtotal * 0.2) : 0;
  const total = subtotal - discount;
  const gst = Math.round((total * 18) / 118);
  const apply = () => { if (code.trim().toUpperCase() === "SAVE20") { setApplied("SAVE20"); setPromoErr(false); } else { setApplied(null); setPromoErr(true); } };
  return (
    <div className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin pt-space-md pb-28 lg:pb-space-xl">
      <nav aria-label="Breadcrumb" className="font-body-sm text-[13px] text-text-muted flex items-center gap-1.5"><a href="/" className="hover:text-primary transition-colors">Home</a><span className="text-outline-variant">&rsaquo;</span><span className="text-text-heading">Cart</span></nav>
      <h1 className="font-display-hero text-[36px] leading-tight text-text-heading mt-space-sm">Your Cart ({items.length} {items.length === 1 ? "Item" : "Items"})</h1>
      {items.length === 0 ? (
        <div className="mt-space-xl text-center py-space-xl bg-surface-card border border-border-subtle rounded-lg"><p className="font-headline-sm text-headline-sm text-text-heading">Your cart is empty</p><a href="/shop" className="inline-block mt-space-md px-space-lg py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors">Continue Shopping</a></div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-[65fr_35fr] gap-space-xl mt-space-lg">
        <div>
          <div className="divide-y divide-border-subtle">
            {items.map((it) => (
              <div key={it.id} className="flex gap-space-md py-space-md">
                <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-surface-card overflow-hidden"><img alt={it.name} src={it.img} className="w-full h-full object-cover" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2"><h3 className="font-body-md text-body-md font-semibold text-text-heading">{it.name} <span className="text-text-muted font-normal">({it.variant})</span></h3><button type="button" onClick={() => remove(it.id)} aria-label="Remove item" className="text-text-muted hover:text-accent-alert transition-colors"><span className="material-symbols-outlined text-[20px]">close</span></button></div>
                  <span className="inline-block mt-1 font-mono-clinical text-[11px] text-bronze bg-background-base border border-border-subtle px-2 py-0.5 rounded">{it.active}</span>
                  <div className="flex items-center justify-between mt-space-sm">
                    <div className="inline-flex items-center border border-border-subtle rounded"><button type="button" aria-label="Decrease" onClick={() => setQty(it.id, -1)} className="w-8 h-8 flex items-center justify-center text-bronze hover:bg-surface-card transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button><span className="w-8 text-center font-body-md text-body-md text-text-heading">{it.qty}</span><button type="button" aria-label="Increase" onClick={() => setQty(it.id, 1)} className="w-8 h-8 flex items-center justify-center text-bronze hover:bg-surface-card transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button></div>
                    <div className="text-right"><span className="font-headline-sm text-[18px] font-semibold text-text-heading">&#8377;{f(it.price * it.qty)}</span><span className="ml-2 font-body-sm text-[13px] line-through text-text-muted">&#8377;{f(it.mrp * it.qty)}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-space-md rounded-lg bg-gradient-to-r from-gold/20 to-surface-card border border-gold/40 px-space-md py-3 flex items-center gap-2"><span className="text-[18px]">&#127881;</span><span className="font-button-text text-button-text uppercase tracking-wider text-bronze">You are saving &#8377;{f(savings)} on this order!</span></div>
        </div>
        <div>
          <div className="lg:sticky lg:top-28 bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Order Summary</h2>
            <div className="mt-space-md space-y-2 font-body-md text-body-md">
              <div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span className="text-text-heading">&#8377;{f(subtotal)}</span></div>
              <div className="flex justify-between text-on-surface-variant"><span>Delivery</span><span className="text-[#2E7D52] font-medium flex items-center gap-1">FREE <span className="material-symbols-outlined text-[16px]">check</span></span></div>
              {applied ? (<div className="flex justify-between text-[#2E7D52] font-medium"><span>Discount (SAVE20)</span><span>&minus;&#8377;{f(discount)}</span></div>) : null}
            </div>
            <div className="h-px bg-border-subtle my-space-md"></div>
            <div className="flex items-end justify-between"><span className="font-label-caps text-label-caps uppercase tracking-wider text-text-heading">Total</span><span className="font-display-hero text-[28px] text-text-heading leading-none">&#8377;{f(total)}</span></div>
            <p className="font-body-sm text-[12px] text-text-muted mt-1">Includes 18% GST: &#8377;{f(gst)}</p>
            <div className="mt-space-md"><div className="flex gap-2"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter promo code" aria-label="Promo code" className="flex-1 px-space-md py-2.5 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-sm text-body-sm focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /><button type="button" onClick={apply} className="px-space-md rounded border border-bronze text-bronze font-button-text text-button-text uppercase tracking-wider hover:bg-surface-container transition-colors">Apply</button></div>
              {applied ? (<p className="mt-2 font-body-sm text-[12px] text-[#2E7D52] flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check_circle</span>{applied} applied!</p>) : null}
              {promoErr ? (<p className="mt-2 font-body-sm text-[12px] text-accent-alert flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">error</span>Invalid or expired code</p>) : null}
            </div>
            <a href="/checkout" className="block w-full mt-space-md py-3 rounded bg-gradient-to-r from-gold to-bronze text-on-primary text-center font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity">Proceed to Checkout &rarr;</a>
            <div className="mt-space-md flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-text-muted"><span className="font-body-sm text-[11px] flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-primary-container">lock</span>Secure Checkout</span><span className="font-body-sm text-[11px] flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-primary-container">sync</span>Easy Returns</span><span className="font-body-sm text-[11px] flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-primary-container">verified</span>100% Authentic</span></div>
            <p className="text-center font-body-sm text-[12px] text-bronze mt-space-sm">You saved &#8377;{f(savings)} on this order!</p>
          </div>
        </div>
      </div>
      )}
      {items.length > 0 ? (
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-background-base border-t border-border-subtle px-margin-mobile py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col leading-none"><span className="font-body-sm text-[11px] text-text-muted">Total</span><span className="font-headline-sm text-[20px] font-bold text-text-heading">&#8377;{f(total)}</span></div>
        <a href="/checkout" className="flex-1 max-w-[220px] text-center py-3 rounded-lg bg-gradient-to-r from-gold to-bronze text-on-primary font-button-text text-button-text uppercase tracking-[0.10em]">Checkout</a>
      </div>
      ) : null}
    </div>
  );
}
