import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, EyeOff, FileText, Mail } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Casebook" },
      {
        name: "description",
        content: "How Casebook handles your data, research notes and account information.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading index="07" title="Privacy" />
          <p className="mt-2 text-sm text-muted-foreground">
            Your research stays yours. Here is exactly how Casebook handles data.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:100ms]">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">What we collect</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We store only the minimum required to run your workspace: account name and email, saved case slugs,
              and private notes you create. We do not sell or share this data with third parties.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:180ms]">
            <div className="flex items-center gap-3">
              <Lock className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Local storage</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Session and saved-case data are stored in your browser’s localStorage by default.
              Clearing browser data will remove your local session and saved cases.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:260ms]">
            <div className="flex items-center gap-3">
              <EyeOff className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Private notes</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Notes are private to your account and are not visible to other researchers.
              Back up important notes externally if you need long-term preservation.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:340ms]">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Case submissions</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Submitted cases are reviewed by volunteer archivists before publication.
              Submissions may be edited for clarity, redaction, or sourcing requirements.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:420ms]">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Contact</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              For privacy requests or data deletion, contact the Casebook team through the site contact channel.
              We aim to respond within a reasonable timeframe.
            </p>
          </div>
        </div>

        <div className="mt-12 animate-rise [animation-delay:500ms] text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded bg-ember px-8 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Back to about
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
