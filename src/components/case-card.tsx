import { Link } from "@tanstack/react-router";
import { Bookmark, ArrowUpRight } from "lucide-react";
import type { CaseFile } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function StatusChip({ status }: { status: CaseFile["status"] }) {
  const map = {
    active: "text-ember border-ember/40 bg-ember/10",
    cold: "text-muted-foreground border-border bg-muted",
    solved: "text-brass border-brass/40 bg-brass/10",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded border px-2 py-1 font-mono text-[0.6rem] tracking-[0.2em] uppercase ${map[status]}`}
    >
      {status === "active" && <span className="live-dot size-1.5 rounded-full bg-ember" />}
      {status}
    </span>
  );
}

export function CaseCard({ item, delay = 0 }: { item: CaseFile; delay?: number }) {
  const { saved, toggleSaved } = useAuth();
  const isSaved = saved.includes(item.slug);

  return (
    <article
      className="dossier-card animate-rise group flex flex-col overflow-hidden rounded"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link
        to="/cases/$slug"
        params={{ slug: item.slug }}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <StatusChip status={item.status} />
          <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground">
            {item.id}
          </span>
        </div>

        <Link to="/cases/$slug" params={{ slug: item.slug }}>
          <h3 className="text-2xl leading-tight text-foreground transition-colors group-hover:text-brass">
            {item.title}
          </h3>
        </Link>
        <p className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
          {item.location}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground/90">{item.summary}</p>

        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-[0.65rem] tracking-widest uppercase text-muted-foreground">
            {item.date}
          </span>
          <div className="flex items-center gap-3">
            <button
              aria-label="Save case"
              onClick={() => {
                toggleSaved(item.slug);
                toast(isSaved ? "Removed from saved cases" : "Saved to your workspace");
              }}
              className="text-muted-foreground transition-colors hover:text-ember"
            >
              <Bookmark className={`size-4 ${isSaved ? "fill-ember text-ember" : ""}`} />
            </button>
            <Link
              to="/cases/$slug"
              params={{ slug: item.slug }}
              className="text-muted-foreground transition-transform hover:-translate-y-0.5 hover:text-ember"
            >
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
