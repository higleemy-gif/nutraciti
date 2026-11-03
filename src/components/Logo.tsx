type LogoProps = { variant?: "navbar" | "footer" };

export default function Logo({ variant = "navbar" }: LogoProps) {
  const isFooter = variant === "footer";
  return (
    <a href="/" aria-label="Nutraciti International home" className="inline-flex flex-col items-center leading-none select-none">
      <span className={`font-display-hero font-normal bg-gradient-to-r from-gold to-bronze bg-clip-text text-transparent ${isFooter ? "text-[36px]" : "text-[28px]"}`}>nutraciti</span>
      <span className={`font-label-caps text-bronze text-center tracking-[0.25em] ${isFooter ? "text-[12px] mt-1.5" : "text-[10px] mt-1"}`}>&mdash; INTERNATIONAL &mdash;</span>
    </a>
  );
}
