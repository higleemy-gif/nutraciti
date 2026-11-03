"use client";

import { useState, type ReactNode, type ChangeEvent } from "react";

const groups = [
  { id: "skin-type", title: "Skin Type", options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"] },
  { id: "concern", title: "Skin Concern", options: ["Brightening", "Anti-Ageing", "Hydration", "Acne & Breakouts", "Pigmentation", "Dark Circles", "Redness"] },
  { id: "ingredient", title: "Key Ingredient", options: ["Niacinamide", "Vitamin C", "Hyaluronic Acid", "Retinol", "Saffron", "Peptides", "SPF"] },
  { id: "collection", title: "Collection", options: ["Daily Essentials", "Premium Luxury Line", "Targeted Treatments"] },
];

export default function FilterSections() {
  const [open, setOpen] = useState<Record<string, boolean>>({ "skin-type": true, concern: true, ingredient: true, price: true, rating: true, collection: true });
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [minP, setMinP] = useState(299);
  const [maxP, setMaxP] = useState(1899);
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const check = (k: string) => setChecked((c) => ({ ...c, [k]: !c[k] }));
  const clearAll = () => { setChecked({}); setMinP(299); setMaxP(1899); };

  const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
    <div className="border-b border-border-subtle/70 py-4">
      <button type="button" onClick={() => toggle(id)} className="w-full flex items-center justify-between text-text-heading">
        <span className="font-button-text text-button-text uppercase tracking-wider">{title}</span>
        <span className="material-symbols-outlined text-[20px] text-primary">{open[id] ? "remove" : "add"}</span>
      </button>
      {open[id] ? <div className="mt-3 space-y-2.5">{children}</div> : null}
    </div>
  );

  const Check = ({ k, label }: { k: string; label: string }) => (
    <label className="flex items-center gap-2.5 cursor-pointer text-on-surface-variant hover:text-on-surface transition-colors">
      <input type="checkbox" checked={!!checked[k]} onChange={() => check(k)} className="w-4 h-4 accent-bronze" />
      <span className="font-body-sm text-body-sm">{label}</span>
    </label>
  );

  return (
    <div>
      <div className="flex items-center justify-between pb-2"><h2 className="font-button-text text-button-text uppercase tracking-widest text-primary-container">Filters</h2></div>
      {groups.filter((g) => g.id !== "collection").map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>{g.options.map((o) => (<Check key={o} k={g.id + ":" + o} label={o} />))}</Section>
      ))}
      <Section id="price" title="Price Range">
        <div className="relative h-1.5 rounded-full bg-border-subtle mt-1"><div className="absolute h-1.5 rounded-full bg-gold" style={{ left: `${(minP / 2500) * 100}%`, right: `${100 - (maxP / 2500) * 100}%` }}></div></div>
        <input type="range" min={0} max={2500} step={50} value={minP} onChange={(e: ChangeEvent<HTMLInputElement>) => setMinP(Math.min(Number(e.target.value), maxP - 50))} className="w-full accent-gold cursor-pointer" aria-label="Minimum price" />
        <input type="range" min={0} max={2500} step={50} value={maxP} onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxP(Math.max(Number(e.target.value), minP + 50))} className="w-full accent-gold cursor-pointer -mt-1" aria-label="Maximum price" />
        <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant pt-1"><span>&#8377;{minP.toLocaleString("en-IN")}</span><span>&#8377;{maxP.toLocaleString("en-IN")}</span></div>
      </Section>
      <Section id="rating" title="Rating">
        {[5, 4, 3].map((n) => (
          <label key={n} className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={!!checked["rating:" + n]} onChange={() => check("rating:" + n)} className="w-4 h-4 accent-bronze" />
            <span className="flex text-primary-container">{[1, 2, 3, 4, 5].map((sidx) => (<span key={sidx} className={`material-symbols-outlined text-[16px] ${sidx <= n ? "msym-fill" : "text-border-subtle"}`}>star</span>))}</span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">{n === 5 ? "5 only" : n + " & above"}</span>
          </label>
        ))}
      </Section>
      <Section id="collection" title="Collection">{groups[3].options.map((o) => (<Check key={o} k={"collection:" + o} label={o} />))}</Section>
      <button type="button" onClick={clearAll} className="mt-4 font-button-text text-button-text uppercase tracking-wider text-bronze hover:text-primary transition-colors">Clear All Filters</button>
    </div>
  );
}
