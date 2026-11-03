function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function Bestsellers() {
  const products = [
    { tag: "Bestseller", tagClass: "bg-gradient-gold-end text-surface", forText: "For Pigmentation", name: "Luxury Ayurvedic Dark Spot Serum", actives: "Saffron + Licorice Extract", rating: "4.8", reviews: "(1,634)", price: "1,099", mrp: "1,499", off: "26% OFF", img: "/products/luxury-ayurvedic-dark-spot-serum.jpeg" },
    { tag: "Sun Care", tagClass: "bg-tertiary text-on-tertiary", forText: "For All Skin", name: "Luxury FluidShield Sunscreen", actives: "SPF 50+ PA++++", rating: "4.9", reviews: "(2,110)", price: "599", mrp: "799", off: "25% OFF", img: "/products/luxury-fluidshield-sunscreen.png" },
    { tag: "Premium", tagClass: "bg-secondary text-surface", forText: "For Anti-Ageing", name: "Premium Ayurvedic Night Cream", actives: "Retinol + Kumkumadi", rating: "4.8", reviews: "(1,355)", price: "1,199", mrp: "1,599", off: "25% OFF", img: "/products/premium-ayurvedic-night-cream.png" },
    { tag: "Clear Skin", tagClass: "bg-primary/80 text-surface", forText: "For Dull Skin", name: "Professional Face Serum", actives: "Vitamin C 15% + Ferulic", rating: "4.7", reviews: "(1,489)", price: "799", mrp: "1,099", off: "27% OFF", img: "/products/professional-face-serum.jpeg" },
  ];
  return (
    <section className="w-full py-space-xl bg-surface-card border-t border-border-subtle">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div><span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Dermatologist Recommended</span><h2 className="font-headline-lg text-headline-lg text-text-heading mt-1">Our Bestsellers</h2><p className="font-body-md text-body-md text-on-surface-variant mt-1">Formulated for visible radiance in 14 days without sensitization.</p></div>
          <a href="/shop" className="hidden sm:inline-flex items-center gap-1 mt-4 md:mt-0 font-button-text text-button-text uppercase tracking-wider text-primary hover:text-primary-container transition-colors">View All <span className="material-symbols-outlined text-[18px]">arrow_forward</span></a>
        </div>
        <div className="flex lg:grid lg:grid-cols-4 gap-gutter overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
          {products.map((p) => {
            const href = `/products/${slugify(p.name)}`;
            return (
            <div key={p.name} className="group bg-background-base rounded-lg border border-border-subtle overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_24px_rgba(126,83,30,0.12)] hover:-translate-y-1 min-w-[78%] sm:min-w-[300px] lg:min-w-0 snap-start">
              <div>
                <div className="relative w-full aspect-square bg-surface-card overflow-hidden">
                  <a href={href} aria-label={p.name} className="block w-full h-full"><img alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.img} /></a>
                  <span className={`absolute top-2.5 left-2.5 ${p.tagClass} px-2 py-0.5 rounded font-label-caps text-[10px] uppercase font-bold tracking-wider`}>{p.tag}</span>
                  <button aria-label="Add to wishlist" className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-background-base/80 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-error transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">favorite</span></button>
                </div>
                <div className="p-space-md space-y-2">
                  <span className="font-mono-clinical text-[11px] text-primary uppercase block">{p.forText}</span>
                  <a href={href} className="block hover:text-primary transition-colors"><h3 className="font-headline-sm text-[18px] text-text-heading line-clamp-1 leading-snug">{p.name}</h3></a>
                  <p className="font-body-sm text-body-sm text-text-muted">{p.actives}</p>
                  <div className="flex items-center gap-1.5 text-secondary pt-0.5"><span className="material-symbols-outlined msym-fill text-[16px] text-primary-container">star</span><span className="font-mono-clinical text-mono-clinical font-bold text-text-heading">{p.rating}</span><span className="font-body-sm text-[12px] text-text-muted">{p.reviews}</span></div>
                </div>
              </div>
              <div className="p-space-md pt-0 space-y-3">
                <div className="flex items-baseline gap-2"><span className="font-headline-sm text-headline-sm font-semibold text-text-heading">&#8377;{p.price}</span><span className="font-body-sm text-body-sm line-through text-text-muted">&#8377;{p.mrp}</span><span className="font-mono-clinical text-[11px] text-accent-alert font-bold uppercase">{p.off}</span></div>
                <button className="w-full bg-primary-container text-on-primary-container font-button-text text-button-text uppercase py-2 rounded transition-colors duration-200 hover:bg-gradient-gold-end hover:text-on-primary flex items-center justify-center gap-2" type="button"><span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to Cart</button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
