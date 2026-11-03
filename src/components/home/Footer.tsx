import Logo from "@/components/Logo";

export default function Footer() {
  const quick = ["Shop All", "Bestsellers", "Monsoon Care", "Everyday Essentials", "Gift Sets", "Lab Science"];
  const care = ["Track Order", "Free Returns & Exchanges", "FAQs", "Contact Dermatologist", "Shipping Policy"];
  const socials = ["photo_camera", "thumb_up", "play_circle", "push_pin"];
  const pay = ["VISA", "MASTERCARD", "UPI", "RUPAY", "RAZORPAY"];
  return (
    <footer className="w-full bg-text-heading text-background-base border-t border-border-subtle/20">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          <div className="space-y-space-md">
            <Logo variant="footer" />
            <p className="font-body-sm text-body-sm text-outline-variant max-w-sm">Science-backed skincare, rooted in nature, crafted for Indian skin.</p>
            <div className="flex items-center gap-space-sm pt-space-xs">{socials.map((ic) => (<a key={ic} aria-label="Social link" className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-outline-variant hover:text-primary-container hover:border-primary-container transition-colors" href="#"><span className="material-symbols-outlined text-[16px]">{ic}</span></a>))}</div>
          </div>
          <div className="space-y-space-md"><h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Quick Links</h3><ul className="space-y-space-xs">{quick.map((l) => (<li key={l} className="py-0.5"><a className="font-body-sm text-body-sm text-outline-variant hover:text-surface transition-colors" href="#">{l}</a></li>))}</ul></div>
          <div className="space-y-space-md"><h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Customer Care</h3><ul className="space-y-space-xs">{care.map((l) => (<li key={l} className="py-0.5"><a className="font-body-sm text-body-sm text-outline-variant hover:text-surface transition-colors" href="#">{l}</a></li>))}</ul></div>
          <div className="space-y-space-md"><h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Glow Club Newsletter</h3><p className="font-body-sm text-body-sm text-outline-variant">Get glow tips and exclusive offers directly to your inbox.</p><form className="space-y-space-sm pt-space-xs"><div className="relative"><input className="w-full px-space-md py-space-sm bg-surface-card/10 border border-border-subtle/30 rounded text-surface placeholder:text-text-muted text-body-sm focus:outline-none focus:border-primary-container transition-colors" placeholder="Enter your email address" type="email" aria-label="Email address" /></div><button className="w-full bg-primary-container text-on-primary-container font-button-text text-button-text py-space-sm px-space-md rounded uppercase tracking-wider hover:bg-gradient-gold-end hover:text-on-primary transition-all duration-300" type="button">Subscribe</button></form></div>
        </div>
        <div className="pt-space-lg border-t border-border-subtle/10 flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="font-mono-clinical text-mono-clinical text-outline-variant text-center md:text-left">Made in India &#x1F1EE;&#x1F1F3; | &copy; 2025 Nutraciti International | 100% Safe Payments</p>
          <div className="flex flex-wrap items-center justify-center gap-space-xs">{pay.map((p) => (<span key={p} className="font-mono-clinical text-[11px] px-space-sm py-0.5 rounded border border-border-subtle/30 text-outline-variant bg-surface-card/5">{p}</span>))}</div>
        </div>
      </div>
    </footer>
  );
}
