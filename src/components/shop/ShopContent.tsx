"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import FilterSections from "./FilterSections";
import { CATALOG as PRODUCTS } from "@/lib/products";

const SORTS = [
  { v: "best", label: "Best Selling" },
  { v: "new", label: "New Arrivals" },
  { v: "priceLow", label: "Price: Low to High" },
  { v: "priceHigh", label: "Price: High to Low" },
  { v: "rated", label: "Top Rated" },
];

export default function ShopContent() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState("best");
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(1);
  const toggleSaved = (id: string) => setSaved((s) => ({ ...s, [id]: !s[id] }));
  const products = useMemo(() => {
    const list = [...PRODUCTS];
    if (sort === "priceLow") list.sort((a, b) => a.priceNum - b.priceNum);
    else if (sort === "priceHigh") list.sort((a, b) => b.priceNum - a.priceNum);
    else if (sort === "rated") list.sort((a, b) => b.ratingNum - a.ratingNum);
    else if (sort === "new") list.sort((a, b) => (b.badge === "NEW" ? 1 : 0) - (a.badge === "NEW" ? 1 : 0));
    return list;
  }, [sort]);
  return (
    <div className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin w-full pb-28 lg:pb-0">
      <div className="flex gap-space-xl py-space-lg">
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-28 bg-surface-card border border-border-subtle rounded-lg p-space-lg">
            <FilterSections />
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-gutter pb-space-md mb-space-md border-b border-border-subtle">
            <span className="font-body-sm text-body-sm text-text-muted">Showing {PRODUCTS.length} products</span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="hidden sm:inline font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Sort</label>
              <div className="relative"><select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-surface-card border border-border-subtle rounded px-3 py-2 pr-9 font-body-sm text-body-sm text-text-heading focus:outline-none focus:border-gold cursor-pointer">{SORTS.map((o) => (<option key={o.v} value={o.v}>{o.label}</option>))}</select><span className="material-symbols-outlined text-[18px] text-primary absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span></div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map((p) => (<ProductCard key={p.id} product={p} saved={!!saved[p.id]} onToggle={toggleSaved} />))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-space-xl">
            <button type="button" disabled className="w-10 h-10 rounded border border-border-subtle bg-surface-card flex items-center justify-center text-text-heading disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Previous page"><span className="material-symbols-outlined text-[18px]">west</span></button>
            <button type="button" className="w-10 h-10 rounded border bg-gold text-on-primary border-gold flex items-center justify-center font-body-sm text-body-sm">1</button>
            <button type="button" disabled className="w-10 h-10 rounded border border-border-subtle bg-surface-card flex items-center justify-center text-text-heading disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Next page"><span className="material-symbols-outlined text-[18px]">east</span></button>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 p-3 bg-background-base/95 backdrop-blur-md border-t border-border-subtle">
        <button type="button" onClick={() => setDrawer(true)} className="w-full bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-[0.10em] py-3 rounded flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[18px]">tune</span> Filter & Sort</button>
      </div>
      {drawer ? (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-text-heading/40" onClick={() => setDrawer(false)}></div>
          <div className="absolute bottom-0 left-0 w-full max-h-[85vh] overflow-y-auto bg-background-base rounded-t-xl p-space-lg">
            <div className="flex items-center justify-between mb-space-sm"><h2 className="font-headline-sm text-headline-sm text-text-heading">Filter & Sort</h2><button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container"><span className="material-symbols-outlined text-[22px]">close</span></button></div>
            <div className="mb-space-md"><label htmlFor="sort-m" className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Sort By</label><select id="sort-m" value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 w-full appearance-none bg-surface-card border border-border-subtle rounded px-3 py-2.5 font-body-sm text-body-sm text-text-heading focus:outline-none focus:border-gold">{SORTS.map((o) => (<option key={o.v} value={o.v}>{o.label}</option>))}</select></div>
            <FilterSections />
            <button type="button" onClick={() => setDrawer(false)} className="sticky bottom-0 mt-space-md w-full bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-[0.10em] py-3 rounded">Show Results</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
