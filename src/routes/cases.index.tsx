import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { CaseCard, StatusChip } from "@/components/case-card";
import { cases, CaseStatus } from "@/lib/data";

type Filter = CaseStatus | "all";

export const Route = createFileRoute("/cases/")({
  head: () => ({
    meta: [
      { title: "Case files — Casebook" },
      {
        name: "description",
        content: "Browse the full dossier of unresolved cases, timelines, suspects and evidence.",
      },
    ],
  }),
  component: CasesIndex,
});

function CasesIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? cases : cases.filter((c) => c.status === filter);

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading
            index="01"
            title="Case files"
            action={
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "file" : "files"}
              </span>
            }
          />
        </div>

        <div className="animate-rise mt-8 flex flex-wrap gap-2 [animation-delay:80ms]">
          {(["all", "active", "cold", "solved"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded border px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                filter === f
                  ? "border-ember bg-ember/15 text-ember"
                  : "border-border text-muted-foreground hover:border-ember/60 hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : f === "cold" ? "Cold" : "Solved"}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <CaseCard key={c.id} item={c} delay={i * 60} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">No cases match this filter.</p>
        )}
      </section>
    </PublicShell>
  );
}
