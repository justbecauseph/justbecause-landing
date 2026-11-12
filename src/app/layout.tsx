import type React from "react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
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
    <html lang="en">
      <body className={`${bricolage.variable} ${hanken.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
