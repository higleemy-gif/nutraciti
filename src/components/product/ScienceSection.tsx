const PILLARS = [
  { icon: "science", level: "CLINICALLY TESTED", name: "Dermatologist Validated", body: "Every formula is evaluated across diverse Indian skin tones for efficacy and tolerance before launch.", stat: "Tested on 8 skin tones" },
  { icon: "spa", level: "CLEAN ACTIVES", name: "Ayurveda, Refined by Science", body: "Cold-pressed botanical adaptogens paired with high-potency clinical actives, with no parabens or sulphates.", stat: "No parabens or sulphates" },
  { icon: "wb_sunny", level: "MADE FOR INDIA", name: "Built for Indian Climate", body: "Lightweight, fast-absorbing textures engineered for humidity, heat, and pollution across seasons.", stat: "Humidity-proof textures" },
];

export default function ScienceSection() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl my-space-lg">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <div className="inline-flex items-center gap-2 mb-1"><span className="w-4 h-0.5 bg-primary-container"></span><span className="font-label-caps text-label-caps tracking-widest uppercase text-primary font-semibold">The Science Behind It</span><span className="w-4 h-0.5 bg-primary-container"></span></div>
          <h2 className="font-headline-lg text-headline-lg text-text-heading">Clinically Proven, Ayurveda Refined</h2>
          <p className="font-headline-sm text-headline-sm text-secondary italic font-normal">Ancient botanicals, meet modern dermatology</p>
          <p className="font-body-md text-body-md text-on-surface-variant pt-2">Engineered to target pigmentation, dullness, and environmental stress, tailored for South Asian dermal physiology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {PILLARS.map((c) => (
            <div key={c.name} className="bg-background-base rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-space-md">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-inner"><span className="material-symbols-outlined text-on-primary text-[34px]">{c.icon}</span></div>
              <div className="space-y-1"><span className="font-mono-clinical text-mono-clinical text-primary tracking-widest uppercase block">{c.level}</span><h3 className="font-headline-sm text-headline-sm text-text-heading">{c.name}</h3></div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{c.body}</p>
              <div className="mt-auto pt-space-xs"><span className="font-mono-clinical text-[11px] px-3 py-1 rounded-full bg-surface-card text-secondary">{c.stat}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
