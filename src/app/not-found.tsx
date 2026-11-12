import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center bg-paper px-6 text-ink">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-[15px] font-medium text-teal">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          This page isn’t here, <span className="text-wordmark">just because.</span>
        </h1>
        <p className="mt-6 text-lg text-ink/70">
          The address may be mistyped, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-plum px-8 py-4 font-semibold text-white transition-colors hover:bg-berry"
        >
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}
