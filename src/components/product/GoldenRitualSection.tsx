const STEPS = [
  { label: "Step 01 - Prep", title: "Cleanse & Tone", body: "Dispense on freshly cleansed, damp skin. Spritz botanical toner to allow the gold micro-particles to glide uniformly.", note: "Dosage: freshly dried skin" },
  { label: "Step 02 - Thermal Action", title: "Activate", body: "Warm 3-4 drops between palms. The gentle friction activates the suspension of pure 24K elemental gold leaf.", note: "Dosage: 3 to 4 drops" },
  { label: "Step 03 - Lymphatic Drift", title: "Press & Glide", body: "Gently press into cheeks, forehead, and collarbones using continuous upward lifting strokes towards the hairline.", note: "Technique: upward feathering" },
  { label: "Step 04 - Barrier Lock", title: "Seal", body: "Follow with the Nutraciti Ceramide Souffle to seal in active peptides and lock luminous, hydrated moisture overnight.", note: "Frequency: nightly routine" },
];

export default function GoldenRitualSection() {
  return (
    <section className="max-w-[1360px] mx-auto w-full px-margin-mobile md:px-margin py-space-xl">
      <div className="space-y-space-xl">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-primary-container font-semibold">Application Protocol</span>
          <h2 className="font-headline-lg text-headline-lg text-text-heading">How to Use: The Golden Ritual</h2>
          <p className="font-body-md text-body-md text-text-muted">A dedicated two-minute evening ritual to maximise deep epidermal absorption.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {STEPS.map((s, i) => (
            <div key={i} className="p-space-lg rounded-xl bg-surface-card shadow-sm relative flex flex-col space-y-space-sm hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-gold-start to-gradient-gold-end text-on-primary font-headline-sm flex items-center justify-center shadow-sm">{i + 1}</div>
              <div className="space-y-1"><span className="font-mono-clinical text-[11px] text-primary uppercase">{s.label}</span><h4 className="font-headline-sm text-headline-sm text-text-heading">{s.title}</h4></div>
              <p className="font-body-md text-body-md text-on-surface-variant">{s.body}</p>
              <div className="pt-space-xs mt-auto"><span className="font-mono-clinical text-[11px] text-outline">{s.note}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
