import { Link, Navigate } from "@tanstack/react-router";
import { BookOpen, Bookmark, FileText, FolderOpen, LayoutDashboard, LockKeyhole, MessageSquare, Plus, Settings, Users } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useAuth, initials } from "@/lib/auth";

const nav = [{ to: "/cases", label: "Case files" }, { to: "/community", label: "Community" }, { to: "/media", label: "Listen / Watch" }, { to: "/about", label: "About" }] as const;

export function SignOutConfirm({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-5">
      <div className="dossier-card max-w-sm rounded p-6">
        <h3 className="text-xl text-foreground">Sign out?</h3>
        <p className="mt-2 text-sm text-muted-foreground">You will be returned to the public index. Your saved cases and notes remain in this browser.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded border border-border px-4 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground hover:border-ember hover:text-foreground">Cancel</button>
          <button onClick={onConfirm} className="rounded bg-ember px-6 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">Sign out</button>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5"><Brand /><nav className="hidden items-center gap-8 md:flex">{nav.map((item) => <Link key={item.to} to={item.to} className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">{item.label}</Link>)}</nav><div className="flex items-center gap-4">{user ? <Link to="/dashboard" className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-ember">Workspace</Link> : <><Link to="/login" className="font-mono text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground">Sign in</Link><Link to="/signup" className="hidden bg-ember px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-primary-foreground sm:block">Join the index</Link></>}</div></div></header>;
}

function Brand() { return <Link to="/" className="flex items-center gap-3"><span className="flex size-9 items-center justify-center border border-ember/50 text-ember"><BookOpen className="size-4" /></span><span><span className="block font-display text-lg tracking-[0.12em] text-foreground">CASEBOOK</span><span className="block font-mono text-[0.55rem] tracking-[0.12em] text-muted-foreground">Research collective · Est. 2019</span></span></Link>; }

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="md:pr-8">
            <Link to="/" className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-ember/50 text-ember">
                <BookOpen className="size-4" />
              </span>
              <span>
                <span className="block font-display text-lg tracking-[0.12em] text-foreground">CASEBOOK</span>
                <span className="block font-mono text-[0.55rem] tracking-[0.12em] text-muted-foreground">Research collective · Est. 2019</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A dossier-style database for true crime researchers. Read case files, rebuild timelines, and discuss theories with the collective.
            </p>
            <p className="mt-4 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">
              © {currentYear} Casebook. All rights reserved.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ember">Index</p>
            <nav className="mt-4 flex flex-col gap-3">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ember">Resources</p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link to="/submit" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Submit a case</Link>
              <Link to="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</Link>
              <Link to="/board" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Evidence board</Link>
            </nav>
          </div>

          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-ember">Legal</p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Terms</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
            Respect the unresolved.
          </p>
          <div className="flex items-center gap-2">
            <span className="live-dot size-2 rounded-full bg-ember" />
            <span className="text-sm text-muted-foreground">Index live</span>
            <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">248 files open</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function PublicShell({ children }: { children: ReactNode }) { return <div className="flex min-h-screen flex-col"><SiteHeader /><main className="flex-1">{children}</main><SiteFooter /></div>; }

export function AuthShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return <div className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_oklch(0.22_0.018_60),_transparent_48%)]"><header className="border-b border-border/70"><div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5"><Brand /><span className="hidden font-mono text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground sm:block">Private researcher access</span></div></header><main className="flex-1"><div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_26rem]"><div className="hidden max-w-lg lg:block"><p className="font-mono text-[0.65rem] tracking-[0.24em] uppercase text-ember">Casebook / researcher portal</p><h1 className="mt-5 text-6xl leading-[0.9] text-foreground">Every detail<br /><em className="text-brass">has a story.</em></h1><p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">A private workspace for following leads, preserving evidence, and connecting the fragments that deserve another look.</p><div className="mt-10 flex gap-8 border-t border-border pt-5 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground"><span>248 case files</span><span>9,180 evidence items</span></div></div><div className="dossier-card grain rounded-sm p-7 sm:p-9"><div className="mb-8"><p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ember">Secure access</p><h2 className="mt-3 text-4xl text-foreground">{title}</h2>{subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}</div>{children}</div></div></main><SiteFooter /></div>;
}

