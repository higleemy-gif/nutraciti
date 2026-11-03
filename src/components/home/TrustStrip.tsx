export default function TrustStrip() {
  return (
    <section className="w-full bg-surface-container-high/60 border-y border-border-subtle">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter divide-y sm:divide-y-0 lg:divide-x divide-border-subtle/70">
          <div className="flex items-start gap-space-sm pt-space-sm sm:pt-0 lg:px-space-sm first:pl-0">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0"><span className="material-symbols-outlined text-[20px]">science</span></div>
            <div><h4 className="font-button-text text-button-text uppercase tracking-wider text-text-heading">Dermatologist Approved</h4><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Clinically evaluated across 8 diverse Indian skin tones.</p></div>
          </div>
          <div className="flex items-start gap-space-sm pt-space-sm sm:pt-0 lg:px-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0"><span className="material-symbols-outlined text-[20px]">eco</span></div>
            <div><h4 className="font-button-text text-button-text uppercase tracking-wider text-text-heading">Clean Botanical Actives</h4><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Zero synthetic fragrances, parabens, or heavy silicones.</p></div>
          </div>
          <div className="flex items-start gap-space-sm pt-space-sm sm:pt-0 lg:px-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0"><span className="material-symbols-outlined text-[20px]">routine</span></div>
            <div><h4 className="font-button-text text-button-text uppercase tracking-wider text-text-heading">Indian Weather Ready</h4><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Humidity-proof, ultra-lightweight, and fast-absorbing.</p></div>
          </div>
          <div className="flex items-start gap-space-sm pt-space-sm sm:pt-0 lg:px-space-sm last:pr-0">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0"><span className="material-symbols-outlined msym-fill text-[20px]">star</span></div>
            <div><h4 className="font-button-text text-button-text uppercase tracking-wider text-text-heading">50,000+ Happy Customers</h4><p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">4.8 / 5 average rating from verified multi-generational users.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
