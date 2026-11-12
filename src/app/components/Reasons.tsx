"use client";

const REASONS = [
  {
    key: "integration",
    because: "your systems don’t talk to each other.",
    service: "Platform integration",
    description:
      "We build the API bridges, webhook pipelines and sync layers between your ERP, CRM, payment providers and custom services, so data arrives once and in the right order.",
    includes: ["REST and GraphQL gateways", "Webhooks", "ERP and CRM sync", "Legacy adapters"],
  },
  {
    key: "cloud",
    because: "the server in the back office won’t scale.",
    service: "Cloud deployment",
    description:
      "We move workloads to Google Cloud, DigitalOcean and Cloudflare, with automated deploys, verified backups and releases that don’t take the site down.",
    includes: ["Migration planning", "Containers", "CI/CD pipelines", "Backups and monitoring"],
  },
  {
    key: "development",
    because: "off-the-shelf doesn’t fit how you work.",
    service: "Solutions development",
    description:
      "Customer portals, internal tools and the back ends behind them, built in TypeScript, React and PostgreSQL, with tests, so your own team can maintain it later.",
    includes: ["Web platforms", "Internal tools", "Data modelling", "API engineering"],
  },
  {
    key: "consultancy",
    because: "you want a second opinion before you commit.",
    service: "IT consultancy",
    description:
      "We audit what you run today, find the bottlenecks and the cloud spend you don’t need, tighten security, and leave you with a roadmap your team can follow.",
    includes: ["Architecture audits", "Cloud cost reviews", "Security hardening", "Roadmaps"],
  },
];

function askAbout(service: string) {
  window.dispatchEvent(new CustomEvent("justbecause:select-service", { detail: { service } }));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("contact")
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  document.getElementById("name")?.focus({ preventScroll: true });
}

export default function Reasons() {
  return (
    <ul className="border-t border-line">
      {REASONS.map((reason) => (
        <li
          key={reason.key}
          className="group grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
        >
          <p className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:col-span-6 lg:text-[2.75rem]">
            <span className="text-plum transition-colors group-hover:text-berry">Because</span>{" "}
            {reason.because}
          </p>

          <div className="lg:col-span-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
              {reason.service}
            </h3>
            <p className="mt-3 text-lg leading-relaxed text-ink/80">{reason.description}</p>
            <p className="mt-4 text-[15px] text-ink/60">{reason.includes.join(" · ")}</p>
            <button
              type="button"
              onClick={() => askAbout(reason.key)}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 font-semibold text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:text-berry hover:decoration-berry"
            >
              Ask about {reason.service.toLowerCase()}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
