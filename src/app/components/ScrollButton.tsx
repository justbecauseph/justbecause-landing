"use client"

import type React from "react"

export default function ScrollButton({
  children,
  targetId,
}: Readonly<{
  children: React.ReactNode
  targetId: string
}>) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      type="button"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
      onClick={scrollToSection}
      aria-label="Contact us"
    >
      {children}
    </button>
  )
}
