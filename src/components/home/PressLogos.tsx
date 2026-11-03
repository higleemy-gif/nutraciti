export default function PressLogos() {
  const press = ["Vogue India", "Femina", "NDTV", "Healthshots"];
  return (
    <section className="w-full py-space-lg bg-surface-card border-y border-border-subtle">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin text-center">
        <div className="inline-flex items-center justify-center gap-4 mb-space-md w-full"><span className="h-[1px] bg-border-subtle flex-1 max-w-[120px]"></span><span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-text-muted">As Featured In Leading Publications</span><span className="h-[1px] bg-border-subtle flex-1 max-w-[120px]"></span></div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {press.map((name) => (<span key={name} className="font-headline-sm text-[22px] tracking-widest uppercase text-text-heading hover:text-primary-container transition-colors">{name}</span>))}
        </div>
      </div>
    </section>
  );
}
