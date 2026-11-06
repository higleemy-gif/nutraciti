const ITEMS = [
  { img: "/products/ana-ayurvedic-face-mask.png", slug: "ana-ayurvedic-face-mask", step: "PREP", tag: "WEEKLY DETOX", name: "Ana Ayurvedic Face Mask", body: "Detoxifying clay ritual with turmeric and sandalwood.", price: "699", size: "100g" },
  { img: "/products/premium-ayurvedic-night-cream.jpeg", slug: "premium-ayurvedic-night-cream", step: "NIGHT", tag: "BARRIER REPAIR", name: "Premium Ayurvedic Night Cream", body: "Overnight renewal with Kumkumadi and retinol.", price: "1,199", size: "50g" },
  { img: "/products/luxury-fluidshield-sunscreen.png", slug: "luxury-fluidshield-sunscreen", step: "DAYTIME SHIELD", tag: "ZERO WHITE CAST", name: "Luxury FluidShield Sunscreen", body: "Ultralight SPF 50+ with niacinamide and cica extract.", price: "599", size: "50ml" },
];

export default function CompleteRitualSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin space-y-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
          <div><span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">Synergistic Regimen</span><h2 className="font-headline-lg text-headline-lg text-text-heading">Complete Your Ritual</h2><p className="font-body-md text-body-md text-text-muted">Curated to amplify radiance and protect delicate barrier function.</p></div>
          <a href="/shop" className="font-button-text text-button-text text-primary hover:text-text-heading flex items-center gap-1 uppercase tracking-wider">View Full Regimen Set <span className="material-symbols-outlined text-[18px]">arrow_forward</span></a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {ITEMS.map((it) => (
            <div key={it.name} className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div>
                <a href={`/products/${it.slug}`} className="block relative aspect-[4/3] rounded-lg overflow-hidden bg-background-base mb-space-sm"><img alt={it.name} src={it.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-background-base/90 font-mono-clinical text-[10px] text-secondary font-medium">{it.step}</span></a>
                <div className="space-y-1"><span className="font-label-caps text-[11px] tracking-widest text-primary uppercase">{it.tag}</span><a href={`/products/${it.slug}`} className="block hover:text-primary transition-colors"><h3 className="font-headline-sm text-headline-sm text-text-heading">{it.name}</h3></a><p className="font-body-sm text-body-sm text-on-surface-variant">{it.body}</p></div>
              </div>
              <div className="pt-space-md flex items-center justify-between mt-space-md"><div><span className="font-headline-sm text-headline-sm text-text-heading">&#8377;{it.price}</span><span className="block font-mono-clinical text-[11px] text-text-muted">{it.size}</span></div><button type="button" className="px-space-md py-2 rounded bg-gradient-to-r from-gradient-gold-start to-gradient-gold-end text-on-primary font-button-text text-[11px] tracking-widest uppercase hover:opacity-90 shadow-sm transition-all">Add to Cart</button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
