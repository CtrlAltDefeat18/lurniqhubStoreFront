import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lurniqhub.tech"),
  title: {
    default: "LurniqHub | Offline-first maritime education",
    template: "%s | LurniqHub",
  },
  description:
    "A solar-powered, offline-first maritime training platform built for remote classrooms and aligned to global STCW standards.",
  applicationName: "LurniqHub",
  keywords: [
    "maritime education",
    "STCW",
    "offline-first learning",
    "Eastern Cape",
    "Wild Coast",
  ],
  openGraph: {
    type: "website",
    url: "https://lurniqhub.tech",
    siteName: "LurniqHub",
    title: "LurniqHub | Training built here. Standards recognised everywhere.",
    description:
      "Solar-powered, offline-first maritime learning for remote classrooms.",
  },
  twitter: {
    card: "summary",
    title: "LurniqHub | Offline-first maritime education",
    description:
      "Training built for the Wild Coast. Standards recognised everywhere.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const importMap = {
  imports: {
    gsap: "https://unpkg.com/gsap@3.13.0/index.js",
    "gsap/ScrollTrigger": "https://unpkg.com/gsap@3.13.0/ScrollTrigger.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="importmap"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap) }}
        />
        <script type="module" src="/assets/diagram-motion.js" />
      </head>
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
