import type { Metadata } from "next";
import LoginFlow from "@/components/auth/LoginFlow";

export const metadata: Metadata = {
  title: "Sign In or Create Account | Nutraciti International",
  description: "Sign in with your phone number or Google to start your Nutraciti skincare journey.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-background-base">
      <div className="hidden lg:block relative w-1/2">
        <img alt="Indian woman with glowing skin holding a serum" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH9SJQi8-gnzpmnGvbE31zSyNo4MV4evQ7UWIz9kCICFTokzb8NfUQU9lnvNiUIuG6lhCNGAMuSL1AT5bioaEMSofMzBpCy3Ah2rgDCnoXmRFiXN1zHH4kWU8IcX42V6THFFcNsutB0YMuBD0F8xP6iP0yIIPvAHMmXQtvYPoOiy7VC8x8CPf-_Ez6JqzdcVrqQDmy7Suuw67L4EO2HrAkWcGFCrLCSN0q5zbKnf6oCGaI_8AU1er6" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-text-heading/80 via-text-heading/20 to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex flex-col leading-none"><span className="font-display-hero text-[30px] text-background-base">nutraciti</span><span className="font-label-caps text-[10px] tracking-[0.25em] text-background-base/80 mt-1">&mdash; INTERNATIONAL &mdash;</span></div>
          <p className="font-display-hero italic text-[40px] leading-tight text-background-base mt-space-md">Your Ritual. Your Glow.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <LoginFlow />
      </div>
    </div>
  );
}
