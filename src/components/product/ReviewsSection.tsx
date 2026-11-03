"use client";

import { useState } from "react";

type Review = { name: string; date: string; meta: string[]; text: string; helpful: number };

const REVIEWS: Review[] = [
  { name: "Priya Malhotra", date: "12 Oct 2024", meta: ["Bengaluru", "Combination Skin", "Used 30ml"], text: "Absolute holy grail for Indian skin. Within 10 days my post-acne marks faded and the glow is unreal. It absorbs instantly with zero sticky residue.", helpful: 48 },
  { name: "Sunaina Das", date: "28 Sep 2024", meta: ["Mumbai", "Oily / Sensitive Skin", "Monsoon Routine"], text: "Lightweight in humid weather. Does not feel greasy like other oils. It melts in seamlessly and sits beautifully under my morning sunscreen.", helpful: 32 },
  { name: "Ananya Rao", date: "05 Oct 2024", meta: ["Delhi NCR", "Mature Dry Skin", "Used 50ml"], text: "My skin looks plump and rested even after 12-hour workdays. Fine laugh lines around the mouth look noticeably softened. Highly recommend the 50ml bottle.", helpful: 21 },
];
const DIST = [{ s: "5 Star", pct: 88, strong: true }, { s: "4 Star", pct: 9, strong: true }, { s: "3 Star", pct: 2, strong: false }, { s: "2 Star", pct: 1, strong: false }, { s: "1 Star", pct: 0, strong: false }];
const FILTERS = ["All (1,847)", "With Photos (420)", "Verified Buyers (1,610)", "5 Star (1,620)", "4 Star (165)"];

function ReviewCard({ r }: { r: Review }) {
  const [helpful, setHelpful] = useState(r.helpful);
  const [voted, setVoted] = useState(false);
  const vote = () => { if (!voted) { setHelpful((h) => h + 1); setVoted(true); } };
  return (
    <div className="p-space-lg rounded-xl bg-surface-card shadow-sm flex flex-col justify-between space-y-space-md">
      <div className="space-y-space-xs">
        <div className="flex items-center justify-between"><div className="flex text-primary-container">{[1,2,3,4,5].map((n) => (<span key={n} className="material-symbols-outlined msym-fill text-[18px]">star</span>))}</div><span className="font-mono-clinical text-[11px] text-text-muted">{r.date}</span></div>
        <div className="flex items-center gap-2"><h3 className="font-headline-sm text-headline-sm text-text-heading">{r.name}</h3><span className="font-label-caps text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer</span></div>
        <p className="font-mono-clinical text-[11px] text-outline">{r.meta.join(" \u2022 ")}</p>
        <blockquote className="font-body-md text-body-md text-on-surface-variant italic pt-2 leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
      </div>
      <div className="pt-space-xs border-t border-border-subtle flex items-center justify-between font-mono-clinical text-[11px] text-text-muted"><span>Was this helpful?</span><button type="button" onClick={vote} className="flex items-center gap-1 hover:text-text-heading transition-colors"><span className="material-symbols-outlined text-[16px]">thumb_up</span> {helpful}</button></div>
    </div>
  );
}

export default function ReviewsSection() {
  const [filter, setFilter] = useState(0);
  return (
    <section id="reviews-section" className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl scroll-mt-28">
      <div className="space-y-space-xl">
        <div className="space-y-space-xs"><span className="font-label-caps text-label-caps tracking-widest uppercase text-primary font-semibold">Verified Clinical Feedback</span><h2 className="font-headline-lg text-headline-lg text-text-heading">Customer Reviews &amp; Clinical Results</h2></div>
        <div className="p-space-lg md:p-space-xl rounded-xl bg-surface-card shadow-sm grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-1 border-b md:border-b-0 md:border-r border-border-subtle pb-space-md md:pb-0 md:pr-space-lg">
            <div className="font-display-hero text-display-hero text-text-heading leading-none">4.9</div>
            <div className="flex items-center justify-center md:justify-start text-primary-container py-1">{[1,2,3,4,5].map((n) => (<span key={n} className="material-symbols-outlined msym-fill text-[22px]">star</span>))}</div>
            <p className="font-body-md text-body-md text-text-heading font-medium">Based on 1,847 verified reviews</p>
            <p className="font-mono-clinical text-mono-clinical text-primary font-semibold">98% of customers recommend this youth serum</p>
          </div>
          <div className="md:col-span-8 space-y-2.5">
            {DIST.map((d) => (<div key={d.s} className="flex items-center gap-space-sm font-mono-clinical text-mono-clinical text-on-surface-variant"><span className="w-12 text-text-heading font-medium">{d.s}</span><div className="flex-1 h-2.5 rounded-full bg-surface-container-high overflow-hidden"><div className={`h-full rounded-full ${d.strong ? "bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end" : "bg-primary-container/40"}`} style={{ width: `${d.pct}%` }}></div></div><span className="w-10 text-right text-text-muted">{d.pct}%</span></div>))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs border-b border-border-subtle pb-space-sm">
          {FILTERS.map((f, i) => (<button key={f} type="button" onClick={() => setFilter(i)} className={`px-4 py-2 rounded-full font-label-caps text-[11px] uppercase tracking-wider shadow-sm transition-colors ${filter === i ? "bg-gradient-gold-end text-on-primary" : "bg-surface-card hover:bg-surface-container text-on-surface-variant"}`}>{f}</button>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">{REVIEWS.map((r) => (<ReviewCard key={r.name} r={r} />))}</div>
        <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left">
          <div><h4 className="font-headline-sm text-headline-sm text-text-heading">Have you experienced the Golden Youth Serum?</h4><p className="font-body-sm text-body-sm text-on-surface-variant">Share your clinical journey with our dermatologist research board and receive 200 Glow Club coins.</p></div>
          <button type="button" className="whitespace-nowrap px-space-lg py-3 rounded bg-gradient-gold-end hover:bg-primary-container text-on-primary font-button-text text-button-text uppercase tracking-wider transition-all shadow-sm">Write a Review</button>
        </div>
      </div>
    </section>
  );
}
