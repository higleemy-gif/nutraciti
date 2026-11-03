export default function Hero() {
  return (
    <section className="w-full bg-surface-card overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-lg lg:py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[580px]">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-space-md py-space-sm pr-0 lg:pr-space-lg">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-primary-container"></span>
              <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-[0.14em]">NEW COLLECTION &mdash; MONSOON GLOW</span>
            </div>
            <h1 className="font-display-hero text-display-hero text-text-heading tracking-tight leading-[1.08] max-w-xl">Skin That Speaks for Itself.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">Science-backed. Nature-rooted. Crafted specifically for Indian skin across tropical humidity and dry heat.</p>
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <a className="px-space-lg py-space-sm bg-primary-container text-surface-container-lowest font-button-text text-button-text uppercase tracking-widest rounded transition-all duration-300 shadow-[0_4px_20px_rgba(204,156,82,0.3)] hover:bg-gradient-gold-end hover:shadow-none hover:-translate-y-0.5" href="/shop">Shop Everyday Care</a>
              <a className="px-space-lg py-space-sm bg-transparent text-secondary border border-secondary font-button-text text-button-text uppercase tracking-widest rounded transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-0.5" href="/shop">Explore Premium</a>
            </div>
            <div className="pt-space-md mt-space-sm border-t border-border-subtle flex flex-wrap items-center gap-x-space-md gap-y-2 text-on-surface-variant font-mono-clinical text-mono-clinical">
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined msym-fill text-[16px] text-primary-container">verified</span><span>Dermatologist Tested</span></div>
              <span className="text-outline-variant hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined msym-fill text-[16px] text-primary-container">spa</span><span>No Parabens &amp; Sulfates</span></div>
              <span className="text-outline-variant hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined msym-fill text-[16px] text-primary-container">wb_sunny</span><span>Made for Indian Climate</span></div>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(126,83,30,0.12)]">
              <img alt="Radiant smiling Indian woman holding a golden facial serum bottle" className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH9SJQi8-gnzpmnGvbE31zSyNo4MV4evQ7UWIz9kCICFTokzb8NfUQU9lnvNiUIuG6lhCNGAMuSL1AT5bioaEMSofMzBpCy3Ah2rgDCnoXmRFiXN1zHH4kWU8IcX42V6THFFcNsutB0YMuBD0F8xP6iP0yIIPvAHMmXQtvYPoOiy7VC8x8CPf-_Ez6JqzdcVrqQDmy7Suuw67L4EO2HrAkWcGFCrLCSN0q5zbKnf6oCGaI_8AU1er6" />
              <div className="absolute inset-0 bg-gradient-to-t from-text-heading/40 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-background-base/90 backdrop-blur-md px-space-md py-space-sm rounded-lg border border-border-subtle/80 flex items-center justify-between">
                <div className="flex flex-col"><span className="font-mono-clinical text-[11px] text-primary tracking-wider uppercase">Clinical Efficacy</span><span className="font-headline-sm text-[16px] text-text-heading leading-tight">+94% Hydration &amp; Tone Balance</span></div>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary font-mono-clinical text-[10px] uppercase font-semibold">14 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
