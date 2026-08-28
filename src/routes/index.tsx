import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, Radio, Layers, Users } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { CaseCard, StatusChip } from "@/components/case-card";
import { cases, discussions, stats } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casebook — True Crime Community & Database" },
      {
        name: "description",
        content:
          "A dossier-style database of case files, suspect timelines and digital evidence boards, built with the true crime community.",
      },
      { property: "og:title", content: "Casebook — True Crime Community & Database" },
      {
        property: "og:description",
        content: "Explore case files, follow investigations and discuss theories.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = cases[0];

  return (
    <PublicShell>
      {/* Hero */}
      <section className="grain relative overflow-hidden border-b border-border">
        <img
          src={featured.image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-36">
          <p className="animate-soft-fade label-mono flex items-center gap-3">
            <span className="live-dot inline-block size-1.5 rounded-full bg-ember" />
            Live index · 248 files open
          </p>
          <h1 className="animate-rise mt-6 max-w-4xl text-5xl leading-[1.05] text-foreground md:text-7xl">
            Every unresolved case deserves
            <span className="block italic text-brass">a second reader.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-base text-muted-foreground [animation-delay:120ms]">
            Casebook is a research collective for true crime enthusiasts. Read dossier-grade case
            files, rebuild suspect timelines, pin evidence to a shared board, and argue the details
            with people who read the footnotes.
          </p>

          <div className="animate-rise mt-10 flex flex-wrap gap-3 [animation-delay:220ms]">
            <Link
              to="/cases"
              className="group inline-flex items-center gap-2 rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Open the index
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded border border-border px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:border-ember/60"
            >
              Create a researcher account
            </Link>
          </div>

          <dl className="animate-rise mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded border border-border bg-border md:grid-cols-4 [animation-delay:320ms]">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-5 py-5">
                <dt className="label-mono">{s.label}</dt>
                <dd className="mt-2 font-display text-3xl text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured dossier */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          index="01"
          title="Active investigations"
          action={
            <Link
              to="/cases"
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember"
            >
              View all cases ↗
            </Link>
          }
        />

        <div className="case-gradient scan-line grain animate-rise relative overflow-hidden rounded border border-border p-8 md:p-12">
          <div className="relative max-w-2xl">
            <div className="flex flex-wrap items-center gap-4">
              <StatusChip status={featured.status} />
              <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
                Case id / {featured.id}
              </span>
            </div>
            <h3 className="mt-6 text-5xl leading-tight text-foreground md:text-6xl">
              The Vanishing at <span className="italic text-brass">Blackwater</span>
            </h3>
            <p className="mt-3 font-mono text-[0.7rem] tracking-widest text-muted-foreground">
              {featured.location} · {featured.date}
            </p>
            <p className="mt-6 text-muted-foreground">{featured.summary}</p>

            <div className="mt-8 max-w-md">
              <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
                <span>Research progress</span>
                <span className="text-brass">{featured.progress}%</span>
              </div>
              <div className="mt-2 h-1 w-full overflow-hidden rounded bg-muted">
                <div
                  className="h-full bg-brass transition-all duration-1000"
                  style={{ width: `${featured.progress}%` }}
                />
              </div>
              <div className="mt-3 flex gap-6 font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                <span>{featured.evidence.length} evidence items</span>
                <span>{featured.suspects.length} suspects</span>
                <span>{featured.timeline.length} timeline entries</span>
              </div>
            </div>

            <Link
              to="/cases/$slug"
              params={{ slug: featured.slug }}
              className="mt-10 inline-flex items-center gap-2 rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Open case file <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {cases.slice(1, 4).map((c, i) => (
            <CaseCard key={c.id} item={c} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading index="02" title="How research happens here" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Read the file",
                body: "Each case is a dossier: sourced summary, verified timeline, suspect index and a full evidence manifest.",
              },
              {
                icon: Layers,
                title: "Work the board",
                body: "Pin photos, documents and testimony to a shared evidence board and draw the connections you see.",
              },
              {
                icon: Users,
                title: "Argue it out",
                body: "Post a theory, cite your source, and let 12,000 researchers try to break it. Good faith only.",
              },
            ].map((f, i) => (
              <div
                key={f.title}
                className="dossier-card animate-rise rounded p-7"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <f.icon className="size-5 text-ember" />
                <h3 className="mt-5 text-2xl text-foreground">{f.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community preview */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          index="03"
          title="Latest from the community"
          action={
            <Link
              to="/community"
              className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember"
            >
              All discussions ↗
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {discussions.slice(0, 4).map((d, i) => (
            <Link
              key={d.id}
              to="/community/$id"
              params={{ id: d.id }}
              className="dossier-card animate-rise block rounded p-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
                  {d.initials}
                </span>
                <div>
                  <p className="text-sm text-foreground">{d.author}</p>
                  <p className="font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                    {d.lastActive} · {d.tag} #{d.id}
                  </p>
                </div>
              </div>
              <h3 className="mt-4 text-xl text-foreground">{d.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.body}</p>
              <p className="mt-4 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                {d.replies} replies · {d.caseId}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <Radio className="size-5 text-ember" />
            <h2 className="mt-4 text-4xl text-foreground">
              Bring a case <span className="italic text-brass">nobody is reading.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              Submissions are reviewed by volunteer archivists within 72 hours. Sources required.
            </p>
          </div>
          <Link
            to="/submit"
            className="rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Submit a case
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
