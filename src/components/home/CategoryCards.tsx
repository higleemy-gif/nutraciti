export default function CategoryCards() {
  return (
    <section className="w-full py-space-xl bg-background-base">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-xl mx-auto mb-space-lg">
          <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Tailored Rituals</span>
          <h2 className="font-headline-lg text-headline-lg text-text-heading mt-1">Find What Your Skin Needs</h2>
          <div className="w-12 h-[2px] bg-primary-container mx-auto mt-space-xs"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="group relative rounded-lg bg-surface-card border border-border-subtle p-space-lg flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(126,83,30,0.1)] hover:-translate-y-1">
            <div className="space-y-space-sm">
              <div className="h-56 w-full rounded overflow-hidden relative bg-surface-container-high"><img alt="Daily essentials skincare shelf" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLA_HSwUQ2pBr6WFXKTq8fu-YHCk2ibp2GXtsBLAeQnNyYbN2ZdkcGnBIhk80lrahHPDBDi60ifFZkuyinv-KxG6CjX5_lsinxKR9XbkAoXHYmE0WMxl-lmWt3JW7EZCBgW2WMx8noPB0uPMbUKDDtC-OXgVEdPbE4kmWSg1dFx3gzw2tkmb-VOfeOwdkuBzYmEJgyck0NJ2q_dRE_0bvt2nGs5Z96EO6FWKJYg8TIBFxxgJFRc9MK" /><span className="absolute top-3 left-3 bg-surface-card/90 backdrop-blur-sm px-2.5 py-1 rounded font-mono-clinical text-[11px] text-primary uppercase">Core Step</span></div>
              <h3 className="font-headline-sm text-headline-sm text-text-heading">Daily Essentials</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Balanced pH foaming cleanser, multi-ceramide barrier hydration souffle, and invisible broad-spectrum Dewy SPF 50+ sunscreen.</p>
            </div>
            <div className="pt-space-md mt-space-sm border-t border-border-subtle/60 flex items-center justify-between"><span className="font-mono-clinical text-mono-clinical text-text-muted">3 Curated Products</span><a className="inline-flex items-center gap-1 font-button-text text-button-text uppercase text-primary hover:text-primary-container transition-colors" href="/shop">Explore Routine <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a></div>
          </div>
          <div className="group relative rounded-lg bg-gradient-gold-end text-surface-container-lowest p-space-lg flex flex-col justify-between shadow-[0_8px_32px_rgba(126,83,30,0.2)] transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-space-sm">
              <div className="h-56 w-full rounded overflow-hidden relative bg-text-heading"><img alt="Premium luxury saffron gold elixir" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIYWHY0ZDHzadktFWBik0ZRCB24INoZLCa4KKEhlVA3hXgAwo0x_9WK9Tog0FuNsllyubfsNdE8hmrMxSik4s_F83Da3ShsQWfqS6sGT_H6JUVzZuP4NM9BYsMU2OaVNcE565k7R2njm-KRYxDmrdUZOrncX5-v0PpxMYl5XFjq4bH7Rlv-SH7GBvpLJulz5O1Y9fnjp1VW_X-sEb88Qu4E116IQe5PbgxFQhsUn0qFLIomzs_6jLy" /><span className="absolute top-3 left-3 bg-primary-container text-on-primary-container font-label-caps text-[10px] tracking-widest px-2.5 py-0.5 rounded font-bold uppercase">PREMIUM</span></div>
              <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest">Premium Luxury Line</h3>
              <p className="font-body-sm text-body-sm text-surface-container-high/90">Infused with hand-harvested Kashmiri saffron, active multi-peptides, and 24K suspended gold flakes for timeless cell renewal.</p>
            </div>
            <div className="pt-space-md mt-space-sm border-t border-primary/40 flex items-center justify-between"><span className="font-mono-clinical text-mono-clinical text-surface-container-high/70">Potent Botanicals</span><a className="inline-flex items-center gap-1 font-button-text text-button-text uppercase text-primary-fixed hover:text-surface-container-lowest transition-colors" href="/shop">Explore Elixirs <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a></div>
          </div>
          <div className="group relative rounded-lg bg-surface-card border border-border-subtle p-space-lg flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(126,83,30,0.1)] hover:-translate-y-1">
            <div className="space-y-space-sm">
              <div className="h-56 w-full rounded overflow-hidden relative bg-surface-container-high"><img alt="Targeted treatment serums" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-QkYv1glSKRrhzRm_eHCqk9hyAA4WtKCdSTOpEjyo385H30Ea6ZA_9psOjLbce8rXrE7jZDpnopv8yVMQheZRdyAX7Cgle8itaU_ipvhGeD4ujEsnx5PJ9EzmgAG_YgQGFCx8r6OLyyMMNPKG2SGhiAQRhToucr3VoDSor3H3q8HBR-S9wc_-1VE94EHeebMujLX1lgr4gmINeZi7AJf88zgLwx8UvnGlFbfvNnMP3KtpeGR0KsxS" /><span className="absolute top-3 left-3 bg-surface-card/90 backdrop-blur-sm px-2.5 py-1 rounded font-mono-clinical text-[11px] text-primary uppercase">Targeted</span></div>
              <h3 className="font-headline-sm text-headline-sm text-text-heading">Targeted Treatments</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Dermatological concentrations of Niacinamide 10%, 15% Vitamin C glow concentrate, and soothing Salicylic acid spot repair.</p>
            </div>
            <div className="pt-space-md mt-space-sm border-t border-border-subtle/60 flex items-center justify-between"><span className="font-mono-clinical text-mono-clinical text-text-muted">Clinical Solvers</span><a className="inline-flex items-center gap-1 font-button-text text-button-text uppercase text-primary hover:text-primary-container transition-colors" href="/shop">Explore Solutions <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
