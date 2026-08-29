import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquare, Plus, TrendingUp } from "lucide-react";
import { AuthedShell, SectionHeading } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
import { discussions, Discussion } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/discussions")({
  head: () => ({
    meta: [
      { title: "My discussions — Casebook" },
      {
        name: "description",
        content: "Threads you’re involved in across the collective.",
      },
    ],
  }),
  component: MyDiscussionsPage,
});

type Tag = Discussion["tag"] | "all";

function MyDiscussionsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<Tag>("all");

  const myThreads = discussions.filter((d) => {
    if (filter === "all") return true;
    return d.tag === filter;
  });

  const totalReplies = myThreads.reduce((sum, d) => sum + d.replies, 0);

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
    <AuthedShell>
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember">
          <ArrowLeft className="size-4" /> Workspace
        </Link>

        <div className="animate-rise">
          <SectionHeading index="02" title="My discussions" />
          <p className="mt-2 text-sm text-muted-foreground">
            Your threads, theories and case updates as <span className="text-ember">{user?.name}</span>
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="dossier-card animate-rise rounded p-5 [animation-delay:80ms]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">Active threads</span>
              <MessageSquare className="size-4 text-ember" />
            </div>
            <p className="mt-3 font-display text-3xl text-foreground">{myThreads.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">Across {new Set(myThreads.map(d => d.caseId)).size} cases</p>
          </div>
          <div className="dossier-card animate-rise rounded p-5 [animation-delay:160ms]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">Total replies</span>
              <TrendingUp className="size-4 text-brass" />
            </div>
            <p className="mt-3 font-display text-3xl text-foreground">{totalReplies}</p>
            <p className="mt-1 text-xs text-muted-foreground">From the collective</p>
          </div>
          <div className="dossier-card animate-rise rounded p-5 [animation-delay:240ms]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">Top tag</span>
              <span className={`rounded px-2 py-1 font-mono text-[0.55rem] tracking-widest uppercase ${tagColor((filter === "all" ? "theory" : filter) as Tag)}`}>
                {filter === "all" ? "theory" : filter}
              </span>
            </div>
            <p className="mt-3 font-display text-3xl text-foreground">
              {myThreads.filter((d) => d.tag === (filter === "all" ? "theory" : filter)).length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Threads in this category</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
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
          <button className="flex items-center gap-2 rounded border border-border bg-surface px-4 py-2.5 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground hover:border-ember">
            <Plus className="size-4" />
            New thread
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {myThreads.map((d, i) => (
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
                <span className="flex items-center gap-1"><MessageSquare className="size-3" />{d.replies} replies</span>
                <span>Case {d.caseId}</span>
              </div>
            </Link>
          ))}
        </div>

        {myThreads.length === 0 && (
          <div className="animate-rise mt-10 rounded border border-border bg-surface p-12 text-center">
            <MessageSquare className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">You’re not involved in any discussions yet.</p>
            <Link to="/community" className="mt-4 inline-flex items-center gap-2 text-ember hover:underline">
              Browse community threads
            </Link>
          </div>
        )}
      </section>
    </AuthedShell>
  );
}
