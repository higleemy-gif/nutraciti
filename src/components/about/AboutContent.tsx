"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setShown(true); ob.disconnect(); } }, { threshold: 0.12 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className ?? ""}`}>{children}</div>;
}

function Label({ children }: { children: ReactNode }) {
  return (<div className="inline-flex items-center gap-2"><span className="w-6 h-[1.5px] bg-primary-container"></span><span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">{children}</span></div>);
}

const STATS1 = [{ n: "7", l: "Products Featured" }, { n: "4", l: "Areas of Care" }, { n: "21", l: "Approvals & Registrations" }, { n: "28", l: "States Available" }];

export default function AboutContent() {
  return (
    <>
      <section className="w-full bg-surface-card border-b border-border-subtle">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal className="max-w-3xl">
            <Label>About Nutraciti</Label>
            <h1 className="font-display-hero text-[40px] md:text-[56px] leading-[1.08] text-text-heading tracking-tight mt-space-sm">A beauty, wellness and <span className="italic">personal-care</span> company.</h1>
            <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container mt-space-md">Science-Led &bull; Nature-Inspired</p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mt-space-md">Nutraciti International is a beauty, wellness, and personal-care start-up company focused on developing and bringing to market innovative solutions for skin, hair, and overall personal well-being. Our approach is centred on combining quality ingredients, modern formulation science, safety, efficacy, and consumer needs to create products that are practical, accessible, and trustworthy.</p>
          </Reveal>
        </div>
      </section>
      <section className="w-full bg-gradient-gold-end text-on-primary">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-lg">
          <div className="flex md:grid md:grid-cols-4 gap-gutter overflow-x-auto no-scrollbar divide-border-subtle/20">
            {STATS1.map((s) => (<div key={s.l} className="min-w-[45%] sm:min-w-[30%] md:min-w-0 text-center"><div className="font-display-hero text-[48px] leading-none text-primary-container">{s.n}</div><div className="font-label-caps text-label-caps uppercase tracking-wider text-on-primary/85 mt-2">{s.l}</div></div>))}
          </div>
        </div>
      </section>
      <section className="w-full bg-background-base">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal><Label>Mission &amp; Vision</Label></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-space-lg">
            <Reveal className="bg-surface-card border border-border-subtle rounded-xl p-space-lg"><span className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-on-primary text-[24px]">flag</span></span><h3 className="font-headline-sm text-headline-sm text-text-heading mt-space-md">Our Mission</h3><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">To deliver safe, effective, accessible, and responsibly developed solutions in skin care, hair care, health, and wellness for society, bringing together the wisdom of traditional wellness and the advancements of modern science to support healthier, more confident lives. We strive to nurture health and beauty from within while enhancing it from the outside.</p></Reveal>
            <Reveal className="bg-surface-card border border-border-subtle rounded-xl p-space-lg"><span className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-on-primary text-[24px]">visibility</span></span><h3 className="font-headline-sm text-headline-sm text-text-heading mt-space-md">Our Vision</h3><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">To be a trusted name in health, beauty, wellness, and nutrition, inspiring people to live healthier lives, feel more confident, and enjoy a better quality of life through solutions they can trust.</p></Reveal>
          </div>
          <Reveal className="flex flex-wrap gap-2 mt-space-lg justify-center">{["Skin Care", "Hair Care", "Health Care", "Wellness"].map((p) => (<span key={p} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle bg-surface-card font-label-caps text-[11px] uppercase tracking-wider text-bronze"><span className="material-symbols-outlined text-[16px] text-primary-container">spa</span>{p}</span>))}</Reveal>
        </div>
      </section>
      <section className="w-full bg-surface-card border-y border-border-subtle">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal><Label>Our Core Values</Label><h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">What we <span className="italic">stand for.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-space-lg">
            {[{ t: "Transparent by Choice", b: "We believe in honesty, clarity and openness in everything we do.", i: "visibility" }, { t: "Quality Without Compromise", b: "We are committed to safe, effective and high-quality products that you can trust.", i: "verified" }, { t: "Respect", b: "We value people, communities and the environment, and we always act with care and consideration.", i: "volunteer_activism" }].map((v) => (<Reveal key={v.t} className="bg-background-base border border-border-subtle rounded-xl p-space-lg"><span className="w-11 h-11 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">{v.i}</span></span><h3 className="font-headline-sm text-headline-sm text-text-heading mt-space-md">{v.t}</h3><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">{v.b}</p></Reveal>))}
          </div>
          <Reveal className="mt-space-lg rounded-xl bg-text-heading text-background-base px-space-lg py-space-md text-center"><p className="font-display-hero italic text-[22px] md:text-[28px] leading-snug text-background-base">Transparent by choice. Quality without compromise. Respect, always.</p></Reveal>
          <Reveal className="flex flex-wrap gap-2 mt-space-md justify-center">{["Honesty", "Clarity", "Openness", "Safety", "Efficacy", "Quality", "Community", "Environment"].map((t) => (<span key={t} className="px-3 py-1 rounded-full border border-border-subtle bg-background-base font-mono-clinical text-[11px] text-bronze">{t}</span>))}</Reveal>
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-space-sm mt-space-lg">{["Safe Products", "Effective Solutions", "Accessible To Everyone", "Responsible Development"].map((p) => (<div key={p} className="rounded-lg bg-text-heading text-background-base px-space-md py-space-md text-center font-button-text text-button-text uppercase tracking-wider">{p}</div>))}</Reveal>
        </div>
      </section>
      <section className="w-full bg-background-base">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal><Label>Our Approach</Label><h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">How we <span className="italic">create.</span></h2></Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-gutter mt-space-lg">
            {[{ t: "Quality ingredients", i: "eco" }, { t: "Modern formulation science", i: "science" }, { t: "Safety", i: "health_and_safety" }, { t: "Efficacy", i: "trending_up" }, { t: "Consumer needs", i: "groups" }].map((c) => (<Reveal key={c.t} className="bg-surface-card border border-border-subtle rounded-xl p-space-lg flex flex-col items-center text-center gap-space-sm"><span className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-sm"><span className="material-symbols-outlined text-on-primary text-[24px]">{c.i}</span></span><h3 className="font-button-text text-button-text uppercase tracking-wider text-text-heading">{c.t}</h3></Reveal>))}
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-card border-y border-border-subtle">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal className="max-w-3xl"><Label>Our Product Focus</Label><h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">Four areas of <span className="italic">care.</span></h2><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-space-sm">We aim to build a comprehensive portfolio of products that address everyday skin and hair concerns through external applications such as skincare, haircare, serums, oils, sun protection, and other personal-care solutions, while also exploring internal-use wellness and nutritional solutions.</p></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-space-lg">
            {[{ name: "Skin Care", body: "Solutions designed to support healthy-looking, radiant and well-maintained skin.", tags: ["Face serums", "Moisturisers", "Sun protection", "Anti-acne care", "Brightening solutions"], i: "spa", dark: false }, { name: "Hair Care", body: "Serums, oils and treatments for everyday hair concerns, inspired by Ayurvedic principles.", tags: ["Hair serum", "Hair oil", "Hair treatment"], i: "air", dark: false }, { name: "Health Care", body: "Multivitamins and minerals to support everyday health.", tags: ["Multi vitamins", "Protein Powders", "Triphala Powder", "Food supplements"], i: "medical_services", dark: false }, { name: "Wellness", body: "Natural & science-backed nutritional supplements.", tags: ["Collagen Peptide Capsules", "Hair, Skin & Nails Grow Tablets", "Omega-3 Softgels", "Ashwagandha Capsules"], i: "self_improvement", dark: true }].map((a) => (<Reveal key={a.name} className={`rounded-xl p-space-lg border ${a.dark ? "bg-text-heading border-transparent" : "bg-background-base border-border-subtle"}`}><span className={`w-12 h-12 rounded-full flex items-center justify-center ${a.dark ? "bg-background-base/10 text-primary-fixed" : "bg-primary-fixed/40 text-primary"}`}><span className="material-symbols-outlined text-[24px]">{a.i}</span></span><h3 className={`font-headline-sm text-headline-sm mt-space-md ${a.dark ? "text-background-base" : "text-text-heading"}`}>{a.name}</h3><p className={`font-body-md text-body-md leading-relaxed mt-2 ${a.dark ? "text-background-base/80" : "text-on-surface-variant"}`}>{a.body}</p><div className="flex flex-wrap gap-2 mt-space-md">{a.tags.map((t) => (<span key={t} className={`px-3 py-1 rounded-full font-mono-clinical text-[11px] border ${a.dark ? "border-background-base/30 text-background-base/90" : "border-border-subtle text-bronze bg-surface-card"}`}>{t}</span>))}</div></Reveal>))}
          </div>
          <Reveal className="mt-space-lg text-center"><p className="font-display-hero italic text-[22px] md:text-[26px] text-secondary">The wisdom of traditional wellness, the advancements of modern science.</p></Reveal>
        </div>
      </section>
      <section className="w-full bg-background-base">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal><Label>Why Nutraciti</Label><h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">Six reasons to <span className="italic">trust the brand.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-space-lg">
            {[{ t: "Science-led, nature-inspired", b: "Quality ingredients and modern formulation science, combined with the wisdom of traditional wellness.", i: "science" }, { t: "Certified manufacturing", b: "Made in a facility with ISO 9001, ISO 22716 and WHO-GMP certification, and U.S. FDA registration for cosmetics.", i: "workspace_premium" }, { t: "A growing portfolio", b: "Skin care, sun protection, hair care, body care and wellness supplements, built around everyday needs.", i: "inventory_2" }, { t: "Ayurvedic inspiration", b: "Hair care and skin care products inspired by Ayurvedic principles, with herbs, roots and botanicals.", i: "spa" }, { t: "Clean formulations", b: "Paraben-free formulas across the sunscreen, face serum, anti-hair serum and hair oil.", i: "eco" }, { t: "Values you can see", b: "Transparent by choice, quality without compromise, and respect for people, communities and the environment.", i: "visibility" }].map((r) => (<Reveal key={r.t} className="bg-surface-card border border-border-subtle rounded-xl p-space-lg"><span className="w-11 h-11 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[22px]">{r.i}</span></span><h3 className="font-headline-sm text-headline-sm text-text-heading mt-space-md">{r.t}</h3><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-2">{r.b}</p></Reveal>))}
          </div>
          <Reveal className="mt-space-lg rounded-xl bg-text-heading text-background-base px-space-lg py-space-md text-center"><p className="font-display-hero italic text-[22px] md:text-[28px] text-background-base">Nurturing health and beauty from within, enhancing it from the outside.</p></Reveal>
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-lg">{[{ n: "7", l: "Products" }, { n: "7", l: "Nutraciti Approvals" }, { n: "14", l: "Manufacturing Approvals" }, { n: "28", l: "States Availability" }].map((s) => (<div key={s.l} className="text-center rounded-lg border border-border-subtle bg-surface-card py-space-md"><div className="font-display-hero text-[40px] leading-none text-bronze">{s.n}</div><div className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted mt-2">{s.l}</div></div>))}</Reveal>
        </div>
      </section>
      <section className="w-full bg-surface-card border-y border-border-subtle">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <Reveal><Label>Approvals &amp; Certifications</Label><h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">Approvals &amp; <span className="italic">certifications.</span></h2></Reveal>
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mt-space-lg">{["ISO 9001 Certified", "ISO 22716 Cosmetics GMP", "WHO-GMP Certificate", "U.S. FDA Registration (Cosmetics)"].map((c) => (<div key={c} className="rounded-xl bg-text-heading text-background-base p-space-lg flex flex-col items-center text-center gap-space-sm"><span className="material-symbols-outlined text-primary-container text-[32px]">workspace_premium</span><span className="font-button-text text-button-text uppercase tracking-wider">{c}</span></div>))}</Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-space-lg">
            <Reveal className="bg-background-base border border-border-subtle rounded-xl p-space-lg"><h3 className="font-headline-sm text-headline-sm text-text-heading">Manufacturing facility approvals</h3><ul className="mt-space-md space-y-2">{["Factory Licence", "Food & Drug Cosmetic Licence", "FSSAI Certificate", "U.S. FDA Registration (Cosmetics)", "U.S. FDA Registration (Food & Nutraceuticals)", "WHO-GMP Certificate", "ISO 9001 Certification", "ISO 22716 Certification", "GPCB Certificate", "Department of Legal Metrology Registration", "Import Export Code (IEC)", "D-U-N-S Number", "Udyam Registration", "GST Registration"].map((x) => (<li key={x} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-primary-container mt-0.5">check_circle</span>{x}</li>))}</ul></Reveal>
            <Reveal className="bg-background-base border border-border-subtle rounded-xl p-space-lg"><h3 className="font-headline-sm text-headline-sm text-text-heading">Nutraciti approvals</h3><ul className="mt-space-md space-y-2">{["Certificate of Incorporation", "GST Certificate", "MSME Certificate", "ISO Certificate", "Company PAN", "Trade Mark", "GS1 Barcode"].map((x) => (<li key={x} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant"><span className="material-symbols-outlined text-[16px] text-primary-container mt-0.5">check_circle</span>{x}</li>))}</ul></Reveal>
          </div>
        </div>
      </section>
      <section className="w-full bg-background-base">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
            <Reveal>
              <Label>Get in Touch</Label>
              <h2 className="font-headline-lg text-headline-lg text-text-heading mt-space-sm">Get in <span className="italic">touch.</span></h2>
              <div className="mt-space-lg space-y-space-sm">
                <a href="https://www.nutraciti.com" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px] text-primary-container">language</span><span className="font-body-md text-body-md">www.nutraciti.com</span></a>
                <a href="mailto:info@nutraciti.com" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px] text-primary-container">mail</span><span className="font-body-md text-body-md">info@nutraciti.com</span></a>
                <a href="tel:+919328545694" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px] text-primary-container">call</span><span className="font-body-md text-body-md">+91 93285 45694</span></a>
                <div className="flex items-start gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-[20px] text-primary-container mt-0.5">location_on</span><span className="font-body-md text-body-md"><span className="font-semibold text-text-heading">Office:</span> 810, One World West, Ambli-Bopal Rd, Ambli, Ahmedabad, Gujarat, 380058</span></div>
                <div className="flex items-start gap-3 text-on-surface-variant"><span className="material-symbols-outlined text-[20px] text-primary-container mt-0.5">biotech</span><span className="font-body-md text-body-md"><span className="font-semibold text-text-heading">R&amp;D Facility:</span> Shrine Villa, D33 &amp; 34, Swayam by Addore, Kunvar Village, Sanand-Nal Sarovar to GIDC Road, Sanand, Gujarat 382110</span></div>
              </div>
            </Reveal>
            <Reveal className="bg-surface-card border border-border-subtle rounded-xl p-space-lg flex flex-col justify-between">
              <div className="space-y-space-sm">
                {[{ i: "photo_camera", l: "@nutraciti.international", h: "#" }, { i: "thumb_up", l: "facebook.com/nutraciti", h: "#" }, { i: "play_circle", l: "youtube.com/@nutraciti", h: "#" }, { i: "work", l: "linkedin.com/in/nutraciti-international", h: "#" }].map((sc) => (<a key={sc.l} href={sc.h} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors"><span className="w-9 h-9 rounded-full border border-border-subtle flex items-center justify-center text-primary-container"><span className="material-symbols-outlined text-[18px]">{sc.i}</span></span><span className="font-body-md text-body-md break-all">{sc.l}</span></a>))}
              </div>
              <a href="/shop" className="mt-space-lg inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-gold to-bronze text-on-primary font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity">Shop Our Products <span className="material-symbols-outlined text-[18px]">arrow_forward</span></a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
