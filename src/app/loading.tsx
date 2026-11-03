import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-base">
      <div className="animate-pulse"><Logo variant="footer" /></div>
    </div>
  );
}
