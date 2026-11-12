import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reasons from "./components/Reasons";
import ContactForm from "./components/ContactForm";
import ObfuscatedContact from "./components/ObfuscatedContact";

const STEPS = [
  {
    title: "We map what you have",
    detail:
      "Before writing code we trace your data flows, failure points and constraints, and agree a written scope with clear boundaries.",
  },
  {
    title: "We ship in milestones",
    detail:
      "Work lands in small, tested pieces on a staging environment you can open any time. No months of silence followed by a big reveal.",
  },
  {
    title: "We hand over properly",
    detail:
      "Every launch comes with documentation, alerts and verified backups, whether we keep running it with you or pass it to your own engineers.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-32 lg:pb-24 lg:pt-40">
          <Image
            src="/justbecauseph.png"
            alt=""
            width={400}
            height={400}
            className="pointer-events-none absolute -right-28 top-10 w-[380px] max-w-none animate-splat select-none opacity-25 sm:opacity-40 lg:-right-16 lg:top-14 lg:w-[640px] lg:opacity-100"
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <p className="animate-rise text-[15px] font-medium text-teal">
              JustBecause IT Solutions · Manila, since 2016
            </p>

            <h1 className="mt-6 max-w-[13ch] animate-rise font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.035em] text-ink [animation-delay:80ms] sm:text-7xl lg:text-[5.25rem]">
              Software that works <span className="text-wordmark">just because</span> it was built
              right.
            </h1>

            <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-xl">
              We’re a small engineering studio. We connect the systems you already run, move your
              workloads to the cloud, and build the custom software in between.
            </p>

            <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:240ms]">
              <a
                href="#contact"
                className="rounded-full bg-plum px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-berry"
              >
                Start a project
              </a>
              <a
                href="#services"
                className="font-semibold text-plum underline decoration-plum/30 underline-offset-[6px] transition-colors hover:decoration-plum"
              >
                See what we do
              </a>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section aria-label="Cloud partners" className="border-y border-line bg-mist/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-4 px-6 py-6">
            <p className="text-[15px] text-ink/60">Cloud partners</p>
            <Image
              src="/digitalocean.svg"
              alt="DigitalOcean partner"
              width={200}
              height={65}
              className="h-9 w-auto rounded mix-blend-multiply"
            />
            <span className="flex items-center gap-2.5 text-[15px] font-medium text-ink/80">
              <Image src="/gcp.png" alt="" width={340} height={340} className="h-8 w-8" />
              Google Cloud
            </span>
            <p className="text-[15px] text-ink/60 sm:ml-auto">
              Every enquiry gets a reply from an engineer within 24 hours.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 lg:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 max-w-2xl">
              <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                Why clients call us
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">
                Nobody hires an IT firm just because. There’s always a reason, and it’s usually one
                of these four.
              </p>
            </div>

            <Reasons />
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="bg-teal py-24 text-white lg:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              How a project runs
            </h2>

            <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {STEPS.map((step, index) => (
                <li key={step.title} className="relative border-t border-white/25 pt-8">
                  <span className="absolute -top-px left-0 h-0.5 w-12 bg-white" />
                  <span
                    aria-hidden="true"
                    className="font-display text-6xl font-bold text-white/50"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/80">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden bg-night py-24 text-white lg:py-32"
        >
          <Image
            src="/justbecauseph.png"
            alt=""
            width={400}
            height={400}
            loading="lazy"
            className="pointer-events-none absolute -bottom-40 -left-40 w-[560px] max-w-none select-none opacity-20"
          />

          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Tell us what’s broken, slow, or missing.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
                You’ll hear back within 24 hours from an engineer who would work on your project.
              </p>

              <dl className="mt-10 space-y-5">
                <div>
                  <dt className="text-sm text-white/55">Email</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">
                    <ObfuscatedContact email="info@justbecause.ph" />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-white/55">Phone</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">
                    <ObfuscatedContact tel="+63 952 480 7466" />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
