"use client";

import { useState } from "react";

export default function ProductGallery({ images, name, badge }: { images: string[]; name: string; badge?: string }) {
  const [idx, setIdx] = useState(0);
  const list = images.length > 0 ? images : [""];
  return (
    <div className="w-full flex flex-col gap-space-md">
      <div className="relative w-full aspect-square rounded-xl bg-surface-card overflow-hidden shadow-sm group">
        {badge ? (<div className="absolute top-space-md left-space-md z-10 px-space-md py-1.5 rounded-full bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end shadow-sm"><span className="font-label-caps text-[11px] font-bold text-on-primary tracking-widest uppercase flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse"></span>{badge}</span></div>) : null}
        <div className="absolute top-space-md right-space-md z-10 flex items-center gap-space-xs">
          <button aria-label="Zoom image" className="w-9 h-9 rounded-full bg-background-base/80 backdrop-blur-md text-secondary hover:text-text-heading hover:bg-background-base shadow-sm flex items-center justify-center transition-all" type="button"><span className="material-symbols-outlined text-[20px]">zoom_in</span></button>
          <button aria-label="Share product" className="w-9 h-9 rounded-full bg-background-base/80 backdrop-blur-md text-secondary hover:text-text-heading hover:bg-background-base shadow-sm flex items-center justify-center transition-all" type="button"><span className="material-symbols-outlined text-[18px]">share</span></button>
        </div>
        <img alt={name} src={list[idx]} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        <div className="absolute bottom-space-md left-space-md right-space-md px-space-md py-space-xs bg-background-base/85 backdrop-blur-md rounded-lg flex items-center justify-between text-on-surface-variant">
          <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">verified</span><span className="font-mono-clinical text-mono-clinical text-text-heading">100% AUTHENTIC &bull; DERMATOLOGIST TESTED</span></div>
          <span className="font-label-caps text-[10px] tracking-wider text-primary uppercase hidden sm:inline">Made in India</span>
        </div>
      </div>
      {list.length > 1 ? (
        <div className="grid grid-cols-4 gap-space-sm sm:gap-space-md">
          {list.map((im, i) => (<button key={i} type="button" onClick={() => setIdx(i)} aria-label={`View image ${i + 1}`} className={`relative aspect-square rounded-lg overflow-hidden p-1 shadow-sm transition-all focus:outline-none ${idx === i ? "ring-2 ring-primary-container bg-surface-card" : "bg-surface-container-low opacity-70 hover:opacity-100"}`}><img alt={name} src={im} className="w-full h-full object-cover rounded" /></button>))}
        </div>
      ) : null}
    </div>
  );
}
