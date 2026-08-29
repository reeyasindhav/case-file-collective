import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, FileText, Users, AlertTriangle } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Casebook" },
      {
        name: "description",
        content: "Terms of use and community guidelines for Casebook.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading index="08" title="Terms" />
          <p className="mt-2 text-sm text-muted-foreground">
            By using Casebook you agree to the following terms.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:100ms]">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Acceptable use</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Use Casebook for research and discussion only. Do not post harmful, illegal,
              or harassing content. Do not impersonate researchers or institutions.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:180ms]">
            <div className="flex items-center gap-3">
              <Users className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Community standards</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Theories must be labelled and sourced. Personal information must be redacted.
              Respect unresolved cases and the people affected by them.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:260ms]">
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Content moderation</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Volunteer archivists review submissions and may remove content that violates these terms.
              Repeated violations may result in restricted access.
            </p>
          </div>

          <div className="dossier-card animate-rise group rounded p-6 [animation-delay:340ms]">
            <div className="flex items-center gap-3">
              <Shield className="size-5 text-ember transition-colors group-hover:text-brass" />
              <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">Limitation of liability</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Casebook provides research tools and community hosting. We are not responsible for
              user-submitted content or any decisions made based on information found here.
            </p>
          </div>
        </div>

        <div className="mt-12 animate-rise [animation-delay:500ms] text-center">
          <Link
            to="/privacy"
            className="inline-flex items-center gap-2 rounded bg-ember px-8 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            View privacy policy
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
