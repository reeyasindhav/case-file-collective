import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Trash2 } from "lucide-react";
import { AuthedShell, SectionHeading } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
import { cases } from "@/lib/data";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved cases — Casebook" },
      {
        name: "description",
        content: "Cases you’re tracking in your researcher workspace.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { saved, toggleSaved } = useAuth();
  const savedCases = cases.filter((c) => saved.includes(c.slug));

  return (
    <AuthedShell>
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember">
          <ArrowLeft className="size-4" /> Workspace
        </Link>

        <div className="animate-rise">
          <SectionHeading
            index="01"
            title="Saved cases"
            action={
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                {savedCases.length} {savedCases.length === 1 ? "file" : "files"}
              </span>
            }
          />
        </div>

        {savedCases.length === 0 ? (
          <div className="animate-rise mt-10 rounded border border-border bg-surface p-12 text-center">
            <Bookmark className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">You haven’t saved any cases yet.</p>
            <Link to="/cases" className="mt-4 inline-flex items-center gap-2 text-ember hover:underline">
              Browse the index
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedCases.map((c, i) => (
              <div key={c.id} className="animate-rise dossier-card rounded p-5" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">{c.id}</span>
                      <span className={`rounded px-2 py-0.5 font-mono text-[0.6rem] tracking-widest uppercase ${
                        c.status === "active" ? "bg-ember/15 text-ember" :
                        c.status === "solved" ? "bg-brass/15 text-brass" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <Link to="/cases/$slug" params={{ slug: c.slug }} className="mt-2 block text-xl text-foreground transition-colors group-hover:text-brass">
                      {c.title}
                    </Link>
                    <p className="mt-1 font-mono text-[0.65rem] tracking-widest text-muted-foreground">
                      {c.location} · {c.date}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSaved(c.slug)}
                    className="rounded p-2 text-muted-foreground hover:text-ember transition-colors"
                    aria-label="Remove from saved"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <Link to="/cases/$slug" params={{ slug: c.slug }} className="mt-4 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ember hover:underline">
                  Open dossier
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </AuthedShell>
  );
}
