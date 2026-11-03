"use client";

import { useState } from "react";

export default function CheckoutClient() {
  const [pay, setPay] = useState("upi");
  const [delivery, setDelivery] = useState("standard");
  const [addrType, setAddrType] = useState("home");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const f = (n: number) => n.toLocaleString("en-IN");
  const onPin = (v: string) => { const p = v.replace(/[^0-9]/g, "").slice(0, 6); setPin(p); if (p.length === 6) { setCity("Bhubaneswar"); setState("Odisha"); } else { setCity(""); setState(""); } };
  const subtotal = 2497;
  const discount = 499;
  const deliveryFee = delivery === "express" ? 99 : 0;
  const codFee = pay === "cod" ? 40 : 0;
  const total = subtotal - discount + deliveryFee + codFee;
  const gst = Math.round((total * 18) / 118);
  const tabs = [{ v: "upi", l: "UPI" }, { v: "card", l: "Card" }, { v: "netbanking", l: "Net Banking" }, { v: "cod", l: "COD" }];
  const inputCls = "mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors";
  return (
    <div className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin pt-space-md pb-28 lg:pb-space-xl">
      <nav aria-label="Breadcrumb" className="font-body-sm text-[13px] text-text-muted flex items-center gap-1.5"><a href="/" className="hover:text-primary transition-colors">Home</a><span className="text-outline-variant">&rsaquo;</span><a href="/cart" className="hover:text-primary transition-colors">Cart</a><span className="text-outline-variant">&rsaquo;</span><span className="text-text-heading">Checkout</span></nav>
      <div className="flex items-center gap-2 sm:gap-4 mt-space-md">
        <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-gradient-gold-end text-on-primary flex items-center justify-center"><span className="material-symbols-outlined text-[16px]">check</span></span><span className="font-label-caps text-[11px] uppercase tracking-wider text-bronze font-semibold">Address</span></div>
        <span className="flex-1 h-px bg-border-subtle max-w-[48px]"></span>
        <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-gold text-on-primary flex items-center justify-center font-button-text text-[12px]">2</span><span className="font-label-caps text-[11px] uppercase tracking-wider text-text-heading font-semibold">Payment</span></div>
        <span className="flex-1 h-px bg-border-subtle max-w-[48px]"></span>
        <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full border border-border-subtle text-text-muted flex items-center justify-center font-button-text text-[12px]">3</span><span className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Review</span></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-space-xl mt-space-lg">
        <div className="space-y-space-lg">
          <section className="bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container mb-space-md">Delivery Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="sm:col-span-2"><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Full Name</label><input placeholder="Priya Sharma" className={inputCls} /></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Mobile Number</label><div className="flex gap-2 mt-1"><span className="inline-flex items-center px-3 rounded border border-border-subtle bg-background-base font-body-md text-body-md text-text-heading">+91</span><input inputMode="numeric" placeholder="10-digit number" className="flex-1 px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Pincode</label><input value={pin} onChange={(e) => onPin(e.target.value)} inputMode="numeric" placeholder="751001" className={inputCls} /></div>
              <div className="sm:col-span-2"><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Address Line 1</label><input placeholder="House no., building, street" className={inputCls} /></div>
              <div className="sm:col-span-2"><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Address Line 2 (optional)</label><input placeholder="Area, landmark" className={inputCls} /></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">City</label><input value={city} readOnly placeholder="Auto-filled" className={inputCls} /></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">State</label><input value={state} readOnly placeholder="Auto-filled" className={inputCls} /></div>
            </div>
            <div className="flex flex-wrap gap-2 mt-space-md">{["home", "work", "other"].map((t) => (<button key={t} type="button" onClick={() => setAddrType(t)} className={`px-4 py-2 rounded-full border font-label-caps text-[11px] uppercase tracking-wider transition-colors ${addrType === t ? "border-gold bg-surface-container-high text-bronze font-semibold" : "border-border-subtle text-on-surface-variant hover:border-gold"}`}>{t}</button>))}</div>
          </section>
          <section className="bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container mb-space-md">Delivery Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <button type="button" onClick={() => setDelivery("standard")} className={`text-left p-space-md rounded-lg border-2 transition-colors ${delivery === "standard" ? "border-gold bg-gold/10" : "border-border-subtle hover:border-gold"}`}><span className="font-body-md text-body-md font-semibold text-text-heading">Standard Delivery</span><span className="block font-body-sm text-body-sm text-text-muted mt-0.5">3-5 business days &bull; FREE above &#8377;499</span></button>
              <button type="button" onClick={() => setDelivery("express")} className={`text-left p-space-md rounded-lg border-2 transition-colors ${delivery === "express" ? "border-gold bg-gold/10" : "border-border-subtle hover:border-gold"}`}><span className="font-body-md text-body-md font-semibold text-text-heading">Express Delivery</span><span className="block font-body-sm text-body-sm text-text-muted mt-0.5">1-2 business days &bull; &#8377;99</span></button>
            </div>
          </section>
          <section className="bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container mb-space-md">Payment Method</h2>
            <div className="flex gap-space-md border-b border-border-subtle overflow-x-auto no-scrollbar">{tabs.map((t) => (<button key={t.v} type="button" onClick={() => setPay(t.v)} className={`pb-3 -mb-px whitespace-nowrap font-button-text text-button-text uppercase tracking-wider border-b-2 transition-colors ${pay === t.v ? "border-bronze text-bronze" : "border-transparent text-on-surface-variant hover:text-on-surface"}`}>{t.l}</button>))}</div>
            <div className="pt-space-md">
              {pay === "upi" ? (<div className="space-y-space-md"><div className="flex gap-2"><input placeholder="name@paytm" aria-label="UPI ID" className="flex-1 px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /><button type="button" className="px-space-md rounded border border-bronze text-bronze font-button-text text-button-text uppercase tracking-wider hover:bg-surface-container transition-colors">Verify</button></div><p className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted text-center">Or pay with QR code</p><div className="w-36 h-36 mx-auto rounded-lg border-2 border-dashed border-bronze flex items-center justify-center text-text-muted"><span className="material-symbols-outlined text-[48px]">qr_code_2</span></div><div className="flex flex-wrap items-center justify-center gap-2">{["GPay", "PhonePe", "Paytm", "BHIM"].map((a) => (<span key={a} className="px-3 py-1.5 rounded border border-border-subtle bg-background-base font-label-caps text-[11px] text-on-surface-variant">{a}</span>))}</div></div>) : null}
              {pay === "card" ? (<div className="space-y-space-md"><div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Card Number</label><input placeholder="1234 5678 9012 3456" inputMode="numeric" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div><div className="grid grid-cols-2 gap-space-md"><div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Expiry</label><input placeholder="MM/YY" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div><div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">CVV</label><input placeholder="123" inputMode="numeric" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div></div><div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Cardholder Name</label><input placeholder="Name on card" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 accent-gold" /><span className="font-body-sm text-body-sm text-on-surface-variant">Save this card for future</span></label></div>) : null}
              {pay === "netbanking" ? (<div><div className="grid grid-cols-3 gap-space-sm">{["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((b) => (<button key={b} type="button" className="py-3 rounded border border-border-subtle bg-background-base font-body-md text-body-md text-text-heading hover:border-gold transition-colors">{b}</button>))}</div><select aria-label="More banks" className="mt-space-md w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading font-body-md text-body-md focus:outline-none focus:border-gold"><option>More Banks</option><option>Bank of Baroda</option><option>Canara Bank</option><option>Yes Bank</option></select></div>) : null}
              {pay === "cod" ? (<div className="p-space-md rounded-lg bg-surface-container-low border border-bronze/40"><p className="font-body-md text-body-md text-text-heading font-medium">Cash on Delivery available for this order</p><p className="font-body-sm text-body-sm text-on-surface-variant mt-1">COD charge: &#8377;40 will be added to your total.</p></div>) : null}
            </div>
          </section>
        </div>
        <div>
          <div className="lg:sticky lg:top-28 bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <div className="flex gap-2 mb-space-md">{["/products/luxury-ayurvedic-dark-spot-serum.jpeg", "/products/luxury-fluidshield-sunscreen.png", "/products/professional-face-serum.jpeg"].map((im, i) => (<div key={i} className="w-14 h-14 rounded-lg bg-background-base overflow-hidden border border-border-subtle"><img alt="Order item" src={im} className="w-full h-full object-cover" /></div>))}</div>
            <h2 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Order Summary</h2>
            <div className="mt-space-md space-y-2 font-body-md text-body-md">
              <div className="flex justify-between text-on-surface-variant"><span>Subtotal</span><span className="text-text-heading">&#8377;{f(subtotal)}</span></div>
              <div className="flex justify-between text-[#2E7D52] font-medium"><span>Discount (SAVE20)</span><span>&minus;&#8377;{f(discount)}</span></div>
              <div className="flex justify-between text-on-surface-variant"><span>Delivery</span><span className={deliveryFee === 0 ? "text-[#2E7D52] font-medium" : "text-text-heading"}>{deliveryFee === 0 ? "FREE" : "\u20B9" + f(deliveryFee)}</span></div>
              {codFee > 0 ? (<div className="flex justify-between text-on-surface-variant"><span>COD Charge</span><span className="text-text-heading">&#8377;{f(codFee)}</span></div>) : null}
            </div>
            <div className="h-px bg-border-subtle my-space-md"></div>
            <div className="flex items-end justify-between"><span className="font-label-caps text-label-caps uppercase tracking-wider text-text-heading">Total</span><span className="font-display-hero text-[28px] text-text-heading leading-none">&#8377;{f(total)}</span></div>
            <p className="font-body-sm text-[12px] text-text-muted mt-1">Includes 18% GST: &#8377;{f(gst)}</p>
            <a href="/order-confirmation" className="block w-full mt-space-md h-12 leading-[3rem] rounded bg-gradient-to-r from-gold to-bronze text-on-primary text-center font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity">Place Order &rarr;</a>
            <p className="text-center font-body-sm text-[12px] text-text-muted mt-space-sm flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px] text-primary-container">lock</span>100% Secure Checkout</p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">{["VISA", "MASTERCARD", "UPI", "RUPAY", "RAZORPAY"].map((p) => (<span key={p} className="font-mono-clinical text-[10px] px-2 py-0.5 rounded border border-border-subtle text-text-muted">{p}</span>))}</div>
            <p className="text-center font-mono-clinical text-[11px] text-text-muted mt-2">Powered by Razorpay</p>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-background-base border-t border-border-subtle px-margin-mobile py-3">
        <a href="/order-confirmation" className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-gradient-to-r from-gold to-bronze text-on-primary font-button-text text-button-text uppercase tracking-[0.10em]">Place Order &#8377;{f(total)} &rarr;</a>
      </div>
    </div>
  );
}
