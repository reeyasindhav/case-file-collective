import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Check, ChevronRight, Eye, KeyRound, ShieldCheck, Download, Trash2 } from "lucide-react";
import { AuthedShell, SignOutConfirm } from "@/components/site-chrome";
import { initials, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return <button onClick={onChange} aria-pressed={value} className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-ember" : "bg-muted"}`}><span className={`absolute top-1 size-4 rounded-full bg-foreground transition-transform ${value ? "translate-x-6" : "translate-x-1"}`} /></button>;
}

function SettingsPage() {
  const { user, signOut } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [digest, setDigest] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [exported, setExported] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);

  const navItems = ["Profile", "Notifications", "Privacy & security", "Data"];

  if (deleted) {
    return (
      <AuthedShell>
        <section className="mx-auto max-w-4xl px-5 py-10 md:px-10 md:py-12">
          <div className="animate-rise rounded border border-border bg-surface p-12 text-center">
            <Trash2 className="mx-auto size-8 text-ember" />
            <h1 className="mt-4 text-3xl text-foreground">Account data deleted</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your local session, saved cases and notes have been cleared.
            </p>
            <button
              onClick={() => setShowSignOut(true)}
              className="mt-6 rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Return to home
            </button>
          </div>
        </section>
        <SignOutConfirm open={showSignOut} onClose={() => setShowSignOut(false)} onConfirm={() => { setShowSignOut(false); signOut(); }} />
      </AuthedShell>
    );
  }

  return (
    <AuthedShell>
      <section className="mx-auto max-w-4xl px-5 py-10 md:px-10 md:py-12">
        <div className="animate-rise">
          <p className="font-mono text-[0.63rem] tracking-[0.2em] uppercase text-ember">Researcher account</p>
          <h1 className="mt-3 text-5xl">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage your profile, workspace and research preferences.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[12rem_1fr]">
          <aside className="flex gap-3 overflow-auto border-b border-border pb-4 font-mono text-[0.62rem] tracking-[0.12em] uppercase text-muted-foreground lg:block lg:border-b-0 lg:border-r lg:pb-0">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-").replace("&-", "")}`}
                className={`animate-rise block whitespace-nowrap px-3 py-3 transition-colors hover:text-foreground ${index === 0 ? "border-l-2 border-ember text-foreground" : ""}`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </aside>

          <div className="space-y-8">
            <section id="profile" className="dossier-card group animate-rise rounded-sm p-6 sm:p-7" style={{ animationDelay: "100ms" }}>
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ember/70 font-mono text-xs text-primary-foreground transition-colors group-hover:bg-ember">{initials(name || "Researcher")}</span>
                <div>
                  <h2 className="text-3xl transition-colors group-hover:text-brass">Profile</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Your name is visible alongside your case notes and discussions.</p>
                </div>
              </div>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Display name" value={name} onChange={setName} />
                <Field label="Email address" type="email" value={email} onChange={setEmail} />
              </div>
              <button onClick={() => setSaved(true)} className="mt-6 inline-flex items-center gap-2 bg-ember px-4 py-3 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">{saved && <Check className="size-3" />}{saved ? "Changes saved" : "Save changes"}</button>
            </section>

            <section id="notifications" className="dossier-card group animate-rise rounded-sm p-6 sm:p-7" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3">
                <Bell className="size-5 text-ember transition-colors group-hover:text-brass" />
                <div>
                  <h2 className="text-3xl transition-colors group-hover:text-brass">Notifications</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Choose what updates reach you.</p>
                </div>
              </div>
              <div className="mt-6 space-y-0">
                <SettingRow title="Push notifications" description="Case updates and replies" value={notifications} onChange={() => setNotifications((v) => !v)} />
                <SettingRow title="Daily digest" description="Summary of activity every morning" value={digest} onChange={() => setDigest((v) => !v)} />
              </div>
            </section>

            <section id="privacy" className="dossier-card group animate-rise rounded-sm p-6 sm:p-7" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-ember transition-colors group-hover:text-brass" />
                <div>
                  <h2 className="text-3xl transition-colors group-hover:text-brass">Privacy & security</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Control your visibility and access.</p>
                </div>
              </div>
              <div className="mt-6 space-y-0">
                <SettingRow title="Public profile" description="Allow other researchers to find you" value={publicProfile} onChange={() => setPublicProfile((v) => !v)} />
                <div className="flex items-center justify-between gap-5 py-5">
                  <div>
                    <h3 className="text-sm text-foreground">Two-factor authentication</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Add an extra layer to your account.</p>
                  </div>
                  <button className="flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:border-ember hover:text-ember">
                    <KeyRound className="size-4" />
                    Enable
                  </button>
                </div>
              </div>
            </section>

            <section id="data" className="dossier-card group animate-rise rounded-sm p-6 sm:p-7" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center gap-3">
                <Download className="size-5 text-ember transition-colors group-hover:text-brass" />
                <div>
                  <h2 className="text-3xl transition-colors group-hover:text-brass">Data</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Export or delete your account data.</p>
                </div>
              </div>
              <div className="mt-6 space-y-0">
                <div className="flex items-center justify-between gap-5 py-5">
                  <div>
                    <h3 className="text-sm text-foreground">Export data</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Download your saved cases, notes and profile as JSON.</p>
                  </div>
                  <button
                    onClick={() => {
                      setExported(true);
                      setTimeout(() => setExported(false), 2000);
                    }}
                    className="flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:border-ember hover:text-ember"
                  >
                    <Download className="size-4" />
                    {exported ? "Exported" : "Export"}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-5 py-5">
                  <div>
                    <h3 className="text-sm text-foreground">Delete account data</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Clear local session, saved cases and private notes.</p>
                  </div>
                  <button
                    onClick={() => setDeleted(true)}
                    className="flex items-center gap-2 rounded border border-border px-4 py-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:border-ember hover:text-ember"
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <SignOutConfirm open={showSignOut} onClose={() => setShowSignOut(false)} onConfirm={() => { setShowSignOut(false); signOut(); }} />
      </section>
    </AuthedShell>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="animate-rise block font-mono text-[0.62rem] tracking-[0.13em] uppercase text-muted-foreground" style={{ animationDelay: "400ms" }}>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded border border-border bg-background px-3 py-3 font-sans text-sm normal-case tracking-normal text-foreground outline-none transition-colors focus:border-ember"
      />
    </label>
  );
}

function SettingRow({ title, description, value, onChange }: { title: string; description: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      <div>
        <h3 className="text-sm text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}
