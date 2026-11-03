"use client";

import { useState } from "react";

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const submit = (e: { preventDefault: () => void }) => { e.preventDefault(); const t = q.trim(); window.location.href = t ? `/shop?q=${encodeURIComponent(t)}` : "/shop"; };
  return (
    <>
      <button type="button" aria-label="Search catalog" onClick={() => setOpen(true)} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[22px]">search</span></button>
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-text-heading/40" onClick={() => setOpen(false)}></div>
          <div className="absolute top-0 left-0 w-full bg-background-base border-b border-border-subtle shadow-[0_8px_24px_rgba(126,83,30,0.12)]">
            <form onSubmit={submit} className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin h-20 flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px] text-primary-container">search</span>
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }} placeholder="Search for serums, sunscreen, ingredients..." aria-label="Search" className="flex-1 bg-transparent text-text-heading placeholder:text-text-muted font-body-lg text-body-lg focus:outline-none" />
              <button type="submit" className="px-space-md py-2 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-wider hover:bg-primary-container transition-colors">Search</button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search" className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[22px]">close</span></button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
