"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "How we work" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? "border-line bg-paper/90 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="JustBecause home" className="shrink-0">
          <Image
            src="/justbecause-logo.png"
            alt="JustBecause Research & Development"
            width={275}
            height={44}
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink/75 transition-colors hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-plum px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-berry"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-plum md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ${
              isMenuOpen ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 bg-current transition-transform duration-200 ${
              isMenuOpen ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-line px-6 pb-6 pt-2 md:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block border-b border-line py-4 font-display text-2xl font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 block rounded-full bg-plum px-6 py-3.5 text-center font-semibold text-white"
          >
            Start a project
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
