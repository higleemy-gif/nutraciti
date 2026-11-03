export default function IngredientStory() {
  return (
    <section className="w-full py-space-xl bg-surface-card">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 space-y-space-md">
            <div className="inline-flex items-center gap-2"><span className="w-6 h-[1.5px] bg-primary-container"></span><span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Biocompatible Formulations</span></div>
            <h2 className="font-headline-lg text-headline-lg text-text-heading leading-tight">Every Ingredient. Every Drop. Purposeful.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Indian skin possesses distinct epidermal density, higher melanin responsiveness to post-inflammatory hyperpigmentation, and unique lipid barrier shifts between humid monsoons and dry summers.</p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Our biotechnology laboratory marries cold-pressed Vedic botanical adaptogens with high-potency Swiss clinical actives, ensuring optimal cell affinity without sensitization or heavy occlusive buildup.</p>
            <div className="pt-space-xs"><a className="inline-flex items-center gap-2 font-button-text text-button-text uppercase text-secondary tracking-widest border-b border-primary-container pb-1 hover:text-primary transition-colors" href="#">Read Our Formulation Standard <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span></a></div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-space-sm mt-6 lg:mt-0">
            <div className="p-space-lg rounded-lg bg-background-base border border-border-subtle shadow-sm transition-all duration-300 hover:border-primary-container/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2"><div className="flex items-center gap-2.5"><span className="font-mono-clinical text-primary font-bold text-[14px] bg-primary/10 px-2.5 py-1 rounded">NIACINAMIDE 10%</span><span className="font-mono-clinical text-mono-clinical text-text-muted">&bull; Vitamin B3</span></div><span className="font-mono-clinical text-[11px] text-primary tracking-wider uppercase">Pore Refiner</span></div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Dismantles stubborn melanin transfers to fade acne scars, corrects uneven skin texture, and naturally controls excessive sebum caused by high humidity.</p>
            </div>
            <div className="p-space-lg rounded-lg bg-background-base border border-border-subtle shadow-sm transition-all duration-300 hover:border-primary-container/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2"><div className="flex items-center gap-2.5"><span className="font-mono-clinical text-primary font-bold text-[14px] bg-primary/10 px-2.5 py-1 rounded">TRIPLE HA COMPLEX</span><span className="font-mono-clinical text-mono-clinical text-text-muted">&bull; Multi-Molecular</span></div><span className="font-mono-clinical text-[11px] text-primary tracking-wider uppercase">Deep Hydrator</span></div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Combines high, medium, and low molecular weight hyaluronic acid to deliver immediate surface plumpness and 72-hour sustained multi-depth moisture without greasiness.</p>
            </div>
            <div className="p-space-lg rounded-lg bg-background-base border border-border-subtle shadow-sm transition-all duration-300 hover:border-primary-container/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2"><div className="flex items-center gap-2.5"><span className="font-mono-clinical text-primary font-bold text-[14px] bg-primary/10 px-2.5 py-1 rounded">STABILIZED VIT-C 15%</span><span className="font-mono-clinical text-mono-clinical text-text-muted">&bull; 3-O-Ethyl Ascorbic</span></div><span className="font-mono-clinical text-[11px] text-primary tracking-wider uppercase">Anti-Pollution</span></div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Highly stable non-oxidizing Vitamin C derivative that shields skin cells from UV pollution free radicals and stimulates endogenous collagen production for lasting radiance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
