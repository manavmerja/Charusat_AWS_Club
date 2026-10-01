import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Silkscreen } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "AWS Cloud Club CHARUSAT | Student Builder Group",
  description: "Official Website for AWS Cloud Club at CHARUSAT University. Empowering student builders with cloud technology, workshops, and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${silkscreen.variable} antialiased bg-[#0b0f19] text-slate-100 min-h-screen`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
