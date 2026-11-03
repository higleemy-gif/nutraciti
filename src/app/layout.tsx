import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, DM_Sans, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dmsans" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-hanken" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Nutraciti International | Science-backed Skincare for Indian Skin",
  description: "Dermatologist-tested, clean botanical skincare crafted for Indian skin and climate. Free shipping above Rs 499. COD available.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="bg-background-base font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
