import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#070A0F] blueprint-grid text-[#F1F5F9] p-6">
      <div className="max-w-md w-full rounded-2xl bg-[#0D131C] border border-slate-800 p-8 text-center shadow-2xl">
        <div className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] mb-3">
          HTTP 404 // ROUTE NOT FOUND
        </div>
        <h1 className="font-display text-5xl font-bold text-white mb-3">404</h1>
        <h2 className="font-display text-xl font-semibold text-slate-200 mb-3">Page Not Found</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          The URL you requested does not match an active route on justbecause.ph.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#38BDF8] hover:bg-[#2DD4BF] text-[#070A0F] font-semibold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
