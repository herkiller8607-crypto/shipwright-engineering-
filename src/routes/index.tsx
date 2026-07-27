import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";

/**
 * Pure function: resolves the business name from a parsed config object.
 * Extracted for testability — all business-name logic lives here.
 */
export function resolveBusinessName(config: unknown): string {
  if (
    config !== null &&
    typeof config === "object" &&
    "businessName" in config
  ) {
    const name = (config as { businessName?: string }).businessName;
    if (typeof name === "string" && name.trim().length > 0) {
      return name.trim();
    }
  }
  return "Shipwright Engineering";
}

/**
 * Async fetcher that reads raw JSON, parses it, and resolves the business name.
 * Accepts a read function for dependency injection — makes file-level errors
 * testable without needing TanStack Start's server runtime.
 */
export async function fetchBusinessName(
  readFn: () => Promise<string>,
): Promise<string> {
  try {
    const raw = await readFn();
    const cfg = JSON.parse(raw);
    return resolveBusinessName(cfg);
  } catch {
    return "Shipwright Engineering";
  }
}

export const getBusinessName = createServerFn({ method: "GET" }).handler(
  async () => {
return fetchBusinessName(() =>
  readFile(new URL("../../site.json", import.meta.url).pathname, "utf8"),
);
  },
);

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

const services = [
  {
    title: "Feature Builds",
    description:
      "Need a new capability in your SaaS? We design and deliver production-ready features — from database to UI — on a fixed scope and timeline.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Full Product Builds",
    description:
      "Starting from zero? We take your idea from concept to launched SaaS — architecture, backend, frontend, testing, and deployment.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
      </svg>
    ),
  },
  {
    title: "Retainer Maintenance",
    description:
      "Keep your product healthy with ongoing support — bug fixes, dependency upgrades, small iterations, and a team that knows your codebase.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const approachItems = [
  {
    title: "Clean Architecture",
    description:
      "We design systems that are easy to reason about, test, and extend. No spaghetti — just well-structured code that scales with your business.",
  },
  {
    title: "Rigorous Code Review",
    description:
      "Every line we ship is reviewed. We catch issues early, share knowledge across the team, and maintain a high bar for quality.",
  },
  {
    title: "Reliable Shipping Cadence",
    description:
      "We ship on a predictable rhythm. Small, frequent, well-tested releases keep momentum high and risk low.",
  },
];

function Home() {
  const businessName = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {businessName}
          </span>
          <a
            href="#contact"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Work with us
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:py-32">
        <span className="mb-6 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Now accepting clients
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
          A focused engineering team that ships
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          We build production-quality SaaS — architecture, backend, frontend, and tests —
          without the overhead of a larger org. Founders and product teams work with us
          when they need software that ships on time and works.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex rounded-xl bg-gray-900 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Get in touch
          </a>
          <a
            href="#services"
            className="inline-flex rounded-xl px-8 py-3.5 text-base font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            What we offer →
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-gray-100 bg-gray-50/50 px-4 py-24 dark:border-gray-800 dark:bg-gray-900/50 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              What we do
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Three ways to work with us — each with a clear scope, timeline, and outcome.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="mb-4 inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-gray-100 px-4 py-24 dark:border-gray-800 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              How we work
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Quality isn't an afterthought — it's how we operate day to day.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {approachItems.map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="border-t border-gray-100 bg-gray-900 px-4 py-24 dark:border-gray-800 dark:bg-gray-950 sm:px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to build something great?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            Whether it's a new feature, a full product, or ongoing support — we're ready
            to join your team and ship.
          </p>
          <div className="mt-10">
            <a
              href="mailto:hello@shipwright.engineering"
              className="inline-flex rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100"
            >
              Work with us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-8 dark:border-gray-800 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {businessName}
          </span>
          <span className="text-sm text-gray-400 dark:text-gray-600">
            Built with{" "}
            <a
              href="https://cto.new"
              className="underline hover:text-gray-600 dark:hover:text-gray-400"
            >
              cto.new
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
