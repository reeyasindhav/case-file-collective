import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth, initials } from "@/lib/auth";

const nav = [
  { to: "/cases", label: "Case files" },
  { to: "/community", label: "Community" },
  { to: "/media", label: "Listen / Watch" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="flex size-9 items-center justify-center rounded border border-border bg-surface text-ember transition-colors group-hover:border-ember/60">
            <BookOpen className="size-4" />
          </span>
          <span>
            <span className="block font-mono text-sm tracking-[0.3em] text-foreground">
              CASEBOOK
            </span>
            <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground">
              RESEARCH COLLECTIVE · EST. 2019
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              className="relative font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-ember after:transition-all hover:after:w-full data-[status=active]:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded border border-border px-3 py-1.5 transition-colors hover:border-ember/60"
            >
              <span className="font-mono text-[0.7rem] tracking-widest uppercase text-muted-foreground">
                Workspace
              </span>
              <span className="flex size-7 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
                {initials(user.name)}
              </span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded bg-ember px-4 py-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Join the index
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="rounded border border-border p-2 md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="animate-rise border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-[0.18em] uppercase text-ember"
            >
              {user ? "Workspace" : "Sign in"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Casebook index / 248 files / updated daily</span>
        <span>Built for the curious. Respect the unresolved.</span>
      </div>
    </footer>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SectionHeading({
  index,
  title,
  action,
}: {
  index: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border/60 pb-3">
      <h2 className="flex items-baseline gap-3 text-2xl text-foreground">
        <span className="font-mono text-[0.7rem] text-ember">{index}</span>
        {title}
      </h2>
      {action}
    </div>
  );
}
