import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://justbecause.ph"),
  title: "JustBecause IT Solutions | Systems Architecture, Cloud & Integration",
  description:
    "Manila-based software engineering and infrastructure studio. We connect fragmented platforms, deploy resilient cloud workloads, and build custom production software.",
  openGraph: {
    title: "JustBecause IT Solutions | Systems Architecture, Cloud & Integration",
    description:
      "Manila-based software engineering and infrastructure studio. Platform integration, cloud deployment, custom software, and technical consultancy since 2016.",
    url: "https://justbecause.ph",
    siteName: "JustBecause IT Solutions",
    images: [
      {
        url: "/justbecauseph.png",
        width: 400,
        height: 400,
        alt: "JustBecause IT Solutions Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/justbecauseph.png",
    shortcut: "/justbecauseph.png",
    apple: "/justbecauseph.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#070A0F] text-[#F1F5F9] selection:bg-[#38BDF8]/25 selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
