"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ObfuscatedContact from "./ObfuscatedContact";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070A0F]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          : "bg-[#070A0F]/65 backdrop-blur-md border-b border-slate-800/40"
      }`}
    >
      {/* Top engineering telemetry strip — collapses smoothly on scroll */}
      <div
        className={`hidden lg:block border-b border-slate-800/60 bg-[#05080C] transition-all duration-300 overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-9 opacity-100"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 h-9 flex items-center justify-between font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SYSTEMS ARCHITECTURE &amp; CLOUD ENGINEERING
            </span>
            <span className="text-slate-700">/</span>
            <span>EST. 2016 · MANILA, PH (UTC+8)</span>
          </div>
          <div className="flex items-center gap-5">
            <ObfuscatedContact email="info@justbecause.ph" className="text-slate-400" />
            <span className="text-slate-700">/</span>
            <ObfuscatedContact tel="+63 952 480 7466" className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="JustBecause IT Solutions Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#0D131C] border border-slate-800 group-hover:border-[#38BDF8]/50 transition-colors">
              <Image
                src="/justbecauseph.png"
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <Image
                src="/justbecause-logo.png"
                alt="JustBecause Research & Development"
                width={185}
                height={30}
                className="h-6 w-auto brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
                priority
                sizes="185px"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            <Link
              href="/#services"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#approach"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Approach
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              Contact
            </Link>

            <div className="h-4 w-px bg-slate-800 mx-3" aria-hidden="true" />

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#2DD4BF] text-[#070A0F] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(56,189,248,0.2)]"
            >
              <span>Scope a Project</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden relative w-11 h-11 bg-[#0D131C] border border-slate-800 rounded-lg flex items-center justify-center text-slate-200 hover:border-slate-700 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span
                className={`absolute w-5 h-0.5 bg-current transition-all duration-200 ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-current transition-all duration-200 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute w-5 h-0.5 bg-current transition-all duration-200 ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[420px] opacity-100 border-t border-slate-800" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#070A0F]/98 backdrop-blur-xl px-6 py-6 space-y-5">
          <div className="flex flex-col space-y-1">
            <Link
              href="/#services"
              className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-[#38BDF8] rounded-lg hover:bg-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#approach"
              className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-[#38BDF8] rounded-lg hover:bg-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Approach
            </Link>
            <Link
              href="/#contact"
              className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-[#38BDF8] rounded-lg hover:bg-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-800/80 space-y-2.5 font-mono text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">EMAIL</span>
              <ObfuscatedContact email="info@justbecause.ph" className="text-slate-200" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">DIRECT</span>
              <ObfuscatedContact tel="+63 952 480 7466" className="text-slate-200" />
            </div>
          </div>

          <Link
            href="/#contact"
            className="block w-full bg-[#38BDF8] hover:bg-[#2DD4BF] text-[#070A0F] text-center px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Scope a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
