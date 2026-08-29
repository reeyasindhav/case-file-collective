import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Radio, Clock, CheckCircle2, FileSearch, XCircle } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a case — Casebook" },
      {
        name: "description",
        content: "Submit a case for review by the Casebook archival team.",
      },
    ],
  }),
  component: SubmitPage,
});

type Status = "active" | "cold" | "solved";
type ReviewStage = "submitted" | "in_review" | "changes_requested" | "published" | "rejected";

const reviewStages: { key: ReviewStage; label: string; desc: string }[] = [
  { key: "submitted", label: "Submitted", desc: "Waiting for archival review" },
  { key: "in_review", label: "In review", desc: "Volunteer archivists are checking sources" },
  { key: "changes_requested", label: "Changes requested", desc: "Additional sourcing or redaction needed" },
  { key: "published", label: "Published", desc: "Case is live in the index" },
  { key: "rejected", label: "Rejected", desc: "Does not meet publication standards" },
];

function SubmitPage() {
  const [status, setStatus] = useState<Status>("active");
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [reviewStage, setReviewStage] = useState<ReviewStage>("submitted");
  const [title, setTitle] = useState("");

  const stageIndex = reviewStages.findIndex((s) => s.key === reviewStage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `SUB-${Date.now().toString(36).toUpperCase()}`;
    setSubmissionId(id);
    setSubmitted(true);

    setTimeout(() => setReviewStage("in_review"), 2000);
    setTimeout(() => setReviewStage("changes_requested"), 5000);
    setTimeout(() => setReviewStage("published"), 8000);
  };

  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-5 py-16">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember"
        >
          <ArrowLeft className="size-4" /> Home
        </Link>

        <div className="animate-rise">
          <SectionHeading
            index="06"
            title="Submit a case"
            action={
              <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                Reviewed within 72h
              </span>
            }
          />
        </div>

        {submitted && submissionId ? (
          <div className="animate-rise mt-10 space-y-6">
            <div className="rounded border border-border bg-surface p-8">
              <div className="flex items-center gap-3">
                <Radio className="size-6 text-ember" />
                <div>
                  <h2 className="text-2xl text-foreground">Submission received</h2>
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">
                    ID: {submissionId}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Thank you. Volunteer archivists will review your submission within 72 hours.
                Sources are required for publication.
              </p>
            </div>

            <div className="rounded border border-border bg-surface p-6">
              <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ember">Review progress</p>
              <div className="mt-6 relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
                <div className="space-y-6">
                  {reviewStages.map((stage, i) => {
                    const isActive = i <= stageIndex;
                    const isCurrent = stage.key === reviewStage;
                    return (
                      <div key={stage.key} className="relative flex gap-5">
                        <span className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
                          isActive
                            ? isCurrent
                              ? "border-ember bg-ember/15"
                              : "border-brass bg-brass/15"
                            : "border-border bg-surface"
                        }`}>
                          {isActive && isCurrent && <CheckCircle2 className="size-4 text-ember" />}
                          {isActive && !isCurrent && <CheckCircle2 className="size-4 text-brass" />}
                          {!isActive && <Clock className="size-4 text-muted-foreground" />}
                        </span>
                        <div className="flex-1 pb-1">
                          <p className={`font-mono text-[0.7rem] tracking-[0.18em] uppercase ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                            {stage.label}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Return to index
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="animate-rise mt-10 space-y-6 [animation-delay:100ms]">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Case title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                  placeholder="The Disappearance at..."
                />
              </div>
              <div>
                <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Date of incident *
                </label>
                <input
                  type="date"
                  required
                  className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-ember focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="cold">Cold</option>
                  <option value="solved">Solved</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                Summary *
              </label>
              <textarea
                required
                rows={6}
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                placeholder="Describe the case in detail. Include sources where possible."
              />
            </div>

            <div>
              <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                Tags (comma separated)
              </label>
              <input
                type="text"
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                placeholder="missing person, rural, ongoing"
              />
            </div>

            <div>
              <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                Source links / references
              </label>
              <textarea
                rows={3}
                className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
                placeholder="https://source-1.com&#10;https://source-2.com"
              />
            </div>

            <div className="flex items-center justify-between rounded border border-border bg-surface p-4">
              <div>
                <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Reviewer notes
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Submissions are reviewed by volunteer archivists. Incomplete or unsourced files may be held.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Submit for review
            </button>
          </form>
        )}
      </section>
    </PublicShell>
  );
}
