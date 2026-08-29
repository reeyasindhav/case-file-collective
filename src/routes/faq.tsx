import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, FileText, Shield, Users, Search, Radio } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Casebook" },
      {
        name: "description",
        content: "Frequently asked questions about Casebook, submissions, privacy and community guidelines.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const faqs = [
    {
      icon: Search,
      question: "How do I find a specific case?",
      answer:
        "Use the search bar on the dashboard or visit the Case files page. You can filter by status, browse all dossiers, or open a specific case by its ID if you know it.",
    },
    {
      icon: FileText,
      question: "How do I submit a case?",
      answer:
        "Go to Submit a case from the workspace or footer. Fill in the title, location, date, summary and any source links. Volunteer archivists review submissions within 72 hours before publication.",
    },
    {
      icon: Shield,
      question: "Are my private notes visible to others?",
      answer:
        "No. Private notes are stored locally in your browser and are only visible to you. We recommend backing up important notes externally.",
    },
    {
      icon: Users,
      question: "What are the community rules?",
      answer:
        "Theories must be labelled and sourced. Personal information must be redacted. Respect unresolved cases and the people affected by them. No witch hunts — only good-faith research.",
    },
    {
      icon: Radio,
      question: "How do I save a case to my workspace?",
      answer:
        "Open any case dossier and click the bookmark icon in the case card. Saved cases appear in your workspace under Saved cases.",
    },
    {
      icon: HelpCircle,
      question: "How can I contact the Casebook team?",
      answer:
        "For privacy requests, data deletion, or general questions, use the contact channel listed in the privacy policy. We aim to respond within a reasonable timeframe.",
    },
  ];

  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="animate-rise">
          <SectionHeading index="09" title="FAQ" />
          <p className="mt-2 text-sm text-muted-foreground">
            Quick answers about using Casebook, submitting cases, and the community.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((item, i) => (
            <div
              key={item.question}
              className="dossier-card animate-rise group rounded p-6 [animation-delay:100ms]"
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="size-5 text-ember transition-colors group-hover:text-brass" />
                <h3 className="text-xl text-foreground transition-colors group-hover:text-brass">
                  {item.question}
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-rise [animation-delay:600ms] text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link to="/about" className="text-ember hover:underline">
              Learn more about Casebook
            </Link>
          </p>
        </div>
      </section>
    </PublicShell>
  );
}
