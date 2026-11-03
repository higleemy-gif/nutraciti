"use client";

import { useEffect, useRef, useState } from "react";

type Screen = "phone" | "otp" | "profile" | "success";

export default function LoginFlow() {
  const [screen, setScreen] = useState<Screen>("phone");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(28);
  const [copied, setCopied] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const phoneValid = /^[6-9][0-9]{9}$/.test(phone);
  const otpFilled = otp.every((d) => d !== "");
  useEffect(() => { if (screen === "otp") setSeconds(28); }, [screen]);
  useEffect(() => { if (screen !== "otp" || seconds <= 0) return; const t = setTimeout(() => setSeconds((s) => s - 1), 1000); return () => clearTimeout(t); }, [screen, seconds]);
  const setOtpDigit = (i: number, v: string) => { const d = v.replace(/[^0-9]/g, "").slice(0, 1); setOtp((prev) => { const n = [...prev]; n[i] = d; return n; }); if (d && i < 5) otpRefs.current[i + 1]?.focus(); };
  const otpKey = (i: number, key: string) => { if (key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus(); };
  const copy = () => { navigator.clipboard?.writeText("WELCOME200"); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const mask = phone ? phone.slice(0, 2) + "XXXX" + phone.slice(6) : "XXXXXXXXXX";
  return (
    <div className="w-full max-w-md mx-auto">
      {screen === "phone" ? (
        <div className="bg-surface-card rounded-lg shadow-[0_8px_40px_rgba(126,83,30,0.12)] p-8 sm:p-10">
          <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest">Welcome to Nutraciti</span>
          <h1 className="font-display-hero text-[32px] leading-tight text-text-heading mt-1">Sign In or Create Account</h1>
          <p className="font-body-md text-body-md text-text-muted mt-1">Join 50,000+ Indians on their skincare journey.</p>
          <p className="font-label-caps text-[11px] uppercase tracking-wider text-primary-container mt-space-lg mb-2">Continue with phone number</p>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 px-3 rounded border border-border-subtle bg-background-base font-body-md text-body-md text-text-heading">+91</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} inputMode="numeric" placeholder="Enter 10-digit number" aria-label="Mobile number" className="flex-1 px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" />
          </div>
          <button type="button" disabled={!phoneValid} onClick={() => setScreen("otp")} className="w-full mt-space-md py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Send OTP</button>
          <div className="flex items-center gap-3 my-space-md"><span className="flex-1 h-px bg-border-subtle"></span><span className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">or</span><span className="flex-1 h-px bg-border-subtle"></span></div>
          <button type="button" onClick={() => setScreen("profile")} className="w-full py-3 rounded border border-border-subtle bg-background-base hover:bg-surface-card transition-colors flex items-center justify-center gap-2 font-body-md text-body-md font-semibold text-text-heading"><span className="w-5 h-5 rounded-full bg-gradient-to-r from-gold to-bronze text-on-primary flex items-center justify-center font-bold text-[12px]">G</span>Continue with Google</button>
          <p className="font-body-sm text-[12px] text-text-muted text-center mt-space-md">By continuing you agree to our <a href="#" className="text-bronze underline">Terms of Service</a> and <a href="#" className="text-bronze underline">Privacy Policy</a>.</p>
        </div>
      ) : null}
      {screen === "otp" ? (
        <div className="bg-surface-card rounded-lg shadow-[0_8px_40px_rgba(126,83,30,0.12)] p-8 sm:p-10">
          <button type="button" onClick={() => setScreen("phone")} aria-label="Back" className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container transition-colors"><span className="material-symbols-outlined text-[22px]">arrow_back</span></button>
          <h1 className="font-display-hero text-[32px] leading-tight text-text-heading mt-2">Enter OTP</h1>
          <p className="font-body-md text-body-md text-text-muted mt-1">6-digit code sent to +91 {mask}</p>
          <button type="button" onClick={() => setScreen("phone")} className="font-body-sm text-body-sm text-bronze underline underline-offset-2 hover:text-primary transition-colors mt-1">Change number</button>
          <div className="flex gap-2 justify-between mt-space-lg">
            {otp.map((d, i) => (<input key={i} ref={(el) => { otpRefs.current[i] = el; }} value={d} onChange={(e) => setOtpDigit(i, e.target.value)} onKeyDown={(e) => otpKey(i, e.key)} inputMode="numeric" maxLength={1} aria-label={`OTP digit ${i + 1}`} className={`w-[52px] h-14 text-center rounded-lg bg-background-base text-text-heading font-headline-sm text-[20px] focus:outline-none transition-colors border ${otpFilled ? "border-bronze" : d ? "border-gold border-[1.5px]" : "border-border-subtle"} focus:border-gold focus:border-[1.5px]`} />))}
          </div>
          <div className="mt-space-md font-body-sm text-body-sm text-text-muted">{seconds > 0 ? (<span>Resend OTP in 0:{seconds.toString().padStart(2, "0")}</span>) : (<button type="button" onClick={() => setSeconds(28)} className="text-primary-container font-semibold hover:text-bronze transition-colors">Resend OTP</button>)}</div>
          <button type="button" disabled={!otpFilled} onClick={() => setScreen("profile")} className="w-full mt-space-lg py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Verify &amp; Continue</button>
        </div>
      ) : null}
      {screen === "profile" ? (
        <div className="bg-surface-card rounded-lg shadow-[0_8px_40px_rgba(126,83,30,0.12)] overflow-hidden">
          <div className="h-1.5 w-full bg-border-subtle"><div className="h-full w-1/2 bg-gradient-to-r from-gold to-bronze"></div></div>
          <div className="p-8 sm:p-10">
            <h1 className="font-display-hero text-[32px] leading-tight text-text-heading">Tell Us About Yourself</h1>
            <div className="mt-space-lg space-y-space-md">
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Full Name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Email (optional)</label><input type="email" placeholder="you@example.com" className="mt-1 w-full px-space-md py-3 rounded border border-border-subtle bg-background-base text-text-heading placeholder:text-text-muted font-body-md text-body-md focus:outline-none focus:border-gold focus:border-[1.5px] transition-colors" /></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Gender</label><div className="flex flex-wrap gap-2 mt-1">{["Female", "Male", "Prefer not to say"].map((g) => (<button key={g} type="button" onClick={() => setGender(g)} className={`px-4 py-2 rounded-full border font-label-caps text-[11px] uppercase tracking-wider transition-colors ${gender === g ? "border-gold bg-surface-container-high text-bronze font-semibold" : "border-border-subtle text-on-surface-variant hover:border-gold"}`}>{g}</button>))}</div></div>
              <div><label className="font-label-caps text-[11px] uppercase tracking-wider text-text-muted">Birthday</label><div className="flex gap-2 mt-1">
                <select aria-label="Day" className="flex-1 px-2 py-3 rounded border border-border-subtle bg-background-base text-text-heading font-body-md text-body-md focus:outline-none focus:border-gold"><option>DD</option>{Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (<option key={d}>{d}</option>))}</select>
                <select aria-label="Month" className="flex-1 px-2 py-3 rounded border border-border-subtle bg-background-base text-text-heading font-body-md text-body-md focus:outline-none focus:border-gold"><option>MM</option>{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (<option key={m}>{m}</option>))}</select>
                <select aria-label="Year" className="flex-1 px-2 py-3 rounded border border-border-subtle bg-background-base text-text-heading font-body-md text-body-md focus:outline-none focus:border-gold"><option>YYYY</option>{Array.from({ length: 40 }, (_, i) => 2010 - i).map((y) => (<option key={y}>{y}</option>))}</select>
              </div><p className="font-body-sm text-[12px] text-text-muted mt-1">We will send you a birthday gift &#127873;</p></div>
            </div>
            <button type="button" onClick={() => setScreen("success")} className="w-full mt-space-lg py-3 rounded bg-gradient-gold-end text-on-primary font-button-text text-button-text uppercase tracking-widest hover:bg-primary-container transition-colors">Continue &rarr;</button>
            <button type="button" onClick={() => setScreen("success")} className="w-full mt-2 py-2 font-button-text text-button-text uppercase tracking-wider text-text-muted hover:text-bronze transition-colors">Skip for now</button>
          </div>
        </div>
      ) : null}
      {screen === "success" ? (
        <div className="bg-surface-card rounded-lg shadow-[0_8px_40px_rgba(126,83,30,0.12)] p-8 sm:p-10 text-center">
          <div className="w-[72px] h-[72px] mx-auto rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center shadow-md"><span className="material-symbols-outlined msym-fill text-on-primary text-[40px]">check</span></div>
          <h1 className="font-display-hero text-[32px] leading-tight text-text-heading mt-space-md">Welcome to Nutraciti, {name || "Friend"}! &#10024;</h1>
          <p className="font-body-md text-body-md text-text-muted mt-1">Here is &#8377;200 off your first order.</p>
          <div className="flex items-center justify-between gap-2 mt-space-md border border-dashed border-gold rounded-lg px-space-md py-3 bg-background-base"><span className="font-mono-clinical text-[14px] tracking-widest text-bronze">WELCOME200</span><button type="button" onClick={copy} className="font-button-text text-button-text uppercase tracking-wider text-primary-container hover:text-bronze transition-colors">{copied ? "Copied" : "Copy"}</button></div>
          <a href="/shop" className="block w-full mt-space-lg py-3 rounded bg-gradient-to-r from-gold to-bronze text-on-primary font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity">Shop Your Routine &rarr;</a>
          <a href="/shop" className="block w-full mt-2 py-3 rounded border border-bronze text-bronze font-button-text text-button-text uppercase tracking-widest hover:bg-surface-container transition-colors">Explore All Products</a>
        </div>
      ) : null}
    </div>
  );
}
