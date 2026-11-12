import Image from "next/image";
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="JustBecause home">
            <Image
              src="/justbecause-logo.png"
              alt="JustBecause Research & Development"
              width={275}
              height={44}
              loading="lazy"
              className="h-6 w-auto opacity-90 brightness-0 invert"
            />
          </Link>
          <p className="text-sm">© {CURRENT_YEAR} JustBecause IT Solutions · Manila, Philippines</p>
        </div>

        <nav
          className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px]"
          aria-label="Footer"
        >
          <a href="#services" className="transition-colors hover:text-white">
            Services
          </a>
          <a href="#approach" className="transition-colors hover:text-white">
            How we work
          </a>
          <a href="#contact" className="transition-colors hover:text-white">
            Contact
          </a>
          <a
            href="https://github.com/justbecauseph/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://x.com/justbecauseph"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            X
          </a>
        </nav>
      </div>
    </footer>
  );
}
