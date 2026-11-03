export default function Reviews() {
  const items = [
    { quote: "The Saffron 24K Elixir transformed my post-monsoon dullness within two weeks. My skin looks plump, soft, and feels genuinely deeply nourished without any midday greasy film.", badge: "14-Day Result", initials: "PM", name: "Priya M.", city: "Bengaluru", role: "Verified Buyer" },
    { quote: "Living in Mumbai humidity, serums usually feel like a sticky mask. The Nutraciti Niacinamide formula absorbs in literal seconds. My stubborn acne marks faded visibly before a big family wedding.", badge: "Blemish Reset", initials: "AS", name: "Ananya S.", city: "Mumbai", role: "Verified Buyer" },
    { quote: "As a practicing clinician, I look strictly at formulation balance and lipid barrier mimicry. The Nutraciti Ceramide Souffle is masterfully engineered for sensitized barrier recovery.", badge: "Derm Review", initials: "RK", name: "Dr. Rohit K.", city: "New Delhi", role: "Consultant Dermatologist" },
  ];
  return (
    <section className="w-full py-space-xl bg-background-base">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-xl mx-auto mb-space-lg">
          <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Clinical Proof & Stories</span>
          <h2 className="font-headline-lg text-headline-lg text-text-heading mt-1">Real Skin. Real Results.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Authentic experiences from our multi-generational community across India.</p>
          <div className="w-12 h-[2px] bg-primary-container mx-auto mt-space-xs"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {items.map((t) => (
            <div key={t.name} className="bg-surface-card rounded-lg border border-border-subtle p-space-lg flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_24px_rgba(126,83,30,0.08)] hover:-translate-y-1">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex text-primary-container">
                    {[0,1,2,3,4].map((i) => (<span key={i} className="material-symbols-outlined msym-fill text-[18px]">star</span>))}
                  </div>
                  <span className="font-mono-clinical text-[11px] text-primary bg-primary-fixed/30 px-2 py-0.5 rounded uppercase font-semibold">{t.badge}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="pt-space-md mt-space-md border-t border-border-subtle/60 flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm text-[16px] text-secondary font-bold">{t.initials}</div>
                <div>
                  <div className="flex items-center gap-1.5"><h4 className="font-button-text text-button-text text-text-heading">{t.name}</h4><span className="material-symbols-outlined msym-fill text-[14px] text-primary">verified</span></div>
                  <p className="font-mono-clinical text-[11px] text-text-muted">{t.city} &bull; {t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
