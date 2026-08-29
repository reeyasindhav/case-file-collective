import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, FileText, MessageSquare, Play, Search } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { cases, discussions, media } from "@/lib/data";

type Tab = "all" | "cases" | "discussions" | "media";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Casebook" },
      {
        name: "description",
        content: "Search case files, discussions and media.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");

  const q = query.trim().toLowerCase();

  const matchedCases = useMemo(() => {
    if (!q) return [];
    return cases.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [q]);

  const matchedDiscussions = useMemo(() => {
    if (!q) return [];
    return discussions.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.body.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q)
    );
  }, [q]);

  const matchedMedia = useMemo(() => {
    if (!q) return [];
    return media.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.source.toLowerCase().includes(q) ||
        m.kind.toLowerCase().includes(q)
    );
  }, [q]);

  const total = matchedCases.length + matchedDiscussions.length + matchedMedia.length;

  return (
    <PublicShell>
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember">
          <ArrowLeft className="size-4" /> Workspace
        </Link>

        <div className="animate-rise">
          <SectionHeading index="00" title="Search" />
          <p className="mt-2 text-sm text-muted-foreground">
            Search across case files, discussions and media.
          </p>
        </div>

        <div className="mt-6 animate-rise [animation-delay:80ms]">
          <div className="flex border border-border bg-surface">
            <Search className="m-4 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Search cases, locations, names, topics..."
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="m-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground hover:text-ember"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { value: "all", label: `All (${total})` },
            { value: "cases", label: `Cases (${matchedCases.length})` },
            { value: "discussions", label: `Discussions (${matchedDiscussions.length})` },
            { value: "media", label: `Media (${matchedMedia.length})` },
          ].map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value as Tab)}
              className={`rounded border px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                tab === t.value
                  ? "border-ember bg-ember/15 text-ember"
                  : "border-border text-muted-foreground hover:border-ember/60 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {!q && (
            <div className="animate-rise rounded border border-border bg-surface p-12 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">Enter a query to search the index.</p>
            </div>
          )}

          {q && total === 0 && (
            <div className="animate-rise rounded border border-border bg-surface p-12 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No results found for “{query}”.</p>
            </div>
          )}

          {(tab === "all" || tab === "cases") && matchedCases.length > 0 && (
            <div className={tab === "all" ? "mb-10" : ""}>
              {tab === "all" && (
                <SectionHeading index="01" title={`Cases (${matchedCases.length})`} />
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matchedCases.map((c, i) => (
                  <Link
                    key={c.id}
                    to="/cases/$slug"
                    params={{ slug: c.slug }}
                    className="animate-rise dossier-card group rounded p-5"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">{c.id}</span>
                      <span className={`rounded px-2 py-0.5 font-mono text-[0.6rem] tracking-widest uppercase ${
                        c.status === "active" ? "bg-ember/15 text-ember" :
                        c.status === "solved" ? "bg-brass/15 text-brass" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl text-foreground transition-colors group-hover:text-brass">{c.title}</h3>
                    <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">{c.location} · {c.date}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(tab === "all" || tab === "discussions") && matchedDiscussions.length > 0 && (
            <div className={tab === "all" ? "mb-10" : ""}>
              {tab === "all" && (
                <SectionHeading index="02" title={`Discussions (${matchedDiscussions.length})`} />
              )}
              <div className="grid gap-4">
                {matchedDiscussions.map((d, i) => (
                  <Link
                    key={d.id}
                    to="/community/$id"
                    params={{ id: d.id }}
                    className="animate-rise dossier-card group block rounded p-6"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase ${
                        d.tag === "theory" ? "bg-ember/15 text-ember" :
                        d.tag === "evidence" ? "bg-brass/15 text-brass" :
                        d.tag === "question" ? "bg-muted text-muted-foreground" :
                        "bg-surface-2 text-muted-foreground"
                      }`}>
                        {d.tag}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="flex size-7 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
                          {d.initials}
                        </span>
                        <span className="text-sm text-foreground">{d.author}</span>
                      </span>
                      <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">{d.lastActive}</span>
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
            </div>
          )}

          {(tab === "all" || tab === "media") && matchedMedia.length > 0 && (
            <div>
              {tab === "all" && (
                <SectionHeading index="03" title={`Media (${matchedMedia.length})`} />
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {matchedMedia.map((m, i) => (
                  <div
                    key={m.id}
                    className="animate-rise dossier-card group overflow-hidden rounded"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={m.image} alt={m.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded border border-border bg-background/80 px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground">
                        {m.kind}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg text-foreground">{m.title}</h3>
                      <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                        {m.source} · {m.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PublicShell>
  );
}
