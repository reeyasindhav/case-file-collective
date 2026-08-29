import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { discussions, Discussion } from "@/lib/data";

type Tag = Discussion["tag"] | "all";

export const Route = createFileRoute("/community/")({
  head: () => ({
    meta: [
      { title: "Community — Casebook" },
      {
        name: "description",
        content: "Join the discussion. Theories, evidence threads and case updates from the collective.",
      },
    ],
  }),
  component: CommunityIndex,
});

function CommunityIndex() {
  const [filter, setFilter] = useState<Tag>("all");

  const filtered = filter === "all"
    ? discussions
    : discussions.filter((d) => d.tag === filter);

  const tags: { value: Tag; label: string }[] = [
    { value: "all", label: "All" },
    { value: "theory", label: "Theories" },
    { value: "evidence", label: "Evidence" },
    { value: "question", label: "Questions" },
    { value: "update", label: "Updates" },
  ];

  const tagColor = (tag: Tag) => {
    if (tag === "theory") return "bg-ember/15 text-ember";
    if (tag === "evidence") return "bg-brass/15 text-brass";
    if (tag === "question") return "bg-muted text-muted-foreground";
    return "bg-surface-2 text-muted-foreground";
  };

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading
            index="02"
            title="Community"
            action={
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                {filtered.length} threads
              </span>
            }
          />
        </div>

        <div className="animate-rise mt-8 flex flex-wrap gap-2 [animation-delay:80ms]">
          {tags.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={`rounded border px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                filter === t.value
                  ? "border-ember bg-ember/15 text-ember"
                  : "border-border text-muted-foreground hover:border-ember/60 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4">
          {filtered.map((d, i) => (
            <Link
              key={d.id}
              to="/community/$id"
              params={{ id: d.id }}
              className="animate-rise dossier-card group block rounded p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase ${tagColor(d.tag)}`}>
                  {d.tag}
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
                    {d.initials}
                  </span>
                  <span className="text-sm text-foreground">{d.author}</span>
                </span>
                <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">
                  {d.lastActive}
                </span>
              </div>
              <h3 className="mt-4 text-xl text-foreground group-hover:text-brass transition-colors">{d.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.body}</p>
              <div className="mt-4 flex items-center gap-4 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                <span>{d.replies} replies</span>
                <span>Case {d.caseId}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">No threads match this filter.</p>
        )}
      </section>
    </PublicShell>
  );
}
