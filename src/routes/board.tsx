import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Filter, Pin, Link2, FileText, Image as ImageIcon, Mic, MessageSquare } from "lucide-react";
import { AuthedShell, SectionHeading } from "@/components/site-chrome";
import { cases } from "@/lib/data";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "Evidence board — Casebook" },
      {
        name: "description",
        content: "Visual evidence board connecting photos, documents, audio and testimony across cases.",
      },
    ],
  }),
  component: EvidenceBoard,
});

const typeIcon = (type: string) => {
  if (type === "photo") return <ImageIcon className="size-4" />;
  if (type === "audio") return <Mic className="size-4" />;
  if (type === "document") return <FileText className="size-4" />;
  return <MessageSquare className="size-4" />;
};

const typeColor = (type: string) => {
  if (type === "photo") return "border-ember/60 bg-ember/10 text-ember";
  if (type === "audio") return "border-brass/60 bg-brass/10 text-brass";
  if (type === "document") return "border-[#8da399]/60 bg-[#8da399]/10 text-[#8da399]";
  return "border-muted-foreground/60 bg-muted text-muted-foreground";
};

function EvidenceBoard() {
  const [caseFilter, setCaseFilter] = useState<string>("all");

  const boardItems = cases
    .filter((c) => caseFilter === "all" || c.id === caseFilter)
    .flatMap((c) =>
      c.evidence
        .filter((e) => e.image)
        .map((e) => ({
          ...e,
          caseId: c.id,
          caseTitle: c.title,
          caseSlug: c.slug,
        }))
    );

  const stats = [
    { label: "Photos", type: "photo" as const },
    { label: "Documents", type: "document" as const },
    { label: "Audio", type: "audio" as const },
  ];

  return (
    <AuthedShell>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-12">
        <div className="animate-rise flex flex-wrap items-center justify-between gap-4">
          <div>
            <SectionHeading index="02" title="Evidence board" />
            <p className="mt-2 text-sm text-muted-foreground">
              {boardItems.length} pinned items across {new Set(boardItems.map((b) => b.caseId)).size} cases
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <select
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="rounded border border-border bg-surface px-3 py-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-foreground focus:border-ember focus:outline-none"
            >
              <option value="all">All cases</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 animate-rise [animation-delay:100ms]">
          <div className="relative min-h-[600px] overflow-hidden rounded border border-border bg-surface">
            <div className="absolute inset-0 bg-[radial-gradient(#586d5d_1px,transparent_1px)] bg-[size:18px_18px] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d2924]/40 via-transparent to-[#2a221c]/40" />

            <div className="relative grid grid-cols-2 gap-6 p-6 md:grid-cols-3 lg:grid-cols-4">
              {boardItems.map((item, i) => (
                <div
                  key={`${item.caseId}-${item.id}`}
                  className="animate-rise group relative"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="dossier-card relative overflow-hidden rounded bg-background/80">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={item.image} alt={item.label} className="size-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded border border-border/70 bg-background/80 px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                        <Pin className="size-3 text-ember" />
                        {item.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">
                        {item.caseId}
                      </p>
                      <h3 className="mt-1 text-sm text-foreground">{item.label}</h3>
                      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{item.note}</p>
                      <Link
                        to="/cases/$slug"
                        params={{ slug: item.caseSlug }}
                        className="mt-3 inline-flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ember hover:underline"
                      >
                        <Link2 className="size-3" />
                        Open case
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {boardItems.length === 0 && (
              <div className="relative flex flex-col items-center justify-center py-20 text-center">
                <Pin className="size-8 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No evidence matches this filter.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const count = boardItems.filter((b) => b.type === stat.type).length;
            return (
              <div key={stat.label} className="dossier-card animate-rise group rounded p-5" style={{ animationDelay: `${200 + boardItems.length * 40}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground transition-colors group-hover:text-brass">{stat.label}</span>
                  <span className={typeColor(stat.type)}>
                    <span className="flex items-center gap-1.5 rounded border px-2 py-1">{typeIcon(stat.type)}</span>
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl text-foreground transition-colors group-hover:text-brass">{count}</p>
              </div>
            );
          })}
        </div>
      </section>
    </AuthedShell>
  );
}
