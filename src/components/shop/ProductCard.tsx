"use client";

export type Product = {
  id: string; name: string; tag: string; active: string;
  priceText: string; mrpText: string; off: string;
  ratingText: string; reviews: string; badge: string; img: string;
  priceNum: number; ratingNum: number;
  slug?: string; tagline?: string; pills?: string[];
};

const badgeClass: Record<string, string> = {
  BESTSELLER: "bg-primary-container text-on-primary",
  NEW: "bg-gradient-gold-end text-on-primary",
  PREMIUM: "bg-gradient-to-r from-gold to-bronze text-on-primary",
  "OUT OF STOCK": "bg-border-subtle text-text-muted",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProductCard({ product, saved, onToggle }: { product: Product; saved: boolean; onToggle: (id: string) => void }) {
  const href = `/products/${product.slug ?? slugify(product.name)}`;
  return (
    <div className="group relative bg-surface-card border border-border-subtle rounded-lg overflow-hidden shadow-[0_4px_24px_rgba(126,83,30,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(126,83,30,0.15)] flex flex-col">
      <div className="relative w-full aspect-square bg-surface-card overflow-hidden">
        <a href={href} aria-label={product.name} className="block w-full h-full"><img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.img} /></a>
        {product.badge ? (<span className={`absolute top-3 left-3 px-2.5 py-1 rounded font-label-caps text-[10px] uppercase font-bold tracking-wider ${badgeClass[product.badge] || ""}`}>{product.badge}</span>) : null}
        <button type="button" aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} onClick={() => onToggle(product.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background-base/80 backdrop-blur-sm flex items-center justify-center transition-colors">
          <span className={`material-symbols-outlined text-[20px] ${saved ? "msym-fill text-primary-container" : "text-text-muted"}`}>favorite</span>
        </button>
      </div>
      <div className="p-space-md flex flex-col gap-2 flex-1">
        <span className="self-start inline-flex items-center rounded-full border border-primary-container/60 text-primary px-2.5 py-0.5 font-label-caps text-[10px] uppercase tracking-wider">{product.tag}</span>
        <a href={href} className="hover:text-primary transition-colors"><h3 className="font-body-md text-[16px] font-semibold text-text-heading leading-snug line-clamp-2">{product.name}</h3></a>
        <span className="font-mono-clinical text-[11px] text-primary uppercase">{product.active}</span>
        <div className="flex items-center gap-1.5"><span className="material-symbols-outlined msym-fill text-[16px] text-primary-container">star</span><span className="font-mono-clinical text-mono-clinical font-bold text-text-heading">{product.ratingText}</span><span className="font-body-sm text-[12px] text-text-muted">{product.reviews}</span></div>
        <div className="flex items-baseline gap-2 mt-auto pt-1"><span className="font-headline-sm text-[18px] font-semibold text-text-heading">&#8377;{product.priceText}</span><span className="font-body-sm text-[13px] line-through text-text-muted">&#8377;{product.mrpText}</span><span className="font-mono-clinical text-[11px] text-accent-alert font-bold uppercase">{product.off}</span></div>
        <div className="mt-2 lg:opacity-0 lg:translate-y-1 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300">
          <button type="button" className="w-full bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-[0.10em] py-2.5 rounded hover:bg-primary-container transition-colors flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
