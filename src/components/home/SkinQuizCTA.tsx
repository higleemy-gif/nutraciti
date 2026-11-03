export default function SkinQuizCTA() {
  return (
    <section className="w-full bg-text-heading text-background-base relative overflow-hidden py-space-xl">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-space-sm"><span className="w-5 h-[1px] bg-primary-container"></span><span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Personalize Your Routine</span><span className="w-5 h-[1px] bg-primary-container"></span></div>
        <h2 className="font-display-hero text-[40px] md:text-[52px] leading-tight text-background-base max-w-2xl">Not Sure Where to Start?</h2>
        <p className="font-body-lg text-body-lg text-outline-variant max-w-xl mt-space-sm leading-relaxed">Take our 60-second skin diagnosis calibrated for your local climate, age, and individual concerns to receive a custom routine validated by dermatologists.</p>
        <div className="pt-space-md"><a className="inline-flex items-center gap-2 px-space-xl py-space-sm bg-primary-container text-on-primary-container font-button-text text-button-text uppercase tracking-widest rounded transition-all duration-300 hover:bg-gradient-gold-end hover:text-on-primary shadow-[0_4px_24px_rgba(204,156,82,0.3)] hover:-translate-y-0.5" href="#">Take the Skin Quiz <span className="material-symbols-outlined text-[18px]">arrow_forward</span></a></div>
        <div className="mt-space-md flex flex-wrap items-center justify-center gap-space-lg text-outline-variant font-mono-clinical text-[12px]"><span>&bull; Takes 60 Seconds</span><span>&bull; Instant Regimen Match</span><span>&bull; Free Product Sample Included</span></div>
      </div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-container/10 blur-[100px] pointer-events-none"></div>
    </section>
  );
}
