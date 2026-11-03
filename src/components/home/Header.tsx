import Logo from "@/components/Logo";
import SearchBox from "@/components/home/SearchBox";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_4px_24px_rgba(126,83,30,0.08)]">
      <div className="bg-gradient-gold-end text-surface px-margin-mobile md:px-margin py-space-xs text-center border-b border-primary/20">
        <p className="font-label-caps text-label-caps tracking-widest uppercase text-on-primary">Free Shipping on Orders Above &#8377;499 | COD Available | Dermatologist Tested</p>
      </div>
      <div className="bg-background-base/95 backdrop-blur-md border-b border-border-subtle">
        <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
          <div className="flex items-center flex-1 min-w-0"><Logo variant="navbar" /></div>
          <nav className="hidden lg:flex items-center gap-space-lg flex-none">
            <a aria-current="page" className="font-label-caps text-label-caps uppercase transition-colors text-primary font-bold border-b-2 border-primary-container pb-1" href="/shop">SHOP</a>
            <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent pb-1" href="#">COLLECTIONS</a>
            <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent pb-1" href="/about">ABOUT</a>
            <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent pb-1" href="#">INGREDIENTS</a>
            <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent pb-1" href="#">SKIN QUIZ</a>
            <a className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent pb-1" href="#">BLOG</a>
          </nav>
          <div className="flex items-center gap-space-xs text-on-surface flex-1 justify-end">
            <SearchBox />
            <a aria-label="Wishlist" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors" href="/wishlist"><span className="relative inline-flex"><span className="material-symbols-outlined text-[22px]">favorite</span><span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-container ring-2 ring-background-base"></span></span></a>
            <a aria-label="Shopping cart" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors" href="/cart"><span className="relative inline-flex"><span className="material-symbols-outlined text-[22px]">shopping_bag</span><span className="absolute -top-2 -right-2 bg-gradient-gold-end text-on-primary text-[10px] font-label-caps font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span></span></a>
            <a aria-label="Account" href="/login" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[22px]">person</span></a>
          </div>
        </div>
      </div>
    </header>
  );
}
