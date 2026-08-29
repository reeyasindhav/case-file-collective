import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FileSearch, Shield, Users } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { stats } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Casebook" },
      {
        name: "description",
        content: "Casebook is a research collective for true crime enthusiasts.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading index="04" title="About Casebook" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="dossier-card animate-rise group rounded p-8 [animation-delay:100ms]">
            <BookOpen className="size-6 text-ember transition-colors group-hover:text-brass" />
            <h3 className="mt-5 text-2xl text-foreground transition-colors group-hover:text-brass">Our mission</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Casebook exists because the curious deserve better tools. We believe every unresolved case
              deserves a second reader — someone who reads the footnotes, rebuilds the timeline, and
              questions the official account. We're a community of researchers, archivists, and armchair
              detectives working together to make cold cases warmer.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-8 [animation-delay:200ms]">
            <Shield className="size-6 text-ember transition-colors group-hover:text-brass" />
            <h3 className="mt-5 text-2xl text-foreground transition-colors group-hover:text-brass">How we work</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Every submission is reviewed by volunteer archivists before publication. We require sources,
              redact personal information, and enforce a strict good-faith policy. Theories are welcome,
              but they must be labelled and sourced. We don't do witch hunts; we do paperwork.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-8 [animation-delay:300ms]">
            <FileSearch className="size-6 text-ember transition-colors group-hover:text-brass" />
            <h3 className="mt-5 text-2xl text-foreground transition-colors group-hover:text-brass">What you'll find</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Dossier-grade case files with sourced summaries, verified timelines, suspect indices, and full
              evidence manifests. Interactive evidence boards, community discussion threads, and curated
              podcasts and documentaries. A private workspace to save cases, take notes, and track your
              own research.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-8 [animation-delay:400ms]">
            <Users className="size-6 text-ember transition-colors group-hover:text-brass" />
            <h3 className="mt-5 text-2xl text-foreground transition-colors group-hover:text-brass">The collective</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Over 12,000 researchers from 40 countries. Retired detectives, journalists, criminologists,
              and curious neighbours. We share one rule: if you post it, source it. Everything else is
              open for debate.
            </p>
          </div>
        </div>

        <div className="mt-16 animate-rise [animation-delay:500ms]">
          <SectionHeading index="05" title="By the numbers" />
          <div className="mt-8 grid gap-px overflow-hidden rounded border border-border bg-border md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="animate-rise group bg-surface px-6 py-6 transition-colors hover:bg-surface-2" style={{ animationDelay: `${600 + i * 80}ms` }}>
                <dd className="font-display text-4xl text-foreground transition-colors group-hover:text-brass">{s.value}</dd>
                <dt className="mt-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 animate-rise [animation-delay:600ms] text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded bg-ember px-8 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Join the index
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
