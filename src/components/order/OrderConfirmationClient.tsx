"use client";

import { useState } from "react";

const ITEMS = [
  { name: "Luxury Ayurvedic Dark Spot Serum", qty: 1, price: 1099, img: "/products/luxury-ayurvedic-dark-spot-serum.jpeg" },
  { name: "Luxury FluidShield Sunscreen", qty: 1, price: 599, img: "/products/luxury-fluidshield-sunscreen.png" },
  { name: "Professional Face Serum", qty: 1, price: 799, img: "/products/professional-face-serum.jpeg" },
];

export default function OrderConfirmationClient() {
  const [copied, setCopied] = useState(false);
  const f = (n: number) => n.toLocaleString("en-IN");
  const orderId = "NTI-2024-00847";
  const copy = () => { navigator.clipboard?.writeText(orderId); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="max-w-[680px] mx-auto w-full px-margin-mobile py-space-xl text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-md animate-[pulse_2s_ease-in-out_1]"><span className="material-symbols-outlined msym-fill text-on-primary text-[44px]">check</span></div>
      <h1 className="font-display-hero text-[40px] leading-tight text-text-heading mt-space-md">Order Placed! &#127881;</h1>
      <p className="font-body-md text-body-md text-text-muted mt-1">Thank you, Priya! Your order is confirmed.</p>
      <div className="inline-flex items-center gap-3 mt-space-md px-space-md py-2 rounded-lg border border-gold bg-surface-card"><span className="font-mono-clinical text-[14px] tracking-wider text-bronze">ORDER #{orderId}</span></div>
      <div><button type="button" onClick={copy} className="mt-2 font-button-text text-button-text uppercase tracking-wider text-bronze hover:text-primary transition-colors">{copied ? "Copied!" : "Copy Order ID"}</button></div>
      <div className="mt-space-lg text-left bg-surface-card rounded-lg border-t-[3px] border-gold shadow-sm p-space-lg">
        <div className="space-y-space-sm">{ITEMS.map((it) => (<div key={it.name} className="flex items-center gap-space-sm"><div className="w-14 h-14 rounded-lg bg-background-base overflow-hidden border border-border-subtle flex-shrink-0"><img alt={it.name} src={it.img} className="w-full h-full object-cover" /></div><div className="flex-1 min-w-0"><p className="font-body-md text-body-md font-medium text-text-heading truncate">{it.name}</p><p className="font-body-sm text-[12px] text-text-muted">Qty {it.qty}</p></div><span className="font-headline-sm text-[16px] font-semibold text-text-heading">&#8377;{f(it.price)}</span></div>))}</div>
        <div className="h-px bg-border-subtle my-space-md"></div>
        <div className="space-y-1.5 font-body-md text-body-md"><div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span className="text-text-heading">&#8377;2,497</span></div><div className="flex justify-between text-[#2E7D52] font-medium"><span>Discount</span><span>&minus;&#8377;499</span></div><div className="flex justify-between text-on-surface-variant"><span>Delivery</span><span className="text-[#2E7D52] font-medium">FREE</span></div></div>
        <div className="h-px bg-border-subtle my-space-md"></div>
        <div className="flex items-end justify-between"><span className="font-label-caps text-label-caps uppercase tracking-wider text-text-heading">Total Paid</span><span className="font-display-hero text-[28px] text-text-heading leading-none">&#8377;1,998</span></div>
        <p className="font-body-sm text-[12px] text-text-muted mt-1">Includes GST: &#8377;305</p>
        <p className="font-body-sm text-body-sm text-[#2E7D52] font-medium mt-space-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">check_circle</span>Payment method: UPI (GPay)</p>
      </div>
      <div className="mt-space-md text-left bg-surface-card rounded-lg border-l-[3px] border-gold shadow-sm p-space-lg">
        <p className="font-button-text text-button-text uppercase tracking-wider text-text-heading flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary-container">local_shipping</span>Estimated Delivery: Mon, 4 Nov 2024</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Delivering to: 123 MG Road, Bhubaneswar, Odisha 751001</p>
      </div>
      <div className="mt-space-lg">
        <div className="grid grid-cols-3 gap-2 relative">
          <div className="hidden sm:block absolute top-5 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gold to-bronze"></div>
          <div className="relative flex flex-col items-center gap-2"><span className="w-10 h-10 rounded-full bg-surface-card border border-gold flex items-center justify-center text-primary-container z-10"><span className="material-symbols-outlined text-[20px]">inventory_2</span></span><span className="font-body-sm text-[12px] text-on-surface-variant">Packed in 24 hours</span></div>
          <div className="relative flex flex-col items-center gap-2"><span className="w-10 h-10 rounded-full bg-surface-card border border-gold flex items-center justify-center text-primary-container z-10"><span className="material-symbols-outlined text-[20px]">local_shipping</span></span><span className="font-body-sm text-[12px] text-on-surface-variant">Shipped with SMS tracking</span></div>
          <div className="relative flex flex-col items-center gap-2"><span className="w-10 h-10 rounded-full bg-surface-card border border-gold flex items-center justify-center text-primary-container z-10"><span className="material-symbols-outlined text-[20px]">check_circle</span></span><span className="font-body-sm text-[12px] text-on-surface-variant">Delivered to your door</span></div>
        </div>
      </div>
      <div className="mt-space-lg space-y-space-xs">
        <a href="#" className="block w-full py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors">Track My Order &rarr;</a>
        <a href="/shop" className="block w-full py-3 rounded border border-gold text-bronze font-button-text text-button-text uppercase tracking-widest hover:bg-surface-container transition-colors">Continue Shopping</a>
      </div>
    </div>
  );
}
