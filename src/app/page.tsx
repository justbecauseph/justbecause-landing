import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceCard from "./components/ServiceCard";
import ContactForm from "./components/ContactForm";
import ScrollButton from "./components/ScrollButton";
import ArchitectureBlueprint from "./components/ArchitectureBlueprint";
import ObfuscatedContact from "./components/ObfuscatedContact";
import Image from "next/image";

const SERVICES = [
  {
    title: "Platform Integration",
    serviceKey: "integration",
    layerTag: "SYS // INTEROP",
    description:
      "Seamlessly connect your existing systems with our integration solutions. We build fault-tolerant API bridges, webhook pipelines, and data sync layers between ERPs, CRMs, payment rails, and custom services.",
    deliverables: [
      "REST & GraphQL Gateways",
      "Idempotent Webhooks",
      "ERP / CRM Sync",
      "Legacy Adapters",
    ],
    outcome: "Zero-drop event routing",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
  {
    title: "Cloud Deployment",
    serviceKey: "cloud",
    layerTag: "SYS // INFRA",
    description:
      "Migrate to the cloud with our secure and scalable deployment services. We provision multi-zone infrastructure across Google Cloud, DigitalOcean, and Cloudflare with automated CI/CD and zero-downtime rollouts.",
    deliverables: [
      "Google Cloud & DigitalOcean",
      "Container Orchestration",
      "Cloudflare Edge",
      "Automated Backups",
    ],
    outcome: "99.9%+ production availability",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
        />
      </svg>
    ),
  },
  {
    title: "Solutions Development",
    serviceKey: "development",
    layerTag: "SYS // APPLICATION",
    description:
      "Custom software solutions tailored to your business needs. From high-throughput customer portals to internal operational tools, we engineer maintainable TypeScript, React, and backend systems.",
    deliverables: [
      "Full-Stack Web Platforms",
      "Internal Operations Tools",
      "PostgreSQL Data Models",
      "API Engineering",
    ],
    outcome: "Type-safe & end-to-end tested",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    title: "IT Consultancy",
    serviceKey: "consultancy",
    layerTag: "SYS // ADVISORY",
    description:
      "Expert advice to optimize your IT infrastructure and strategy. We audit system bottlenecks, reduce cloud infrastructure waste, harden security boundaries, and guide technical teams through complex delivery.",
    deliverables: [
      "Architecture Audits",
      "Cloud Cost FinOps",
      "Security Hardening",
      "Technical Roadmaps",
    ],
    outcome: "Senior-led engineering clarity",
    icon: (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
];

const DELIVERY_PHASES = [
  {
    step: "01",
    title: "Architecture & Systems Audit",
    detail:
      "We map your existing data flows, failure modes, and infrastructure constraints before writing code—producing a concrete technical specification with clear scope boundaries.",
  },
  {
    step: "02",
    title: "Incremental Engineering",
    detail:
      "Work ships in verifiable milestones with automated test coverage, staging environments, and continuous visibility so your team never waits months for a black-box reveal.",
  },
  {
    step: "03",
    title: "Production Handover & Telemetry",
    detail:
      "Every deployment includes runbooks, alerting, backup verification, and clean documentation—whether we continue operating the stack with you or hand the keys to your internal engineers.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-[#F1F5F9] overflow-x-hidden">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 blueprint-grid border-b border-slate-800/80 overflow-hidden">
          {/* Subtle atmospheric radial glow anchored top-right */}
          <div
            className="pointer-events-none absolute -top-40 right-0 w-[640px] h-[640px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(45,212,191,0.12) 45%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Thesis & Action */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#0D131C] border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
                  <span>TRANSFORMING BUSINESSES SINCE 2016</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                  Systems engineered to hold up under{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#2DD4BF]">
                    production load.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                  JustBecause IT Solutions architects and operates the technical backbone behind
                  growing teams. We bridge fragmented platforms, migrate critical workloads to the
                  cloud, and build custom software that stays fast and maintainable.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <ScrollButton targetId="contact">
                    <span className="flex items-center gap-2.5 text-sm sm:text-base font-semibold">
                      <span>Start Your Project Brief</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
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
                    </span>
                  </ScrollButton>

                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0D131C] hover:bg-[#111926] text-slate-200 border border-slate-800 hover:border-slate-700 font-medium text-sm sm:text-base transition-colors"
                  >
                    <span>Explore Capabilities</span>
                  </a>
                </div>

                {/* Operational Proof Strip */}
                <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-xl">
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                      10+ yrs
                    </div>
                    <div className="font-mono text-xs text-slate-400 mt-1">
                      In production since 2016
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                      GCP &amp; DO
                    </div>
                    <div className="font-mono text-xs text-slate-400 mt-1">
                      Certified cloud partners
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                      &lt; 24h
                    </div>
                    <div className="font-mono text-xs text-slate-400 mt-1">
                      Direct engineer response
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Signature Interactive Architecture Blueprint */}
              <div className="lg:col-span-5">
                <ArchitectureBlueprint />
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES SECTION */}
        <section id="services" className="py-24 px-6 border-b border-slate-800/80">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#38BDF8] mb-3">
                  <span>{"// CAPABILITIES"}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  Comprehensive IT Solutions
                </h2>
              </div>
              <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
                End-to-end engineering across four core practices. Select any capability to pre-load
                it into the project scoping console below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                  layerTag={service.layerTag}
                  serviceKey={service.serviceKey}
                  deliverables={service.deliverables}
                  outcome={service.outcome}
                />
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK // ENGAGEMENT ARCHITECTURE */}
        <section id="approach" className="py-24 px-6 bg-[#05080C] border-b border-slate-800/80">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-2xl mb-14">
              <div className="font-mono text-xs uppercase tracking-widest text-[#2DD4BF] mb-3">
                {"// ENGAGEMENT MODEL"}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Disciplined delivery from audit to production.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Every engagement follows a three-stage engineering lifecycle designed to eliminate
                scope ambiguity and ship working software early.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DELIVERY_PHASES.map((phase) => (
                <div
                  key={phase.step}
                  className="rounded-2xl bg-[#0D131C] border border-slate-800/90 p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] px-2.5 py-1 rounded bg-[#070A0F] border border-slate-800">
                        PHASE {phase.step}
                      </span>
                      <span className="h-px flex-1 bg-slate-800 ml-4" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{phase.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT // PROJECT SCOPING CONSOLE */}
        <section id="contact" className="py-24 px-6 blueprint-grid">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Engineering Context */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] mb-3">
                    {"// GET IN TOUCH"}
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                    Ready to Scope Your Next System?
                  </h2>
                  <p className="text-slate-300 text-base leading-relaxed">
                    Share your current architecture, integration bottlenecks, or project goals. You
                    will speak directly with the engineers who design and build the work.
                  </p>
                </div>

                {/* Direct Contact Card */}
                <div className="rounded-2xl bg-[#0D131C] border border-slate-800/90 p-6 space-y-5">
                  <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                    DIRECT CHANNELS
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#111926] border border-slate-800 flex items-center justify-center text-[#38BDF8] shrink-0">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-slate-400">Email</div>
                        <div className="text-sm font-medium text-white mt-0.5">
                          <ObfuscatedContact email="info@justbecause.ph" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#111926] border border-slate-800 flex items-center justify-center text-[#2DD4BF] shrink-0">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-mono text-xs text-slate-400">Phone</div>
                        <div className="text-sm font-medium text-white mt-0.5">
                          <ObfuscatedContact tel="+63 952 480 7466" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center gap-4">
                    <Image
                      src="/digitalocean.svg"
                      alt="DigitalOcean Partner"
                      width={100}
                      height={32}
                      loading="lazy"
                      className="h-6 w-auto rounded opacity-85"
                    />
                    <Image
                      src="/gcp.png"
                      alt="Google Cloud Professional"
                      width={26}
                      height={26}
                      loading="lazy"
                      className="h-6 w-6 object-contain opacity-85"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Project Scoping Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
