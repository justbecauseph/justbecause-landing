"use client";

import type React from "react";

export default function ScrollButton({
  children,
  targetId,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  targetId: string;
  className?: string;
}>) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      className={`group bg-[#38BDF8] hover:bg-[#2DD4BF] text-[#070A0F] font-semibold py-3.5 px-7 rounded-xl transition-all duration-200 shadow-[0_0_32px_rgba(56,189,248,0.25)] hover:shadow-[0_0_40px_rgba(45,212,191,0.35)] flex items-center justify-center cursor-pointer ${className}`}
      onClick={scrollToSection}
      aria-label="Contact us"
    >
      {children}
    </button>
  );
}