export function AuthedShell({ children, requireAuth = true }: { children: ReactNode; requireAuth?: boolean }) {
  const { user, signOut } = useAuth();
  const [showSignOut, setShowSignOut] = useState(false);
  if (requireAuth && !user) return <Navigate to="/login" />;
  const workspace = [{ to: "/dashboard", label: "Overview", icon: LayoutDashboard }, { to: "/cases", label: "Case files", icon: FolderOpen }, { to: "/board", label: "Evidence board", icon: FileText }, { to: "/community", label: "Community", icon: Users }] as const;
  return <div className="min-h-screen bg-background"><aside className="fixed inset-y-0 left-0 z-30 hidden w-[15.25rem] border-r border-border/70 bg-surface/95 p-5 md:flex md:flex-col"><Brand /><div className="mt-11 flex items-center justify-between px-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground"><span>Workspace</span><Plus className="size-3" /></div><nav className="mt-4 space-y-1">{workspace.map(({ to, label, icon: Icon }) => <Link key={label} to={to} activeProps={{ className: "border-l-2 border-ember bg-muted/70 text-foreground" }} className="flex items-center gap-3 border-l-2 border-transparent px-3 py-3 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground"><Icon className="size-4" />{label}{label === "Case files" && <span className="ml-auto font-mono text-[0.6rem]">248</span>}</Link>)}</nav><div className="mt-6 border-t border-border/70 pt-6"><p className="px-2 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-muted-foreground">Your workspace</p><nav className="mt-3 space-y-1">{[{label:"Saved cases",to:"/saved",icon:Bookmark},{label:"My discussions",to:"/discussions",icon:MessageSquare},{label:"Private notes",to:"/notes",icon:LockKeyhole}].map(({label,to,icon:Icon}) => <Link key={label} to={to} className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground"><Icon className="size-4" />{label}</Link>)}</nav></div><div className="mt-auto border-t border-border/70 pt-4"><Link to="/settings" activeProps={{ className: "text-ember" }} className="flex items-center gap-3 px-3 py-3 text-sm text-muted-foreground hover:text-foreground"><Settings className="size-4" />Settings</Link><div className="mt-3 flex items-center gap-3 px-1"><span className="flex size-8 items-center justify-center bg-ember/70 font-mono text-[0.6rem] text-primary-foreground">{initials(user!.name)}</span><span><span className="block text-xs text-foreground">{user!.name}</span><span className="block font-mono text-[0.55rem] uppercase text-muted-foreground">{user!.role}</span></span></div></div></aside><div className="flex min-h-screen min-w-0 flex-col md:ml-[15.25rem]"><header className="flex h-16 items-center justify-between border-b border-border/70 px-5 md:px-10"><div className="flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground"><span>Casebook</span><span>/</span><span className="text-foreground">Workspace</span></div><div className="flex items-center gap-4"><Link to="/submit" className="hidden items-center gap-2 font-mono text-[0.65rem] tracking-[0.08em] text-muted-foreground hover:text-foreground sm:flex"><FileText className="size-4" />Submit a case</Link><button onClick={() => setShowSignOut(true)} className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground hover:text-ember">Sign out</button><span className="flex size-7 items-center justify-center rounded-full bg-ember/70 font-mono text-[0.58rem] text-primary-foreground">{initials(user!.name)}</span></div></header><main className="flex-1">{children}</main><SignOutConfirm open={showSignOut} onClose={() => setShowSignOut(false)} onConfirm={() => { setShowSignOut(false); signOut(); }} /></div></div>;
}

export function SectionHeading({ index, title, action }: { index: string; title: string; action?: ReactNode }) { return <div className="mb-5 flex items-end justify-between gap-4"><h2 className="flex items-baseline gap-3 text-2xl text-foreground"><span className="font-mono text-[0.65rem] text-ember">{index}</span>{title}</h2>{action}</div>; }
