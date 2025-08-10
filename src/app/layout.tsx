import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://justbecause.ph"),
  title: "JustBecause IT Solutions",
  description: "Transform Your Business with JustBecause IT Solutions",
  openGraph: {
    title: "JustBecause IT Solutions",
    description: "Transform Your Business with JustBecause IT Solutions",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
