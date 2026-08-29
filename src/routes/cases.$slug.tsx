import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Calendar, Clock, FileText, MapPin, Users, ExternalLink } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { getCase, media } from "@/lib/data";
import { StatusChip } from "@/components/case-card";

export const Route = createFileRoute("/cases/$slug")({
  head: ({ params }) => {
    const caseItem = getCase(params.slug);
    return {
      meta: [
        { title: caseItem ? `${caseItem.title} — Casebook` : "Case not found — Casebook" },
        {
          name: "description",
          content: caseItem ? caseItem.summary : "Case file details, timeline, suspects and evidence.",
        },
      ],
    };
  },
  component: CaseDossier,
});

type Tab = "timeline" | "suspects" | "evidence";

function CaseDossier() {
  const { slug } = useParams({ from: "/cases/$slug" });
  const caseItem = getCase(slug);
  const [tab, setTab] = useState<Tab>("timeline");

  if (!caseItem) {
    return (
      <PublicShell>
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-muted-foreground">Case file not found.</p>
          <Link to="/cases" className="mt-4 inline-flex items-center gap-2 text-ember hover:underline">
            <ArrowLeft className="size-4" /> Back to index
          </Link>
        </div>
      </PublicShell>
    );
  }

  const relatedMedia = media.filter((m) => m.caseId === caseItem.id);

  return (
    <PublicShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={caseItem.image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 md:py-20">
          <Link
            to="/cases"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember"
          >
            <ArrowLeft className="size-4" /> All cases
          </Link>

          <div className="flex flex-wrap items-center gap-4">
            <StatusChip status={caseItem.status} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
              Case id / {caseItem.id}
            </span>
          </div>

          <h1 className="mt-6 text-5xl leading-tight text-foreground md:text-7xl">
            {caseItem.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-6 font-mono text-[0.7rem] tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5" /> {caseItem.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-3.5" /> {caseItem.date}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-muted-foreground">{caseItem.summary}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {caseItem.tags.map((tag) => (
              <span key={tag} className="rounded border border-border px-3 py-1 font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-6">
            <div className="rounded border border-border bg-surface p-4">
              <dt className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">Evidence</dt>
              <dd className="mt-2 font-display text-2xl text-foreground">{caseItem.evidence.length}</dd>
            </div>
            <div className="rounded border border-border bg-surface p-4">
              <dt className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">Suspects</dt>
              <dd className="mt-2 font-display text-2xl text-foreground">{caseItem.suspects.length}</dd>
            </div>
            <div className="rounded border border-border bg-surface p-4">
              <dt className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">Timeline</dt>
              <dd className="mt-2 font-display text-2xl text-foreground">{caseItem.timeline.length}</dd>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-center gap-6 border-b border-border/60">
          {[
            { id: "timeline", label: "Timeline", icon: Clock },
            { id: "suspects", label: "Suspects", icon: Users },
            { id: "evidence", label: "Evidence", icon: FileText },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex items-center gap-2 border-b-2 pb-3 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                tab === t.id
                  ? "border-ember text-ember"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "timeline" && (
            <div className="relative">
              <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-px bg-border" />
              <div className="space-y-8">
                {caseItem.timeline.map((event, i) => (
                  <div key={event.id} className="animate-rise relative flex gap-6" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="relative mt-1">
                      <span className={`flex size-3 rounded-full border-2 ${
                        event.verified ? "border-brass bg-brass/30" : "border-ember bg-ember/30"
                      }`} />
                    </div>
                    <div className="flex-1 rounded border border-border bg-surface p-6">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ember">{event.date}</span>
                        <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground">{event.time}</span>
                        {event.verified && (
                          <span className="rounded bg-brass/15 px-2 py-0.5 font-mono text-[0.6rem] tracking-widest uppercase text-brass">Verified</span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl text-foreground">{event.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "suspects" && (
            <div className="grid gap-4 md:grid-cols-2">
              {caseItem.suspects.map((suspect, i) => (
                <div key={suspect.id} className="animate-rise rounded border border-border bg-surface p-6" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl text-foreground">{suspect.name}</h3>
                    <span className={`rounded px-3 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase ${
                      suspect.status === "person of interest" ? "bg-ember/15 text-ember" :
                      suspect.status === "cleared" ? "bg-brass/15 text-brass" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {suspect.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">{suspect.role}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{suspect.note}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "evidence" && (
            <div className="grid gap-4 md:grid-cols-2">
              {caseItem.evidence.map((item, i) => (
                <div key={item.id} className="animate-rise rounded border border-border bg-surface p-6" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ember">
                      <FileText className="size-4" />
                      {item.label}
                    </span>
                    <span className="rounded bg-muted px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                      {item.type}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.note}</p>
                  {item.image && (
                    <div className="mt-4 overflow-hidden rounded border border-border">
                      <img src={item.image} alt={item.label} className="size-full object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {relatedMedia.length > 0 && (
          <div className="mt-20">
            <SectionHeading index="02" title="Related media" />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedMedia.map((m, i) => (
                <Link
                  key={m.id}
                  to="/media"
                  className="animate-rise dossier-card group block overflow-hidden rounded"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={m.image} alt={m.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded border border-border bg-background/80 px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                      {m.kind}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg text-foreground">{m.title}</h3>
                    <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                      {m.source} · {m.duration}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </PublicShell>
  );
}
