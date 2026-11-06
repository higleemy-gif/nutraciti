type LogoProps = { variant?: "navbar" | "footer" };

export default function Logo({ variant = "navbar" }: LogoProps) {
  const isFooter = variant === "footer";
  return (
    <a href="/" aria-label="Nutraciti International home" className="inline-flex items-center select-none">
      <img src="/images/logo.png" alt="Nutraciti International" className={`${isFooter ? "h-14" : "h-11"} w-auto object-contain`} />
    </a>
  );
}
