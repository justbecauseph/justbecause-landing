"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ObfuscatedContact from "./ObfuscatedContact";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0] as PerformanceNavigationTiming | undefined;
      if (entry && entry.duration > 0) {
        setLoadTime(Math.round(entry.duration));
      }
    });

    try {
      observer.observe({ type: "navigation", buffered: true });
    } catch {
      // Ignore if navigation entry observation is unsupported
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative bg-[#05080C] border-t border-slate-800/80 text-slate-300 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-slate-800/80">
          {/* Brand & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0D131C] border border-slate-800 flex items-center justify-center">
                <Image
                  src="/justbecauseph.png"
                  alt=""
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <Image
                src="/justbecause-logo.png"
                alt="JustBecause Research & Development"
                width={165}
                height={26}
                className="h-5 w-auto brightness-0 invert opacity-90"
                sizes="165px"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Software engineering, cloud deployment, and platform integration studio based in the
              Philippines. Building dependable production infrastructure since 2016.
            </p>

            {/* Partner & Certification Badges */}
            <div className="pt-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-3">
                CLOUD CREDENTIALS &amp; PARTNERSHIPS
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="px-3.5 py-2 rounded-xl bg-[#0D131C] border border-slate-800 flex items-center">
                  <Image
                    src="/digitalocean.svg"
                    alt="DigitalOcean Partner"
                    width={110}
                    height={36}
                    loading="lazy"
                    sizes="110px"
                    className="h-7 w-auto rounded"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#0D131C] border border-slate-800 flex items-center gap-2.5">
                  <Image
                    src="/gcp.png"
                    alt="Google Cloud Professional"
                    width={28}
                    height={28}
                    loading="lazy"
                    sizes="28px"
                    className="h-7 w-7 object-contain"
                  />
                  <span className="font-mono text-xs text-slate-300">GCP Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  Platform Integration
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  Cloud Deployment
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  Solutions Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                >
                  IT Consultancy
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-5">
              Direct Engineering Desk
            </h4>
            <dl className="space-y-3.5 text-sm">
              <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/60">
                <dt className="font-mono text-xs text-slate-500">EMAIL</dt>
                <dd className="font-medium text-slate-200">
                  <ObfuscatedContact email="info@justbecause.ph" />
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/60">
                <dt className="font-mono text-xs text-slate-500">PHONE</dt>
                <dd className="font-medium text-slate-200">
                  <ObfuscatedContact tel="+63 952 480 7466" />
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-slate-800/60">
                <dt className="font-mono text-xs text-slate-500">BASE</dt>
                <dd className="font-mono text-xs text-slate-300">Manila, Philippines (UTC+8)</dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://x.com/justbecauseph"
                title="X (Twitter)"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D131C] border border-slate-800 hover:border-[#38BDF8]/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/justbecauseph/"
                title="GitHub"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D131C] border border-slate-800 hover:border-[#38BDF8]/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div>© {CURRENT_YEAR} JustBecause IT Solutions. All rights reserved.</div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0D131C] border border-slate-800/80 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>STATUS: NOMINAL</span>
            {loadTime !== null ? (
              <>
                <span className="text-slate-700">·</span>
                <span>Page loaded in: {loadTime}ms</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
