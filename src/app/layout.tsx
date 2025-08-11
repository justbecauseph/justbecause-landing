import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

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
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
