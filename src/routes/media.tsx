import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Play, Tv, Radio } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { media, MediaItem } from "@/lib/data";

type Kind = MediaItem["kind"] | "all";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Listen / Watch — Casebook" },
      {
        name: "description",
        content: "Podcasts, documentaries and series covering the cases in the index.",
      },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const [filter, setFilter] = useState<Kind>("all");
  const filtered = filter === "all" ? media : media.filter((m) => m.kind === filter);

  const kinds: { value: Kind; label: string; icon: typeof Play }[] = [
    { value: "all", label: "All", icon: Play },
    { value: "podcast", label: "Podcasts", icon: Radio },
    { value: "documentary", label: "Documentaries", icon: Tv },
    { value: "series", label: "Series", icon: Play },
  ];

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading
            index="03"
            title="Listen / Watch"
            action={
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                {filtered.length} items
              </span>
            }
          />
        </div>

        <div className="animate-rise mt-8 flex flex-wrap gap-2 [animation-delay:80ms]">
          {kinds.map((k) => (
            <button
              key={k.value}
              onClick={() => setFilter(k.value)}
              className={`flex items-center gap-2 rounded border px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                filter === k.value
                  ? "border-ember bg-ember/15 text-ember"
                  : "border-border text-muted-foreground hover:border-ember/60 hover:text-foreground"
              }`}
            >
              <k.icon className="size-4" />
              {k.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
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
                <div className="mt-4 flex items-center gap-2 text-ember">
                  <ExternalLink className="size-4" />
                  <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase">Open link</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">No media matches this filter.</p>
        )}
      </section>
    </PublicShell>
  );
}
